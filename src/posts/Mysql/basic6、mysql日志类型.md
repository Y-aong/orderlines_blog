---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - mysql日志
  - mysql调优
---

# basic6、mysql日志类型



explain 模拟优化器来执行sql查询，分析出查询语句或者是表结构的性能瓶颈


![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/0ffbda5da5ae491bbf13b13bf75fdbdc.png)

### 一、undo log



#### 定义

undo log用于撤销回退的日志，事务开始之前，mysql会先记录更新前的数据到undo log日志文件中，当事务回滚时使用undo log 进行回退

undo log也会产生redo log 因为undo log也要实现持久性保护

#### 作用

- 提供回滚操作（实现事务的原子性）

  ```
  在数据修改的时候，不仅记录了redo log还记录了对应的undo log可以进行回滚
  *undo log 和 redo log 记录物理日志不一样，它是*逻辑日志。可以认为当delete一条记录时，undo log中会记录一条对应的delete记录，反之亦然，当update一条记录时，它记录一条对应相反的update记录。
  ```

- 提供多版本控制(MVCC)【*undo log实现多版本并发控制（MVCC）*】

  ```
  MVCC，即多版本控制。在MySQL数据库InnoDB存储引擎中，用undo Log来实现多版本并发控制(MVCC)。当读取的某一行被其他事务锁定时，它可以从undo log中分析出该行记录以前的数据版本是怎样的，从而让用户能够读取到当前事务操作之前的数据【快照读】。
  ```



### 二、redo log



#### 定义

InnoDB引擎对数据的更新，是先将更新记录写入redo log日志，然后会在系统空闲的时候或者是按照设定的更新策略再将日志中的内容更新到磁盘之中。这就是所谓的预写式技术（Write Ahead logging）。这种技术可以大大减少IO操作的频率，提升数据刷新的效率。

redo log：被称作重做日志, 包括两部分：一个是内存中的日志缓冲： `redo log buffer`，另一个是磁盘上的日志文件： `redo log file`

#### 作用（类似于redis中的aof）

mysql 每执行一条 DML 语句，先将记录写入 redo log buffer 。后续某个时间点再一次性将多个操作记录写到 redo log file 。当故障发生致使内存数据丢失后，InnoDB会在重启时，经过重放 redo，将Page恢复到崩溃之前的状态 **通过Redo log可以实现事务的持久性



### 三、bin log



#### 定义

binlog是一个二进制格式的文件，用于记录用户对数据库更新的SQL语句信息，例如更改数据库表和更改内容的SQL语句都会记录到binlog里，但是不会记录SELECT和SHOW这类操作。

binlog在MySQL的Server层实现(引擎共用)

binlog为逻辑日志,记录的是一条SQL语句的原始逻辑

* binlog不限制大小,追加写入,不会覆盖以前的日志.
* 默认情况下，binlog日志是二进制格式的，不能使用查看文本工具的命令（比如，cat，vi等）查看，而使用mysqlbinlog解析查看。

#### 作用

1. 主从复制：在主库中开启Binlog功能，这样主库就可以把Binlog传递给从库，从库拿到Binlog后实现数据恢复达到主从数据一致性。
2. 数据恢复：通过mysqlbinlog工具来恢复数据。



### 四、redo log 和 undo log的持久化策略



#### **redo log持久化**

缓冲区数据一般情况下是无法直接写入磁盘的，中间必须经过操作系统缓冲区( OS Buffer )。因此， redo log buffer 写入 redo logfile 实际上是先写入 OS Buffer，然后再通过系统调用 fsync() 将其刷到 redo log file.

Redo Buffer 持久化到 redo log 的策略，可通过 `Innodb_flush_log_at_trx_commit` 设置：

| **参数值**         | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| 0 (延迟写)         | 事务提交时不会将 `redo log buffer`中日志写入到 `os buffer`， 而是每秒写入 `os buffer`并调用 `fsync()`写入到 `redo log file`中。 也就是说设置为0时是(大约)每秒刷新写入到磁盘中的，当系统崩溃，会丢失1秒钟的数据。 |
| 1  (实时写,实时刷) | 事务每次提交都会将 `redo log buffer`中的日志写入 `os buffer`并 调用 `fsync()`刷到 `redo log file`中。这种方式即使系统崩溃也不会丢失任何数据，但是因为每次提交都写入磁盘，IO的性能较差。 |
| 2 (实时写, 延时刷) | 每次提交都仅写入到 `os buffer`，然后是每秒调用 `fsync()`将 `os buffer`中的日志写入到 `redo log file`。 |

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/b6fcf484cec943ba99ef0780844c79d2.png)

一般建议选择取值2，因为 MySQL 挂了数据没有损失，整个服务器挂了才会损失1秒的事务提交数据

#### **undo log持久化**

MySQL中的Undo Log严格的讲不是Log，而是数据，因此他的管理和落盘都跟数据是一样的：

* Undo的磁盘结构并不是顺序的，而是像数据一样按Page管理
* Undo写入时，也像数据一样产生对应的Redo Log (因为undo也是对页面的修改，记录undo这个操作本身也会有对应的redo)。
* Undo的Page也像数据一样缓存在Buffer Pool中，跟数据Page一起做LRU换入换出，以及刷脏。Undo Page的刷脏也像数据一样要等到对应的Redo Log 落盘之后

当事务提交的时候，innodb不会立即删除undo log，因为后续还可能会用到undo log，如隔离级别为repeatable read时，事务读取的都是开启事务时的最新提交行版本，只要该事务不结束，该行版本就不能删除，即undo log不能删除。

但是在事务提交的时候，会将该事务对应的undo log放入到删除列表中，未来通过purge来删除。并且提交事务时，还会判断undo log分配的页是否可以重用，如果可以重用，则会分配给后面来的事务，避免为每个独立的事务分配独立的undo log页而浪费存储空间和性能。



### 五、bin log与undo log的区别



**1）redo log是InnoDB引擎特有的；binlog是MySQL的Server层实现的，所有引擎都可以使用。**

**2）redo log是物理日志，记录的是“在XXX数据页上做了XXX修改”；binlog是逻辑日志，记录的是原始逻辑，其记录是对应的SQL语句。**

* 物理日志: 记录的是每一个page页中具体存储的值是多少，在这个数据页上做了什么修改.  比如: 某个事物将系统表空间中的第100个页面中偏移量为1000处的那个字节的值1改为2.
* 逻辑日志: 记录的是每一个page页面中具体数据是怎么变动的，它会记录一个变动的过程或SQL语句的逻辑, 比如: 把一个page页中的一个数据从1改为2，再从2改为3,逻辑日志就会记录1->2,2->3这个数据变化的过程.

**3）redo log是循环写的，空间一定会用完，需要write pos和check point搭配；binlog是追加写，写到一定大小会切换到下一个，并不会覆盖以前的日志**

* Redo Log 文件内容是以顺序循环的方式写入文件，写满时则回溯到第一个文件，进行覆盖写。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/70fa5785c2044d038e1e6d04b553028d.png)

* **write pos**: 表示日志当前记录的位置，当ib_logfile_4写满后，会从ib_logfile_1从头开始记录；
* **check point**: 表示将日志记录的修改写进磁盘，完成数据落盘，数据落盘后checkpoint会将日志上的相关记录擦除掉，即 `write pos -> checkpoint`  之间的部分是redo log空着的部分，用于记录新的记录，`checkpoint -> write pos` 之间是redo log 待落盘的数据修改记录
* 如果 write pos 追上 checkpoint，表示写满，这时候不能再执行新的更新，得停下来先擦掉一些记录，把 checkpoint 推进一下。

**3）Redo Log作为服务器异常宕机后事务数据自动恢复使用，Binlog可以作为主从复制和数据恢复使用。Binlog没有自动crash-safe能力**

CrashSafe指MySQL服务器宕机重启后，能够保证：

* 所有已经提交的事务的数据仍然存在。

* 所有没有提交的事务的数据自动回滚。



### 六、MySQL的binlog有几种日志格式



#### 日志有三种模式



##### 1）ROW（row-based replication, RBR）：

日志中会记录每一行数据被修改的情况，然后在slave端对相同的数据进行修改。

* 优点：能清楚记录每一个行数据的修改细节，能完全实现主从数据同步和数据的恢复。而且不会出现某些特定情况下存储过程或function无法被正确复制的问题。
* 缺点：批量操作，会产生大量的日志，尤其是alter table会让日志量暴涨。

##### 2）STATMENT（statement-based replication, SBR）：

记录每一条修改数据的SQL语句（批量修改时，记录的不是单条SQL语句，而是批量修改的SQL语句事件）, slave在复制的时候SQL进程会解析成和原来master端执行过的相同的SQL再次执行。简称SQL语句复制。

* 优点：日志量小，减少磁盘IO，提升存储和恢复速度
* 缺点：在某些情况下会导致主从数据不一致，比如last_insert_id()、now()等函数。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672984425088/b8e6f4dcef054331b143f57c748d9c58.png)

##### 3）MIXED（mixed-based replication, MBR）：

以上两种模式的混合使用，一般会使用STATEMENT模式保存binlog，对于STATEMENT模式无法复制的操作使用ROW模式保存binlog，MySQL会根据执行的SQL语句选择写入模式。

企业场景如何选择binlog的模式

1. 如果生产中使用MySQL的特殊功能相对少（存储过程、触发器、函数）。选择默认的语句模式，Statement。
2. 如果生产中使用MySQL的特殊功能较多的，可以选择Mixed模式。
3. 如果生产中使用MySQL的特殊功能较多，又希望数据最大化一致，此时最好Row 模式；但是要注意，该模式的binlog日志量增长非常快.
|