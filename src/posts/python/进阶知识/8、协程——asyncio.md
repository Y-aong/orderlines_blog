---
icon: pen-to-square
date: 2023-07-15
category:
  - python
tag:
  - 协程
---

# 8、协程



### 详情还是要看文档



| [`run()`](https://docs.python.org/zh-cn/3/library/asyncio-runner.html#asyncio.run) | 创建事件循环，运行一个协程，关闭事件循环。                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`Runner`](https://docs.python.org/zh-cn/3/library/asyncio-runner.html#asyncio.Runner) | A context manager that simplifies multiple async function calls. |
| [`Task`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.Task) | Task对象                                                     |
| [`TaskGroup`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.TaskGroup) | A context manager that holds a group of tasks. Provides a convenient and reliable way to wait for all tasks in the group to finish. |
| [`create_task()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.create_task) | Start an asyncio Task, then returns it.                      |
| [`current_task()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.current_task) | 返回当前Task对象                                             |
| [`all_tasks()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.all_tasks) | Return all tasks that are not yet finished for an event loop. |
| `await` [`sleep()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.sleep) | 休眠几秒。                                                   |
| `await` [`gather()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.gather) | 并发执行所有事件的调度和等待。                               |
| `await` [`wait_for()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.wait_for) | 有超时控制的运行。                                           |
| `await` [`shield()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.shield) | 屏蔽取消操作                                                 |
| `await` [`wait()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.wait) | 完成情况的监控器                                             |
| [`timeout()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.timeout) | Run with a timeout. Useful in cases when `wait_for` is not suitable. |
| [`to_thread()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.to_thread) | 在不同的 OS 线程中异步地运行一个函数。                       |
| [`run_coroutine_threadsafe()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.run_coroutine_threadsafe) | 从其他OS线程中调度一个协程。                                 |
| `for in` [`as_completed()`](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio.as_completed) | 用 `for` 循环监控完成情况。                                  |

- [使用 asyncio.gather() 并行运行](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio-example-gather).
- [使用 asyncio.wait_for() 强制超时](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio-example-waitfor).
- [撤销协程](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio-example-task-cancel).
- [asyncio.sleep() 的用法](https://docs.python.org/zh-cn/3/library/asyncio-task.html#asyncio-example-sleep).

### 事件循环

所以，我们可以想象，现在有一个循环和一个生成器列表，每次循环，我们都将所有的生成器进行一次调用，所有生成器交替执行。