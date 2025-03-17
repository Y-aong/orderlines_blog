---
icon: pen-to-square
date: 2024-11-11
category:
 - python 
tag:
 - 数据类型
---

# 2、python中5种队列数据结构



### 一、python基础队列：列表



#### 1.1 列表作为队列的简单应用

列表作为python中使用最常见的一种数据类型，同样也是最方便实现队列的数据结构。尽管这不是最高效的解决方案 ，但是可能是最便捷的实现方案。

列表提供了`append()`方法用于在尾部添加元素（相当于队列的入队操作），以及`pop(0)`方法来移除并返回列表的第一个元素（相当于队列的出队操作）。

- **入队（Enqueue）**：使用`list.append()`方法在列表的末尾添加元素。这对应于队列中新元素的加入，遵循先进先出的原则。
- **出队（Dequeue）**：标准的列表不直接支持队列的头部移除操作 ，通常使用`list.pop(0)`来模拟。这种方法虽然实现了功能，但是效率低下，特别是当队列很大时，因为每次出队操作都需要移动后续的所有元素。

```python
queue = []

# 入队操作
queue.append("任务A")
queue.append("任务B")

print("初始队列:", queue)

# 出队操作
task = queue.pop(0)
print("处理任务:", task)
print("处理后队列:", queue)
```

输出结果

```
初始队列: ['任务A', '任务B']
处理任务: 任务A
处理后队列: ['任务B']
```

#### 1.2 缺点与优化建议

虽然使用列表可以实现队列操作，但是这不是最好的方式，因为随着队列操作的进行，频繁的插入和删除可能导致内存碎片。

- **效率问题**：由于Python列表是基于数组实现的，当执行`list.pop(0)`操作时，需要移动所有后续元素来填补空位，时间复杂度为O(n) ，在大规模数据处理时效率极低。

- **循环利用问题**：真实世界中的队列往往期望能够高效地循环利用存储空间，而列表实现的队列在不断出队后 ，无法自动复用前面的空间，导致内存使用效率不高。

  

### 二、高效队列：`collections.deque`



#### 2.1 `deque`介绍与优势

在Python标准库中，`collections.deque`（双端队列）是一种优化的队列实现 ，特别适用于需要高效插入和删除元素的场景。相较于使用列表模拟队列，`deque`提供了更优的性能和灵活性。

`deque`，全称双端队列（double-ended queue），是一种允许在其两端进行添加和删除操作的数据结构。它克服了列表作为队列使用时的主要瓶颈——出队操作的低效。deque通过使用双向链表实现 ，确保了在两端执行插入和删除操作的时间复杂度均为O(1)。

- **快速操作**：无论是头部还是尾部 ，入队（append/appendleft）和出队(pop/popleft)都非常迅速。
- **内存效率**：自动管理内存，无需像列表那样移动大量元素。
- **灵活应用**：不仅限于队列 ，还可以当作栈或双端队列使用。

#### 2.2 实现快速入队与出队

```python
from collections import deque

queue = deque()

# 入队操作
queue.append("任务1")
queue.append("任务2")

print("初始队列:", queue)

# 出队操作
task = queue.popleft()
print("处理任务:", task)
print("处理后队列:", queue)
```

输出结果

```
初始队列: deque(['任务1', '任务2'])
处理任务: 任务1
处理后队列: deque(['任务2'])
```

- **限制大小**：可以创建一个固定大小的deque，当达到容量上限时，新元素的加入会导致最旧的元素自动弹出 ，类似于循环队列。

```python
from collections import deque

# 创建一个最大长度为3的deque
limited_deque = deque(maxlen=3)
limited_deque.append(1)
limited_deque.append(2)
limited_deque.append(3)
limited_deque.append(4)  # 此时1会被自动移除
print(limited_deque)  # 输出: deque([2, 3, 4], maxlen=3)
```

- **双端访问**：既可以从左侧添加或移除元素（`appendleft`和`popleft`） ，也可以从右侧操作 ，提供了更多操作灵活性。

  

### 三、并发安全：queue模块



#### 3.1 多线程/进程安全队列

在涉及多线程或多进程的并发程序设计中，数据同步和线程安全是必须面对的挑战。Python的`queue`模块为此提供了线程安全的队列类 ，包括`Queue`, `LifoQueue`（后进先出队列），以及`PriorityQueue`（优先级队列）。这些队列类内部实现了锁机制 ，确保了在多线程环境下的安全访问，避免了数据竞争和一致性问题。

#### 3.2 queue模块核心类解析

- • **FIFO队列 (`Queue`)**：最基本的形式 ，遵循先进先出（FIFO）原则 ，提供了`put()`方法用于插入元素到队列尾部，以及`get()`方法从队列头部移除并返回一个元素。
- • **LIFO队列 (`LifoQueue`)**：后进先出队列，类似于堆栈，最近添加的元素将是最先被获取的元素，通过`put()`和`get()`操作实现。
- • **优先级队列 (`PriorityQueue`)**：元素带有优先级的队列，每次出队都是优先级最高的元素。元素被赋予一个优先级数字，越小的数字代表越高的优先级。通过`put()`存放带有优先级的项，`get()`取出优先级最高的项。

#### 3.3 生产者消费者模型实例

生产者消费者模型是一种经典的设计模式，常用于处理多线程或多进程间的协作。下面是一个使用`queue`模块实现的简单生产者消费者模型示例：

```python
import threading
import time
from queue import Queue

def producer(queue):
    """生产者线程，向队列中添加任务"""
    for i in range(10):
        item = f"产品{i}"
        print(f"生产了 {item}")
        queue.put(item)
        time.sleep(1)  # 模拟生产间隔

def consumer(queue):
    """消费者线程 ，从队列中获取并处理任务"""
    while True:
        item = queue.get()
        if item is None:  # 使用None作为停止信号
            break
        print(f"消费了 {item}")
        time.sleep(2)  # 模拟消费间隔

# 创建共享的线程安全队列
task_queue = Queue()

# 分别启动生产者和消费者线程
producer_thread = threading.Thread(target=producer, args=(task_queue,))
consumer_thread = threading.Thread(target=consumer, args=(task_queue,))

producer_thread.start()
consumer_thread.start()

producer_thread.join()  # 等待生产者线程完成
print("生产结束，发送停止信号")
task_queue.put(None)  # 向队列发送结束信号
consumer_thread.join()  # 等待消费者线程完成
```

此示例中，`producer`线程不断向队列中添加“产品”，而`consumer`线程则不断地从队列中取出并“消费”这些产品。通过队列作为中介 ，两者之间实现了有效的协同工作 ，同时保证了线程安全。



### 四、高级数据结构：堆与优先队列 `PriorityQueue`



#### 4.1 何为优先队列及其应用场景

优先队列是一种特殊类型的队列，其中每个元素都有一个优先级。在这样的队列中，出队操作总是移除优先级最高的元素。优先队列广泛应用于各种场景，如任务调度、事件驱动系统、Dijkstra算法中的最短路径计算、优先级中断处理等。它确保了关键或紧急的任务能够得到及时处理。

#### 4.2 使用heapq模块实现优先队列

Python的`heapq`模块提供了堆队列算法的实现，可以方便地用来构建优先队列。堆是一个近似完全二叉树的结构，满足父节点的值小于或等于（在最小堆中）其子节点的值。利用`heapq`，我们可以高效地实现优先队列的核心操作——插入元素（`heappush`）和获取并移除最小元素（`heappop`）。

示例代码如下：

```python
import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0  # 用于自定义优先级的计数器

    def push(self, item, priority=0):
        """将元素插入队列，可选优先级"""
        heapq.heappush(self._queue, (-priority, self._index, item))  # 使用负优先级进行最小堆排序
        self._index += 1

    def pop(self):
        """移除并返回优先级最高的元素"""
        return heapq.heappop(self._queue)[-1]  # 返回元素部分

pq = PriorityQueue()
pq.push("任务A", 2)
pq.push("任务B", 1)
pq.push("任务C", 3)

print(pq.pop())  # 应输出优先级最高的任务C
print(pq.pop())  # 接下来是任务A
```

#### 4.3 自定义比较函数优化优先级处理

在某些情况下 ，优先级可能基于复杂的逻辑，而不仅仅是简单的数值比较。虽然可以通过转换策略间接实现 ，但直接提供自定义比较函数给`heapq`模块更为灵活。不过，`heapq`本身不直接支持传入自定义比较函数 ，而是依赖于元素的自然顺序或显式指定的负优先级值。因此，为了实现这一需求 ，通常是在元素中包含或绑定比较逻辑。

例如，如果任务类本身定义了比较操作，那么直接使用该类的实例即可：

```
class Task:
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority

    def __lt__(self, other):
        return self.priority < other.priority  # 定义优先级比较

# 使用Task实例作为优先队列的元素
pq = []
heapq.heapify(pq)  # 将列表转换为堆结构
heapq.heappush(pq, Task("任务D", 5))
heapq.heappush(pq, Task("任务E", 9))

print(heapq.heappop(pq).name)  # 应输出优先级最低的任务D
```

通过这种方式，我们可以更灵活地控制优先级的比较逻辑，使优先队列更加适应复杂的应用场景。

#### 4.4 实时调度与Top-K问题解决

- • **实时调度**：在操作系统和网络通信等领域 ，堆可实现高效的任务调度算法，如事件驱动编程中的事件调度，能确保优先级高的任务优先得到处理。
- • **Top-K问题**：当需要找出一组数据中的前K个最大或最小元素时，堆是一个理想的数据结构。通过维护一个大小为K的最小堆（找最大K个元素）或最大堆（找最小K个元素） ，可以在O(NlogK)的时间复杂度内完成。

示例：使用`heapq`求解Top-3最大数。

```python
import heapq

numbers = [1, 8, 9, 5, 12, 7, 15, 20, 3]
top_k = 3

# 使用nlargest函数直接求解Top-K问题
top_three = heapq.nlargest(top_k, numbers)
print(f"Top-{top_k}最大数：{top_three}")

# 输出结果：
# Top-3最大数：[20, 15, 12]
```

通过`heapq`模块，开发者可以轻松实现复杂的堆相关应用 ，满足对高效数据排序、实时处理以及特定问题求解的需求。



### 五、扩展视野：协程和asyncio.Queue 



#### 5.1 协程基础与async/await

协程（Coroutine）是Python中用于异步编程的一种高级控制流特性。它们允许非阻塞地执行多个任务，提高了I/O密集型程序的效率。从Python 3.5起，引入了`async/await`语法 ，大大简化了异步编程模型。

`async`关键字用于声明一个协程函数（coroutine function），而`await`用于等待一个异步操作的结果，直到该操作完成。这意味着在等待期间 ，控制权可以交给其他协程继续执行，从而实现了并发执行的效果。

#### 5.2 异步编程中的队列应用

在异步编程领域，`asyncio.Queue`是`asyncio`模块提供的一个线程安全的队列 ，特别适合在协程之间传递数据。它支持异步地将数据放入队列（`put()`）和从中取出数据（`get()`） ，非常适合实现生产者-消费者模型，尤其在处理I/O密集型任务时，能显著提高程序性能。

示例：使用`asyncio.Queue`处理并发请求。

```python
import asyncio
import aiohttp

async def fetch(session, url, queue):
    async with session.get(url) as response:
        data = await response.text()
        await queue.put(data)

async def process_queue(queue):
    while True:
        data = await queue.get()
        if data is None:
            break
        print(f"处理响应数据：{data[:50]}...")
        queue.task_done()

async def main(urls):
    queue = asyncio.Queue()
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url, queue) for url in urls]
        asyncio.create_task(process_queue(queue))
        await asyncio.gather(*tasks)
    await queue.join()  # 等待所有任务完成

urls = ["https://www.baidu.com"] * 10  # 示例URL列表
asyncio.run(main(urls))
```

此代码示例展示了如何使用`asyncio.Queue`来收集并发HTTP请求的响应数据 ，并通过另一个协程异步处理这些数据。

#### 5.3 提升I/O密集型任务性能

下面是一个使用`asyncio.Queue`和协程提升I/O密集型任务性能的示例。假设我们有多个URL需要并发下载，每个下载任务视为一个异步操作，我们可以利用`asyncio`和`asyncio.Queue`来高效地管理这些任务。

```python
import asyncio
import aiohttp

async def download(url, queue):
    async with aiohttp.ClientSession() as session:
        async with await session.get(url) as response:
            content = await response.text()
            print(f"Downloaded {url} - {len(content)} bytes")
            await queue.put(url)  # 完成后通知队列

async def main(urls):
    queue = asyncio.Queue()
    tasks = [download(url, queue) for url in urls]

    # 启动所有任务
    await asyncio.gather(*tasks)

    # 等待所有任务完成
    while not queue.empty():
        await queue.get()  # 阻塞直到所有任务完成通知

urls = [
    "https://example.com",
    "https://example.org",
    "https://example.net"
]

asyncio.run(main(urls))
```

在这个例子中，每个URL的下载任务由单独的协程处理，它们并发执行 ，充分利用了异步I/O ，提升了整体的下载效率。`asyncio.Queue`在这里起到了协调作用，确保所有下载任务完成后才结束程序 ，展示了在异步编程中队列的高效应用。