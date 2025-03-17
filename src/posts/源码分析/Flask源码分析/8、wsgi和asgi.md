---
icon: pen-to-square
date: 2024-03-05
category:
  - 源码分析
  - flask
tag:
  - 源码分析
  - flask
  - wsgi
---



# 8、WSGI 和 ASGI 





### **一、WSGI 和 ASGI 的核心区别**



#### **1. 同步 vs 异步**
- **WSGI（Web Server Gateway Interface）**  
  - **同步接口**：基于线程或进程处理请求，每个请求按顺序执行，前一个请求完成后再处理下一个。  
  - **适用场景**：传统同步 Web 应用，如低并发场景、IO 密集型任务（如数据库查询）。  

- **ASGI（Asynchronous Server Gateway Interface）**  
  - **异步接口**：基于事件循环和协程（如 `async/await`），支持同时处理多个请求，无需等待前一个请求完成。  
  - **适用场景**：高并发场景、实时应用（如 WebSocket、长连接、聊天应用）、HTTP/2 等协议。

#### **2. 协议支持**
- **WSGI**  
  - **仅支持 HTTP/1.1**，无法处理 WebSocket 或长连接等实时协议。  
  - 通过扩展（如中间件）勉强支持部分异步功能，但效率低下。  

- **ASGI**  
  - **支持多种协议**：HTTP/1.1、HTTP/2、WebSocket、HTTP/3（QUIC）等。  
  - 原生支持实时通信（如聊天、直播推送、实时数据更新）。

#### **3. 性能**
- **WSGI**  
  - **同步处理**：在高并发场景下性能受限，因线程/进程切换开销较大。  
  - 适合中小型应用或低延迟要求的场景。  

- **ASGI**  
  - **异步非阻塞**：通过事件循环高效处理数千个并发连接，适合高负载场景。  
  - 在长连接和实时通信中表现更优。

---

#### **4. 兼容性**
- **WSGI**  
  - **广泛兼容**：几乎所有 Python Web 框架（如 Flask、Django）默认支持 WSGI，生态成熟。  
  - 服务器如 Gunicorn、uWSGI、mod_wsgi 都基于 WSGI。  

- **ASGI**  
  - **较新但快速崛起**：主要由现代异步框架推动，服务器如 Uvicorn、Daphne、Hypercorn 支持 ASGI。  
  - 与 WSGI 兼容：可通过转换器（如 `asgiref`）将 WSGI 应用运行在 ASGI 服务器上。

---

#### **5. 示例代码对比**
##### **WSGI 示例**
```python
def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type', 'text/plain')]
    start_response(status, headers)
    return [b"Hello, World!"]
```

##### **ASGI 示例**
```python
async def application(scope, receive, send):
    if scope["type"] == "http":
        await send({
            "type": "http.response.start",
            "status": 200,
            "headers": [[b"content-type", b"text/plain"]],
        })
        await send({
            "type": "http.response.body",
            "body": b"Hello, World!",
        })
```



### **二、主流框架与服务器的接口支持**



#### **1. 使用 WSGI 的框架**
- **Flask**  
  - 默认基于 WSGI，但可通过扩展（如 `aiohttp`）支持异步。  
- **Django（传统模式）**  
  - 默认使用 WSGI，但自 3.0 版本后支持通过 `Django Channels` 转向 ASGI。  
- **Bottle**、**CherryPy**  
  - 轻量级框架，原生支持 WSGI。  

#### **2. 使用 ASGI 的框架**
- **FastAPI**  
  - 专为高性能异步设计，原生支持 WebSocket 和 OpenAPI 文档。  
  
- **Django Channels**  
  - Django 的扩展，支持 ASGI 和 WebSocket、长轮询等。  
  

#### **3. 服务器对比**
| **接口** | **服务器**                 | **特点**                         |
| -------- | -------------------------- | -------------------------------- |
| WSGI     | Gunicorn、uWSGI、mod_wsgi  | 成熟稳定，适合同步应用。         |
| ASGI     | Uvicorn、Daphne、Hypercorn | 支持异步，适合高并发和实时协议。 |

---

### **三、如何选择？**



| **需求**     | **选择 WSGI**            | **选择 ASGI**                       |
| ------------ | ------------------------ | ----------------------------------- |
| **协议支持** | 仅需 HTTP/1.1            | 需要 WebSocket、HTTP/2 或实时推送   |
| **并发能力** | 低/中等并发              | 高并发、长连接或实时通信            |
| **框架偏好** | Flask、传统 Django       | FastAPI、Starlette、Django Channels |
| **开发效率** | 简单同步代码，学习曲线低 | 需熟悉异步编程（`async/await`）     |



### **四、总结**

- **WSGI** 是 Python Web 开发的基石，适合传统同步场景，生态成熟。  
- **ASGI** 是下一代接口，专为异步、高并发和实时通信设计，是现代 Web 和实时应用的首选。  
- **过渡方案**：Django 通过 `Channels` 兼容 ASGI，而 FastAPI 等框架原生支持 ASGI，提供了无缝的异步体验。
