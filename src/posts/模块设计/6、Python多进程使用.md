---
icon: pen-to-square
date: 2024-10-18
category:
  - python 
  - 多进程
tag:
  - 多进程
star: false
---

# 4、python多进程使用



### 引言：

之前在学习airflow时发现，airflow中大量使用多进程来实现任务的运行，所以还是比较奇怪为什么它会选择多进程呢？所以查询了很多的资料来学习下关于python多进程。



### **一、多进程的底层实现与原理**



#### **1.1 进程 vs 线程**
- **线程**：共享内存空间，通过锁（Lock）或信号量（Semaphore）控制并发访问，受GIL限制。
- **进程**：独立内存空间，无GIL限制，适合CPU密集型任务，但通信开销大。

#### **1.2 Python 多进程的实现机制**
Python的`multiprocessing`模块通过以下方式实现跨平台进程管理：
- **Fork（Unix）**：父进程通过`fork()`创建子进程，子进程复制父进程内存空间（**写时复制**，Copy-on-Write）。
- **Spawn（所有平台）**：父进程通过`os.spawn()`启动新解释器，进程间通过管道通信。
- **ForkServer（混合模式）**：结合Fork和Spawn，避免Spawn的初始化开销。

```python
# 设置进程启动方式（Linux默认fork，Windows只能spawn）

import multiprocessing as mp
mp.set_start_method('spawn')  # 或 'fork', 'forkserver'
```

#### **1.3 进程间通信（IPC）**
Python提供以下IPC原语：
- **Queue/Pipe**：基于文件描述符的管道（`Pipe`）或队列（`Queue`），底层使用`os.pipe()`或`mmap`。
- **共享内存**：`Value/Array`通过`shmget`/`shmctl`系统调用（Unix）或`CreateFileMapping`（Windows）实现。
- **Manager**：通过代理对象（Proxy）实现跨进程对象共享（如字典、列表），底层使用客户端-服务器模型（`xmlrpc`）。

```python
from multiprocessing import Process, Value, Array

def worker(counter, arr):
    counter.value += 1
    arr[0] = 5

if __name__ == "__main__":
    counter = Value('i', 0)  # 共享整型
    arr = Array('d', [1.0, 2.0])  # 共享数组
    p = Process(target=worker, args=(counter, arr))
    p.start()
    p.join()
    print(counter.value, arr[:])  # 输出：1 [5.0, 2.0]
```



### **二、多进程的实现方式与性能对比**



#### **2.1 multiprocessing 模块**

- **Process**：手动管理进程生命周期，适合简单任务。
- **Pool**：进程池，自动负载均衡，支持`map`/`apply_async`等接口。
  ```python
  from multiprocessing import Pool
  
  def square(x):
      return x * x
  
  with Pool(4) as p:
      results = p.map(square, range(10))  # 并行计算
  ```

#### **2.2 concurrent.futures.ProcessPoolExecutor**

- 高层接口，支持`submit`/`as_completed`，适合异步任务：
  ```python
  from concurrent.futures import ProcessPoolExecutor
  
  def compute(x):
      return x ** 2
  
  with ProcessPoolExecutor() as executor:
      futures = [executor.submit(compute, x) for x in range(10)]
      for future in as_completed(futures):
          print(future.result())
  ```



#### **2.3 性能对比**

| 方式                | 适用场景 | 启动开销 | IPC开销 | 代码复杂度 |
| ------------------- | -------- | -------- | ------- | ---------- |
| Process             | 简单任务 | 高       | 高      | 低         |
| Pool                | 任务队列 | 中       | 中      | 中         |
| ProcessPoolExecutor | 异步任务 | 中       | 中      | 低         |

---



### **三、多进程的优缺点：深度分析**



#### **3.1 优点**
- **突破GIL限制**：每个进程独立解释器，CPU密集型任务可线性加速：
  ```python
  # 单进程 vs 多进程计算时间对比
  import time
  from multiprocessing import Pool
  
  def sum_squared(n):
      return sum(i ** 2 for i in range(n))
  
  start = time.time()
  with Pool(4) as p:
      p.map(sum_squared, [10**7]*4)
  print(f"多进程耗时：{time.time() - start:.2f}s")  # 约 0.5s
  
  start = time.time()
  for _ in range(4):
      sum_squared(10**7)
  print(f"单进程耗时：{time.time() - start:.2f}s")  # 约 2.0s
  ```

- **进程隔离**：一个进程崩溃不影响其他进程（需监控重启）。
- **资源控制**：可通过`resource`模块限制单个进程的内存/CPU使用。



#### **3.2 缺点**

- **内存开销**：每个进程独立内存空间，大对象复制可能导致OOM：
  ```python
  # 危险示例：复制大数组
  import numpy as np
  from multiprocessing import Process
  
  def worker(arr):
      pass  # 进程启动时复制整个数组
  
  arr = np.zeros(1e9)  # 8GB内存
  p = Process(target=worker, args=(arr,))  # 启动时可能耗尽内存
  ```

- **IPC性能瓶颈**：跨进程通信需序列化/反序列化，适合批量数据而非高频交互：
  ```python
  # 低效的IPC示例（每秒1000次）
  from multiprocessing import Process, Queue
  
  def producer(q):
      for _ in range(1000):
          q.put({"data": [1, 2, 3]})
  
  def consumer(q):
      for _ in range(1000):
          q.get()
  
  p1 = Process(target=producer, args=(q,))
  p2 = Process(target=consumer, args=(q,))
  # 总耗时约 0.5s（每秒2000次）
  ```

---



### **四、Airflow 多进程架构解析**



Apache Airflow 是一个流行的分布式任务调度框架，其核心设计依赖多进程，主要原因可能为：

- **提升任务并行能力**
  - Airflow 的 `LocalExecutor` 使用多进程并行执行多个任务实例。
  - 通过 `CeleryExecutor` 结合多进程，实现分布式任务调度
-  **隔离性与稳定性**
  - 每个任务运行在独立进程中，避免因单个任务崩溃影响其他任务。
  - 可通过进程限制单个任务的资源占用（如内存、CPU）。

同时Airflow的多进程也会带来一些可能的问题

- **数据库连接泄漏**：每个进程需独立连接池，避免连接数超限。
- **序列化问题**：DAG定义需避免非序列化对象（如闭包）。
- **日志聚合**：多进程日志需集中存储（如远程服务器或ELK）。



### **五、多进程实战：常见问题与解决方案**



#### **5.1 进程间通信优化**
- **减少序列化开销**：
  - 使用`multiprocessing.shared_memory`直接操作内存：
    ```python
    from multiprocessing import shared_memory
    
    arr = np.random.rand(1000)
    shm = shared_memory.SharedMemory(create=True, size=arr.nbytes)
    shm_arr = np.ndarray(arr.shape, dtype=arr.dtype, buffer=shm.buf)
    shm_arr[:] = arr[:]
    ```
  - 优先用`pickle`替代`dill`，或使用二进制协议（如`msgpack`）。

- **避免频繁通信**：
  - 批量传输数据而非逐条发送：
    ```python
    q.put([data1, data2, data3])  # 批量发送
    ```

#### **5.2 进程安全与资源管理**
- **共享对象的同步**：
  ```python
  from multiprocessing import Process, Lock
  
  lock = Lock()
  shared_counter = Value('i', 0)
  
  def increment():
      with lock:
          shared_counter.value += 1
  
  p1 = Process(target=increment)
  p2 = Process(target=increment)
  p1.start(); p2.start()
  p1.join(); p2.join()
  print(shared_counter.value)  # 确保输出2
  ```

- **进程终止与清理**：
  ```python
  import signal
  from multiprocessing import Process
  
  def worker():
      while True:
          pass
  
  p = Process(target=worker)
  p.start()
  p.terminate()  # 发送SIGTERM信号
  p.join(timeout=1)
  if p.is_alive():
      p.kill()    # 强制终止（发送SIGKILL）
  ```

#### **5.3 跨平台兼容性**
- **Windows注意事项**：
  - `fork`不可用，进程间共享内存需通过`shared_memory`显式管理。
  - `__main__`模块必须可导入（避免`if __name__ == "__main__"`外的函数定义）。



### **六、多进程的典型应用场景与优化**



#### **6.1 科学计算加速**
- **NumPy/SciPy**：通过`multiprocessing.Pool`并行计算：
  ```python
  import numpy as np
  from multiprocessing import Pool
  
  def compute_row(row):
      return np.linalg.norm(row)
  
  data = np.random.rand(1000, 100)
  with Pool(4) as p:
      norms = p.map(compute_row, data)  # 并行计算每行的范数
  ```

#### **6.2 Web服务器**
- **Gunicorn**：通过多进程模型（`sync`工作模式）处理HTTP请求：
  ```bash
  gunicorn -w 4 myapp:app  # 启动4个Worker进程
  ```

#### **6.3 分布式任务调度**
- **Celery+RabbitMQ**：结合多进程和消息队列实现分布式任务：
  ```python
  from celery import Celery
  
  app = Celery('tasks', broker='pyamqp://guest@localhost//')
  
  @app.task
  def add(x, y):
      return x + y
  
  # 启动Worker：celery -A tasks worker --concurrency=4
  ```



### **七、总结：多进程的适用场景与避坑指南**



#### **适用场景**

- **CPU密集型任务**：科学计算、图像处理、密码破解。
- **高可靠性场景**：任务间需严格隔离（如金融交易）。
- **分布式系统**：需要跨机器并行的任务调度。

#### **避坑指南**
1. **避免共享可变状态**：优先用IPC或数据库同步，而非共享内存。
2. **监控资源使用**：用`psutil`监控内存/CPU，防止OOM或CPU过载。
3. **选择合适的IPC方式**：小数据用`Queue`，大数据用共享内存。
4. **测试跨平台兼容性**：Windows需额外处理`fork`和模块导入问题。

理论上用户最多启动65535个进程，但是实际上，我们可能启动不了这么多进程，一般可能需要具体问题具体分析

- **轻量级进程（如HTTP请求处理）**：
  每个进程占用 **10-100MB** 内存时，一台 **32GB 内存** 的机器可运行 **300-1000 个进程**。
- **中等负载进程（如数据库连接、计算任务）**：
  每个进程占用 **100MB-1GB** 内存时，进程数通常控制在 **50-200** 以内。
- **重量级进程（如容器/Docker）**：
  每个进程占用 **1GB+** 内存时，进程数可能仅 **10-50** 个。



可以根据当前应用的实际cpu和内存占用来处理。

```python
def calculate_max_processes(cpu_cores, memory_gb, process_memory_mb):
    # CPU限制：每个核心最多2个进程（保守估计）
    cpu_limit = cpu_cores * 2
    # 内存限制：总内存的80%分配给进程
    memory_limit = (memory_gb * 1024 * 0.8) // process_memory_mb
    # 取最小值并保留安全余量
    return int(min(cpu_limit, memory_limit) * 0.8)
```

