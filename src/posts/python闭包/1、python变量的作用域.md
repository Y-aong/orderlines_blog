---
icon: pen-to-square
date: 2023-07-11
category:
  - python
tag:
  - 变量作用域
---

# 变量作用域

### 定义
python变量的作用域取决于变量被赋值的位置，python中，只有当变量在模块，类，函数中定义的时候才会有作用域的概念。一共有四种作用域:


### 局部作用域

  在函数中创建的变量，是局部变量，当函数被执行时，会创建一个局部作用域，这些局部变量只能在这个作用域内使用，出了这个作用域就无法使用了

  ```python
  def test():
      value = 100
      print(value)
  
  print(value)
  ```

### 嵌套作用域

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

### 全局作用域

  ```python
  value = 100
  
  def test():
      print(value)
  
  test()
  ```

### 内置作用域，系统内固定模块中定义的变量