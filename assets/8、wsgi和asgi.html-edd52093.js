const e=JSON.parse('{"key":"v-5f1654a8","path":"/posts/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/Flask%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/8%E3%80%81wsgi%E5%92%8Casgi.html","title":"8、WSGI 和 ASGI","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2024-03-05T00:00:00.000Z","category":["源码分析","flask"],"tag":["源码分析","flask","wsgi"],"description":"8、WSGI 和 ASGI 一、WSGI 和 ASGI 的核心区别 1. 同步 vs 异步 WSGI（Web Server Gateway Interface） 同步接口：基于线程或进程处理请求，每个请求按顺序执行，前一个请求完成后再处理下一个。 适用场景：传统同步 Web 应用，如低并发场景、IO 密集型任务（如数据库查询）。 ASGI（Asynchronous Server Gateway Interface） 异步接口：基于事件循环和协程（如 async/await），支持同时处理多个请求，无需等待前一个请求完成。 适用场景：高并发场景、实时应用（如 WebSocket、长连接、聊天应用）、HTTP/2 等协议。","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/Flask%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/8%E3%80%81wsgi%E5%92%8Casgi.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"8、WSGI 和 ASGI"}],["meta",{"property":"og:description","content":"8、WSGI 和 ASGI 一、WSGI 和 ASGI 的核心区别 1. 同步 vs 异步 WSGI（Web Server Gateway Interface） 同步接口：基于线程或进程处理请求，每个请求按顺序执行，前一个请求完成后再处理下一个。 适用场景：传统同步 Web 应用，如低并发场景、IO 密集型任务（如数据库查询）。 ASGI（Asynchronous Server Gateway Interface） 异步接口：基于事件循环和协程（如 async/await），支持同时处理多个请求，无需等待前一个请求完成。 适用场景：高并发场景、实时应用（如 WebSocket、长连接、聊天应用）、HTTP/2 等协议。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"源码分析"}],["meta",{"property":"article:tag","content":"flask"}],["meta",{"property":"article:tag","content":"wsgi"}],["meta",{"property":"article:published_time","content":"2024-03-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"8、WSGI 和 ASGI\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-05T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、WSGI 和 ASGI 的核心区别","slug":"一、wsgi-和-asgi-的核心区别","link":"#一、wsgi-和-asgi-的核心区别","children":[]},{"level":3,"title":"二、主流框架与服务器的接口支持","slug":"二、主流框架与服务器的接口支持","link":"#二、主流框架与服务器的接口支持","children":[]},{"level":3,"title":"三、如何选择？","slug":"三、如何选择","link":"#三、如何选择","children":[]},{"level":3,"title":"四、总结","slug":"四、总结","link":"#四、总结","children":[]}],"git":{"createdTime":1742205053000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":1}]},"readingTime":{"minutes":2.81,"words":842},"filePathRelative":"posts/源码分析/Flask源码分析/8、wsgi和asgi.md","localizedDate":"March 5, 2024","excerpt":"<h1> 8、WSGI 和 ASGI</h1>\\n<h3> <strong>一、WSGI 和 ASGI 的核心区别</strong></h3>\\n<h4> <strong>1. 同步 vs 异步</strong></h4>\\n<ul>\\n<li>\\n<p><strong>WSGI（Web Server Gateway Interface）</strong></p>\\n<ul>\\n<li><strong>同步接口</strong>：基于线程或进程处理请求，每个请求按顺序执行，前一个请求完成后再处理下一个。</li>\\n<li><strong>适用场景</strong>：传统同步 Web 应用，如低并发场景、IO 密集型任务（如数据库查询）。</li>\\n</ul>\\n</li>\\n<li>\\n<p><strong>ASGI（Asynchronous Server Gateway Interface）</strong></p>\\n<ul>\\n<li><strong>异步接口</strong>：基于事件循环和协程（如 <code>async/await</code>），支持同时处理多个请求，无需等待前一个请求完成。</li>\\n<li><strong>适用场景</strong>：高并发场景、实时应用（如 WebSocket、长连接、聊天应用）、HTTP/2 等协议。</li>\\n</ul>\\n</li>\\n</ul>","autoDesc":true}');export{e as data};
