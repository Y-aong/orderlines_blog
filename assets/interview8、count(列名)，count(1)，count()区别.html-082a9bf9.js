const t=JSON.parse('{"key":"v-7daaf7ee","path":"/posts/Mysql/interview8%E3%80%81count(%E5%88%97%E5%90%8D)%EF%BC%8Ccount(1)%EF%BC%8Ccount()%E5%8C%BA%E5%88%AB.html","title":"19、count(列名)、count(1)和 count(*)","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["mysql"],"tag":["索引类型"],"description":"19、count(列名)、count(1)和 count(*) 进行统计操作时,count中的统计条件可以三种选择: EXPLAIN SELECT COUNT(*) FROM user; EXPLAIN SELECT COUNT(列名) FROM user; EXPLAIN SELECT COUNT(1) FROM user;","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Mysql/interview8%E3%80%81count(%E5%88%97%E5%90%8D)%EF%BC%8Ccount(1)%EF%BC%8Ccount()%E5%8C%BA%E5%88%AB.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"19、count(列名)、count(1)和 count(*)"}],["meta",{"property":"og:description","content":"19、count(列名)、count(1)和 count(*) 进行统计操作时,count中的统计条件可以三种选择: EXPLAIN SELECT COUNT(*) FROM user; EXPLAIN SELECT COUNT(列名) FROM user; EXPLAIN SELECT COUNT(1) FROM user;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"索引类型"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19、count(列名)、count(1)和 count(*)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"执行效果上：","slug":"执行效果上","link":"#执行效果上","children":[]},{"level":3,"title":"执行效率上：","slug":"执行效率上","link":"#执行效率上","children":[]},{"level":3,"title":"注意：","slug":"注意","link":"#注意","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":1.3,"words":389},"filePathRelative":"posts/Mysql/interview8、count(列名)，count(1)，count()区别.md","localizedDate":"July 15, 2023","excerpt":"<h1> 19、count(列名)、count(1)和 count(*)</h1>\\n<p><strong>进行统计操作时,count中的统计条件可以三种选择:</strong></p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>EXPLAIN  SELECT COUNT(*) FROM user;\\n\\nEXPLAIN  SELECT COUNT(列名) FROM user;\\n\\nEXPLAIN  SELECT COUNT(1) FROM user;\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};
