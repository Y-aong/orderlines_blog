---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - explain
  - mysql调优
---

# 基础知识3、explain执行计划

explain 模拟优化器来执行sql查询，分析出查询语句或者是表结构的性能瓶颈


![image.png](https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/0ffbda5da5ae491bbf13b13bf75fdbdc.png)

### explain字段的解释

- id：`SELECT` 查询的序列标识。当使用 `JOIN` 查询时，涉及多个 select：

    - 当 id 相同时，执行顺序 `由上向下`。
    - 当 id 不同时，表示包含子查询，id 值会递增。`id 值越大，优先级越高，越先执行。`
    
- select type：

    - `SIMPLE`：简单查询，不包含 `UNION` 或者子查询。
    - `PRIMARY`：查询中如果包含子查询或其他部分，外层的 `SELECT` 将被标记为 `PRIMARY`。
    - `SUBQUERY`：子查询中的第一个 `SELECT`。
    - `UNION`：在 `UNION` 语句中，`UNION` 之后出现的 `SELECT`。
    - `DERIVED`：在 `FROM` 中出现的子查询将被标记为 `DERIVED`。
    - `UNION RESULT`：`UNION` 查询的结果。

- table: 当前查询执行的数据表。

- partitions: 查询所匹配记录所在的分区，对于未分区的表，值为 `NULL`。

- type:

  ```
  `system` > `const` > `eq_ref` > `ref` > `fulltext` > `ref_or_null` > `index_merge` > `unique_subquery` > `index_subquery` > `range` > `index` > `ALL`
  ```

    - `system` 表中只有一行数据，是 `const` 的一种特例。
    - `const`表中最多只有一行匹配的记录，一次查询就可以找到，常用于使用`主键`或`唯一索引`的所有字段作为查询条件。
    - `eq_ref`当连表查询时，前一张表的行在当前这张表中只有一行与之对应。是除了 `system` 与 `const` 之外最好的 join 方式，常用于使用`主键`或`唯一索引`的所有字段作为连表条件。
    - `ref`使用普通索引作为查询条件，查询结果可能找到多个符合条件的行。
    - `fulltext` 查询使用到了全文索引。
    - `ref_or_null`类似于 `ref`，MySQL 在执行时还查询了值为 `NULL` 的行。
    - `index_merge`当查询条件使用了多个索引时，表示开启了 Index Merge 优化，此时执行计划中的 `key` 列列出了使用到的索引；`ken_len` 列列出了所使用的索引的长度。
    - `unique_subquery`替代了 `eq_ref`。在一些使用 `IN` 子查询中，使用唯一索引
    - `index_subquery` 与 `unique_subquery` 类似，在 `IN` 子查询中，使用普通索引
    - `range` 对索引列进行范围查询，执行计划中的 `key` 列表示哪个索引被使用了，`key_len` 列表示使用的索引的长度。
    - `index`查询遍历了整棵索引树，与 `ALL` 类似，只不过扫描的是索引，而索引一般在内存中，速度更快。
    - `ALL`查询遍历全表，很可能要读磁盘，速度最慢。

- possible_keys 列出查询中可能被使用到的一个或多个索引，不一定被查询实际使用。

- key 查询中实际使用到的索引。如果为 `NULL`，则表示未建立索引或索引失效。

- key_len 表示查询索引时使用的字节数，在满足需求的前提下越短越好。

- ref 表示在查询索引时，哪些列或者常量被用来与索引的值进行比较。

- rows 展示 MySQL **估算**出的查询时需要遍历的行数，越少越好。

- filtered 表示估算的经过查询条件删选出的列数的百分比。例如 `rows` 是 1000，`filtered` 是 50（50%），则实际筛选出的列数为 1000 * 50% = 500。

- Extra

    - `Using filesort`在排序时使用了外部的索引排序，没有用到表内索引进行排序。
    - `Using temporary` MySQL 需要创建临时表来存储查询的结果，常见于 `ORDER BY` 和 `GROUP BY`。
    - `Using index `表明查询使用了覆盖索引，不用回表，查询效率非常高。
    - `Using where `表明查询使用了 `WHERE` 子句进行条件过滤。一般在没有使用到索引的时候会出现。
    - `Impossible WHERE` 表示 `WHERE` 子句的结果总是 false 且无法查到任意行。
    - `Using join buffer (Block Nested Loop)` 连表查询的方式，表示当被驱动表的没有使用索引的时候，MySQL 会先将驱动表读出来放到 `join buffer` 中，再遍历被驱动表与驱动表进行查询，具体见 MySQL JOIN 的内容。
    - `Using join buffer (Batched Key Access) `连表查询的方式，与 `Using join buffer (Block Nested Loop)` 类似。

### type字段

下面介绍type字段不同值表示的含义:

| **type类型** | **解释**                                                     |
| ------------ | ------------------------------------------------------------ |
| **system**   | **不进行磁盘IO,查询系统表,仅仅返回一条数据**                 |
| **const**    | **查找主键索引,最多返回1条或0条数据. 属于精确查找**          |
| **eq_ref**   | **查找唯一性索引,返回数据最多一条, 属于精确查找**            |
| **ref**      | **查找非唯一性索引,返回匹配某一条件的多条数据,属于精确查找,数据返回可能是多条.** |
| **range**    | **查找某个索引的部分索引,只检索给定范围的行,属于范围查找. 比如: > 、 < 、in 、between** |
| **index**    | **查找所有索引树,比ALL快一些,因为索引文件要比数据文件小.**   |
| **ALL**      | **不使用任何索引,直接进行全表扫描**                          |
|              |                                                              |



### Extra主要指标

Extra 是 EXPLAIN 输出中另外一个很重要的列，该列显示MySQL在查询过程中的一些详细信息

| **extra类型**             | **解释**                                                     |
| ------------------------- | ------------------------------------------------------------ |
| **Using filesort**        | **MySQL中无法利用索引完成的排序操作称为  “文件排序”**        |
| **Using index**           | **表示直接访问索引就能够获取到所需要的数据（覆盖索引），不需要通过索引回表** |
| **Using index condition** | **搜索条件中虽然出现了索引列，但是有部分条件无法使用索引，** **会根据能用索引的条件先搜索一遍再匹配无法使用索引的条件。** |
| **Using join buffer**     | **使用了连接缓存, 会显示join连接查询时,MySQL选择的查询算法** |
| **Using temporary**       | **表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询** |
| **Using where**           | **意味着全表扫描或者在查找使用索引的情况下，但是还有查询条件不在索引字段当中** |