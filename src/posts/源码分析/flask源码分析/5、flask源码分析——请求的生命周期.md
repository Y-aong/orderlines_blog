---
icon: pen-to-square
date: 2024-03-05
category:
  - 源码分析
  - flask
tag:
  - 源码分析
  - flask
---



# flask源码分析——请求的生命周期



请求的生命周期这个是比较复杂的我们通过两个方面来进行分析，分别用应用上下文和请求上下文，以及before_request，after_request等处理函数进行分析

源码部分

```python
    def wsgi_app(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> cabc.Iterable[bytes]:
        ctx = self.request_context(environ)
        error: BaseException | None = None
        try:
            try:
                ctx.push()
                response = self.full_dispatch_request()
            except Exception as e:
                error = e
                response = self.handle_exception(e)
            except:  # noqa: B001
                error = sys.exc_info()[1]
                raise
            return response(environ, start_response)
        finally:
            if "werkzeug.debug.preserve_context" in environ:
                environ["werkzeug.debug.preserve_context"](_cv_app.get())
                environ["werkzeug.debug.preserve_context"](_cv_request.get())

            if error is not None and self.should_ignore_error(error):
                error = None

            ctx.pop(error)
```

整体可以分为三个部分

- `ctx = self.request_context(environ)`上下文操作
- `response = self.full_dispatch_request()`请求函数操作
- `response = self.handle_exception(e)`异常处理

### 一、上下文操作

#### 1、基本操作

`ctx = self.request_context(environ) ctx.push()`上下文操作里面到底做了什么东西呢？

```python
class Flask(APP):
    def request_context(self, environ: WSGIEnvironment) -> RequestContext:
        return RequestContext(self, environ)
    
    def wsgi_app(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> cabc.Iterable[bytes]:
        # 1、先创建请求上下文
        ctx = self.request_context(environ)
        error: BaseException | None = None
        try:
            try:
                # 2、请求上下文放入ContextVars中
                ctx.push()
                response = self.full_dispatch_request()
            except Exception as e:
                error = e
                response = self.handle_exception(e)
            except:  # noqa: B001
                error = sys.exc_info()[1]
                raise
            return response(environ, start_response)
        finally:
            if "werkzeug.debug.preserve_context" in environ:
                environ["werkzeug.debug.preserve_context"](_cv_app.get())
                environ["werkzeug.debug.preserve_context"](_cv_request.get())

            if error is not None and self.should_ignore_error(error):
                error = None
			# 3、最后pop掉当前的请求上下文
            ctx.pop(error)
    
class RequestContext:

    def __init__(
        self,
        app: Flask,
        environ: WSGIEnvironment,
        request: Request | None = None,
        session: SessionMixin | None = None,
    ) -> None:
        self.app = app
        if request is None:
            request = app.request_class(environ)
            request.json_module = app.json
        self.request: Request = request
        self.url_adapter = None
        try:
            self.url_adapter = app.create_url_adapter(self.request)
        except HTTPException as e:
            self.request.routing_exception = e
        self.flashes: list[tuple[str, str]] | None = None
        self.session: SessionMixin | None = session
        self._after_request_functions= []
        self._cv_tokens = []
        
    def push(self) -> None:
        app_ctx = _cv_app.get(None)
        if app_ctx is None or app_ctx.app is not self.app:
            # 2.1、先push应用上下文
            app_ctx = self.app.app_context()
            app_ctx.push()
        else:
            app_ctx = None
		# 2.2再处理token,session等
        self._cv_tokens.append((_cv_request.set(self), app_ctx))
        if self.session is None:
            session_interface = self.app.session_interface
            self.session = session_interface.open_session(self.app, self.request)

            if self.session is None:
                self.session = session_interface.make_null_session(self.app)

        if self.url_adapter is not None:
            self.match_request()
```



- 创建应用上下文，和请求上下文
- 先处理应用上下文，再处理token、session等
- 最后上下文pop掉

#### 2、请求上下文和应用上下文的关系

**request** 就是请求上下文的对象，保存了当前本次请求的相关数据，请求上下文对象有：request、session，token

- request
  封装了HTTP请求的内容，针对的是http请求。举例：user = request.args.get('user')，获取的是get请求的参数。

- session
  用来记录请求会话中的信息，针对的是用户信息。举例：session['name'] = user.id，可以记录用户信息。还可以通过session.get('name')获取用户信息。

应用上下文，但它不是一直存在的，它只是request context 中的一个对 app 的代理(人)，所谓local proxy。它的作用主要是帮助 request 获取当前的应用，它是伴 request 而生，随 request 而灭的。

#### 3、请求上下文和应用上下文的生命周期

request context先于app context创建

request context先于app context消灭

app contex是最后pop的

```python
def pop(self, exc: BaseException | None = _sentinel) -> None:  # type: ignore
    clear_request = len(self._cv_tokens) == 1

    try:
        if clear_request:
            if exc is _sentinel:
                exc = sys.exc_info()[1]
            self.app.do_teardown_request(exc)

            request_close = getattr(self.request, "close", None)
            if request_close is not None:
                request_close()
    finally:
        ctx = _cv_request.get()
        token, app_ctx = self._cv_tokens.pop()
        _cv_request.reset(token)

        # get rid of circular dependencies at the end of the request
        # so that we don't require the GC to be active.
        if clear_request:
            ctx.request.environ["werkzeug.request"] = None

        if app_ctx is not None:
            app_ctx.pop(exc)

        if ctx is not self:
            raise AssertionError(
                f"Popped wrong request context. ({ctx!r} instead of {self!r})"
            )
```



### 二、处理函数运行

```python
def full_dispatch_request(self) -> Response:
    self._got_first_request = True
    try:
        request_started.send(self, _async_wrapper=self.ensure_sync)
        # 第一步
        rv = self.preprocess_request()
        if rv is None:
            # 第二步
            rv = self.dispatch_request()
    except Exception as e:
        rv = self.handle_user_exception(e)
    #第三步
    return self.finalize_request(rv)
 
def preprocess_request(self) -> ft.ResponseReturnValue | None:

    names = (None, *reversed(request.blueprints))

    for name in names:
        if name in self.url_value_preprocessors:
            for url_func in self.url_value_preprocessors[name]:
                url_func(request.endpoint, request.view_args)

    for name in names:
        if name in self.before_request_funcs:
            for before_func in self.before_request_funcs[name]:
                rv = self.ensure_sync(before_func)()
                if rv is not None:
                    return rv  # type: ignore[no-any-return]
    return None
    
def dispatch_request(self) -> ft.ResponseReturnValue:

    req = request_ctx.request
    if req.routing_exception is not None:
        self.raise_routing_exception(req)
    rule: Rule = req.url_rule  # type: ignore[assignment]
   
    if (
        getattr(rule, "provide_automatic_options", False)
        and req.method == "OPTIONS"
    ):
        return self.make_default_options_response()

    view_args: dict[str, t.Any] = req.view_args  # type: ignore[assignment]
    return self.ensure_sync(self.view_functions[rule.endpoint])(**view_args) 

def finalize_request(
        self,
        rv: ft.ResponseReturnValue | HTTPException,
        from_error_handler: bool = False,
    ) -> Response:
        response = self.make_response(rv)
        try:
            response = self.process_response(response)
            request_finished.send(
                self, _async_wrapper=self.ensure_sync, response=response
            )
        except Exception:
            if not from_error_handler:
                raise
            self.logger.exception(
                "Request finalizing failed with an error while handling an error"
            )
        return response
    
def process_response(self, response: Response) -> Response:
    ctx = request_ctx._get_current_object()  # type: ignore[attr-defined]

    for func in ctx._after_request_functions:
        response = self.ensure_sync(func)(response)

    for name in chain(request.blueprints, (None,)):
        if name in self.after_request_funcs:
            for func in reversed(self.after_request_funcs[name]):
                response = self.ensure_sync(func)(response)

    if not self.session_interface.is_null_session(ctx.session):
        self.session_interface.save_session(self, ctx.session, response)

    return response
```



我们理一下运行顺序

- `preprocess_request`:**请求预处理**
  - url_value_preprocessors：url解析
  - before_request_funcs：执行请求前置操作
- dispatch_request:**分发请求**
  - view_functions：执行视图函数
- finalize_request:**完成请求**
  - after_request_funcs：执行请求后置操作



### 三、生命周期

```python
class Flask(APP):
    
    def wsgi_app(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> cabc.Iterable[bytes]:
        # 1、先创建请求上下文
        ctx = self.request_context(environ)
        error: BaseException | None = None
        try:
            try:
                # 2、请求上下文放入ContextVars中
                ctx.push()
                # 3、执行请求处理函数
                response = self.full_dispatch_request()
            except Exception as e:
                error = e
                response = self.handle_exception(e)
            except:  # noqa: B001
                error = sys.exc_info()[1]
                raise
            return response(environ, start_response)
        finally:
            if "werkzeug.debug.preserve_context" in environ:
                environ["werkzeug.debug.preserve_context"](_cv_app.get())
                environ["werkzeug.debug.preserve_context"](_cv_request.get())

            if error is not None and self.should_ignore_error(error):
                error = None
			# 4、最后pop掉当前的请求上下文
            ctx.pop(error)
```

- 1、先创建请求上下文
- 2、请求上下文放入ContextVars中，这里包括session,token，request
- 3、执行请求处理函数
  - 请求预处理
    - url解析
    - 执行请求前置操作
  - 分发请求
    - 执行视图函数
  - 完成请求
    - 执行请求后置操作
- 4、最后移除当前的请求上下文，为下一次请求准备

### 四、上下文其他对象