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

# 3、Flask上下文Contextvars





### 一. 为什么迁移到 `contextvars`？



Python 3.7 引入的 `contextvars` 模块提供了更灵活的上下文变量管理能力，支持 **异步编程** 和 **更细粒度的上下文绑定**。Flask 3.0 的迁移主要基于以下优势：
- **异步支持**：`contextvars` 天生支持异步/协程环境（如 `asyncio`），而 Werkzeug 的 `Local` 主要针对多线程。
- **轻量级**：标准库的 `contextvars` 性能更高，且无需依赖第三方库（如 Werkzeug）。
- **更清晰的上下文管理**：通过 `Token` 机制可更方便地管理上下文的嵌套和恢复。



### **二. Flask 3.0.2 上下文的核心变化**



#### **2.1 上下文对象的实现**
Flask 3.0 的上下文（App Context 和 Request Context）现在基于 `contextvars` 实现，而非 Werkzeug 的 `LocalStack`。关键改动如下：
- **`contextvars.ContextVar`**：每个上下文（如 `app_ctx` 和 `request_ctx`）通过 `ContextVar` 绑定到当前执行上下文。
- **`async`/`await` 支持**：原生支持异步请求处理，无需额外适配。

#### **2.2 核心代码对比**

#### **旧版（基于 Werkzeug 的 LocalStack）**
```python
# Flask 2.x 及之前版本
from werkzeug.local import LocalStack

_request_ctx_stack = LocalStack()  # 请求上下文栈
_app_ctx_stack = LocalStack()      # 应用上下文栈

class RequestContext:
    def push(self):
        _request_ctx_stack.push(self)
    
    def pop(self):
        _request_ctx_stack.pop()
```

#### **新版（基于 contextvars）**
```python
# Flask 3.0+ 的实现（简化版）
import contextvars

_request_ctx_var = contextvars.ContextVar("request_ctx")
_app_ctx_var = contextvars.ContextVar("app_ctx")

class RequestContext:
    def push(self):
        self._token = _request_ctx_var.set(self)
    
    def pop(self):
        _request_ctx_var.reset(self._token)
```



### **三. 上下文的生命周期与管理**



#### **3.1 应用上下文（App Context）**
- **创建**：通过 `app.app_context()` 或请求处理时自动创建。
- **绑定**：使用 `contextvars.ContextVar.set()` 将 `AppContext` 绑定到当前执行上下文。
- **销毁**：通过 `ContextVar.reset(token)` 恢复上下文状态。

#### **示例代码**
```python
from flask import Flask, current_app

app = Flask(__name__)

@app.route('/')
def index():
    with app.app_context():
        print(current_app.name)  # 访问应用配置
        # 上下文随 with 作用域自动销毁
```



#### **3.2 请求上下文（Request Context）**

- **创建**：通过 `app.request_context(environ)` 在 WSGI 处理器中创建。
- **绑定**：将 `RequestContext` 绑定到当前线程/协程的 `contextvars`。
- **异步支持**：在异步视图中，`contextvars` 可自动传递上下文。

#### **异步示例**
```python
@app.route('/async')
async def async_view():
    # 异步请求处理
    data = await some_async_operation()
    return data
```



### **四. `contextvars` 的核心机制**



#### **4.1 ContextVar 的基本用法**
```python
import contextvars

# 定义一个上下文变量
my_var = contextvars.ContextVar("my_var")

# 设置值并获取 Token
token = my_var.set("value1")
print(my_var.get())  # 输出 "value1"

# 恢复原始值
my_var.reset(token)
print(my_var.get())  # 输出原始值（默认 None 或自定义默认值）
```



#### **4.2 Flask 如何使用 ContextVar**

Flask 内部通过 `ContextVar` 管理核心对象：
- **`current_app`**：通过 `app_ctx_var.get()` 获取当前应用实例。
- **`request`**：通过 `request_ctx_var.get()` 获取当前请求对象。





### 五. 源码关键路径（Flask 3.0+）



#### **6.1 请求处理流程**
```python
def wsgi_app(self, environ):
    # 创建请求上下文
    request_ctx = self.request_context(environ)
    try:
        request_ctx.push()  # 绑定到 contextvars
        response = self.dispatch_request()
    finally:
        request_ctx.pop()   # 恢复上下文
    return response
```

#### **6.2 AppContext 的 push/pop 实现**
```python
class AppContext:
    def push(self):
        self._token = _app_ctx_var.set(self)
    
    def pop(self):
        _app_ctx_var.reset(self._token)
```



### **六. 优势与最佳实践**



#### **6.1 主要优势**
- **异步友好**：原生支持 `async`/`await`，无需额外适配。
- **轻量级**：标准库的 `contextvars` 性能更高，内存占用更低。
- **上下文嵌套**：通过 `Token` 可灵活管理多层上下文。

#### **6.2 最佳实践**
1. **避免直接操作 `contextvars`**：使用 Flask 提供的 `current_app`、`request` 等代理。
2. **处理异步场景**：
   ```python
   async def some_async_func():
       # 异步函数中仍可访问 request
       user_id = request.args.get('user_id')
       await do_something(user_id)
   ```
3. **自定义上下文变量**：
   ```python
   my_ctx_var = contextvars.ContextVar("my_ctx_var")
   
   def set_my_var(value):
       token = my_ctx_var.set(value)
       try:
           # 执行逻辑
           pass
       finally:
           my_ctx_var.reset(token)
   ```



### **七. 总结**

Flask 3.0.2 的上下文机制通过 **`contextvars`** 实现了以下改进：
- **统一了同步/异步环境**：无需为异步场景单独适配。
- **更清晰的上下文管理**：通过 `Token` 精确控制上下文状态。
- **更高效的性能**：基于标准库的实现减少了依赖开销。

