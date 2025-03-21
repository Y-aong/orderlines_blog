---
icon: pen-to-square
date: 2023-07-11
category:
  - python
tag:
  - 变量作用域
---

# 1、变量作用域



### 一、定义
python变量的作用域取决于变量被赋值的位置，python中，只有当变量在模块，类，函数中定义的时候才会有作用域的概念。一共有四种作用域:




### 二、局部作用域

  在函数中创建的变量，是局部变量，当函数被执行时，会创建一个局部作用域，这些局部变量只能在这个作用域内使用，出了这个作用域就无法使用了

  ```python
  def test():
      value = 100
      print(value)
  
  print(value)
  ```



### 三、嵌套作用域

  ```python
  def test():
      value = 100
      def test_2():
          value2 = 99
          print(value2, value)
      return test_2
  
  a = test()
  a()
  ```

  如果一个函数的内部又定义了一个函数，那么这样就产生了嵌套作用域，其实嵌套作用域是一个相对概念。



### 四、全局作用域

在Python中，全局作用域指的是在整个程序范围内都可以访问的变量和函数的集合。全局作用域中的变量和函数可以在程序的任何地方被访问和修改，除非它们被限定在更小的作用域内（如局部作用域或嵌套作用域）。

  ```python
  value = 100
  
  def test():
      print(value)
  
  test()
  ```

**全局作用域与局部作用域**：

- 如果在局部作用域（如函数内部）定义了一个与全局作用域中同名的变量，那么在局部作用域中对这个变量的修改不会影响到全局作用域中的变量，除非使用`global`关键字。

**修改全局变量**：

- 在函数内部，如果你想修改全局变量，需要使用`global`关键字来声明这个变量是全局的。

  ```python
  x = 5
  
  def my_function():
      global x
      x = 10
  
  my_function()
  print(x)  # 输出: 10
  ```

**全局作用域与类**：

- 在类定义中，类变量属于全局作用域，因为它们是在模块级别定义的。
- 实例变量则属于局部作用域，因为它们是针对每个类的实例单独创建的。



### 五、内置作用域，系统内固定模块中定义的变量

在Python中，内置作用域指的是Python解释器自动提供的一组预定义的变量和函数，它们是Python语言的一部分，不需要导入任何模块即可直接使用。这些内置的变量和函数是Python语言的核心组成部分，它们包括：

1. **内置常量**：
   - `True` 和 `False`：布尔值。
   - `None`：表示空值或无值。

2. **内置类型**：
   - `int`、`float`、`str`、`list`、`tuple`、`dict`、`set`、`frozenset`、`bool`、`bytes`、`bytearray`、`complex` 等。

3. **内置函数**：
   - `len()`：返回对象（如列表、元组、字典等）的长度。
   - `range()`：返回一个可迭代的数字序列。
   - `min()`、`max()`：返回一组值中的最小值或最大值。
   - `type()`：返回对象的类型。
   - `isinstance()`：检查一个对象是否是一个已知的类型。
   - `print()`：打印输出。
   - `open()`：打开一个文件。
   - `help()`：提供关于对象的文档字符串。
   - `dir()`：返回对象的属性列表。
   - `eval()`：计算字符串表达式的值。
   - `exec()`：执行字符串中的Python代码。
   - `globals()`、`locals()`：返回当前全局和局部符号表的字典。

4. **内置异常**：
   - `Exception`：所有内置非系统退出异常的基类。
   - `TypeError`、`ValueError`、`IndexError`、`KeyError` 等。

5. **内置模块**：
   - `__main__`：如果Python脚本作为主程序运行，这个模块会包含脚本的代码。
   - `sys`：提供访问解释器的变量和函数。
   - `math`：提供数学运算函数。
   - `datetime`：提供日期和时间处理的类。
   - `json`：用于解析和生成JSON数据。
   - `os`：提供操作系统相关功能。
   - `re`：提供正则表达式匹配操作。
   - `random`：提供生成随机数的函数。

这些内置的变量和函数是Python语言的一部分，它们被存储在内置作用域中，可以直接访问，无需任何导入语句。这些内置功能为Python编程提供了极大的便利，使得开发者可以快速地进行各种操作，而不需要依赖外部库。