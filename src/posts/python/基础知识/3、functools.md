---
icon: pen-to-square
date: 2023-07-15
category:
 - python 
tag:
 - functools
---

# 3、内置模块functools



### 一、内置lru缓存

LRU是一种常用的缓存算法，即最近最少使用，如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小， LRU算法选择将最近最少使用的数据淘汰，保留那些经常被命中的数据。****

```python
import time
from functools import lru_cache


@lru_cache()        # 测试无缓存时将本行注释掉
def fib_memoization(number: int) -> int:
    if number == 0: return 0
    if number == 1: return 1

    return fib_memoization(number-1) + fib_memoization(number-2)

start = time.time()
res = fib_memoization(33)
print(res)
print(f'耗时: {time.time() - start}s')
```

#### functools.lru_cache参数说明

lru_cache装饰器定义如下

```python
def lru_cache(maxsize=128, typed=False):
    pass
```

只有连个参数，第一个参数规定缓存的数量，第二个参数如果设置为True，则严格检查被装饰函数的参数类型，默认为False

```python
from functools import lru_cache

@lru_cache(typed=False)
def add(x, y):
    print('add')
    return x + y


print(add(3, 4))
print(add(3, 4.0))
```



第二次调用add函数时参数是4.0， 如果你认为这种情况可以使用缓存命中上一次3+4的结果，就将typed设置为False，如果你严格要求只有函数的参数完全一致时才能命中，那么将typed设置为True



###  二、wraps函数



#### 自省信息丢失

函数被装饰以后，一些原本属于自己的自省信息会丢失，先来看装饰前的样子

```python
def test(sleep_time):
    """
    测试装饰器
    :param sleep_time:
    :return:
    """
    time.sleep(sleep_time)


print(test.__name__)
print(test.__doc__)
```

执行输出结果

```text
test

    测试装饰器
    :param sleep_time:
    :return:
```

test是函数的名字，__doc__是函数的注释说明

但在被普通的装饰器装饰以后，这些信息就会丢失

```python
import time

def cost(func):
    def warpper(*args, **kwargs):
        t1 = time.time()
        res = func(*args, **kwargs)
        t2 = time.time()
        print(func.__name__ + "执行耗时" +  str(t2-t1))
        return res
    return warpper

@cost
def test(sleep_time):
    """
    测试装饰器
    :param sleep_time:
    :return:
    """
    time.sleep(sleep_time)


print(test.__name__)
print(test.__doc__)
```

程序输出结果

```text
warpper
None
```

这是我们所不希望看到的

#### 修复自省信息

wraps可以防止被装饰的函数丢失自己的自省信息，只需要增加@wraps(func)即可

```python
import time
from functools import wraps


def cost(func):
    @wraps(func)
    def warpper(*args, **kwargs):
        t1 = time.time()
        res = func(*args, **kwargs)
        t2 = time.time()
        print(func.__name__ + "执行耗时" +  str(t2-t1))
        return res
    return warpper

@cost
def test(sleep_time):
    """
    测试装饰器
    :param sleep_time:
    :return:
    """
    time.sleep(sleep_time)


print(test.__name__)
print(test.__doc__)
```





### 三、偏函数partial

偏函数partial是functools 模块里提供的一个函数。和装饰器对比来理解，装饰器改变了一个函数的行为，而偏函数不能改变一个函数的行为。偏函数只能根据已有的函数生成一个新的函数，这个新的函数完成已有函数相同的功能，但是，这个新的函数的部分参数已被偏函数确定下来





#### 常规实现

为了便于理解，我们构造一个使用场景，假设我们的程序要在dest目录下新建一些文件夹，那么常见的实现功能代码如下

```python
import os
from os import mkdir


mkdir(os.path.join('./dest', 'dir1'))
mkdir(os.path.join('./dest', 'dir2'))
mkdir(os.path.join('./dest', 'dir3'))
```

功能很简单，代码很简洁，但是有个小小的不如意之处，每次都是在dest目录下新建文件夹，既然它这么固定，是不是可以不用传递dest参数呢？

#### 偏函数实现

```python
import os
from os import mkdir
from functools import partial


dest_join = partial(os.path.join, './dest')

mkdir(dest_join('dir1'))
mkdir(dest_join('dir2'))
mkdir(dest_join('dir3'))
```