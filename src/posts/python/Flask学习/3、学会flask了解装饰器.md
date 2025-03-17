---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - 装饰器
---

# 3、flask装饰器



为什么flask关系到装饰器

```python
@api.route('', methods=["GET"])
@auth.login_required
def get_user():
    uid = g.user.uid
    user = User.query.filter_by(id=uid).first_or_404_for_api()
    return jsonify(user)
```



定义：装饰器可以在不改变原有代码的基础上，引用源代码的变量和返回值从而可以改变源代码的行为。



### 一、简单示例

```python
import time


def time_use(func):
    def wrapper():
        start = time.time()
        res = func()
        end = time.time()
        print(f'执行用时::{end - start}')
        return res

    return wrapper


@time_use
def test():
    for i in range(100000000):
        pass

test()
```



### 二、带有参数

```python
import time
from functools import wraps


def retry(count=3, sleep=1):
    def wrapper(func):
        @wraps
        def inner(*args, **kwargs):
            res = None
            for i in range(count):
                try:
                    res = func(*args, **kwargs)
                except Exception as e:
                    print(f'函数执行出错::{e}')
                    time.sleep(sleep)
                    continue
            return res

        return inner

    return wrapper
```



### 三、基于类的装饰器

```python
import time


class Decorator(object):
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        t1 = time.time()
        res = self.func(*args, **kwargs)
        t2 = time.time()
        print("函数执行时长:"+ str(t2 - t1))


@Decorator
def test():
    time.sleep(1.5)

test()
```



### 四、使用装饰器实现缓存

#### 1. 缓存算法

经典的缓存算法有3个：

1. `FIFO`算法
2. `LFU`算法
3. `LRU`算法

#### 1.1 FIFO算法

FIFO（First in First out），先进先出， 该算法的核心原则是： 如果一个数据最先进入缓存中，则应该最早淘汰掉，当缓存容量满了以后，应当将最早被缓存的数据淘汰掉。FIFO算法是一种比较简单的算法，使用队列就可以轻易的实现。

#### 1.2 `LFU`算法

`LFU`（Least Frequently Used）最近最少使用算法， 这个算法的核心在于：**如果一个数据在最近一段时间内使用次数很少，那么在将来一段时间内被使用的可能性也很小**。

### 1.3` LRU`算法

`LRU` (Least Recently Used)， 最近最久未使用算法，该算法的核心原则是：**如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小**

`LFU`算法和`LRU`算法乍看起来是一个意思，但其实很不同，`LRU`的淘汰规则是基于访问时间，而`LFU`是基于访问次数的。

一个缓存的数据，一段时间内被命中很多次，这个数据在`LFU`算法里会被保留，但在`LRU`算法里则可能被淘汰，虽然这段时间内，比如2分钟内被命中了很多次，可是，这些事情都发生在1分50秒之前的10秒钟里，自那以后就再也没有被命中，`LRU`算法则可能会将其淘汰。

```python
from inspect import signature


def fifo_cache(maxsize=128):
    cache = dict()
    cache_list = list()

    def wrapper(func):
        sig = signature(func)

        def inner(*args, **kwargs):
            bound_values = sig.bind(*args, **kwargs)
            key = bound_values.__str__()
            value = cache.get(key)
            if value:
                print('命中缓存')
                return value
            if len(cache_list) >= maxsize:
                old_key = cache_list.pop()
                if old_key in cache: cache.pop(old_key)

            result = func(*args, **kwargs)
            cache_list.append(key)
            cache.setdefault(key, result)
            return result

        return inner

    return wrapper


@fifo_cache()
def test1(x, y):
    return x + y


@fifo_cache()
def test2(x, y, z=20):
    return x + y + z


@fifo_cache()
def test3(*args, **kwargs):
    return 5


print(test1(19, 20))

print(test2(19, 20, 20))
print(test2(19, 20))  # 不会命中缓存

print(test3(4, 2, x=6, y=9))
print(test1(19, 20))
```



