---
icon: pen-to-square
date: 2024-07-22
category:
  - python
  - 迭代器
tag:
  - 迭代器
star: true

---



# python中实现debug功能



### 一、debug功能



Debug，是程序开发人员必会的一项调试程序的技能。可以说如果你不会调试程序，你就没有办法从事编程工作。那么debug可以帮助我们做什么呢？

- 追踪代码的运行流程。
- 程序运行异常定位。

其实可以总结出来一点就是调测功能。我自己在开发一个工作流的框架，其中就需要用到debug功能来帮助实现流程的调测，其中特别针对于UI自动化的调测，这简直就是神器，因为UI自动化需要一步一步的运行，在点击下个元素的时候如果失败可能会造成失败重来的尴尬局面，所以debug对于调测就是神器。



### 二、迭代器和生成器



那么如何在python中实现debug的功能呢？其实看这个标题就是知道，使用生成器来实现debug功能。为了给下面的讲解提供铺垫我们先来说一下什么是生成器？生成器的一些基础知识吧？

#### 2.1、什么是迭代

迭代是一种重复获取数据集合中元素的过程，一次只获取一个元素，直到遍历完所有元素。在Python中，迭代通常用于遍历序列（如列表、元组）或任何可迭代对象。

```python
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(fruit)
```

Python的迭代机制依赖于两个特殊方法：`__iter__`和`__next__`。`__iter__`方法返回一个迭代器对象，而`__next__`方法则负责返回迭代器的下一个值。当没有更多的值可返回时，`__next__`会抛出`StopIteration`异常。这使得Python中的所有可迭代对象都可以被自然地用于`for`循环。

#### 2.2、迭代器的概念

迭代器是一个对象，它实现了迭代协议，即拥有`__iter__`和`__next__`方法。`__iter__`返回迭代器本身，而`__next__`返回集合的下一个元素。迭代器在没有更多元素时抛出`StopIteration`异常。

下面是一个简单的迭代器类示例：

```python
class SimpleIterator:
    def __init__(self, limit):
        self.limit = limit
        self.current = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.limit:
            raise StopIteration
        value = self.current
        self.current += 1
        return value

# 使用迭代器
it = SimpleIterator(5)
for i in it:
    print(i)
```

在Python中，我们通常使用`iter()`函数来获取一个对象的迭代器，然后用`next()`函数来获取下一个值。例如：

```python
my_list = [1, 2, 3]
my_iterator = iter(my_list)

print(next(my_iterator))  # 输出: 1
print(next(my_iterator))  # 输出: 2
print(next(my_iterator))  # 输出: 3
```

#### 2.3、生成器

生成器函数是一种特殊的迭代器，**使用`yield`语句暂停和恢复函数的执行**。

生成器函数通过`yield`语句生成值，而不是返回一个值。每次调用`next()`时，函数从上次暂停的地方继续执行，直到遇到下一个`yield`。

```python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 使用生成器
for num in fibonacci():
    if num > 100:
        break
    print(num)
```

#### 2.4、迭代器和生成器的好处

迭代器

- 最大的优点之一是其**惰性计算特性**。这意味着它不会一次性生成所有数据，而是在需要时按需生成。这对于**处理大数据集或无限序列**特别有用，因为它们只占用有限的内存。

生成器

- 生成器可以按需产生结果，而不是立即产生结果，节省内存。

- 生成器函数可以暂停执行并返回中间结果，非常适合在调试过程中查看中间状态。

  

### 三、实现debug功能



那么现在到达正题了就是如何实现debug功能。请注意这么一句话就是生成器函数**可以暂停执行并返回中间结果**，非常适合在调试过程中查看中间状态。

接下来我们使用个例子来说明如何使用生成器函数实现debug

```python
import random


def task1(a, b):
    yield a * b


def task2(a, b):
    yield a + b


for func in [task1, task2]:
    x = random.randint(1, 10)
    y = random.randint(10, 20)
    generator = func(x, y)
    print(f'{func.__name__}参数a::{x}, b::{y}')
    sign = input()
    if sign == 'start':
        result = generator.send(None)
        print(f'函数{func.__name__}运行结果')
    else:
        break
```

运行结果

```shell
task1参数a::6, b::16
start
函数task1运行结果
task2参数a::3, b::13
start
函数task2运行结果
```

相信我写出来这个例子大家会觉得特别简单，就这！！！

实际上这个功能就是比较简单，就是要看我们能不能想到使用生成器函数来做了。关于这个生成器函数中间有使用到send方法。

Python的生成器支持send方法，这可以让**生成器变为双向通道**。send方法可以把参数发给生成器，让它成为上一条yield表达式的求值结果，并将生成器推进到下一条yield表达式，然后把yield右边的值返回给send方法的调用者。

但是这种debug是存在缺陷的，正常我们使用idea的编辑器是可以实现上一步，或者下一步的，但是这种debug,不可以实现上一步的功能，只可以一路向下走。这里是因为迭代器本身是不可逆的。所以我们使用的生成器函数也是不可逆的。



### 四、进阶话题：生成器和协程



协程和生成器都可以通过**yield语句来暂停执行并保存当前状态**，但协**程可以通过await关键字暂停执行**，等待其他协程完成，而生成器主要用于迭代器编程。

而且除了基础的生成器，Python还支持带状态的生成器、协程和异步生成器，这些都极大地扩展了迭代器的使用范围。例如，使用`asyncio`库进行异步操作：

```python
import asyncio

async def async_generator():
    for i in range(5):
        await asyncio.sleep(1)
        yield i

async def main():
    async for i in async_generator():
        print(f"Generated: {i}")

# 运行异步主函数
asyncio.run(main())
```

