---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - 线程隔离
---
# 5、flask中的线程隔离



### 一、问题：flask中会接收多个请求，那他们不会搞混吗？

Flask内部，通过维护一个dict来实现线程隔离。伪代码如下 `request={thread_key1:Request1,thread_key2:Request2}` 其中thread_key是线程的唯一id号，Request就是每次请求的Request对象

Flask内部引入了一个werkzeug的库，这个库里有一个local模块，里面有一个Local对象，Flask内部线程隔离就是通过操作Local对象实现的。



### 二、Local对象

Local对象实际上就是对字典原理的一个封装

class Local(object):
    __slots__ = ('__storage__', '__ident_func__')

```python
def __init__(self):
    # 一个私有变量__storage__字典
    object.__setattr__(self, '__storage__', {})
    object.__setattr__(self, '__ident_func__', get_ident)

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
    # 取当前线程的线程ID号
    ident = self.__ident_func__()
    storage = self.__storage__
    # 操作字典
    try:
        storage[ident][name] = value
    except KeyError:
        # 把线程id号作为key保存了起来
        storage[ident] = {name: value}

def __delattr__(self, name):
    try:
        del self.__storage__[self.__ident_func__()][name]
    except KeyError:
        raise AttributeError(name)
```



### 三、使用线程隔离和不适用线程隔离的区别

定义一个对象，启动一个线程去修改这个对象，使用主线程打印这个对象

```python
import threading
import time
class A:
    b = 1

my_obj = A()
def worker():
    my_obj.b = 2

new_thread = threading.Thread(target=worker, name="new_thread")
new_thread.start()
time.sleep(1)
# 主线程

print(my_obj.b)
# 打印结果为2
# 因为my_obj是主线程和新线程共享的对象
```

将my_obj实例化改为使用Local线程隔离对象

```python

import threading
import time
from werkzeug.local import Local

class A:
    b = 1


my_obj = Local()
my_obj.b = 1


def worker():
    my_obj.b = 2
    print("in new thread b is: ", my_obj.b)


new_thread = threading.Thread(target=worker, name="new_thread")
new_thread.start()
time.sleep(1)

print("in main thread b is:", my_obj.b)
# 结果

in new thread b is:  2
in main thread b is: 1
```


由于my_obj是一个线程隔离的对象，所以我们在新线程里修改my_obj是不会影响主线程里my_obj中的值的。他们保持了两个线程之间的数据的独立

Local的高明在于，他不需要我们去关心底层Local字典内部的细节，我们之间去操作Local对象的相关属性，这个操作本就是线程隔离的，给我们带来了很大的方便



### 四、线程隔离的栈：LocalStack

![image.png](https://bineanju.gitee.io/blog/post/20160505flask05/1.jpg)

接下来来继续讲解之前这张图右下角的部分。 通过Flask的源码，我们可以了解到_app_ctx_stack和_request_ctx_stack实际上是指向了LocalStack()对象，也就是一个线程隔离的栈,下面来看下源码

globals.py

```python
# context locals
# 是一个LocalStack对象
_request_ctx_stack = LocalStack()
_app_ctx_stack = LocalStack()
current_app = LocalProxy(_find_app)
request = LocalProxy(partial(_lookup_req_object, 'request'))
session = LocalProxy(partial(_lookup_req_object, 'session'))
g = LocalProxy(partial(_lookup_app_object, 'g'))
```

LocalStack源码，依旧在werkzeug库 的local模块下

```python
class LocalStack(object):
    def __init__(self):
        # 内部维护了一个Local对象作为私有变量
        self._local = Local()

    def __release_local__(self):
        self._local.__release_local__()

    def _get__ident_func__(self):
        return self._local.__ident_func__

    def _set__ident_func__(self, value):
        object.__setattr__(self._local, '__ident_func__', value)
    __ident_func__ = property(_get__ident_func__, _set__ident_func__)
    del _get__ident_func__, _set__ident_func__

    def __call__(self):
        def _lookup():
            rv = self.top
            if rv is None:
                raise RuntimeError('object unbound')
            return rv
        return LocalProxy(_lookup)

    # 提供了push，pop方法，实际上就是在操作Local中的一个Stack
    def push(self, obj):
        """Pushes a new item to the stack"""
        rv = getattr(self._local, 'stack', None)
        if rv is None:
            self._local.stack = rv = []
        rv.append(obj)
        return rv

    def pop(self):
        """Removes the topmost item from the stack, will return the
        old value or `None` if the stack was already empty.
        """
        stack = getattr(self._local, 'stack', None)
        if stack is None:
            return None
        elif len(stack) == 1:
            release_local(self._local)
            return stack[-1]
        else:
            return stack.pop()

    @property
    def top(self):
        """The topmost item on the stack.  If the stack is empty,
        `None` is returned.
        """
        try:
            return self._local.stack[-1]
        except (AttributeError, IndexError):
            return None
```
Local,Local Stack,字典的关系 Local使用字典的方式实现了线程隔离 Local Stack封装了Local对象，将其作为自己的一个属性，实现了线程隔离的栈结构

3.LocalStack的基本用法
Local是使用·来直接操作字典中保存的对象。 LocalStack是使用它提供的一些push，pop的栈方法来操作对象

```python
from werkzeug.local import LocalStack
s = LocalStack()
s.push(1)
s.push(2)
# top是属性@property,所以不需要加括号调用；

# 栈结构先进后出，所以先输出2print(s.top)

# top只取栈顶元素，不会讲他从栈中移除，所以这次还是2print(s.top)

# pop()是方法，会取出并移除栈顶元素print(s.pop())print(s.top)

# 结果2221
```

