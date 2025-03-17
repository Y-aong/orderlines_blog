---
icon: pen-to-square
date: 2024-10-18
category:
  - flask 
  - socket
tag:
  - flask 
  - socket
star: true
---

# 4、Flask Socket的使用



Flask-SocketIO 是一个扩展 Flask 应用以支持 WebSocket 通信的库。它使得在 Flask 应用中实现实时双向通信变得简单，非常适合用于需要实时更新的应用场景。我在自己的项目中也应用到socket连接这个功能，这里简单总结一下。由于网上使用的方式都是前端使用html的方法来实现，现在很多都不直接使用html加js的实现方式了。所以我这里提供的是前端使用vue来实现socket。



### 一、什么是socket



**Socket（套接字）** 是计算机网络编程中的一个核心概念，它提供了一种在不同设备或同一设备上的进程之间进行**网络通信**的机制。简单来说，**Socket 是网络通信的端点**，允许应用程序通过网络协议（如 TCP、UDP）发送和接收数据。

#### 1、**Socket 的关键特性**

1. **协议支持**：
   - TCP（传输控制协议）：
     - 提供**可靠、有序、无重复**的字节流传输。
     - 适用于需要数据完整性的场景（如网页浏览、文件传输）。
   - UDP（用户数据报协议）：
     - 提供**无连接、不可靠**的数据包传输。
     - 适用于对实时性要求高、可容忍少量数据丢失的场景（如视频通话、在线游戏）。

#### 2、**Socket 的比喻理解**

- 插座与插头的类比：
  - Socket 就像墙上的**插座**，应用程序如同插入插座的**插头**。
  - 当两台设备通过插座（Socket）连接电源（网络），即可传输电力（数据）。
- 电话系统的类比：
  - Socket 是电话的**接口**，IP 地址是电话号码，端口是分机号。
  - TCP 像是固定电话（可靠通话），UDP 像是短信（快速但可能丢失）。



### 二、flask中使用socket



注意这里我使用flask-socket的方式可能和有些网上的使用方式有差别，是通过自定义namespace的方式来定义的。



#### 1、安装flask-socket

```bash
pip install flask flask-socketio
```

如果需要支持 WebSocket（而非仅长轮询），还需安装异步框架（如 `eventlet` 或 `gevent`）

```bash
pip install eventlet
```

#### 2、创建falsk NameSpace

**src/public/api_utils/socket_namespace.py**

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-

"""
# File       : socket_namespace.py
# Time       ：2024/9/11 20:45
# Author     ：Y-aong
# version    ：python 3.10
# Description：socketio 命名空间
"""
from flask_socketio import SocketIO
from flask_socketio.namespace import Namespace

from conf.config import OrderLinesConfig, Redis
from public.logger import logger
from public.api_utils.message_manager import RunningTaskMessageManager, DebugSignManager, RunningLoggerMessageManager, \
    UIAInfoMessageManager


class RunningLoggerNamespace(Namespace):
    """运行日志处理"""

    def __init__(self, namespace, socketio: SocketIO):
        super().__init__(namespace)
        self.socketio = socketio
        self.running_task_message_manager = RunningTaskMessageManager()
        self.running_logger_manager = RunningLoggerMessageManager()
        self.debug_sign_manager = DebugSignManager()

    def on_connect(self):
        # 当socket 连接完成时
        logger.info('running logger client connected')

    def on_disconnect(self):
        # 当socket 中断连接时
        logger.info('running logger client disconnected')

    def on_running_logger(self, message):
        # 自定义连接操作
        pass

class UiaNamespace(Namespace):
    def __init__(self, namespace, socketio: SocketIO):
        super().__init__(namespace)
        self.socketio = socketio
        self.uia_manager = UIAInfoMessageManager()

    def on_connect(self):
        logger.info('uia client connected')

    def on_disconnect(self):
        logger.info('uia client disconnected')

    def on_uia(self, message):
        pass

def register_socketio(app):
    # 注册socket，这里使用genvent
    socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins='*')
    socketio.on_namespace(RunningLoggerNamespace('/running_logger', socketio))
    socketio.on_namespace(UiaNamespace('/uia', socketio))

    return socketio

```

#### 2、运行socket-io

**src/app.py**

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : app.py
# Time       ：2023/1/14 22:34
# Author     ：Y-aong
# version    ：python 3.7
# Description：flask enter point
"""
from gevent import monkey

monkey.patch_all()  # 必须在任何其他导入之前调用
from apis import create_app
from conf.config import FlaskConfig
from public.api_utils.socket_namespace import register_socketio
from public.schedule_utils.apscheduler_config import scheduler

# 这里返回falsk_app
app = create_app(FlaskConfig.DEBUG)

socketio = register_socketio(app)

if __name__ == '__main__':
    scheduler.start()
    # 运行socket-io
    socketio.run(app, host=FlaskConfig.HOST, port=FlaskConfig.PORT, debug=FlaskConfig.DEBUG)

```



### 三、前端使用socket



**orderlines-web\src\views\graph\components\tabbar\index.vue**

```js
import { io, Socket } from "socket.io-client";

onMounted(async () => {
  await getProcessVersionOption();
  await getProcessNamespaceOption();
  await getProcessVersionByName();
  await getProcessInfo();
  init("running_logger");
});

// socket io连接
const init = (namespace: string) => {
  socketIo = io(`${apiUrl}/${namespace}`, { path: "/socket.io" });

  // 监听连接事件
  socketIo.on("connect", () => {
    console.log(`websocket:: connected to ${namespace} namespace`);
  });

  // 监听关闭事件
  socketIo.on("disconnect", () => {
    console.log(`websocket:: disconnected to namespace ${namespace} `);
  });

  // 监听接受信息
  socketIo.on(namespace, data => {
    const topic = data.topic;
    const message = data.message;
    const receive_process_instance_id = data.process_instance_id;

    if (topic === "running_logger" && receive_process_instance_id === process_instance_id.value) {
      running_edge.value = message.running_edge;
      taskProgress.value = message.task_progress;
      graph_data.value = message.graph_data.graphData;
    } else if (topic === "debug_message" && message) {
      if (!debugMessage.value.find(item => deepEqual(item, message))) {
        const sign = message.sign;
        if (sign) {
          isComplete.value = true;
          setStorage("true", "isComplete");

          ElMessage.success(sign);
        }

        debugMessage.value.push(message);
      }
    }
  });
};

// socket 发送消息
const send = (namespace: string, data: any) => {
  socketIo.emit(namespace, data);
  console.log(`websocket:: namespace ${namespace}发送消息:`, data);
};
```



### 四、注意事项

```python
from gevent import monkey

monkey.patch_all()  # 必须在任何其他导入之前调用
```

如果使用了gevent就必须要加这行，不然有可能会对代码有影响。

简单来说就是Python 的全局解释器锁（GIL）使得多线程在 CPU 密集型任务中无法充分利用多核 CPU。而 **gevent 的协程（Greenlet）** 通过 **协作式调度** 实现轻量级的并发，但需要依赖 **非阻塞的 I/O 操作**。