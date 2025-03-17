---
icon: pen-to-square
date: 2023-07-15
category:
  - redis 
tag:
  - 缓存淘汰和过期删除
---

# 11、缓存淘汰和过期删除



### 一、面试题

- redis 默认的内存是多少？在哪里查看？如何设置和修改？

  ```
  查看redis最大占用内存？  config get maxmemory
  打开redis配置文件，设置maxmemory参数，maxmemory是bytes字节类型，注意转换。
  
  redis默认内存多少可用？ redis.h 里我们可以看到最大可用内存 REDIS_DEFAULT_MAXMEMORY 的默认值是0，即最大可用内存默认没有设置最大值
  64系统下不限制内存大小，32位操作系统最多可以使用3G
  
  生产环境如何设置？
  设置为内存为最大内存的3/4
  
  什么命令查看redis的内存使用情况？ info memory
  
  ```

  

- 如果redis的内存使用超出了设置的最大值会怎么样？

  ```
  存不进去，没有加上过期时间就会导致数据写满maxmemory
  为了避免类似情况，引出下一章内存淘汰策略
  ```

  

### 二、缓存的定期淘汰策略

三种策略

- 立即删除 对于cpu不友好
- 惰性删除 对于内存不友好
- 定期删除 定期抽样，会有漏网之鱼



### 三、缓存淘汰策略

- noeviction: 不会驱逐任何key
- **allkeys-lru**: 对所有key使用LRU算法进行删除
- volatile-lru: 对所有设置了过期时间的key使用LRU算法进行删除
- allkeys-random: 对所有key随机删除
- volatile-random: 对所有设置了过期时间的key随机删除
- volatile-ttl: 删除马上要过期的key
- allkeys-lfu: 对所有key使用LFU算法进行删除
- volatile-lfu: 对所有设置了过期时间的key使用LFU算法进行删除



### 四、使用建议

**一般使用定期删除加上allkeys_lru**







