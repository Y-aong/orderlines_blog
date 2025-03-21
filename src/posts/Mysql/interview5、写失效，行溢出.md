---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - 写失效
  - 行溢出
---

# 16、写失效，行溢出



### 一、什么是写失效



#### 1、原因

InnoDB 的页和操作系统的页大小不一致，InnoDB 页大小一般为 16K，操作系统页大小为 4K，InnoDB 的页写入到磁盘时，一个页需要分 4 次写。

如果存储引擎正在写入页的数据到磁盘时发生了宕机，可能出现页只写了一部分的情况，比如只写了 4K，就宕机了，这种情况叫做部分写失效（partial page write），可能会导致数据丢失。

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672133064003/186aaf40085542d5a790025d9577b34d.png)

### 双写缓冲区` Doublewrite Buffer`

为了解决写失效问题，InnoDB 实现了 double write buffer Files, 它位于系统表空间，是一个存储区域。

在 BufferPool 的 page 页刷新到磁盘真正的位置前，会先将数据存在 Doublewrite 缓冲区。这样在宕机重启时，如果出现数据页损坏，那么在应用 redo log 之前，需要通过该页的副本来还原该页，然后再进行 redo log 重做，double write 实现了 InnoDB 引擎数据页的可靠性.

默认情况下启用双写缓冲区，如果要禁用 Doublewrite 缓冲区，可以将 `innodb_doublewrite`设置为 0。

```sql
mysql> show variables like '%innodb_doublewrite%';
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| innodb_doublewrite | ON    |
+--------------------+-------+
1 row in set (0.01 sec)
```

数据双写流程

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672133064003/a31680a18f104e0da3f3cb6c1aa71866.png)

- **step1**：当进行缓冲池中的脏页刷新到磁盘的操作时,并不会直接写磁盘,每次脏页刷新必须要先写 double write .
- **step2**：通过 memcpy 函数将脏页复制到内存中的 double write buffer .
- **step3**: double write buffer 再分两次、每次 1MB, 顺序写入共享表空间的物理磁盘上, **第一次写**.
- **step4**: 在完成 double write 页的写入后，再将 double wirite buffer 中的页写入各个表的**独立表空间**文件中(数据文件 .ibd), **第二次写**。

**为什么写两次 ?**

可能有的同学会有疑问，为啥写两次，刷一次数据文件保存数据不就可以了，为什么还要写共享表空间 ?其实是因为共享表空间是在 ibdbata 文件中划出 2M 连续的空间，专门给 double write 刷脏页用的, 由于在这个过程中，**double write 页的存储是连续的，因此写入磁盘为顺序写，性能很高**；完成 double write 后，再将脏页写入实际的各个表空间文件，这时写入就是离散的了.

### 什么是行溢出
