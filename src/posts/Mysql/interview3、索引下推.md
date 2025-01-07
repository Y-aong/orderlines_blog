---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - mysql
  - 索引下推
---

# 3、索引下推



### 概念

索引下推（index condition pushdown ）简称 ICP，在 Mysql5.6 的版本上推出，用于优化查询。

```
SELECT * FROM users WHERE user_name LIKE '张%' AND user_age = 10;
```

根据最左前缀法则，该语句在搜索索引树的时候，只能匹配到名字第一个字是‘张’的记录，接下来是怎么处理的呢？当然就是从该记录开始，逐个回表，到主键索引上找出相应的记录，再比对 `age` 这个字段的值是否符合。

图 1: 在 (name,age) 索引里面特意去掉了 age 的值，这个过程 InnoDB 并不会去看 age 的值，只是按顺序把“name 第一个字是’张’”的记录一条条取出来回表。因此，需要回表 4 次

 MySQL 5.6 引入了索引下推优化，可以在索引遍历过程中，对索引中包含的字段先做判断，过滤掉不符合条件的记录，减少回表次数。

图 2: InnoDB 在 (name,age) 索引内部就判断了 age 是否等于 10，对于不等于 10 的记录，直接判断并跳过,减少回表次数.

![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/8832dd9ba9b44f96a92f721fbf3179fc.png)



### 总结

如果没有索引下推优化（或称 ICP 优化），当进行索引查询时，首先根据索引来查找记录，然后再根据 where 条件来过滤记录；

在支持 ICP 优化后，MySQL 会在取出索引的同时，判断是否可以进行 where 条件过滤再进行索引查询，也就是说提前执行 where 的部分过滤操作，在某些场景下，可以大大减少回表次数，从而提升整体性能。
