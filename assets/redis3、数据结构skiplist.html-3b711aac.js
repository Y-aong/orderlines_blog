const t=JSON.parse('{"key":"v-7655754e","path":"/posts/Redis/redis3%E3%80%81%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84skiplist.html","title":"3、skip-list跳表","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["redis"],"tag":["skip list","数据结构"],"description":"3、skip-list跳表 一、定义 跳表是可以实现二分查找的有序链表，跳表=链表+多级索引 skiplist是一种以空间换取时间的结构。由于链表，无法进行二分查找，因此借鉴数据库索引的思想，提取出链表中关键节点（索引），先在关键节点上查找，再进入下层链表查找。提取多层关键节点，就形成了跳跃表 二、跳表的实现 image-20230422100426672","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Redis/redis3%E3%80%81%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84skiplist.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"3、skip-list跳表"}],["meta",{"property":"og:description","content":"3、skip-list跳表 一、定义 跳表是可以实现二分查找的有序链表，跳表=链表+多级索引 skiplist是一种以空间换取时间的结构。由于链表，无法进行二分查找，因此借鉴数据库索引的思想，提取出链表中关键节点（索引），先在关键节点上查找，再进入下层链表查找。提取多层关键节点，就形成了跳跃表 二、跳表的实现 image-20230422100426672"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"skip list"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3、skip-list跳表\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、定义","slug":"一、定义","link":"#一、定义","children":[]},{"level":3,"title":"二、跳表的实现","slug":"二、跳表的实现","link":"#二、跳表的实现","children":[]},{"level":3,"title":"三、复杂度","slug":"三、复杂度","link":"#三、复杂度","children":[]},{"level":3,"title":"四、优缺点","slug":"四、优缺点","link":"#四、优缺点","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":0.98,"words":294},"filePathRelative":"posts/Redis/redis3、数据结构skiplist.md","localizedDate":"July 15, 2023","excerpt":"<h1> 3、skip-list跳表</h1>\\n<h3> 一、定义</h3>\\n<p>跳表是可以实现二分查找的有序链表，跳表=链表+多级索引</p>\\n<p>skiplist是一种以空间换取时间的结构。由于链表，无法进行二分查找，因此借鉴数据库索引的思想，提取出链表中关键节点（索引），先在关键节点上查找，再进入下层链表查找。提取多层关键节点，就形成了跳跃表</p>\\n<h3> 二、跳表的实现</h3>\\n<figure><img src=\\"https://s2.loli.net/2023/04/22/puRBJ5FzgoIAkbZ.png\\" alt=\\"image-20230422100426672\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20230422100426672</figcaption></figure>","autoDesc":true}');export{t as data};
