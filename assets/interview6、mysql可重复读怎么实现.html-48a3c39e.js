const e=JSON.parse('{"key":"v-1256aeb0","path":"/posts/Mysql/interview6%E3%80%81mysql%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0.html","title":"17、可重复读实现","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["mysql"],"tag":["可重复读","MVCC","Undo log","ReadView"],"star":true,"description":"17、可重复读实现 可重复读（repeatable read）定义： 一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。 MVCC MVCC，多版本并发控制, 用于实现读已提交和可重复读隔离级别。 MVCC 的核心就是 Undo log 多版本链 + Read view，“MV”就是通过 Undo log 来保存数据的历史版本，实现多版本的管理，“CC”是通过 Read-view 来实现管理，通过 Read-view 原则来决定数据是否显示。同时针对不同的隔离级别， Read view 的生成策略不同，也就实现了不同的隔离级别。","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Mysql/interview6%E3%80%81mysql%E5%8F%AF%E9%87%8D%E5%A4%8D%E8%AF%BB%E6%80%8E%E4%B9%88%E5%AE%9E%E7%8E%B0.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"17、可重复读实现"}],["meta",{"property":"og:description","content":"17、可重复读实现 可重复读（repeatable read）定义： 一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。 MVCC MVCC，多版本并发控制, 用于实现读已提交和可重复读隔离级别。 MVCC 的核心就是 Undo log 多版本链 + Read view，“MV”就是通过 Undo log 来保存数据的历史版本，实现多版本的管理，“CC”是通过 Read-view 来实现管理，通过 Read-view 原则来决定数据是否显示。同时针对不同的隔离级别， Read view 的生成策略不同，也就实现了不同的隔离级别。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"可重复读"}],["meta",{"property":"article:tag","content":"MVCC"}],["meta",{"property":"article:tag","content":"Undo log"}],["meta",{"property":"article:tag","content":"ReadView"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"17、可重复读实现\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"可重复读（repeatable read）定义：","slug":"可重复读-repeatable-read-定义","link":"#可重复读-repeatable-read-定义","children":[]},{"level":3,"title":"MVCC","slug":"mvcc","link":"#mvcc","children":[]},{"level":3,"title":"Undo log 多版本链","slug":"undo-log-多版本链","link":"#undo-log-多版本链","children":[]},{"level":3,"title":"ReadView","slug":"readview","link":"#readview","children":[]},{"level":3,"title":"Read View 判断记录某个版本是否可见的规则如下","slug":"read-view-判断记录某个版本是否可见的规则如下","link":"#read-view-判断记录某个版本是否可见的规则如下","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":2.95,"words":884},"filePathRelative":"posts/Mysql/interview6、mysql可重复读怎么实现.md","localizedDate":"July 15, 2023","excerpt":"<h1> 17、可重复读实现</h1>\\n<h3> 可重复读（repeatable read）定义：</h3>\\n<p>一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。</p>\\n<h3> MVCC</h3>\\n<ul>\\n<li>\\n<p>MVCC，多版本并发控制, 用于实现<strong>读已提交</strong>和<strong>可重复读</strong>隔离级别。</p>\\n</li>\\n<li>\\n<p>MVCC 的核心就是 Undo log 多版本链 + Read view，“MV”就是通过 Undo log 来保存数据的历史版本，实现多版本的管理，“CC”是通过 Read-view 来实现管理，通过 Read-view 原则来决定数据是否显示。同时针对不同的隔离级别， Read view 的生成策略不同，也就实现了不同的隔离级别。</p>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
