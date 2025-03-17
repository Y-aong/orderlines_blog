const e=JSON.parse('{"key":"v-15efbc05","path":"/posts/Redis/redis6%E3%80%81%E6%8C%81%E4%B9%85%E5%8C%96%E6%A8%A1%E5%BC%8F.html","title":"6、持久化机制","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["redis"],"tag":["持久化方式"],"description":"6、持久化机制 Redis 的数据全部在内存里，如果突然宕机，数据就会全部丢失，因此必须有一种机制来保证 Redis 的数据不会因为故障而丢失，这种机制就是 Redis 的持久化机制。 Redis 的持久化机制有两种，第一种是RDB快照，第二种是 AOF 日志。快照是一次全量备份，AOF 日志是连续的增量备份。快照是内存数据的二进制序列化形式，在存储上非常紧凑，而 AOF 日志记录的是内存数据修改的指令记录文本。 一、RDB机制 RDB快照是某个时间点的一次全量数据备份，是二进制文件，在存储上非常紧凑。 RDB持久化触发机制分为：手动触发和自动触发 手动触发","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Redis/redis6%E3%80%81%E6%8C%81%E4%B9%85%E5%8C%96%E6%A8%A1%E5%BC%8F.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"6、持久化机制"}],["meta",{"property":"og:description","content":"6、持久化机制 Redis 的数据全部在内存里，如果突然宕机，数据就会全部丢失，因此必须有一种机制来保证 Redis 的数据不会因为故障而丢失，这种机制就是 Redis 的持久化机制。 Redis 的持久化机制有两种，第一种是RDB快照，第二种是 AOF 日志。快照是一次全量备份，AOF 日志是连续的增量备份。快照是内存数据的二进制序列化形式，在存储上非常紧凑，而 AOF 日志记录的是内存数据修改的指令记录文本。 一、RDB机制 RDB快照是某个时间点的一次全量数据备份，是二进制文件，在存储上非常紧凑。 RDB持久化触发机制分为：手动触发和自动触发 手动触发"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"持久化方式"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"6、持久化机制\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、RDB机制","slug":"一、rdb机制","link":"#一、rdb机制","children":[]},{"level":3,"title":"二、RDB执行流程","slug":"二、rdb执行流程","link":"#二、rdb执行流程","children":[]},{"level":3,"title":"三、RDB的优缺点","slug":"三、rdb的优缺点","link":"#三、rdb的优缺点","children":[]},{"level":3,"title":"四、AOF（append only file）日志","slug":"四、aof-append-only-file-日志","link":"#四、aof-append-only-file-日志","children":[]},{"level":3,"title":"三、Redis 4.0 混合持久化","slug":"三、redis-4-0-混合持久化","link":"#三、redis-4-0-混合持久化","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":9.35,"words":2805},"filePathRelative":"posts/Redis/redis6、持久化模式.md","localizedDate":"July 15, 2023","excerpt":"<h1> 6、持久化机制</h1>\\n<p>Redis 的数据全部在内存里，如果突然宕机，数据就会全部丢失，因此必须有一种机制来保证 Redis 的数据不会因为故障而丢失，这种机制就是 Redis 的持久化机制。</p>\\n<p>Redis 的持久化机制有两种，第一种是RDB快照，第二种是 AOF 日志。快照是一次全量备份，AOF 日志是连续的增量备份。快照是内存数据的二进制序列化形式，在存储上非常紧凑，而 AOF 日志记录的是内存数据修改的指令记录文本。</p>\\n<h3> 一、RDB机制</h3>\\n<p>RDB快照是某个时间点的一次全量数据备份，是二进制文件，在存储上非常紧凑。</p>\\n<p>RDB持久化触发机制分为：<strong>手动触发</strong>和<strong>自动触发</strong> <strong>手动触发</strong></p>","autoDesc":true}');export{e as data};
