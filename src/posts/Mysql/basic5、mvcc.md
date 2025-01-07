---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - explain
  - mysql调优
---

# basic5、MVCC



### 一、mvcc



#### 概念

被称为多版本并发控制，在数据库中为了实现高并发的数据访问，对于数据进行多版本的处理，通过事务的可见性保证事务

最大的好处就是不加锁，读写不冲突，极大提升系统的并发性。目前mvcc只可以在rc和rr两种级别下工作

```
* MVCC，多版本并发控制, 用于实现**读已提交**和**可重复读**隔离级别。
* MVCC的核心就是 Undo log多版本链 + Read view，
“MV”就是通过 Undo log来保存数据的历史版本，实现多版本的管理，
“CC”是通过 Read-view来实现管理，
通过 Read-view原则来决定数据是否显示。同时针对不同的隔离级别， Read view的生成策略不同，也就实现了不同的隔离级别。
```

#### 行记录的三个隐藏字段

![image-20230416192111694.png](https://s2.loli.net/2023/04/22/tQedqUhPokiJpXw.png)

- DB_ROW_ID：  一般为表的定义的主键，表中也没有定义唯一索引，innodb会自动为表添加一个row_id的隐藏列作为主键
- DB_TRX_ID ：事务对于某条记录做增删改操作时，会将这个事务的id写到trx_id中
- DB_ROLL_PTR: 回滚指针,指向undo log的指针

#### undo log多版本链

每一条数据都有多个版本,版本之间通过undo log链条进行连接

![image-20230416193055777.png](https://s2.loli.net/2023/04/22/mvyo8qjAarbfNzR.png)

### 二、ReadView

Read View是 InnoDB 在实现 MVCC 时用到的一致性读视图，即 consistent read view，用于支持 RC（Read Committed，读提交）和 RR（Repeatable Read，可重复读）隔离级别的实现.

Read View简单理解就是对数据在每个时刻的状态拍成照片记录下来。那么之后获取某时刻的数据时就还是原来的照片上的数据，是不会变的.

Read View中比较重要的字段有4个:

* `m_ids` : 用来表示MySQL中哪些事务正在执行,但是没有提交.
* `min_trx_id`: 就是m_ids里最小的值.
* `max_trx_id` : 下一个要生成的事务id值,也就是最大事务id
* `creator_trx_id`: 就是你这个事务的id

**通过Read View判断记录的某个版本是否可见的方式总结:**

* `trx_id = creator_trx_id`
  如果被访问版本的trx_id,与readview中的creator_trx_id值相同,表明当前事务在访问自己修改过的记录,该版本可以被当前事务访问.
  
* `trx_id < min_trx_id`
  如果被访问版本的trx_id,小于readview中的min_trx_id值,表明生成该版本的事务在当前事务生成readview前已经提交,该版本可以被当前事务访问.
  
* `trx_id >= max_trx_id`
  如果被访问版本的trx_id,大于或等于readview中的max_trx_id值,表明生成该版本的事务在当前事务生成readview后才开启,该版本不可以被当前事务访问.
  
* `trx_id > min_trx_id && trx_id < max_trx_id`
  如果被访问版本的`trx_id`,值在`readview`的`min_trx_id`和`max_trx_id`之间，就需要判断`trx_id`属性值是不是在m_ids列表中？
  * 在：说明创建`readview`时生成该版本的事务还是活跃的,该版本不可以被访问
  
  * 不在：说明创建`readview`时生成该版本的事务已经被提交,该版本可以被访问
  
    

#### 何时生成`ReadView`快照

* 在 **读已提交（Read Committed， 简称RC）** 隔离级别下，**每一次**读取数据前都生成一个ReadVIew。
* 在 **可重复读** （Repeatable Read，简称RR）隔离级别下，在一个事务中，只在 **第一次**读取数据前生成一个ReadVIew。

#### 快照读（`Snapshot Read`）与当前读 （`Current Read`）

在 MVCC 并发控制中，读操作可以分为两类: 快照读（`Snapshot Read`）与当前读 （`Current Read`）。

* 快照读
  快照读是指读取数据时不是读取最新版本的数据，而是基于历史版本读取的一个快照信息（mysql读取undo log历史版本) ，快照读可以使普通的SELECT 读取数据时不用对表数据进行加锁，从而解决了因为对数据库表的加锁而导致的两个如下问题
  1. 解决了因加锁导致的修改数据时无法对数据读取问题.
  2. 解决了因加锁导致读取数据时无法对数据进行修改的问题.
  
* 当前读
  当前读是读取的数据库最新的数据，当前读和快照读不同，因为要读取最新的数据而且要保证事务的隔离性，所以当前读是需要对数据进行加锁的（`Update delete insert select ....lock in share mode`   , `select for update` 为当前读）
  
  

### 三、总结

* 并发环境下，写-写操作有加锁解决方案，但为了提高性能，InnoDB存储引擎提供MVCC，目的是为了解决读-写，写-读操作下不加锁仍能安全进行。
* MVCC的过程，本质就是访问版本链，并判断哪个版本可见的过程。该判断算法是通过版本上的trx_id与快照ReadView的若干个信息进行对比。
* 快照生成的时机因隔离级别不同，读已提交隔离级别下，每一次读取前都会生成一个快照ReadView；而可重复读则仅在一个事务中，第一次读取前生成一个快照。



| **Using where**           | **意味着全表扫描或者在查找使用索引的情况下，但是还有查询条件不在索引字段当中** |