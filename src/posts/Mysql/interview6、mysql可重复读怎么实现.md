---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - 可重复读
  - MVCC
  - Undo log
  - ReadView
star: true
---

# 17、可重复读实现



### 可重复读（repeatable read）定义：

一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。



### MVCC

- MVCC，多版本并发控制, 用于实现**读已提交**和**可重复读**隔离级别。

- MVCC 的核心就是 Undo log 多版本链 + Read view，“MV”就是通过 Undo log 来保存数据的历史版本，实现多版本的管理，“CC”是通过 Read-view 来实现管理，通过 Read-view 原则来决定数据是否显示。同时针对不同的隔离级别， Read view 的生成策略不同，也就实现了不同的隔离级别。

  

### Undo log 多版本链

每条数据都有两个隐藏字段:

- trx_id: 事务 id,记录最近一次更新这条数据的事务 id.
- roll_pointer: 回滚指针,指向之前生成的 undo log

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/3914ba59208c40a1816d7aa616bdb00c.png)

每一条数据都有多个版本,版本之间通过 undo log 链条进行连接通过这样的设计方式,可以保证每个事务提交的时候,一旦需要回滚操作,可以保证同一个事务只能读取到比当前版本更早提交的值,不能看到更晚提交的值。



### ReadView

Read View 是 InnoDB 在实现 MVCC 时用到的一致性读视图，即 consistent read view，用于支持 RC（Read Committed，读提交）和 RR（Repeatable Read，可重复读）隔离级别的实现.

Read View 简单理解就是对数据在某个时刻的状态拍成照片记录下来。那么之后获取某时刻的数据时就还是原来的照片上的数据，是不会变的.

Read View 中比较重要的字段有 4 个:

- `m_ids` : 用来表示 MySQL 中哪些事务正在执行,但是没有提交.
- `min_trx_id`: 就是 m_ids 里最小的值.
- `max_trx_id` : 下一个要生成的事务 id 值,也就是最大事务 id
- `creator_trx_id`: 就是你这个事务的 id

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/10f8a6842fd14b5fa3c510f54bcfac20.png)

当一个事务第一次执行查询 sql 时，会生成一致性视图 read-view（快照），查询时从 undo log 中最新的一条记录开始跟 read-view 做对比，如果不符合比较规则，就根据回滚指针回滚到上一条记录继续比较，直到得到符合比较条件的查询结果。



### Read View 判断记录某个版本是否可见的规则如下

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/29c8f326cf8a484dad8da5e9c157c217.png)

1.如果当前记录的事务 id 落在绿色部分（trx_id < min_id），表示这个版本是已提交的事务生成的，可读。 2.如果当前记录的事务 id 落在红色部分（trx_id > max_id），表示这个版本是由将来启动的事务生成的，不可读。

3. 如果当前记录的事务 id 落在黄色部分（min_id <= trx_id <= max_id），则分为两种情况：

4. 若当前记录的事务 id 在未提交事务的数组中，则此条记录不可读；
5. 若当前记录的事务 id 不在未提交事务的数组中，则此条记录可读。

RC 和 RR 隔离级别都是由 MVCC 实现，区别在于：

- RC 隔离级别时，read-view 是每次执行 select 语句时都生成一个；
- RR 隔离级别时，read-view 是在第一次执行 select 语句时生成一个，同一事务中后面的所有 select 语句都复用这个 read-view 。
