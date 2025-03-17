const e=JSON.parse('{"key":"v-fa5d7072","path":"/posts/Mysql/interview5%E3%80%81%E5%86%99%E5%A4%B1%E6%95%88%EF%BC%8C%E8%A1%8C%E6%BA%A2%E5%87%BA.html","title":"16、写失效，行溢出","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-15T00:00:00.000Z","category":["mysql"],"tag":["写失效","行溢出"],"description":"16、写失效，行溢出 一、什么是写失效 1、原因 InnoDB 的页和操作系统的页大小不一致，InnoDB 页大小一般为 16K，操作系统页大小为 4K，InnoDB 的页写入到磁盘时，一个页需要分 4 次写。 如果存储引擎正在写入页的数据到磁盘时发生了宕机，可能出现页只写了一部分的情况，比如只写了 4K，就宕机了，这种情况叫做部分写失效（partial page write），可能会导致数据丢失。 image.png","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Mysql/interview5%E3%80%81%E5%86%99%E5%A4%B1%E6%95%88%EF%BC%8C%E8%A1%8C%E6%BA%A2%E5%87%BA.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"16、写失效，行溢出"}],["meta",{"property":"og:description","content":"16、写失效，行溢出 一、什么是写失效 1、原因 InnoDB 的页和操作系统的页大小不一致，InnoDB 页大小一般为 16K，操作系统页大小为 4K，InnoDB 的页写入到磁盘时，一个页需要分 4 次写。 如果存储引擎正在写入页的数据到磁盘时发生了宕机，可能出现页只写了一部分的情况，比如只写了 4K，就宕机了，这种情况叫做部分写失效（partial page write），可能会导致数据丢失。 image.png"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"写失效"}],["meta",{"property":"article:tag","content":"行溢出"}],["meta",{"property":"article:published_time","content":"2023-07-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"16、写失效，行溢出\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-15T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、什么是写失效","slug":"一、什么是写失效","link":"#一、什么是写失效","children":[]},{"level":3,"title":"双写缓冲区 Doublewrite Buffer","slug":"双写缓冲区-doublewrite-buffer","link":"#双写缓冲区-doublewrite-buffer","children":[]},{"level":3,"title":"什么是行溢出","slug":"什么是行溢出","link":"#什么是行溢出","children":[]}],"git":{"createdTime":1736258707000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":2}]},"readingTime":{"minutes":2.11,"words":633},"filePathRelative":"posts/Mysql/interview5、写失效，行溢出.md","localizedDate":"July 15, 2023","excerpt":"<h1> 16、写失效，行溢出</h1>\\n<h3> 一、什么是写失效</h3>\\n<h4> 1、原因</h4>\\n<p>InnoDB 的页和操作系统的页大小不一致，InnoDB 页大小一般为 16K，操作系统页大小为 4K，InnoDB 的页写入到磁盘时，一个页需要分 4 次写。</p>\\n<p>如果存储引擎正在写入页的数据到磁盘时发生了宕机，可能出现页只写了一部分的情况，比如只写了 4K，就宕机了，这种情况叫做部分写失效（partial page write），可能会导致数据丢失。</p>\\n<figure><img src=\\"https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672133064003/186aaf40085542d5a790025d9577b34d.png\\" alt=\\"image.png\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image.png</figcaption></figure>","autoDesc":true}');export{e as data};
