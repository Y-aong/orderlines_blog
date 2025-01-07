---
icon: pen-to-square
date: 2024-05-21
category:
  - python
tag:
  - 异常处理
---

# Python异常处理技巧



### 一、异常处理

关于异常处理是我们在开发中经常会遇到的，每个开发者都避免不了遇到异常处理，想要开发出来健壮的程序必须要做好异常处理。我也在几年的开发中也总结出来一些异常处理的技巧，在这里也分享一下。



### 二、基础捕获：try-except块



- ####  简单异常捕获

  当预期某段代码可能引发异常时，将其包裹在`try`块内 ，然后使用一个或多个`except`子句来捕获并处理这些异常。例如，处理文件读取错误：

  ```python
  try:
      with open('example.txt', 'r') as file:
          content = file.read()
  except FileNotFoundError:
      print("文件未找到 ，请检查路径是否正确。")
  ```

  

- #### 多异常处理

  有时 ，一段代码可能会抛出多种类型的异常 ，这时可以使用一个`except`块来同时捕获多个异常类型 ，或者使用多个`except`块分别处理不同异常：

  ```python
  try:
      # 假设这里执行的代码可能抛出多种类型的异常
      result = 10 / 0
  except (ZeroDivisionError, TypeError) as e:
      print(f"发生错误: {e}")
  ```

  

- #### 异常链抛出

  在处理异常时，可能需要保留原始异常信息的同时，添加额外的上下文或重新抛出异常。使用`raise from`语法可以达到这一目的：

  ```python
  try:
      open('nonexistent.txt')
  except FileNotFoundError as fnf_error:
      raise ValueError("配置文件缺失") from fnf_error
  ```

  

### 三、with上下文管理

在Python中，`with`语句结合上下文管理器提供了自动资源管理和代码块执行控制的强大能力，显著提升了代码的整洁度和健壮性。



- #### 自动资源管理

上下文管理器通过定义`__enter__`和`__exit__`方法，使得在`with`语句块中操作资源时，无论是否发生异常，都能确保资源被正确地初始化和清理。以下是一个简单的文件操作示例：



```python
class ManagedFile:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.file = open(self.filename, 'r')
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

# 使用自定义上下文管理器
with ManagedFile('example.txt') as file:
    content = file.read()
    print(content)
```



### 四、捕获特定异常：else & finally块



- #### 使用else语句

  `else`子句与`try-except`结构配合使用，用于在没有异常发生的情况下执行代码块。这意味着，如果`try`部分的代码成功执行（即没有触发任何异常），则直接跳过所有`except`子句，执行`else`块内的代码。但是这种方式在**effective python**中不建议使用，else语义不明确

  

  ```python
  try:
      result = 10 / 2
  except ZeroDivisionError:
      print("发生了除以零的错误")
  else:
      print("运算成功，结果是:", result)
  ```

  

- ### finally确保代码执行

  `finally`块无论是否发生异常 ，甚至是`try`块中有`return`、`break`等改变控制流的语句，都会保证其内部的代码被执行。这对于释放资源、关闭文件或数据库连接等清理工作尤为重要。

  ```python
  try:
      num = int(input("请输入一个数字: "))
      print("输入的数字是:", num)
  except ValueError:
      print("输入错误，请输入一个整数。")
  finally:
      print("这是finally块 ，总是会被执行。")
  ```



### 五、自定义异常

- #### 继承Exception基类

  

这种方式非常常见，在我们开发中常常会针对于某个异常封装一个特定的异常类。

```python
class OrderLineRunningException(Exception):
    pass


class OrderLineStopException(Exception):
    pass


class OrderLineTimeoutException(Exception):
    pass
```

当然也可以自定义一些属性，这样在处理异常时 ，可以获得更多的上下文信息。

```python
class CustomErrorWithDetails(CustomError):
    def __init__(self, message, detail=None):
        super().__init__(message)
        self.detail = detail

def process_data(data):
    if not data:
        raise CustomErrorWithDetails("数据为空", detail="缺少必要的输入数据")

try:
    process_data([])
except CustomErrorWithDetails as e:
    print(f"错误信息: {e}, 详细信息: {e.detail}")
```



### 六、主动抛出异常



- #### 主动抛出异常

  这个是非常常见的一个技巧，当条件不满足预期我们主动抛出异常。

  ```python
  def calculate_square_root(n):
      if n < 0:
          raise ValueError("负数没有平方根")
      return n ** 0.5
  
  try:
      print(calculate_square_root(-4))
  except ValueError as e:
      print(e)  # 输出: 负数没有平方根
  ```

  

- #### 函数调用栈中的异常

  当函数内部抛出异常而未被捕获时 ，异常会向上传递至调用该函数的上一层，这一过程会沿着调用栈逐级回溯 ，直至遇到合适的`except`块捕获该异常，或最终未被捕获导致程序终止。理解这一过程对于调试和设计异常处理逻辑非常重要。

  ```python
  
  def inner_function():
      raise ValueError("内部错误")
  
  def outer_function():
      inner_function()
  
  try:
      outer_function()
  except ValueError as e:
      print("捕获到异常:", e)  # 输出: 捕获到异常: 内部错误
  ```

  

### 七、异常的绝杀——日志



我相信每个开发都对于日志都是无比的熟悉，合理利用`logging`模块记录日志信息是监控程序运行状态、诊断问题的关键实践。通过精细的日志管理，可以大幅提升系统的可维护性和故障排查效率。

这里要注意两点

- 日志的级别设置
- 异常时记录日志信息

结合异常处理与日志记录，可以在异常发生时自动记录详细的错误信息 ，这对于追踪和分析问题原因至关重要。通过在`except`块内使用`logging.error`或更高级别的方法记录异常，可以确保异常情况被完整记录。想打印出异常的详细信息还要记住这个模块**traceback**

```python
import traceback


def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError as e:
        # division by zero
        print(e)

        # Traceback (most recent call last):
        #   File "E:\code\orderlines\orderlines\demo.py", line 6, in divide
        #     result = a / b
        # ZeroDivisionError: division by zero
        print(traceback.format_exc())


divide(10, 0)

```



### 八、调试中的异常检查——assert



在Python程序开发和调试阶段，`assert`语句是一种强大的工具 ，用于在代码中插入检查点，确保变量或表达式的预期状态。但是**华为python开发规范中不建议在正式代码使用这种方式**，但是我这里说的是**调试中使用**

```python
def increment_counter(counter):
    assert counter >= 0, "Counter should not be negative"
    counter += 1
    return counter
```

尽管`assert`在遇到失败时会引发`AssertionError`，但它与直接使用`if`语句抛出异常有本质区别：

- **启用与禁用**：通过 `-O` 或 `-OO` 命令行选项运行Python程序时，所有`assert`语句将被忽略，这使得生产环境中的性能影响最小。而显式抛出的异常不会受此影响。
- **意图表达**：`assert`主要用于自我检查，表达开发者对代码状态的期望。异常处理则更多关注于程序中可能遇到的外部或内部错误 ，并提供恢复机制。
- **调试信息**：`assert`失败时 ，会提供失败的表达式和所在位置的信息 ，这对于调试非常有帮助。而自定义异常可以携带更丰富的上下文信息，适合对外部用户或下游代码解释错误原因。



### 九、异常装饰器

基础的异常处理装饰器可以捕获并处理被装饰函数可能抛出的异常 ，提供统一的错误处理逻辑。这类方式对于**UI自动化测试**中有奇效，因为异常时自动化测试需要看到当前的页面状态更加方便排查bug

```python
import logging

def log_exceptions(log_to_file=False):
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                print(f"捕获到异常: {e}")
                if log_to_file:
                    logging.error(f"异常信息: {e}", exc_info=True)
        return wrapper
    return decorator

logging.basicConfig(filename='app.log', level=logging.ERROR)

@log_exceptions(log_to_file=True)
def divide_with_logging(x, y):
    return x / y

print(divide_with_logging(10, 0))  # 除了打印异常 ，还会记录到app.log文件中
```



### 10、异常和性能

在Python应用中，合理使用异常处理机制对于提升程序的健壮性至关重要，但同时也需注意其对性能的影响。

异常处理在Python中相对昂贵，特别是在异常被频繁触发的场景下。每次异常抛出和捕获都会消耗额外的CPU周期，包括堆栈展开、异常对象的创建、以及异常处理逻辑的执行。因此，在性能敏感的代码段 ，减少不必要的异常使用是非常必要的。

我来举个`Effective Python`中的一个例子

```python
data = {
    'name': 'blue',
    'age': 18
}

if 'name' in data:
    print('success')
```

就是利用KeyError异常。如果程序抛出了这个异常，那说明要获取的键不在字典里。这种方式虽然可行但是成本比较大。

举个例子

```python
import timeit


def with_exception_check(num):
    try:
        if num == 0:
            raise ValueError("Invalid value")
        return 10 / num
    except:
        pass


def without_exception(num):
    if num != 0:
        return 10 / num
    else:
        return None  # 或者其他处理方式


# 测试两种情况的性能差异
exception_time = timeit.timeit('with_exception_check(0)', globals=globals(), number=10000)
no_exception_time = timeit.timeit('without_exception(0)', globals=globals(), number=10000)

print(f"异常处理耗时: {exception_time}")# 异常处理耗时: 0.0024798000004011556
print(f"无异常处理耗时: {no_exception_time}")# 无异常处理耗时: 0.00041819999933068175
```

这个例子应该比较明显了。

尽管异常可以作为一种控制流的手段，比如用于替代条件判断 ，但这并不是其设计初衷。频繁使用异常来控制程序流程不仅会影响性能，还可能导致代码逻辑难以理解和维护。

```python
def read_file_contents(filename):
    try:
        with open(filename, 'r') as file:
            return file.read()
    except FileNotFoundError:
        return "文件未找到"

# 更好的做法是预先检查文件存在
def read_file_contents_optimized(filename):
    import os
    if os.path.exists(filename):
        with open(filename, 'r') as file:
            return file.read()
    else:
        return "文件未找到"
```



