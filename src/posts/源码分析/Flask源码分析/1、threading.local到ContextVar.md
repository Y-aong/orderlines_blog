---
icon: pen-to-square
date: 2024-03-05
category:
  - 源码分析
  - flask
tag:
  - 源码分析
  - flask
star: true
---



# 1、localstock到ContextVar



### 问题引入

当前flask版本为`3.0.2`，记得之前flask实现线程隔离的时候是使用`localstock`来实现的，现在再来看源码出现了ContextVar让我感觉比较陌生，接下来我们就来好好看看flask为什么要使用ContextVar。

源码对比

旧版本global.py

```python
_request_ctx_stack = LocalStack()
_app_ctx_stack = LocalStack()
current_app = LocalProxy(_find_app)
request = LocalProxy(partial(_lookup_req_object, "request"))
session = LocalProxy(partial(_lookup_req_object, "session"))
g = LocalProxy(partial(_lookup_app_object, "g"))
```



新版本global.py

```python
_cv_app: ContextVar[AppContext] = ContextVar("flask.app_ctx")
app_ctx: AppContext = LocalProxy(_cv_app, unbound_message=_no_app_msg)
current_app: Flask = LocalProxy(_cv_app, "app", unbound_message=_no_app_msg)
g: _AppCtxGlobals = LocalProxy(_cv_app, "g", unbound_message=_no_app_msg)

_cv_request: ContextVar[RequestContext] = ContextVar("flask.request_ctx")
request_ctx: RequestContext = LocalProxy(_cv_request, unbound_message=_no_req_msg)
request: Request = LocalProxy(_cv_request, "request", unbound_message=_no_req_msg)
session: SessionMixin = LocalProxy(_cv_request, "session", unbound_message=_no_req_msg)
```



### 一、两点疑问



##### 问题1：为什么使用ContextVar

##### 问题2：flask是不是不再使用栈的方式进行处理应用上下文了

​	在Python 3.7加入了一个新的模块contextvars，标题是 Context Variables，也就是「上下文变量」。那么什么是上下文呢。可以参考这个文章[flask with上下文](https://y-aong.github.io/orderlines_blog/zh/posts/flask/%E5%AD%A6%E4%BC%9Aflask%E4%BA%86%E8%A7%A3python%E4%B8%8A%E4%B8%8B%E6%96%87.html)。简单来说就是上下文，相当于现实生活中的上下文语义，在python中脱离了上下文环境所声明的类，属性可能会失效。

​	上下文不是我们这次要讲的重点，我们主要看下为什么从threading.loacl转换到ContextVar。



### 二、线程隔离

threading.loacl是为线程开辟了一块单独的空间，每个线程之间的数据资源可以相互独立。我们可以简单实现下threading.local

```python
import threading


class Local(object):

    def __init__(self):
        object.__setattr__(self, 'storage', {})

    def __setattr__(self, key, value):
        ident = threading.get_ident()

        if ident in self.storage:
            self.storage[ident][key] = value
        else:
            self.storage[ident] = {key: value}

    def __getattr__(self, item):
        ident = threading.get_ident()
        if ident not in self.storage:
            return
        return self.storage[ident].get(item)


local = Local()


def task(arg):
    local.x1 = arg
    print(local.x1)


for i in range(5):
    t = threading.Thread(target=task, args=(i,))
    t.start()
print(getattr(local, 'storage'))
# {44196: {'x1': 0}, 44228: {'x1': 1}, 43692: {'x1': 2}, 41552: {'x1': 3}, 42804: {'x1': 4}}

```

flask中实现的是

```python
try:
    from greenlet import getcurrent as get_ident
except ImportError:
    try:
        from thread import get_ident
    except ImportError:
        from _thread import get_ident

class Local(object):
    __slots__ = ("__storage__", "__ident_func__")

    def __init__(self):
        object.__setattr__(self, "__storage__", {})
        object.__setattr__(self, "__ident_func__", get_ident)

    def __iter__(self):
        return iter(self.__storage__.items())

    def __call__(self, proxy):
        """Create a proxy for a name."""
        return LocalProxy(self, proxy)

    def __release_local__(self):
        self.__storage__.pop(self.__ident_func__(), None)

    def __getattr__(self, name):
        try:
            return self.__storage__[self.__ident_func__()][name]
        except KeyError:
            raise AttributeError(name)

    def __setattr__(self, name, value):
        ident = self.__ident_func__()
        storage = self.__storage__
        try:
            storage[ident][name] = value
        except KeyError:
            storage[ident] = {name: value}

    def __delattr__(self, name):
        try:
            del self.__storage__[self.__ident_func__()][name]
        except KeyError:
            raise AttributeError(name)
```

可以看到flask这里不仅对于python线程实现了资源隔离，还对协程也实现了数据隔离。而flask引用的werkzeug有对于这个local进行了一层封装封装为了一个栈的形式

```python
class LocalStack(object):

    def __init__(self):
        self._local = Local()

    def __call__(self):
        def _lookup():
            rv = self.top
            if rv is None:
                raise RuntimeError("object unbound")
            return rv

        return LocalProxy(_lookup)

    def push(self, obj):

        rv = getattr(self._local, "stack", None)
        if rv is None:
            self._local.stack = rv = []
        rv.append(obj)
        return rv

    def pop(self):
        stack = getattr(self._local, "stack", None)
        if stack is None:
            return None
        elif len(stack) == 1:
            release_local(self._local)
            return stack[-1]
        else:
            return stack.pop()

    @property
    def top(self):
        try:
            return self._local.stack[-1]
        except (AttributeError, IndexError):
            return None

```



而我们使用ContextVar同样也可以实现线程隔离的方式，同时可以基于协程实现线程隔离

```python
import asyncio
import contextvars

# 申明Context变量
request = contextvars.ContextVar('Id of request')


async def get():
    print(f'Request ID (Inner): {request.get()}')


async def test(req_id):
    request.set(req_id)
    await get()


async def main():
    tasks = []
    for req_id in range(1, 5):
        tasks.append(asyncio.create_task(test(req_id)))

    await asyncio.gather(*tasks)


asyncio.run(main())
# Request ID (Inner): 1
# Request ID (Inner): 2
# Request ID (Inner): 3
# Request ID (Inner): 4
```

因此我们回答第一个问题

就是**为什么使用ContextVar**，因为它同样可以实现线程隔离的方式，而且是python自带的模块(python3.7后开始全部支持)，也是可以实现协程隔离。功能一致，python原生支持所以使用。



### 三、flask是不是不再使用LocalStock来处理上下文了

先说答案，是的flask不再使用LocalStock来处理上下文

来看源码

旧版flask ctx

```python
 _app_ctx_stack = LocalStack()
 
 
 class AppContext(object):

    def __init__(self, app):
        self.app = app
        self.url_adapter = app.create_url_adapter(None)
        self.g = app.app_ctx_globals_class()

        # Like request context, app contexts can be pushed multiple times
        # but there a basic "refcount" is enough to track them.
        self._refcnt = 0

    def push(self):
        """Binds the app context to the current context."""
        self._refcnt += 1
        if hasattr(sys, "exc_clear"):
            sys.exc_clear()
        _app_ctx_stack.push(self)
        appcontext_pushed.send(self.app)

    def pop(self, exc=_sentinel):
        """Pops the app context."""
        try:
            self._refcnt -= 1
            if self._refcnt <= 0:
                if exc is _sentinel:
                    exc = sys.exc_info()[1]
                self.app.do_teardown_appcontext(exc)
        finally:
            rv = _app_ctx_stack.pop()
        assert rv is self, "Popped wrong app context.  (%r instead of %r)" % (rv, self)
        appcontext_popped.send(self.app)

    def __enter__(self):
        self.push()
        return self

    def __exit__(self, exc_type, exc_value, tb):
        self.pop(exc_value)

        if BROKEN_PYPY_CTXMGR_EXIT and exc_type is not None:
            reraise(exc_type, exc_value, tb)
```

可以看到旧版本确实使用local stock来作为context

新版本

```python
class _AppCtxGlobals:
 
    def __getattr__(self, name: str) -> t.Any:
        try:
            return self.__dict__[name]
        except KeyError:
            raise AttributeError(name) from None

    def __setattr__(self, name: str, value: t.Any) -> None:
        self.__dict__[name] = value

    def __delattr__(self, name: str) -> None:
        try:
            del self.__dict__[name]
        except KeyError:
            raise AttributeError(name) from None

    def get(self, name: str, default: t.Any | None = None) -> t.Any:
        return self.__dict__.get(name, default)

    def pop(self, name: str, default: t.Any = _sentinel) -> t.Any:
        if default is _sentinel:
            return self.__dict__.pop(name)
        else:
            return self.__dict__.pop(name, default)

    def setdefault(self, name: str, default: t.Any = None) -> t.Any:
        return self.__dict__.setdefault(name, default)

    def __contains__(self, item: str) -> bool:
        return item in self.__dict__

    def __iter__(self) -> t.Iterator[str]:
        return iter(self.__dict__)

    def __repr__(self) -> str:
        ctx = _cv_app.get(None)
        if ctx is not None:
            return f"<flask.g of '{ctx.app.name}'>"
        return object.__repr__(self)
```

新版本已经使用一个类似于dict来存储应用上下文了。

```python
class AppContext:
    """The app context contains application-specific information. An app
    context is created and pushed at the beginning of each request if
    one is not already active. An app context is also pushed when
    running CLI commands.
    """

    def __init__(self, app: Flask) -> None:
        self.app = app
        self.url_adapter = app.create_url_adapter(None)
        self.g: _AppCtxGlobals = app.app_ctx_globals_class()
        self._cv_tokens: list[contextvars.Token[AppContext]] = []

    def push(self) -> None:
        """Binds the app context to the current context."""
        self._cv_tokens.append(_cv_app.set(self))
        appcontext_pushed.send(self.app, _async_wrapper=self.app.ensure_sync)

    def pop(self, exc: BaseException | None = _sentinel) -> None:  # type: ignore
        """Pops the app context."""
        try:
            if len(self._cv_tokens) == 1:
                if exc is _sentinel:
                    exc = sys.exc_info()[1]
                self.app.do_teardown_appcontext(exc)
        finally:
            ctx = _cv_app.get()
            _cv_app.reset(self._cv_tokens.pop())

        if ctx is not self:
            raise AssertionError(
                f"Popped wrong app context. ({ctx!r} instead of {self!r})"
            )

        appcontext_popped.send(self.app, _async_wrapper=self.app.ensure_sync)

    def __enter__(self) -> AppContext:
        self.push()
        return self

    def __exit__(
        self,
        exc_type: type | None,
        exc_value: BaseException | None,
        tb: TracebackType | None,
    ) -> None:
        self.pop(exc_value)
```

我们来总结下



#### 1、第一实现多线程、协程数据隔离，我们可以使用的方式

- 有原生的from thread import get_ident，from greenlet import getcurrent as get_ident
- 原生模块：ContextVar
- 第三方模块：from werkzeug.local import Local

- flask中已经率先使用ContextVar来做数据隔离，放弃使用了LocalStock。

- flask之前为什么为什么放弃使用栈：

​	其实并不是非要用栈这种数据格式不可，只要我们可以实现多个请求过来实现数据隔离就可以了，重点不是非要使用栈来做这种数据格式，重点是要实现数据隔离，而ContextVar也是实现数据隔离这个需求。



#### 2、那之前为什么要使用栈呢？

Flask 在多应用的情况下，依旧可以通过 request.path 获得当前应用的信息，实现这个效果的前提就是，Flask 知道当前请求对应的上下文。栈结构很好的实现了这个前提，每个请求，其相关的上下文就在栈顶，直接将栈顶上下文出栈就可以获得当前请求对应上下文中的信息了。

这是因为 Flask 的上下文中保存的数据都是存放在栈里并且会动态变化的，通过 LocalProxy 可以动态的访问相应的对象，从而避免造成数据访问异常。



#### 3、现在为什么不使用栈了？

因为我们使用ContextVar会更加智能的知道当前的请求，以及当前的数据，ContextVar中的set和get方法，同样可以实现动态的访问相应的对象，从而避免造成数据访问异常。





