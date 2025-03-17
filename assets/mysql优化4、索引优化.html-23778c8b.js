import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as n,e as i}from"./app-2d0f66e1.js";const d={},l=i(`<h1 id="_24、索引优化" tabindex="-1"><a class="header-anchor" href="#_24、索引优化" aria-hidden="true">#</a> 24、索引优化</h1><h3 id="一、总结-从-explain-执行计划入手" tabindex="-1"><a class="header-anchor" href="#一、总结-从-explain-执行计划入手" aria-hidden="true">#</a> 一、总结：从 explain 执行计划入手</h3><p>只有 explain 能告诉你当前 SQL 的执行状态</p><h3 id="二、具体操作" tabindex="-1"><a class="header-anchor" href="#二、具体操作" aria-hidden="true">#</a> 二、具体操作</h3><h4 id="_1、小的结果集驱动大的结果集" tabindex="-1"><a class="header-anchor" href="#_1、小的结果集驱动大的结果集" aria-hidden="true">#</a> 1、小的结果集驱动大的结果集</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>小的数据集驱动大的数据集,减少内层表读取的次数

类似于嵌套循环
for(int i = 0; i &lt; 5; i++){
	for(int i = 0; i &lt; 1000; i++){

	}
}
如果小的循环在外层,对于数据库连接来说就只连接5次,进行5000次操作,如果1000在外,则需要进行1000次数据库连接,从而浪费资源，增加消耗.这就是为什么要小表驱动大表。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、尽可能在索引中完成排序" tabindex="-1"><a class="header-anchor" href="#_2、尽可能在索引中完成排序" aria-hidden="true">#</a> 2、尽可能在索引中完成排序</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>排序操作用的比较多,order by 后面的字段如果在索引中,索引本来就是排好序的,所以速度很快,没有索引的话,就需要从表中拿数据,在内存中进行排序,如果内存空间不够还会发生落盘操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3、只获取自己需要的列" tabindex="-1"><a class="header-anchor" href="#_3、只获取自己需要的列" aria-hidden="true">#</a> 3、只获取自己需要的列</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>不要使用select  * ,select * 很可能不走索引,而且数据量过大
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4、使用最有效的过滤条件" tabindex="-1"><a class="header-anchor" href="#_4、使用最有效的过滤条件" aria-hidden="true">#</a> 4、使用最有效的过滤条件</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>误区 where后面的条件越多越好,但实际上是应该用最短的路径访问到数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5、尽可能避免复杂的-join-和子查询" tabindex="-1"><a class="header-anchor" href="#_5、尽可能避免复杂的-join-和子查询" aria-hidden="true">#</a> 5、尽可能避免复杂的 join 和子查询</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>每条SQL的JOIN操作 建议不要超过三张表
将复杂的SQL, 拆分成多个小的SQL 单个表执行,获取的结果 在程序中进行封装
如果join占用的资源比较多,会导致其他进程等待时间变长
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6、合理设计并利用索引" tabindex="-1"><a class="header-anchor" href="#_6、合理设计并利用索引" aria-hidden="true">#</a> 6、合理设计并利用索引</h4><div class="language-angular2html line-numbers-mode" data-ext="angular2html"><pre class="language-angular2html"><code>如何判定是否需要创建索引?
 1.较为频繁的作为查询条件的字段应该创建索引.
 2.唯一性太差的字段不适合单独创建索引，即使频繁作为查询条件.（唯一性太差的字段主要是指哪些呢？如状态字段，类型字段等等这些字段中的数据可能总共就是那么几个几十个数值重复使用）（当一条Query所返回的数据超过了全表的15%的时候，就不应该再使用索引扫描来完成这个Query了）.
 3.更新非常频繁的字段不适合创建索引.（因为索引中的字段被更新的时候，不仅仅需要更新表中的数据，同时还要更新索引数据，以确保索引信息是准确的）.
 4.不会出现在WHERE子句中的字段不该创建索引.

如何选择合适索引?
 1.对于单键索引，尽量选择针对当前Query过滤性更好的索引.
 2.选择联合索引时,当前Query中过滤性最好的字段在索引字段顺序中排列要靠前.
 3.选择联合索引时,尽量索引字段出现在w中比较多的索引.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),r=[l];function s(c,u){return a(),n("div",null,r)}const v=e(d,[["render",s],["__file","mysql优化4、索引优化.html.vue"]]);export{v as default};
