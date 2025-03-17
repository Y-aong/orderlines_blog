const e=JSON.parse('{"key":"v-39f1fb8a","path":"/posts/Redis/redis9%E3%80%81%E6%8A%A2%E7%BA%A2%E5%8C%85.html","title":"9、抢红包","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["redis"],"tag":["抢红包"],"description":"9、抢红包 一、需求分析 节假日发红包抢红包，高并发业务 一个大红包分为多个小红包 每个人只可以抢一次，抢完一个就不能再抢，直到总数为0 红包过期，红包退回 二、问题点 拆分算法如何 每个人只可以抢一次，次数限制 原子性，没抢到一个红包就要减少一个库存 三、架构设计 发红包 拆分红包 金额总和为红包金额 每个人都可以抢到红包 保证每个人的金额几率相等 抢红包 记红包","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Redis/redis9%E3%80%81%E6%8A%A2%E7%BA%A2%E5%8C%85.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"9、抢红包"}],["meta",{"property":"og:description","content":"9、抢红包 一、需求分析 节假日发红包抢红包，高并发业务 一个大红包分为多个小红包 每个人只可以抢一次，抢完一个就不能再抢，直到总数为0 红包过期，红包退回 二、问题点 拆分算法如何 每个人只可以抢一次，次数限制 原子性，没抢到一个红包就要减少一个库存 三、架构设计 发红包 拆分红包 金额总和为红包金额 每个人都可以抢到红包 保证每个人的金额几率相等 抢红包 记红包"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"抢红包"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"9、抢红包\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、需求分析","slug":"一、需求分析","link":"#一、需求分析","children":[]},{"level":3,"title":"二、问题点","slug":"二、问题点","link":"#二、问题点","children":[]},{"level":3,"title":"三、架构设计","slug":"三、架构设计","link":"#三、架构设计","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":0.8,"words":239},"filePathRelative":"posts/Redis/redis9、抢红包.md","localizedDate":"July 15, 2023","excerpt":"<h1> 9、抢红包</h1>\\n<h3> 一、需求分析</h3>\\n<ul>\\n<li>节假日发红包抢红包，高并发业务</li>\\n<li>一个大红包分为多个小红包</li>\\n<li>每个人只可以抢一次，抢完一个就不能再抢，直到总数为0</li>\\n<li>红包过期，红包退回</li>\\n</ul>\\n<h3> 二、问题点</h3>\\n<p>拆分算法如何</p>\\n<p>每个人只可以抢一次，次数限制</p>\\n<p>原子性，没抢到一个红包就要减少一个库存</p>\\n<h3> 三、架构设计</h3>\\n<ul>\\n<li>发红包\\n<ul>\\n<li>拆分红包\\n<ul>\\n<li>金额总和为红包金额</li>\\n<li>每个人都可以抢到红包</li>\\n<li>保证每个人的金额几率相等</li>\\n</ul>\\n</li>\\n</ul>\\n</li>\\n<li>抢红包</li>\\n<li>记红包</li>\\n</ul>","autoDesc":true}');export{e as data};
