---
icon: pen-to-square
date: 2025-03-30
category:
  - python
tag:
  - 异常
---

# python异常和运行性能



### 一、引言：

```python
data = {
    'name': 'blue',
    'age': 18
}

try:
    name = data['name']
except KeyError:
    name = 'default'

```

这个代码我们可能写的很常见，实际上就是利用KeyError异常。如果程序抛出了这个异常，那说明要获取的键不在字典里。不要较真说这种方式不可行，我是说这种方式是利用异常做控制流，那么异常会影响性能吗？。





### 二、**Python 中异常与性能的关系**



#### **1. 正常执行时的开销（无异常发生）**

- **几乎可以忽略**：当 `try/except` 块中没有发生异常时，Python 的优化使得其开销极小。

  

**示例：无异常时的性能对比**

```python

import timeit

def no_exception():
    for _ in range(1000000):
        try:
            x = 5
        except ValueError:
            pass

def no_try():
    for _ in range(1000000):
        x = 5

print("With try/except:", timeit.timeit(no_exception, number=10))
print("Without try/except:", timeit.timeit(no_try, number=10))
```

```tex
E:\code\od\orderlines\venv\Scripts\python.exe E:\code\od\orderlines\demo.py 
With try/except: 0.13516389999949752
Without try/except: 0.10620410000046832

Process finished with exit code 0
```



#### **2. 异常发生时的开销**

- **显著性能下降**：当异常被抛出时，Python 需要创建异常对象、遍历调用栈（栈展开）、执行清理操作，这些操作的开销可能比正常代码高几个数量级。

**示例：频繁抛出异常的性能测试**

```python
import timeit


def with_exception():
    for _ in range(100000):
        try:
            raise ValueError("Error")
        except ValueError:
            pass


def without_exception():
    for _ in range(100000):
        pass  # 不抛出异常


print("With exception:", timeit.timeit(with_exception, number=100))
print("Without exception:", timeit.timeit(without_exception, number=100))

```

```tex
E:\code\od\orderlines\venv\Scripts\python.exe E:\code\od\orderlines\demo.py 
With exception: 0.840917200000149
Without exception: 0.0752133000005415

Process finished with exit code 0
```

**结论**：抛出异常的代码比正常代码慢数百倍。



### **二、《Effective Python》中关于异常的建议**



#### **1. **只在异常情况下抛出异常**

- **建议**：不要将异常用于常规控制流。例如，避免用异常代替条件判断

```python
# 错误示例：用异常代替条件判断（低效）
try:
    value = get_value()
except ValueError:
    value = default_value

# 正确示例：直接判断（高效）
value = get_value()
if value is None:
    value = default_value
```



#### **2. **捕获具体异常而非通用异常**

- **建议**：仅捕获预期的异常类型，避免捕获所有异常（except Exception或except:）。

  

```python
# 错误示例：捕获所有异常（隐藏潜在错误）
try:
    risky_call()
except:
    handle_error()

# 正确示例：捕获具体异常（精准处理）
try:
    risky_call()
except ConnectionError:
    retry()
except TimeoutError:
    raise
```



#### **3. **避免在循环中抛出异常

- **建议**：在循环内部频繁抛出异常会导致性能问题。例如，避免在循环中用异常代替条件判断

```python
# 错误示例：在循环中频繁抛出异常（低效）
for item in items:
    try:
        process(item)
    except InvalidItemError:
        continue

# 正确示例：提前验证（高效）
for item in items:
    if not is_valid(item):
        continue
    process(item)
```



#### **4. **使用 `else` 和 `finally` 明确代码逻辑

- **建议**：用 `else` 块替代重复的条件判断，用 `finally` 确保资源释放。

```python
try:
    resource = acquire_resource()
except ResourceError:
    log_error()
else:
    use_resource(resource)
    release_resource(resource)
finally:
    cleanup()
```



#### **5. **自定义异常应继承 `Exception`

- **建议**：自定义异常应继承自 `Exception`（而非 `BaseException`），并避免使用字符串异常（Python 2 遗留问题）。

```python
class MyError(Exception):
    pass

try:
    raise MyError("Custom error")
except MyError as e:
    print(e)
```



#### 6、总结

- **异常处理的性能陷阱**：异常本身开销小，但**频繁抛出异常**会导致性能崩溃。
- **Effective Python 的核心思想**：异常是“异常”，而非“常规控制流”工具。合理使用异常可以提升代码健壮性，但需避免滥用
