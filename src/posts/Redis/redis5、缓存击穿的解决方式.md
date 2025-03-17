---
icon: pen-to-square
date: 2023-07-15
category:
  - redis
tag:
  - 缓存击穿
---

# 5、缓存击穿



### 一、定义

大量的请求同时查询一个 key 时，此时这个key正好失效了，就会导致大量的请求都打到数据库上面去。

redis的高QPS特性,可以很好的解决查数据库很慢的问题。但是如果我们系统的并发很高,在某个时间节点,突然缓存失效,这时候有大量的请求打过来，那么由于redis没有缓存数据,这时候我们的请求会全部去查一遍数据库，这时候我们的数据库服务会面临非常大的风险,要么连接被占满，要么其他业务不可用，这种情况就是redis的缓存击穿



### 二、缓存的设计

![redis简单缓存设计](https://img-blog.csdnimg.cn/20210420151746278.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYXNoZW5iYW8=,size_16,color_FFFFFF,t_70)



### 三、解决缓存击穿的问题

- 定时任务主动刷新缓存

- 多级缓存模式

  ```
  设置两个redis缓存值，两个缓冲设置不同的过期时间，然后利用定时任务主动刷新缓存，当其中一个缓冲过期后，立马查询另外一个缓冲数据这样可以有效的避免缓冲击穿的现象
  ```

  ![image-20230422104209647]( https://s2.loli.net/2023/04/22/Fd7nLi3N6eWGpDl.png)



### 四、注意点

- 设置缓存的差异时间要大于数据插入到缓冲B的时间

- 缓存的创建和查询顺序

  先更新B再更新A

  查询先查缓存A再查询缓存B