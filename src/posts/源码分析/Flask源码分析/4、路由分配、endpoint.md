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



在 Flask 中，`endpoint` 是实现请求分发的核心机制之一，它通过将 URL 路由与视图函数解耦，确保在复杂场景下（如多个相同函数名或蓝图冲突）能够准确匹配请求到对应的视图函数。以下是其具体实现原理和步骤：

Flask 的请求分发过程分为 **路由注册** 和 **请求处理** 两个阶段，`endpoint` 在其中起到桥梁作用：



#### **1、路由注册阶段**

当使用 `@app.route` 或 `add_url_rule()` 注册路由时：
- **URL 与 endpoint 的映射**：通过 `Rule` 对象将 URL 路径（如 `/user`）映射到一个 `endpoint`（默认为视图函数名）。
- **视图函数的注册**：将 `endpoint` 作为键，视图函数作为值，存入 `app.view_functions` 字典。



#### **2、请求处理阶段**

当请求到达时：
1. **URL 匹配**：Flask 的 `url_map`（存储所有路由规则的 `Map` 对象）根据请求的 URL 路径找到对应的 `endpoint`。
2. **视图函数查找**：通过 `endpoint` 在 `app.view_functions` 中找到对应的视图函数。
3. **执行视图函数**：调用该视图函数处理请求并返回响应。



#### **3、 `url_map`：URL 到 endpoint 的映射**
- 类型：`werkzeug.routing.Map` 对象。
- **作用**：存储所有路由规则（`Rule` 对象），每个规则包含 URL 路径、HTTP 方法、对应的 `endpoint`。
- **示例**：
  ```python
  @app.route('/user/<name>', endpoint='user_profile')
  def user_profile(name):
      return f'User {name}'
  ```
  此时 `url_map` 中会记录：
  ```
  Rule('/user/<name>' -> endpoint='user_profile')
  ```



#### **4、`view_functions`：endpoint 到视图函数的映射**

- 类型：字典（`dict`）。
- **作用**：以 `endpoint` 为键，存储对应的视图函数对象。
- **示例**：
  ```python
  print(app.view_functions)  # 输出：{'user_profile': <function user_profile at 0x...>}
  ```



### **四、 具体实现步骤**



#### **步骤 1：注册路由**
通过 `@app.route` 或 `add_url_rule()` 注册路由时，显式或隐式指定 `endpoint`：
```python
# 隐式使用视图函数名作为 endpoint
@app.route('/home')
def index():
    return 'Home Page'

# 显式指定 endpoint
@app.route('/article', endpoint='blog_article')
def article():
    return 'Blog Article'

# 使用 add_url_rule()
app.add_url_rule('/contact', 'contact_us', contact_view)
```

#### **步骤 2：URL 匹配（由 Werkzeug 完成）**
当请求到达时，Flask 调用 `url_map.bind_to_environ(request.environ).match()`：
1. 根据请求的 URL 路径（如 `/article`）匹配到对应的 `Rule` 对象。
2. 从 `Rule` 对象中获取 `endpoint`（如 `blog_article`）。

#### **步骤 3：通过 endpoint 查找视图函数**
根据匹配到的 `endpoint`，从 `app.view_functions` 中找到对应的视图函数：
```python
view_func = app.view_functions[endpoint]  # 如 app.view_functions['blog_article']
response = view_func()  # 执行视图函数
```



### **五、 典型应用场景**



#### **场景 1：解决函数名冲突（蓝图场景）**
当多个蓝图定义相同路由时，必须通过 `endpoint` 区分：
```python
from flask import Blueprint

user_bp = Blueprint('user', __name__)
file_bp = Blueprint('file', __name__)

@user_bp.route('/article', endpoint='user_article')  # 显式指定 endpoint
def user_article():
    return 'User Article'

@file_bp.route('/article', endpoint='file_article')  # 显式指定 endpoint
def file_article():
    return 'File Article'

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(file_bp, url_prefix='/file')
```
此时：
- 访问 `/user/article` → 调用 `user_article`。
- 访问 `/file/article` → 调用 `file_article`。

#### **场景 2：动态生成 URL**
通过 `url_for(endpoint)` 生成 URL 时，`endpoint` 是关键：
```python
url_for('user_article')  # 返回 '/user/article'
url_for('file_article')  # 返回 '/file/article'
```

#### **场景 3：复用视图函数**
同一个视图函数可以通过不同 `endpoint` 和路由绑定：
```python
def common_view():
    return 'Common View'

app.add_url_rule('/a', 'endpoint_a', common_view)
app.add_url_rule('/b', 'endpoint_b', common_view)
```



### **六、代码示例**



#### **示例 1：基础用法**
```python
from flask import Flask
app = Flask(__name__)

# 隐式 endpoint（函数名 'index'）
@app.route('/')
def index():
    return 'Hello, World!'

# 显式 endpoint 'dashboard'
@app.route('/dashboard', endpoint='dashboard')
def dashboard_view():
    return 'Dashboard'

if __name__ == '__main__':
    print(app.url_map)          # 查看所有路由规则
    print(app.view_functions)   # 查看 endpoint 到视图的映射
    app.run()
```

#### **示例 2：蓝图中的 endpoint**
```python
from flask import Flask, Blueprint

app = Flask(__name__)
admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/login', endpoint='admin_login')
def admin_login():
    return 'Admin Login'

app.register_blueprint(admin_bp, url_prefix='/admin')

# 访问 /admin/login → 调用 admin_login()
```



### **七、 总结**



Flask 通过 `endpoint` 实现请求分发的核心逻辑如下：
1. **注册阶段**：将 URL 路径映射到 `endpoint`，并将 `endpoint` 映射到视图函数。
2. **请求阶段**：根据 URL 找到 `endpoint`，再通过 `endpoint` 找到视图函数。
3. **优势**：解耦 URL 和视图函数，支持复杂场景（如蓝图、函数名冲突）。

通过合理使用 `endpoint`，可以灵活管理路由，特别是在大型项目或多人协作的蓝图场景中，避免冲突并提升可维护性。