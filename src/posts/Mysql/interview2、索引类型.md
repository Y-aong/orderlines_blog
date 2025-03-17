---
icon: pen-to-square
date: 2023-07-15
category:
  - mysql
tag:
  - 索引类型
---

# 13、索引类型



### 普通索引

- **这是最基本的索引类型，基于普通字段建立的索引，没有任何限制。**

```
CREATE INDEX <索引的名字> ON tablename (字段名);
ALTER TABLE tablename ADD INDEX [索引的名字] (字段名);
CREATE TABLE tablename ( [...], INDEX [索引的名字] (字段名) );
```



### 唯一索引

- **与"普通索引"类似，不同的就是：索引字段的值必须唯一，但允许有空值 。**

```
	CREATE UNIQUE INDEX <索引的名字> ON tablename (字段名);
ALTER TABLE tablename ADD UNIQUE INDEX [索引的名字] (字段名);
CREATE TABLE tablename ( [...], UNIQUE [索引的名字] (字段名) ;
```



### 主键索引

- **它是一种特殊的唯一索引，不允许有空值。在创建或修改表时追加主键约束即可，每个表只能有一个主键。**

```sql
CREATE TABLE tablename ( [...], PRIMARY KEY (字段名) );
ALTER TABLE tablename ADD PRIMARY KEY (字段名);
```



### 复合索引

- **用户可以在多个列上建立索引，这种索引叫做组复合索引（组合索引）。复合索引可以代替多个单一索引，相比多个单一索引复合索引所需的开销更小。**

```sql
CREATE INDEX <索引的名字> ON tablename (字段名1，字段名2...);

ALTER TABLE tablename ADD INDEX [索引的名字] (字段名1，字段名2...);

CREATE TABLE tablename ( [...], INDEX [索引的名字] (字段名1，字段名2...) );
```



### 复合索引使用注意事项

- **何时使用复合索引，要根据 where 条件建索引，注意不要过多使用索引，过多使用会对更新操作效率有很大影响。**
- **如果表已经建立了(col1，col2)，就没有必要再单独建立（col1）；如果现在有(col1)索引，如果查询需要 col1 和 col2 条件，可以建立(col1,col2)复合索引，对于查询有一定提高。**
