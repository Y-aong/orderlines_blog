const e=JSON.parse('{"key":"v-7ece2314","path":"/posts/Python/Flask%E5%AD%A6%E4%B9%A0/6%E3%80%81flask_restful%E5%9F%BA%E7%B1%BB%E7%A4%BA%E4%BE%8B.html","title":"6、flask restful 基类展示","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2023-07-19T00:00:00.000Z","category":["python","flask"],"tag":["flask_restful","基类"],"description":"6、flask restful 基类展示 一、为什么要抽象基类 flask 是作为高度自由的框架，因此 flask 的代码可能会写的比较自由，这种自由可能是带有一定风险的，就是 flask 的代码可复用性并不会很高，对于简单单表的增删查改可以参考我的这种方式可以对于单表的操作变得比较简单。 我在这家工作刚来的时候公司的同事写一个增删改查接口用了将近100行代码，使用这套代码模版后相关代码只有10行内就可以完成一个增删改查的功能。这肯定大大提高了工作效率，我们可以花费更多的精力在更复杂的业务逻辑上。 二、BaseModel","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/Python/Flask%E5%AD%A6%E4%B9%A0/6%E3%80%81flask_restful%E5%9F%BA%E7%B1%BB%E7%A4%BA%E4%BE%8B.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"6、flask restful 基类展示"}],["meta",{"property":"og:description","content":"6、flask restful 基类展示 一、为什么要抽象基类 flask 是作为高度自由的框架，因此 flask 的代码可能会写的比较自由，这种自由可能是带有一定风险的，就是 flask 的代码可复用性并不会很高，对于简单单表的增删查改可以参考我的这种方式可以对于单表的操作变得比较简单。 我在这家工作刚来的时候公司的同事写一个增删改查接口用了将近100行代码，使用这套代码模版后相关代码只有10行内就可以完成一个增删改查的功能。这肯定大大提高了工作效率，我们可以花费更多的精力在更复杂的业务逻辑上。 二、BaseModel"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"flask_restful"}],["meta",{"property":"article:tag","content":"基类"}],["meta",{"property":"article:published_time","content":"2023-07-19T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"6、flask restful 基类展示\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-19T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、为什么要抽象基类","slug":"一、为什么要抽象基类","link":"#一、为什么要抽象基类","children":[]},{"level":3,"title":"二、BaseModel","slug":"二、basemodel","link":"#二、basemodel","children":[]},{"level":3,"title":"三、base view 基类","slug":"三、base-view-基类","link":"#三、base-view-基类","children":[]},{"level":3,"title":"四、response 基类","slug":"四、response-基类","link":"#四、response-基类","children":[]},{"level":3,"title":"五、基本使用","slug":"五、基本使用","link":"#五、基本使用","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":3.13,"words":938},"filePathRelative":"posts/Python/Flask学习/6、flask_restful基类示例.md","localizedDate":"July 19, 2023","excerpt":"<h1> 6、flask restful 基类展示</h1>\\n<h3> 一、为什么要抽象基类</h3>\\n<p>flask 是作为高度自由的框架，因此 flask 的代码可能会写的比较自由，这种自由可能是带有一定风险的，就是 flask 的代码可复用性并不会很高，对于简单单表的增删查改可以参考我的这种方式可以对于单表的操作变得比较简单。</p>\\n<p>我在这家工作刚来的时候公司的同事写一个增删改查接口用了将近100行代码，使用这套代码模版后相关代码只有10行内就可以完成一个增删改查的功能。这肯定大大提高了工作效率，我们可以花费更多的精力在更复杂的业务逻辑上。</p>\\n<h3> 二、BaseModel</h3>","autoDesc":true}');export{e as data};
