---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - 优化
  - 慢查询优化
---

# 22、慢查询优化



### 一、慢查询开关



1. **默认情况下 slow_query_log 的值为 OFF，表示慢查询日志是禁用的**

```
mysql> show variables like '%slow_query_log%';
+---------------------+------------------------------+
| Variable_name       | Value                        |
+---------------------+------------------------------+
| slow_query_log      | ON                           |
| slow_query_log_file | /var/lib/mysql/test-slow.log |
+---------------------+------------------------------+
```

2. **可以通过设置 slow_query_log 的值来开启**

```
mysql> set global slow_query_log=1;
```

3. **使用** `set global slow_query_log=1` 开启了慢查询日志只对当前数据库生效，MySQL 重启后则会失效。如果要永久生效，就必须修改配置文件 my.cnf（其它系统变量也是如此）

```
-- 编辑配置
vim /etc/my.cnf

-- 添加如下内容
slow_query_log =1
slow_query_log_file=/var/lib/mysql/ruyuan-slow.log

-- 重启MySQL
service mysqld restart

mysql> show variables like '%slow_query%';
+---------------------+--------------------------------+
| Variable_name       | Value                          |
+---------------------+--------------------------------+
| slow_query_log      | ON                             |
| slow_query_log_file | /var/lib/mysql/ruyuan-slow.log |
+---------------------+--------------------------------+
```

4. 那么开启了慢查询日志后，什么样的 SQL 才会记录到慢查询日志里面呢？ 这个是由参数 `long_query_time`控制，默认情况下 long_query_time 的值为 10 秒.

```sql
mysql> show variables like 'long_query_time';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+

mysql> set global long_query_time=1;
Query OK, 0 rows affected (0.00 sec)

mysql>  show variables like 'long_query_time';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
```

5. **修改了变量 long_query_time，但是查询变量 long_query_time 的值还是 10，难道没有修改到呢？注意：使用命令 set global long_query_time=1 修改后，需要重新连接或新开一个会话才能看到修改值。**

```
mysql> show variables like 'long_query_time';
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 1.000000 |
+-----------------+----------+
```

6. `log_output` 参数是指定日志的存储方式。`log_output='FILE'` 表示将日志存入文件，默认值是'FILE'。`log_output='TABLE'` 表示将日志存入数据库，这样日志信息就会被写入到 mysql.slow_log 表中。

```
mysql> SHOW VARIABLES LIKE '%log_output%';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_output    | FILE  |
+---------------+-------+
```

> **MySQL 数据库支持同时两种日志存储方式，配置的时候以逗号隔开即可，如：log_output='FILE,TABLE'。日志记录到系统的专用日志表中，要比记录到文件耗费更多的系统资源，因此对于需要启用慢查询日志，又需要能够获得更高的系统性能，那么建议优先记录到文件.**

7. 系统变量 `log-queries-not-using-indexes`：未使用索引的查询也被记录到慢查询日志中（可选项）。如果调优的话，建议开启这个选项。

```
mysql> show variables like 'log_queries_not_using_indexes';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | OFF   |
+-------------------------------+-------+

mysql> set global log_queries_not_using_indexes=1;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like 'log_queries_not_using_indexes';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | ON    |
+-------------------------------+-------+
```



### 二、慢查询日志



**我们得到慢查询日志后，最重要的一步就是去分析这个日志。我们先来看下慢日志里到底记录了哪些内容。**

**如下图是慢日志里其中一条 SQL 的记录内容，可以看到有时间戳，用户，查询时长及具体的 SQL 等信息.**

```
# Time: 2022-02-23T13:50:45.005959Z
# User@Host: root[root] @ localhost []  Id:     3
# Query_time: 3.724273  Lock_time: 0.000371 Rows_sent: 5  Rows_examined: 5000000
SET timestamp=1645624245;
select * from test_index where hobby = '20009951' or hobby = '10009931' or hobby = '30009931' or dname = 'name4000' or dname = 'name6600';
```

- **Time: 执行时间**
- **User: 用户信息 ,Id 信息**
- **Query_time: 查询时长**
- **Lock_time: 等待锁的时长**
- **Rows_sent:查询结果的行数**
- **Rows_examined: 查询扫描的行数**
- **SET timestamp: 时间戳**
- **SQL 的具体信息**

### 三、**慢查询 SQL 优化思路**



#### **1) SQL 性能下降的原因**

在日常的运维过程中，经常会遇到 DBA 将一些执行效率较低的 SQL 发过来找开发人员分析，当我们拿到这个 SQL 语句之后，在对这些 SQL 进行分析之前，需要明确可能导致 SQL 执行性能下降的原因进行分析，执行性能下降可以体现在以下两个方面：

- **等待时间长**

  ```
  锁表导致查询一直处于等待状态，后续我们从MySQL锁的机制去分析SQL执行的原理
  ```

- **执行时间长**

  ```
  1.查询语句写的烂
  2.索引失效
  3.关联查询太多join
  4.服务器调优及各个参数的设置
  ```

#### **2) 慢查询优化思路**

1. 优先选择优化高并发执行的 SQL,因为高并发的 SQL 发生问题带来后果更严重.

   ```
   比如下面两种情况:
      SQL1: 每小时执行10000次, 每次20个IO 优化后每次18个IO,每小时节省2万次IO
      SQL2: 每小时10次,每次20000个IO,每次优化减少2000个IO,每小时节省2万次IO
      SQL2更难优化,SQL1更好优化.但是第一种属于高并发SQL,更急需优化 成本更低
   ```

2. 定位优化对象的性能瓶颈(在优化之前了解性能瓶颈在哪)

   ```
   在去优化SQL时,选择优化分方向有三个:
     1.IO(数据访问消耗的了太多的时间,查看是否正确使用了索引) ,
     2.CPU(数据运算花费了太多时间, 数据的运算分组 排序是不是有问题)
     3.网络带宽(加大网络带宽)
   ```

3. 明确优化目标

   ```
   需要根据数据库当前的状态
   数据库中与该条SQL的关系
   当前SQL的具体功能
   最好的情况消耗的资源,最差情况下消耗的资源,优化的结果只有一个给用户一个好的体验
   ```

4. 从 explain 执行计划入手

   ```
   只有explain能告诉你当前SQL的执行状态
   ```

5. 永远用小的结果集驱动大的结果集

   ```java
   小的数据集驱动大的数据集,减少内层表读取的次数

   类似于嵌套循环
   for(int i = 0; i < 5; i++){
   	for(int i = 0; i < 1000; i++){

   	}
   }
   如果小的循环在外层,对于数据库连接来说就只连接5次,进行5000次操作,如果1000在外,则需要进行1000次数据库连接,从而浪费资源，增加消耗.这就是为什么要小表驱动大表。
   ```

6. 尽可能在索引中完成排序

   ```
   排序操作用的比较多,order by 后面的字段如果在索引中,索引本来就是排好序的,所以速度很快,没有索引的话,就需要从表中拿数据,在内存中进行排序,如果内存空间不够还会发生落盘操作
   ```

7. 只获取自己需要的列

   ```
   不要使用select  * ,select * 很可能不走索引,而且数据量过大
   ```

8. 只使用最有效的过滤条件

   ```
   误区 where后面的条件越多越好,但实际上是应该用最短的路径访问到数据
   ```

9. 尽可能避免复杂的 join 和子查询

   ```
   每条SQL的JOIN操作 建议不要超过三张表
   将复杂的SQL, 拆分成多个小的SQL 单个表执行,获取的结果 在程序中进行封装
   如果join占用的资源比较多,会导致其他进程等待时间变长
   ```

10. 合理设计并利用索引

    ```
    如何判定是否需要创建索引?
     1.较为频繁的作为查询条件的字段应该创建索引.
     2.唯一性太差的字段不适合单独创建索引，即使频繁作为查询条件.（唯一性太差的字段主要是指哪些呢？如状态字段，类型字段等等这些字段中的数据可能总共就是那么几个几十个数值重复使用）（当一条Query所返回的数据超过了全表的15%的时候，就不应该再使用索引扫描来完成这个Query了）.
     3.更新非常频繁的字段不适合创建索引.（因为索引中的字段被更新的时候，不仅仅需要更新表中的数据，同时还要更新索引数据，以确保索引信息是准确的）.
     4.不会出现在WHERE子句中的字段不该创建索引.
    
    如何选择合适索引?
     1.对于单键索引，尽量选择针对当前Query过滤性更好的索引.
     2.选择联合索引时,当前Query中过滤性最好的字段在索引字段顺序中排列要靠前.
     3.选择联合索引时,尽量索引字段出现在w中比较多的索引.
    ```

#
