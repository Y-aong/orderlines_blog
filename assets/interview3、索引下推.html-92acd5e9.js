const e=JSON.parse(`{"key":"v-e7c56372","path":"/posts/Mysql/interview3%E3%80%81%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8.html","title":"14、索引下推","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["mysql"],"tag":["mysql","索引下推"],"description":"14、索引下推 概念 索引下推（index condition pushdown ）简称 ICP，在 Mysql5.6 的版本上推出，用于优化查询。 SELECT * FROM users WHERE user_name LIKE '张%' AND user_age = 10;","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Mysql/interview3%E3%80%81%E7%B4%A2%E5%BC%95%E4%B8%8B%E6%8E%A8.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"14、索引下推"}],["meta",{"property":"og:description","content":"14、索引下推 概念 索引下推（index condition pushdown ）简称 ICP，在 Mysql5.6 的版本上推出，用于优化查询。 SELECT * FROM users WHERE user_name LIKE '张%' AND user_age = 10;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"mysql"}],["meta",{"property":"article:tag","content":"索引下推"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14、索引下推\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":3,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":1.44,"words":431},"filePathRelative":"posts/Mysql/interview3、索引下推.md","localizedDate":"July 15, 2023","excerpt":"<h1> 14、索引下推</h1>\\n<h3> 概念</h3>\\n<p>索引下推（index condition pushdown ）简称 ICP，在 Mysql5.6 的版本上推出，用于优化查询。</p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>SELECT * FROM users WHERE user_name LIKE '张%' AND user_age = 10;\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
