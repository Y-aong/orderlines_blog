---
icon: pen-to-square
date: 2023-07-11
category:
  - mysql
tag:
  - 分页优化
  - 优化
---

# 优化1、分页优化



### 一、分页的实现

一般的分页查询使用简单的 limit 子句就可以实现。limit 格式如下：

```
SELECT * FROM 表名 LIMIT [offset,] rows
```

- 第一个参数指定第一个返回记录行的偏移量，注意从 0 开始；

- 第二个参数指定返回记录行的最大数目；

- 如果只给定一个参数，它表示返回最大的记录行数目；

**思考 1：如果偏移量固定，返回记录量对执行时间有什么影响？**

```
select * from user limit 10000,1;
select * from user limit 10000,10;
select * from user limit 10000,100;
select * from user limit 10000,1000;
select * from user limit 10000,10000;
```

结果：在查询记录时，返回记录量低于 100 条，查询时间基本没有变化，差距不大。随着查询记录量越大，所花费的时间也会越来越多。

**思考 2：如果查询偏移量变化，返回记录数固定对执行时间有什么影响？**

```
select * from user limit 1,100;
select * from user limit 10,100;
select * from user limit 100,100;
select * from user limit 1000,100;
select * from user limit 10000,100;
```

结果：在查询记录时，如果查询记录量相同，偏移量超过 100 后就开始随着偏移量增大，查询时间急剧的增加。（这种分页查询机制，每次都会从数据库第一条记录开始扫描，越往后查询越慢，而且查询的数据越多，也会拖慢总查询速度。）



### 二、分页优化策略

**优化 1: 通过索引进行分页**，使用主键 id

直接进行 limit 操作 会产生全表扫描,速度很慢. Limit 限制的是从结果集的 M 位置处取出 N 条输出,其余抛弃.

假设 ID 是连续递增的,我们根据查询的页数和查询的记录数可以算出查询的 id 的范围，然后配合 limit 使用

```
EXPLAIN SELECT * FROM user WHERE id  >= 100001 LIMIT 100;
```

**优化 2：利用子查询优化**

```
-- 首先定位偏移位置的id
SELECT id FROM user_contacts LIMIT 100000,1;

-- 根据获取到的id值向后查询.
EXPLAIN SELECT * FROM user_contacts WHERE id >=
(SELECT id FROM user_contacts LIMIT 100000,1) LIMIT 100;
```

原因：使用了 id 做主键比较(id>=)，并且子查询使用了覆盖索引进行优化。
