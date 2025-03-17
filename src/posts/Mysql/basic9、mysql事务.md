---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - mysql事务
---

# 9、mysql事务



### 一、MySQL中事务的特性

在关系型数据库管理系统中，一个逻辑工作单元要成为事务，必须满足这 4 个特性，即所谓的 ACID：原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability）。

1）原子性

原子性：事务作为一个整体被执行，包含在其中的对数据库的操作要么全部被执行，要么都不执行。

InnoDB存储引擎提供了两种事务日志：redo log(重做日志)和undo log(回滚日志)。其中redo log用于保证事务持久性；undo log则是事务原子性和隔离性实现的基础。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1670389670045/c33c69e81e80404a96f4cf49b90a16ab.png)

每写一个事务,都会修改Buffer Pool,从而产生相应的Redo/Undo日志:

- 如果要回滚事务，那么就基于undo log来回滚就可以了，把之前对缓存页做的修改都给回滚了就可以了。
- 如果事务提交之后，redo log刷入磁盘，结果MySQL宕机了，是可以根据redo log恢复事务修改过的缓存数据的。

实现原子性的关键，是当事务回滚时能够撤销所有已经成功执行的sql语句。

InnoDB 实现回滚，靠的是undo log ：当事务对数据库进行修改时，InnoDB 会生成对应的undo log  ；如果事务执行失败或调用了rollback ，导致事务需要回滚，便可以利用undo log中的信息将数据回滚到修改之前的样子。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/8133afe062ba49389226210a1bd9a30c.png)

2）一致性

一致性：事务应确保数据库的状态从一个一致状态转变为另一个一致状态。*一致状态*的含义是数据库中的数据应满足完整性约束。

- 约束一致性：创建表结构时所指定的外键、唯一索引等约束。
- 数据一致性：是一个综合性的规定，因为它是由原子性、持久性、隔离性共同保证的结果，而不是单单依赖于某一种技术。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1670389670045/a885bb90c360436aab888b60e95ab5ab.png)

3）隔离性

隔离性：指的是一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对其他的并发事务是隔离的。

不考虑隔离性会引发的问题:

- **脏读** : 一个事务读取到了另一个事务修改但未提交的数据。
- **不可重复读**: 一个事务中多次读取同一行记录的结果不一致，后面读取的跟前面读取的结果不一致。
- **幻读** : 一个事务中多次按相同条件查询，结果不一致。后续查询的结果和面前查询结果不同，多了或少了几行记录。

数据库事务的隔离级别有4个，由低到高依次为Read uncommitted 、Read committed、Repeatable read 、Serializable ，这四个级别可以逐个解决脏读 、不可重复读 、幻读 这几类问题。

4）持久性

持久性：指的是一个事务一旦提交，它对数据库中数据的改变就应该是永久性的，后续的操作或故障不应该对其有任何影响，不会丢失。

MySQL 事务的持久性保证依赖的日志文件: `redo log`

* redo log 也包括两部分：一是内存中的日志缓冲(redo log buffer)，该部分日志是易失性的；二是磁盘上的重做日志文件(redo log file)，该部分日志是持久的。redo log是物理日志，记录的是数据库中物理页的情况 。
* 当数据发生修改时，InnoDB不仅会修改Buffer Pool中的数据，也会在redo log buffer记录这次操作；当事务提交时，会对redo log buffer进行刷盘，记录到redo log file中。如果MySQL宕机，重启时可以读取redo log file中的数据，对数据库进行恢复。这样就不需要每次提交事务都实时进行刷脏了。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/d397f7b8274c418e8e582d7e689a0fbf.png)

5）ACID总结

- 事务的持久化是为了应对系统崩溃造成的数据丢失.
- 只有保证了事务的一致性，才能保证执行结果的正确性
- 在非并发状态下，事务间天然保证隔离性，因此只需要保证事务的原子性即可保证一致性.
- 在并发状态下，需要严格保证事务的原子性、隔离性。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1670389670045/0e07dadfa29943898a6aaeb3ccb5253b.png)