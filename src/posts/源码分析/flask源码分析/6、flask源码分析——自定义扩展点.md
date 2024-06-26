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



#  flask源码分析——可自定义的16个扩展点



### 一、自定义扩展点概述

flask是一个极其自由的框架，其实这也是我喜欢这个框架的原因就是我们可以根据自己的需求来自定义框架，这个就像是有一种养成系的感觉，会觉得这个框架越来越好用。

那么既然我们需要更加灵活的使用这个框架，其中框架中一些提供出来的方法我们肯定需要了解，其实flask中的自定义扩展点我们可以分为两类，其中一类是flask的信号机制，还有一类就是一些请求处理函数，包括但是不局限于before_request、after_request等请求处理函数。接下来我们就进入源码来分析flask提供的自定义扩展点。



### 二、flask信号

#### 1、所有信号

```python
template_rendered = _signals.signal("template-rendered")#  模板渲染后执行
before_render_template = _signals.signal("before-render-template")#  模板渲染前执行
request_started = _signals.signal("request-started")# 请求到来前执行
request_finished = _signals.signal("request-finished")# 请求结束后执行
request_tearing_down = _signals.signal("request-tearing-down")# 请求执行完毕后自动执行(无论成功与否)
got_request_exception = _signals.signal("got-request-exception") # 请求执行出现异常时执行
appcontext_tearing_down = _signals.signal("appcontext-tearing-down")#)# 应用上下文执行完毕后自动执行(无论成功与否)
appcontext_pushed = _signals.signal("appcontext-pushed")# 应用上下文push时执行
appcontext_popped = _signals.signal("appcontext-popped")# 应用上下文pop时执行
message_flashed = _signals.signal("message-flashed")# 闪现——调用flask在其中添加数据时，自动触发
```

#### 2、信号的定义

这里是flask的全部信号，由于flask的信号实现比较简单，我们以一个例子来举例说明singal的实现原理

**eg：request-started**

- 首先我们需要定义一个信号,flask中是使用blinker进行定义的。

```python
from blinker import Namespace

# This namespace is only for signals provided by Flask itself.
_signals = Namespace()

request_started = _signals.signal("request-started")
```

- 其次在需要的时候定义一个入口，这个入口我们什么都没有操作，只是为了方便我们用户进行自定义操作

```python
class Flask:

    def full_dispatch_request(self) -> Response:
        self._got_first_request = True

        try:
            request_started.send(self, _async_wrapper=self.ensure_sync)
            rv = self.preprocess_request()
            if rv is None:
                rv = self.dispatch_request()
        except Exception as e:
            rv = self.handle_user_exception(e)
        return self.finalize_request(rv)
```

其他的信号定义也都是这样这里就不一一展开了。

#### 3、信号的使用

```python
from flask import Flask, render_template, g
from flask import signals

app = Flask(__name__)


@signals.request_started.connect
def signal_before_render_template(*args, **kwargs):
    print('signal_before_render_template')


@app.before_request
def before_func():
    print('before_func')


@app.route('/index/')
def index():
    return {'name': 'blue'}


if __name__ == '__main__':
    app.run()

```

发送请求结果

```
127.0.0.1 - - [04/Mar/2024 23:09:28] "GET /index/ HTTP/1.1" 200 -
signal_before_render_template
before_func
```

我们可以看到信号中的request_started是早于before_request这个请求处理函数的，这个其实我们也是可以从源码中发现

```python
class Flask:

    def full_dispatch_request(self) -> Response:
        self._got_first_request = True

        try:
            # 这里是信号的处理
            request_started.send(self, _async_wrapper=self.ensure_sync)
            rv = self.preprocess_request()# before_request_func是在这里进行的
            if rv is None:
                rv = self.dispatch_request()
        except Exception as e:
            rv = self.handle_user_exception(e)
        return self.finalize_request(rv)
```

#### 4、信号的总结

##### request_started

- request_started是一个信号，在每个请求到来之前执行。
  可以通过连接到这个信号来执行一些初始化操作或记录日志。

##### request_finished

- request_finished是一个信号，在每个请求结束后执行。
  可以通过连接到这个信号来进行一些清理操作或处理请求完成后的逻辑。

##### before_render_template

- before_render_template是一个信号，在模板渲染之前执行。
  可以通过连接到这个信号来修改要渲染的模板或添加一些数据。

##### template_rendered

- template_rendered是一个信号，在模板渲染之后执行。
  可以通过连接到这个信号来进行一些后处理操作。

##### got_request_exception

- got_request_exception是一个信号，在请求执行过程中出现异常时执行。
  可以通过连接到这个信号来处理请求异常并记录错误信息。

##### request_tearing_down

- request_tearing_down是一个信号，会在请求执行完毕后自动执行，无论请求成功与否。
  可以通过连接到这个信号来进行一些收尾工作或资源释放操作。

##### appcontext_tearing_down

- appcontext_tearing_down是一个信号，会在应用上下文执行完毕后自动执行，无论成功与否。
  可以通过连接到这个信号来进行一些应用上下文的收尾工作或资源释放操作。

##### appcontext_pushed

- appcontext_pushed是一个信号，在应用上下文被push时执行。
  可以通过连接到这个信号来执行一些与应用上下文相关的操作。

##### appcontext_popped

- appcontext_popped是一个信号，在应用上下文被pop时执行。
  可以通过连接到这个信号来执行一些与应用上下文相关的清理操作。

##### message_flashed

- message_flashed是一个信号，在调用Flask中的消息闪现(flash)方法时自动触发。
  可以通过连接到这个信号来做一些闪现消息的处理逻辑。

  

### 三、flask请求处理函数

flask中其他的处理函数

- url_value_processor：处理url

- before_reuqest：请求开始
- after_request：请求结束
- context_processor：注册模板上下文处理程序函数。这些函数在返回模板前调用。
- teardown_request：在请求上下文时调用pop时执行的。
- url_defaults：所有视图函数的URL默认回调函数应用程序。

其实这些方法都是比较常见的了，使用也是比较简单了。那么我也简单举几个例子来说明如何使用。

**before_request**

```python
from flask import Flask,render_template,g
from flask import signals
app = Flask(__name__)

@app.before_request
def before_request_func():
    g.xx = 123
    print('before_request_func')

@app.route('/index/')
def index():
    print('index')
    return render_template('index.html')

@app.route('/order')
def order():
    print('order')
    return render_template('order.html')

if __name__ == '__main__':
    app.run()
```



**after_request**

```python
from flask import Flask,render_template,g
from flask import signals
app = Flask(__name__)

@app.after_request
def after_request_func(response):
    print('after_request_func')
    return response

@app.route('/index/')
def index():
    return render_template('index.html')

@app.route('/order')
def order():
    print('order')
    return render_template('order.html')

if __name__ == '__main__':
    app.run()
```



**url_value_preprocessor**需要传入endpoint

```python
from flask import Flask, render_template, g
from flask import signals

app = Flask(__name__)


@app.url_value_preprocessor
def url_value_preprocessor_func(endpoint, args):
    # 这里我们需要传入endpoint
    print('url_value_preprocessor_func', endpoint)# url_value_preprocessor_func index

@app.route('/index/')
def index():
    print('index')
    return {'name': 'blue'}


if __name__ == '__main__':
    app.run()

```



### 四、总结

目前flask中一个有13个自定义扩展点，如有遗漏敬请指正。分别为10个信号，6个请求处理函数

#### 1、flask信号

##### request_started

- request_started是一个信号，在每个请求到来之前执行。
  可以通过连接到这个信号来执行一些初始化操作或记录日志。

##### request_finished

- request_finished是一个信号，在每个请求结束后执行。
  可以通过连接到这个信号来进行一些清理操作或处理请求完成后的逻辑。

##### before_render_template

- before_render_template是一个信号，在模板渲染之前执行。
  可以通过连接到这个信号来修改要渲染的模板或添加一些数据。

##### template_rendered

- template_rendered是一个信号，在模板渲染之后执行。
  可以通过连接到这个信号来进行一些后处理操作。

##### got_request_exception

- got_request_exception是一个信号，在请求执行过程中出现异常时执行。
  可以通过连接到这个信号来处理请求异常并记录错误信息。

##### request_tearing_down

- request_tearing_down是一个信号，会在请求执行完毕后自动执行，无论请求成功与否。
  可以通过连接到这个信号来进行一些收尾工作或资源释放操作。

##### appcontext_tearing_down

- appcontext_tearing_down是一个信号，会在应用上下文执行完毕后自动执行，无论成功与否。
  可以通过连接到这个信号来进行一些应用上下文的收尾工作或资源释放操作。

##### appcontext_pushed

- appcontext_pushed是一个信号，在应用上下文被push时执行。
  可以通过连接到这个信号来执行一些与应用上下文相关的操作。

##### appcontext_popped

- appcontext_popped是一个信号，在应用上下文被pop时执行。
  可以通过连接到这个信号来执行一些与应用上下文相关的清理操作。

##### message_flashed

- message_flashed是一个信号，在调用Flask中的消息闪现(flash)方法时自动触发。
  可以通过连接到这个信号来做一些闪现消息的处理逻辑。



#### 2、请求处理函数

- **url_value_processor**：处理url

- **before_reuqest**：请求开始
- **after_request**：请求结束
- **context_processor**：注册模板上下文处理程序函数。这些函数在返回模板前调用。
- **teardown_request**：在请求上下文时调用pop时执行的。
- **url_defaults**：所有视图函数的URL默认回调函数应用程序。