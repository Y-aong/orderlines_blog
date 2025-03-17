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



# 4、路由分配，Endpoint



### 一、路由

采用比较官方的话来介绍就是

网络原理中，路由指的是根据上一接口的数据包中的IP地址，查询路由表转发到另一个接口，它决定的是一个端到端的网络路径。

web里的话，路由概念也是类似的，根据URL来将请求分配到指定的一个‘端’，另外也可以这样用，在某一个节点设置个转发，将到达这里的每一个’包‘或者说URL重新定向到另一个端并且可以在这个过程中对这个包进行处理。



### 二、Endpoint

endpoint是flask中提出来的一个概念，我们先下结论就是**视图函数和url的中间值，我们可以利用endpoint找到url,也可以使用endpoint找到视图函数**。它是为了方便我们通过endpoint找到url,寻找视图函数的值。

```python
from flask import Flask

config = {'SECRET_KEY': "woaijmy"}

app = Flask(__name__)
app.config.from_object(config)

@app.route('/index')
def index():
    return '1231'


if __name__ == '__main__':
    print('url_map::', app.url_map)
    print('view_funcs::', app.view_functions)
    app.run()
# url_map:: Map([<Rule '/static/<filename>' (GET, HEAD, OPTIONS) -> static>, <Rule '/index' (GET, HEAD, OPTIONS) -> index>])
# view_funcs:: {'static': <function Flask.__init__.<locals>.<lambda> at 0x0000022>, 'index': <function index at 0x0000021>}

```

我们通过打印可以发现url_map中的有endpoint，view_funcs也有endpoint

通过源码可以发现

```python
@setupmethod
    def add_url_rule(
        self,
        rule: str,
        endpoint: str | None = None,
        view_func: ft.RouteCallable | None = None,
        provide_automatic_options: bool | None = None,
        **options: t.Any,
    ) -> None:
        if endpoint is None:
            endpoint = _endpoint_from_view_func(view_func)  # type: ignore
        options["endpoint"] = endpoint
        methods = options.pop("methods", None)
        if methods is None:
            methods = getattr(view_func, "methods", None) or ("GET",)
        if isinstance(methods, str):
            raise TypeError(
                "Allowed methods must be a list of strings, for"
                ' example: @app.route(..., methods=["POST"])'
            )
        methods = {item.upper() for item in methods}

        # Methods that should always be added
        required_methods = set(getattr(view_func, "required_methods", ()))
        if provide_automatic_options is None:
            provide_automatic_options = getattr(
                view_func, "provide_automatic_options", None
            )

        if provide_automatic_options is None:
            if "OPTIONS" not in methods:
                provide_automatic_options = True
                required_methods.add("OPTIONS")
            else:
                provide_automatic_options = False

        # Add the required methods now.
        methods |= required_methods

        rule_obj = self.url_rule_class(rule, methods=methods, **options)
        rule_obj.provide_automatic_options = provide_automatic_options  # type: ignore[attr-defined]

        self.url_map.add(rule_obj)
        if view_func is not None:
            old_func = self.view_functions.get(endpoint)
            if old_func is not None and old_func != view_func:
                raise AssertionError(
                    "View function mapping is overwriting an existing"
                    f" endpoint function: {endpoint}"
                )
            self.view_functions[endpoint] = view_func
```

```python
 def _endpoint_from_view_func(view_func: ft.RouteCallable) -> str:
    """Internal helper that returns the default endpoint for a given
    function.  This always is the function name.
    """
    assert view_func is not None, "expected view func if endpoint is not provided."
    return view_func.__name__

 if endpoint is None:
    endpoint = _endpoint_from_view_func(view_func)  # type: ignore
 options["endpoint"] = endpoint
 rule_obj = self.url_rule_class(rule, methods=methods, **options)
 self.url_map.add(rule_obj)
 self.view_functions[endpoint] = view_func
```

这里代码跳着截取的

可以发现endpoint如果为None就是视图函数的名称，url_map和view_functions中都是存住endpoint的，所以这里我们可以确定以上的说法是正确的。

**那么我们如何使用endpoint呢**

我们可以通过url_for函数可以使用endpoint来进行调用视图函数。

```python
    def url_for(
        self,
        /,
        endpoint: str,
        *,
        _anchor: str | None = None,
        _method: str | None = None,
        _scheme: str | None = None,
        _external: bool | None = None,
        **values: t.Any,
    ) -> str:
        req_ctx = _cv_request.get(None)

        if req_ctx is not None:
            url_adapter = req_ctx.url_adapter
            blueprint_name = req_ctx.request.blueprint

            # If the endpoint starts with "." and the request matches a
            # blueprint, the endpoint is relative to the blueprint.
            if endpoint[:1] == ".":
                if blueprint_name is not None:
                    endpoint = f"{blueprint_name}{endpoint}"
                else:
                    endpoint = endpoint[1:]

            if _external is None:
                _external = _scheme is not None
        else:
            app_ctx = _cv_app.get(None)
            if app_ctx is not None:
                url_adapter = app_ctx.url_adapter
            else:
                url_adapter = self.create_url_adapter(None)

            if url_adapter is None:
                raise RuntimeError()
            if _external is None:
                _external = True
        if _scheme is not None and not _external:
            raise ValueError("When specifying '_scheme', '_external' must be True.")

        self.inject_url_defaults(endpoint, values)

        try:
            rv = url_adapter.build(  # type: ignore[union-attr]
                endpoint,
                values,
                method=_method,
                url_scheme=_scheme,
                force_external=_external,
            )
        except BuildError as error:
            values.update(
                _anchor=_anchor, _method=_method, _scheme=_scheme, _external=_external
            )
            return self.handle_url_build_error(error, endpoint, values)

        if _anchor is not None:
            _anchor = _url_quote(_anchor, safe="%!#$&'()*+,/:;=?@")
            rv = f"{rv}#{_anchor}"

        return rv
```

这里就是可以通过endpoint内部调用flask内部请求



### 三、flask如何利用endpoint实现请求分发