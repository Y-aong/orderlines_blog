---
icon: pen-to-square
date: 2024-05-22
category:
  - python
tag:
  - 协程
---



# 12、monkey.patch_all() ？



### 引言：

曾经在使用flask-socket中不添加monkey.patch_all()遇到一些莫名奇妙的错误。所以这里查了些资料关于monkey.patch_all。



### 一、**`monkey.patch_all()` 是什么？**

`monkey.patch_all()` 是 **gevent** 库中的一个核心函数，用于在程序启动时动态替换标准库中的某些模块（如 `socket`、`threading`、`select` 等），使其支持 **非阻塞的协程操作**。  
其核心作用是让标准库的阻塞式 I/O 操作（如网络请求、文件读写）在 gevent 的协程（Greenlet）框架下运行，从而实现 **高效的异步编程**。



### 二、**为什么要添加 `monkey.patch_all()`？**



#### **1. 解决阻塞问题**
Python 的全局解释器锁（GIL）使得多线程在 CPU 密集型任务中无法充分利用多核 CPU。而 **gevent 的协程（Greenlet）** 通过 **协作式调度** 实现轻量级的并发，但需要依赖 **非阻塞的 I/O 操作**。  
- **问题**：标准库中的许多 I/O 操作（如 `socket.recv()`）是阻塞的，会阻止整个协程的事件循环，导致其他协程无法执行。  
- **解决方案**：通过 `monkey.patch_all()` 替换标准库模块，使其调用 gevent 的非阻塞实现（如 `gevent.socket` 代替 `socket`），从而避免阻塞。

#### **2. 兼容性与透明性**
- **无需修改代码**：打补丁后，你的代码可以继续使用标准库的 API（如 `socket`、`requests`），但底层已切换为非阻塞模式。  
- **示例**：  
  
  ```python
  import gevent.monkey
  gevent.monkey.patch_all()  # 替换标准库模块
  
  import socket  # 实际使用的是 gevent.socket
  s = socket.socket()
  s.connect(...)  # 非阻塞操作
  ```

#### **3. 提升性能**
- **高并发场景**：例如，使用 `requests` 发送多个 HTTP 请求时，若未打补丁，每个请求会阻塞主线程；打补丁后，请求会以非阻塞方式执行，协程可以切换到其他任务，显著提升吞吐量。
- **I/O 密集型任务**：如网络爬虫、实时聊天服务器等，通过非阻塞 I/O 实现高并发。



### 三、**如何使用 `monkey.patch_all()`？**



#### **1. 在程序入口尽早调用**
必须在 **导入其他模块之前** 调用 `patch_all()`，否则补丁可能无效：  
```python
import gevent.monkey
gevent.monkey.patch_all()  # 第一行调用

import socket  # 已被替换为 gevent.socket
import requests  # 依赖的 socket 也是非阻塞的
```

#### **2. 选择性补丁（可选）**
如果只需要替换部分模块，可以指定参数：  
```python
gevent.monkey.patch_socket()      # 仅替换 socket 模块
gevent.monkey.patch_os()          # 替换 os 模块的阻塞函数
```



### 四、**示例：对比补丁前后的效果**



#### **场景**：发送三个 HTTP 请求  
```python
import gevent
# gevent.monkey.patch_socket() 
import requests

def fetch(url):
    print(f"Starting {url}")
    response = requests.get(url)
    print(f"Finished {url}: {response.status_code}")

urls = ["https://httpbin.org/delay/2"] * 3

# 未打补丁时：
# 各请求串行执行，总耗时 ~6秒
# 打补丁后：
# 请求并行执行，总耗时 ~2秒
```

#### **补丁前后的区别**

| 补丁前（阻塞模式）                      | 补丁后（非阻塞模式）                          |
| --------------------------------------- | --------------------------------------------- |
| `requests.get()` 阻塞线程，协程无法切换 | `requests.get()` 非阻塞，协程可切换到其他任务 |
| 串行执行，性能低                        | 并行执行，性能高                              |



### 五、**注意事项**

1. **版本兼容性**：
   - 在 **Python 3.10+** 中，`gevent` 的某些补丁可能因新版本的 asyncio 机制而失效（需等待 gevent 更新）。
2. **第三方库的兼容性**：
   - 部分依赖标准库的库（如某些数据库驱动）可能需要额外处理。例如，`psycopg2` 需要使用 `psycopg2-pool` 或 `asyncpg` 替代。
3. **不要过度补丁**：
   - 避免在补丁后混用多线程和协程，可能引发竞争条件。



### 六、**总结**

- **`monkey.patch_all()` 的核心作用**：让标准库的阻塞式 I/O 操作在 gevent 协程中非阻塞执行。
- **为什么需要它**：  
  1. 避免阻塞导致的性能瓶颈。  
  2. 无需修改代码即可兼容协程模型。  
  3. 实现高并发场景下的高效 I/O 处理。
- **最佳实践**：在程序入口尽早调用，并确保依赖库与 gevent 兼容。

如果需要更深入的了解，可以参考 [gevent 官方文档](http://www.gevent.org/) 或知识库中提到的猴子补丁原理。