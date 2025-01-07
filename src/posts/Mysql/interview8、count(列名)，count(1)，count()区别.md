---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql 
tag:
  - 索引类型
---

# 8、count(列名)、count(1)和 count(*)有什么区别?



**进行统计操作时,count中的统计条件可以三种选择:**

```
EXPLAIN  SELECT COUNT(*) FROM user;

EXPLAIN  SELECT COUNT(列名) FROM user;

EXPLAIN  SELECT COUNT(1) FROM user;
```

### 执行效果上：

* count(*) 包括了所有的列,在统计时 不会忽略列值为null的数据。
* count(1) 用1表示代码行,在统计时,不会忽略列值为null的数据。
* count(列名)在统计时,会忽略列值为空的数据,就是说某个字段的值为null时不统计。

### 执行效率上：

* InnoDB引擎：count（字段) < count(1) = count(*)
  * InnoDB通过遍历最小的可用二级索引来处理select count(*) 语句，除非索引或优化器提示指示优化器使用不同的索引。如果二级索引不存在，则通过扫描聚集索引来处理。
  * InnoDB已同样的方式处理count(1)和count(*)
* MyISAM引擎：count（字段) < count(1) <= count(*)
  * MyISAM存储了数据的准确行数，使用 `count(*)`会直接读取该行数， 只有当第一列定义为NOT NULL时，count（1），才会执行该操作，所以优先选择 `count(*)`
* count(列名) 会遍历整个表，但不同的是，它会先获取列，然后判断是否为空，然后累加，因此count(列名)性能不如前两者。

### 注意：

```
count(*)，这是SQL92 定义的标准统计行数的语法，跟数据库无关，与NULL也无关。而count(列名) 是统计列值数量，不计NULL，相同列值算一个。
```

