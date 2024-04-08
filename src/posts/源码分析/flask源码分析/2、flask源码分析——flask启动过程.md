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



# flask源码分析——flask的启动过程



### 一、实例化对象的过程

我们需要首先明白一个对象实例化会做那些事情

```python
def cls_instance():
    print('我是类属性')
    return 1


def init_instance():
    print('我是实例属性')
    return 2


class Demo:
    instance = cls_instance()

    def __init__(self):
        self.ini = init_instance()

    def __call__(self, *args, **kwargs):
        print('我是call方法')


app = Demo()
# 我是类属性
# 我是实例属性
```

我们可以看出来一个类进行初始化需要先执行类属性，接着执行实例属性，当请求过来的时候会执行`__call__`方法

那么Flask中的call方法是什么时候执行的呢？

我们可以先改造一下flask

```python
    def __call__(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> cabc.Iterable[bytes]:
        """The WSGI server calls the Flask application object as the
        WSGI application. This calls :meth:`wsgi_app`, which can be
        wrapped to apply middleware.
        """
        print('call')
        return self.wsgi_app(environ, start_response)
```



当我们发送请求的时候会打印call,因此我们在分析flask的启动过程只需要分析以下代码就可以了，就是 Flask(__name__),路由添加，和app.run这三部分就可以了

```python
from flask import Flask

app = Flask(__name__)


@app.route('/index')
def index():
    return '1231'


if __name__ == '__main__':
    app.run()

```



### 二、flask实例化过程

#### Flask类的构造

**Scaffold**

```python
class Scaffold:
    name: str
    _static_folder: str | None = None
    _static_url_path: str | None = None

    def __init__(
        self,
        import_name: str,
        static_folder: str | os.PathLike[str] | None = None,
        static_url_path: str | None = None,
        template_folder: str | os.PathLike[str] | None = None,
        root_path: str | None = None,
    ):
        self.import_name = import_name
        self.static_folder = static_folder  # type: ignore
        self.static_url_path = static_url_path
        self.template_folder = template_folder
        if root_path is None:
            root_path = get_root_path(self.import_name)
        self.root_path = root_path
        self.view_functions= {}
        self.error_handler_spec = defaultdict(lambda: defaultdict(dict))
        self.before_request_func = defaultdict(list)
        self.after_request_funcs = defaultdict(list)
        self.teardown_request_funcs = defaultdict(list)
        self.template_context_processors= defaultdict(list, {None: [_default_template_ctx_processor]})
        self.url_value_preprocessors= defaultdict(list)
        self.url_default_functions = defaultdict(list)
```

**APP**

```python
class App(Scaffold):
    aborter_class = Aborter
    jinja_environment = Environment
    app_ctx_globals_class = _AppCtxGlobals
    config_class = Config
    secret_key = ConfigAttribute[t.Union[str, bytes, None]]("SECRET_KEY")
    url_rule_class = Rule
    url_map_class = Map
    test_client_class: type[FlaskClient] | None = None
    test_cli_runner_class: type[FlaskCliRunner] | None = None
    default_config: dict[str, t.Any]
    response_class: type[Response]

    def __init__(
        self,
        import_name: str,
        static_url_path: str | None = None,
        static_folder: str | os.PathLike[str] | None = "static",
        static_host: str | None = None,
        host_matching: bool = False,
        subdomain_matching: bool = False,
        template_folder: str | os.PathLike[str] | None = "templates",
        instance_path: str | None = None,
        instance_relative_config: bool = False,
        root_path: str | None = None,
    ):
        super().__init__(
            import_name=import_name,
            static_folder=static_folder,
            static_url_path=static_url_path,
            template_folder=template_folder,
            root_path=root_path,
        )
        self.instance_path = instance_path
        self.config = self.make_config(instance_relative_config)
        self.aborter = self.make_aborter()
        self.json: JSONProvider = self.json_provider_class(self)
        self.url_build_error_handlers = []
        self.teardown_appcontext_funcs: list[ft.TeardownCallable] = []
        self.shell_context_processors: list[ft.ShellContextProcessorCallable] = []
        self.blueprints: dict[str, Blueprint] = {}
        self.extensions: dict[str, t.Any] = {}
        self.url_map = self.url_map_class(host_matching=host_matching)
        self.subdomain_matching = subdomain_matching
        self._got_first_request = False
        self.cli.name = self.name
```

**Flask**

```python
class Flask(App):
    app_ctx_globals_class = _AppCtxGlobals
    config_class = Config
            self.url_map = self.url_map_class(host_matching=host_matching)

    url_map_class = Map
    default_config ={}
    request_class: type[Request] = Request
    response_class: type[Response] = Response
    session_interface: SessionInterface = SecureCookieSessionInterface()

    def __init__(
        self,
        import_name: str,
        static_url_path: str | None = None,
        static_folder: str | os.PathLike[str] | None = "static",
        static_host: str | None = None,
        host_matching: bool = False,
        subdomain_matching: bool = False,
        template_folder: str | os.PathLike[str] | None = "templates",
        instance_path: str | None = None,
        instance_relative_config: bool = False,
        root_path: str | None = None,
    ):
        super().__init__(
            import_name=import_name,
            static_url_path=static_url_path,
            static_folder=static_folder,
            static_host=static_host,
            host_matching=host_matching,
            subdomain_matching=subdomain_matching,
            template_folder=template_folder,
            instance_path=instance_path,
            instance_relative_config=instance_relative_config,
            root_path=root_path,
        )
        if self.has_static_folder:
            self_ref = weakref.ref(self)
            self.add_url_rule(
                f"{self.static_url_path}/<path:filename>",
                endpoint="static",
                host=static_host,
                view_func=lambda **kw: self_ref().send_static_file(**kw),  # type: ignore # noqa: B950
            )
```

当我们排除掉一些模版静态文件之后我们可以得到以下部分

```python
class Flask:
	default_config ={}
    url_rule_class = Rule
    url_map_class = Map
    request_class: type[Request] = Request
    response_class: type[Response] = Response
    session_interface: SessionInterface = SecureCookieSessionInterface()
    
	def __init__():
        self.view_functions= {}
        self.error_handler_spec = defaultdict(lambda: defaultdict(dict))
        self.before_request_func = defaultdict(list)
        self.after_request_funcs = defaultdict(list)
        self.teardown_request_funcs = defaultdict(list)
        self.template_context_processors= defaultdict(list, {None: [_default_template_ctx_processor]})
        self.url_value_preprocessors= defaultdict(list)
        self.url_default_functions = defaultdict(list)
        self.url_map = self.url_map_class(host_matching=host_matching)
        if self.has_static_folder:
            self_ref = weakref.ref(self)
            self.add_url_rule(
                f"{self.static_url_path}/<path:filename>",
                endpoint="static",
                host=static_host,
                view_func=lambda **kw: self_ref().send_static_file(**kw),  # type: ignore # noqa: B950
            )
        
```





接下来我们一般的flask程序如下

```python
from flask import Flask

config = {'SECRET_KEY': "woaijmy"}
# 实例化Flask
app = Flask(__name__)
# 加载配置参数
app.config.from_object(config)

# 添加前置处理参数
@app.before_request
def before():
    print('before')

# 添加后置处理参数
@app.after_request
def after():
    print('after')

# 定义视图函数
@app.route('/index')
def index():
    return '1231'


if __name__ == '__main__':
    print('url_map::', app.url_map)
    print('before_request::', app.before_request_funcs)
    print('after_request::', app.after_request_funcs)
    # 运行
    app.run()

```

#### 01、初始化

我们可以知道flask初始化（Flask(`__name__`)）基本实现了以下这些功能

- 加载flask默认配置
- 声明response、request、session对象
- 定义函数列表
  - error_handler_spec：异常处理函数
  - before_request_func：请求前处理函数
  - after_request_funcs：请求后处理函数
  - teardown_request_funcs：请求关闭处理函数
  - view_functions：视图处理函数
  - url_default_functions：url默认处理函数
- 定义url_map，添加静态文件路由

以上我们已经知道了初始化要做的一些事情，接下来配置信息



#### 02、配置信息

```python
class Config(dict):
    def from_object(self, obj: object | str) -> None:
        if isinstance(obj, str):
            obj = import_string(obj)
        for key in dir(obj):
            if key.isupper():
                self[key] = getattr(obj, key)
```

这个就是比较简单，直接对于config对象进行添加属性即可



#### 03、定义处理函数

```python
# 添加前置处理参数
@app.before_request
def before():
    print('before')

# 添加后置处理参数
@app.after_request
def after():
    print('after')
```

这个配置请求处理函数它的实现逻辑呢，实际就是将前置处理函数放到`after_request_funcs`，其他以`func`结尾的同样也是这样的逻辑

```python
    @setupmethod
    def before_request(self, f: T_before_request) -> T_before_request:
        self.before_request_funcs.setdefault(None, []).append(f)
        return f
```

#### 04、定义视图函数

```python
	@setupmethod
    def route(self, rule: str, **options: t.Any) -> t.Callable[[T_route], T_route]:
        def decorator(f: T_route) -> T_route:
            endpoint = options.pop("endpoint", None)
            self.add_url_rule(rule, endpoint, f, **options)
            return f

        return decorator
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
        required_methods = set(getattr(view_func, "required_methods", ()))
        if provide_automatic_options is None:
            provide_automatic_options = getattr(view_func, "provide_automatic_options", None )

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
            
     @setupmethod
    def endpoint(self, endpoint: str) -> t.Callable[[F], F]:
        def decorator(f: F) -> F:
            self.view_functions[endpoint] = f
            return f

        return decorator
```



这里是稍微复杂点，我们可以理出来以下事情

- 获取endpoint

- 获取methods

- 创建rule_obj并放入到url_map

- 获取view_func，以endpoint为key，以view_func为值放入到view_functions

  所以这里就是定义视图函数，定义url_rule并放到url_map中，将视图函数放入到view_functions

  - url_map：<Rule '/index' (HEAD, GET, OPTIONS) -> index>, url,请求方法，endpoint的集合

  - view_funcs：'index': <function index at 0x000001B61CC30AF0>endpoint为key，视图函数为值的字典列表

**这里的endpiont就是视图函数和url的中间值，我们可以利用endpoint找到url,也可以使用endpoint找到视图函数**

#### 05、app.run

```python
 def run(
        self,
        host: str | None = None,
        port: int | None = None,
        debug: bool | None = None,
        load_dotenv: bool = True,
        **options: t.Any,
    ) -> None:
        if os.environ.get("FLASK_RUN_FROM_CLI") == "true":
            if not is_running_from_reloader():
                click.secho('')
            return
        if get_load_dotenv(load_dotenv):
            cli.load_dotenv()
            if "FLASK_DEBUG" in os.environ:
                self.debug = get_debug_flag()
        if debug is not None:
            self.debug = bool(debug)
        server_name = self.config.get("SERVER_NAME")
        sn_host = sn_port = None
        if server_name:
            sn_host, _, sn_port = server_name.partition(":")
        if not host:
            if sn_host:
                host = sn_host
            else:
                host = "127.0.0.1"
        if port or port == 0:
            port = int(port)
        elif sn_port:
            port = int(sn_port)
        else:
            port = 5000
        options.setdefault("use_reloader", self.debug)
        options.setdefault("use_debugger", self.debug)
        options.setdefault("threaded", True)
        cli.show_server_banner(self.debug, self.name)
        from werkzeug.serving import run_simple
        try:
            run_simple(t.cast(str, host), port, self, **options)
        finally:
            self._got_first_request = False
```



这里我们其他的都可以进行忽略只要看以下这个部分就可以了

```python
from werkzeug.serving import run_simple

try:
    run_simple(t.cast(str, host), port, self, **options)
finally:
    self._got_first_request = False
```

这个代码表示我们可以利用werkzeug实现一个socket服务

同样我们可以自己利用werkzeug实现一个简单的web服务

```python
from werkzeug.serving import run_simple
from werkzeug.wrappers import Response


def func(environ, start_response):
    print('请求来了')
    response = Response('你好')
    return response(environ, start_response)


if __name__ == '__main__':
    run_simple('127.0.0.1', 5000, func)
```



### 三、总结

flask的启动过程大致可以分为以下四步

- 初始化Flask对象
- 创建resquest处理函数
- 定义视图函数并创建路由规则
- 利用werkzeug运行服务接受请求















