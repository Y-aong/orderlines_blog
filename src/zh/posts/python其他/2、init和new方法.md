---
icon: pen-to-square
date: 2023-07-15
category:
  - python
tag:
  - __new__
  - __init__
---

# `__new__`和`__init__`方法

###  __new__ 方法是什么？

__new__方法接受的参数虽然也是和__init__一样，但__init__是在类实例创建之后调用，而 __new__方法正是创建这个类实例的方法。

### __init__ 方法是什么？

使用Python写过面向对象的代码的同学，可能对 __init__ 方法已经非常熟悉了，__init__ 方法通常用在初始化一个类实例的时候。

### __new__ 的作用

依照Python官方文档的说法，__new__方法主要是当你继承一些不可变的class时(比如int, str, tuple)， 提供给你一个自定义这些类的实例化过程的途径。 首先我们来看一下第一个功能，具体我们可以用int来作为一个例子： 假如我们需要一个永远都是正数的整数类型，通过集成int，我们可能会写出这样的代码：

工厂模式的实现

```python
class Fruit(object):
    def __init__(self):
        pass

    def print_color(self):
        pass

class Apple(Fruit):
    def __init__(self):
        pass

    def print_color(self):
        print("apple is in red")

class Orange(Fruit):
    def __init__(self):
        pass

    def print_color(self):
        print("orange is in orange")

class FruitFactory(object):
    fruits = {"apple": Apple, "orange": Orange}

    def __new__(cls, name):
        if name in cls.fruits.keys():
            return cls.fruits[name]()
        else:
            return Fruit()

fruit1 = FruitFactory("apple")
fruit2 = FruitFactory("orange")
fruit1.print_color()    
fruit2.print_color()    
```

### 三、__init__与__new__的区别

从上述过程中我们可以发现，这两个方法区别在于：

- 作用区别，init实例级别，new类级别

```
1.__init__ 通常用于初始化一个新实例，控制这个初始化的过程，比如添加一些属性， 做一些额外的操作，发生在类实例被创建完以后。它是实例级别的方法。
2.__new__ 通常用于控制生成一个类实例的过程。它是类级别的方法
```

- 执行顺序，先new 后`init`

  



