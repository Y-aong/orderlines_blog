---
icon: pen-to-square
date: 2024-05-22
category:
  - python
tag:
  - sqlalchemy
---



# 11、sqlalchemy线程池



### 一、连接池特点



- **SQLAlchemy连接数据库所使用的Engine对象默认采用一个连接池来管理连接**

  当我们使用Engine对象所对应的SQL数据库连接的资源时，这些对数据库的连接是通过一个连接池（Connection pooling）来管理的。当我们释放（release）一个连接资源时，这个连接并不是被销毁了，而是仍然连接着数据库，只不过其将会被重新存储如一个用于管理连接的连接池（默认为QueuePool）中。放入连接池中的连接可以被复用。事实上总有一定数目的数据库连接被保存在这个连接池中，即使在我们的代码中看起来像是连接被释放了一样。这些连接会在我们的程序结束运行之后自动被销毁，或者当我们显式地调用销毁连接池的代码时被销毁。

- **连接复用**

  由于这个连接池的存在，每当我们在代码中调用Engine.connect()方法或者调用ORM对应的Session的时候，往往会得到一个已存在与连接池中的数据库连接，而不是得到了一个全新的连接对象。然而当连接池中没有现成可用的连接对象的时候，在不超过配置所允许的连接上限的条件下，新的连接对象会被创建并返回给调用这些方法的程序。

- **默认使用的QueuePool**
  SQLAlchemy默认所使用的连接池为sqlalchemy.pool.QueuePool。当目前总连接数没有超过配置的上限且池中没有现成可用的连接的情况下，一个新的连接会被建立并返回给调用创建新连接的方法的程序。这个上限等于[`create_engine.pool_size`](http://docs.sqlalchemy.org/en/latest/core/engines.html#sqlalchemy.create_engine.params.max_overflow) 与[`create_engine.max_overflow`](http://docs.sqlalchemy.org/en/latest/core/engines.html#sqlalchemy.create_engine.params.max_overflow)之和。

- **可上溢的连接池**

  如果我们将参数`create_engine.max_overflow`设置为”-1”，那么连接池会允许“上溢”无限多的新连接。在这种情况下，连接池永远不会阻塞一个新的数据库连接请求。相反，每当有新的连接请求且无当前可用的连接对象，连接池就会无条件地创建新的连接对象来返回给这个请求。

  然而，即使我们在程序端不限制并发的数据库连接的数目，如果程序无限制的创建新的数据库连接对象，连接的数目最终会到达数据库端的连接数目上限，并且耗尽所有数据库允许的连接，最终同样会造成程序异常。

  

### 二、不同类型的连接池



SQLAlchemy 提供了几种不同类型的连接池，每种类型都有不同的行为和特点。

1. **QueuePool**：
   - 这是 SQLAlchemy 默认的连接池类型。
   - 使用 FIFO（先进先出）策略管理连接。
   - 当连接被释放时，将其放入队列尾部，下一个请求获取连接时会从队列头部取出连接。
   - 适用于大多数情况，对于大部分应用都是合适的选择。

2. **SingletonThreadPool**：
   - 此连接池类型只保持一个数据库连接。
   - 在多线程环境中，所有线程共享同一个数据库连接。
   - 不适合多线程应用，但在某些情况下可能会提供性能优势，例如在使用 SQLite 等轻量级数据库时。

3. **NullPool**：
   - 不维护连接池，每次请求都会创建一个新的连接，用完后立即关闭。
   - 不适合长期持有连接，适用于一次性操作或者每次操作都需要不同连接的场景。

4. **StaticPool**：
   - 类似于 QueuePool，但是在连接被释放后不会被重新放入队列中。
   - 在固定连接数的情况下，比 QueuePool 更快地获取连接，因为不需要管理连接的队列。

举个例子

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool

# 创建数据库引擎，并配置连接池
engine = create_engine('mysql://username:password@localhost/databasename', 
                       poolclass=QueuePool, 
                       pool_size=5,  # 最大连接数
                       max_overflow=10,  # 允许额外的连接数
                       pool_timeout=30)  # 获取连接的超时时间

# 获取数据库连接
connection = engine.connect()

# 使用连接进行操作
result = connection.execute("SELECT * FROM my_table")
for row in result:
    print(row)

# 关闭连接
connection.close()
```



每种连接池类型都有其适用的场景，选择合适的连接池类型取决于应用的特性和需求。一般来说，对于大多数情况，使用默认的 QueuePool 就足够了，因为它在大多数情况下能够提供良好的性能和稳定性。



### 三、可用连接被用尽的可能原因



但是我们在实际开发中经常会遇到一些类似这样的问题

```shell
QueuePool limit of size <x> overflow <y> reached, connection timed out, timeout <z>
```

当前系统所需并发数据库连接，超过了当前使用的`engine`所配置的并发连接数目上限。该上限由两个值组成：`pool_size`和`max_overflow`

- #### 连接池的上限小于程序中需要并发使用连接的请求的数目

  这是导致连接被用尽问题最直接的一种原因。如果我们的程序使用一个大小为20的线程池来进行并发处理且每个线程都需要一个单独的数据库连接，而我们定义的连接池大小只有10，那么显然将会出现连接被用尽的问题。这种情况下，就应该通过增加连接池大小或减少并发线程数目的方法来解决问题。一般来说，我们应当保证连接池的大小不小于线程池的数目。

  

- #### 连接没有被释放

  另一个常见的导致连接用尽的原因是连接在被使用之后没有被释放，或说没有被归还给连接池。虽然当连接对象由于没有引用而被垃圾收集之后其对应的连接资源仍将被释放还给连接池，但由于垃圾收集的不确定性，这一机制不应当被用来作为释放连接资源的手段。

  连接没有被释放一般是因为程序中没有显式地调用相应方法导致的。所以当我们使用完连接对象之后，应当显式地调用连接的释放方法。例如如果我们在使用ORM `Session`，则应当在合适的地方调用[`Session.close()`](http://docs.sqlalchemy.org/en/latest/orm/session_api.html#sqlalchemy.orm.session.Session.close)方法释放`Session`对象。

  

- #### 程序试图执行一个运行时间很长的数据库事务（transaction）

  数据库的事务是一种非常昂贵的操作，因此不应该用来闲置着等待某些事件发生。例如等待用户点击某个按钮，或者等待一个长时间运行的任务返回结果。对于事务，切记不要一直维持着一个事务而不去结束。