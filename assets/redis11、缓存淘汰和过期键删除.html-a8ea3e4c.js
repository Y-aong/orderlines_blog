import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as l,e as a}from"./app-2d0f66e1.js";const n={},d=a(`<h1 id="_11、缓存淘汰和过期删除" tabindex="-1"><a class="header-anchor" href="#_11、缓存淘汰和过期删除" aria-hidden="true">#</a> 11、缓存淘汰和过期删除</h1><h3 id="一、面试题" tabindex="-1"><a class="header-anchor" href="#一、面试题" aria-hidden="true">#</a> 一、面试题</h3><ul><li><p>redis 默认的内存是多少？在哪里查看？如何设置和修改？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>查看redis最大占用内存？  config get maxmemory
打开redis配置文件，设置maxmemory参数，maxmemory是bytes字节类型，注意转换。

redis默认内存多少可用？ redis.h 里我们可以看到最大可用内存 REDIS_DEFAULT_MAXMEMORY 的默认值是0，即最大可用内存默认没有设置最大值
64系统下不限制内存大小，32位操作系统最多可以使用3G

生产环境如何设置？
设置为内存为最大内存的3/4

什么命令查看redis的内存使用情况？ info memory

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>如果redis的内存使用超出了设置的最大值会怎么样？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>存不进去，没有加上过期时间就会导致数据写满maxmemory
为了避免类似情况，引出下一章内存淘汰策略
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="二、缓存的定期淘汰策略" tabindex="-1"><a class="header-anchor" href="#二、缓存的定期淘汰策略" aria-hidden="true">#</a> 二、缓存的定期淘汰策略</h3><p>三种策略</p><ul><li>立即删除 对于cpu不友好</li><li>惰性删除 对于内存不友好</li><li>定期删除 定期抽样，会有漏网之鱼</li></ul><h3 id="三、缓存淘汰策略" tabindex="-1"><a class="header-anchor" href="#三、缓存淘汰策略" aria-hidden="true">#</a> 三、缓存淘汰策略</h3><ul><li>noeviction: 不会驱逐任何key</li><li><strong>allkeys-lru</strong>: 对所有key使用LRU算法进行删除</li><li>volatile-lru: 对所有设置了过期时间的key使用LRU算法进行删除</li><li>allkeys-random: 对所有key随机删除</li><li>volatile-random: 对所有设置了过期时间的key随机删除</li><li>volatile-ttl: 删除马上要过期的key</li><li>allkeys-lfu: 对所有key使用LFU算法进行删除</li><li>volatile-lfu: 对所有设置了过期时间的key使用LFU算法进行删除</li></ul><h3 id="四、使用建议" tabindex="-1"><a class="header-anchor" href="#四、使用建议" aria-hidden="true">#</a> 四、使用建议</h3><p><strong>一般使用定期删除加上allkeys_lru</strong></p>`,10),r=[d];function s(t,c){return i(),l("div",null,r)}const m=e(n,[["render",s],["__file","redis11、缓存淘汰和过期键删除.html.vue"]]);export{m as default};
