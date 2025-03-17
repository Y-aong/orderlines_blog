import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,e as a}from"./app-2d0f66e1.js";const i={},l=a(`<h1 id="_22、慢查询优化" tabindex="-1"><a class="header-anchor" href="#_22、慢查询优化" aria-hidden="true">#</a> 22、慢查询优化</h1><h3 id="一、慢查询开关" tabindex="-1"><a class="header-anchor" href="#一、慢查询开关" aria-hidden="true">#</a> 一、慢查询开关</h3><ol><li><strong>默认情况下 slow_query_log 的值为 OFF，表示慢查询日志是禁用的</strong></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; show variables like &#39;%slow_query_log%&#39;;
+---------------------+------------------------------+
| Variable_name       | Value                        |
+---------------------+------------------------------+
| slow_query_log      | ON                           |
| slow_query_log_file | /var/lib/mysql/test-slow.log |
+---------------------+------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>可以通过设置 slow_query_log 的值来开启</strong></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; set global slow_query_log=1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li><strong>使用</strong> <code>set global slow_query_log=1</code> 开启了慢查询日志只对当前数据库生效，MySQL 重启后则会失效。如果要永久生效，就必须修改配置文件 my.cnf（其它系统变量也是如此）</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>-- 编辑配置
vim /etc/my.cnf

-- 添加如下内容
slow_query_log =1
slow_query_log_file=/var/lib/mysql/ruyuan-slow.log

-- 重启MySQL
service mysqld restart

mysql&gt; show variables like &#39;%slow_query%&#39;;
+---------------------+--------------------------------+
| Variable_name       | Value                          |
+---------------------+--------------------------------+
| slow_query_log      | ON                             |
| slow_query_log_file | /var/lib/mysql/ruyuan-slow.log |
+---------------------+--------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>那么开启了慢查询日志后，什么样的 SQL 才会记录到慢查询日志里面呢？ 这个是由参数 <code>long_query_time</code>控制，默认情况下 long_query_time 的值为 10 秒.</li></ol><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>mysql<span class="token operator">&gt;</span> <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;long_query_time&#39;</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>
<span class="token operator">|</span> Variable_name   <span class="token operator">|</span> <span class="token keyword">Value</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>
<span class="token operator">|</span> long_query_time <span class="token operator">|</span> <span class="token number">10.000000</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>

mysql<span class="token operator">&gt;</span> <span class="token keyword">set</span> <span class="token keyword">global</span> long_query_time<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
Query OK<span class="token punctuation">,</span> <span class="token number">0</span> <span class="token keyword">rows</span> affected <span class="token punctuation">(</span><span class="token number">0.00</span> sec<span class="token punctuation">)</span>

mysql<span class="token operator">&gt;</span>  <span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">&#39;long_query_time&#39;</span><span class="token punctuation">;</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>
<span class="token operator">|</span> Variable_name   <span class="token operator">|</span> <span class="token keyword">Value</span>     <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>
<span class="token operator">|</span> long_query_time <span class="token operator">|</span> <span class="token number">10.000000</span> <span class="token operator">|</span>
<span class="token operator">+</span><span class="token comment">-----------------+-----------+</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li><strong>修改了变量 long_query_time，但是查询变量 long_query_time 的值还是 10，难道没有修改到呢？注意：使用命令 set global long_query_time=1 修改后，需要重新连接或新开一个会话才能看到修改值。</strong></li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; show variables like &#39;long_query_time&#39;;
+-----------------+----------+
| Variable_name   | Value    |
+-----------------+----------+
| long_query_time | 1.000000 |
+-----------------+----------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li><code>log_output</code> 参数是指定日志的存储方式。<code>log_output=&#39;FILE&#39;</code> 表示将日志存入文件，默认值是&#39;FILE&#39;。<code>log_output=&#39;TABLE&#39;</code> 表示将日志存入数据库，这样日志信息就会被写入到 mysql.slow_log 表中。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; SHOW VARIABLES LIKE &#39;%log_output%&#39;;
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| log_output    | FILE  |
+---------------+-------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>MySQL 数据库支持同时两种日志存储方式，配置的时候以逗号隔开即可，如：log_output=&#39;FILE,TABLE&#39;。日志记录到系统的专用日志表中，要比记录到文件耗费更多的系统资源，因此对于需要启用慢查询日志，又需要能够获得更高的系统性能，那么建议优先记录到文件.</strong></p></blockquote><ol start="7"><li>系统变量 <code>log-queries-not-using-indexes</code>：未使用索引的查询也被记录到慢查询日志中（可选项）。如果调优的话，建议开启这个选项。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>mysql&gt; show variables like &#39;log_queries_not_using_indexes&#39;;
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | OFF   |
+-------------------------------+-------+

mysql&gt; set global log_queries_not_using_indexes=1;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; show variables like &#39;log_queries_not_using_indexes&#39;;
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| log_queries_not_using_indexes | ON    |
+-------------------------------+-------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、慢查询日志" tabindex="-1"><a class="header-anchor" href="#二、慢查询日志" aria-hidden="true">#</a> 二、慢查询日志</h3><p><strong>我们得到慢查询日志后，最重要的一步就是去分析这个日志。我们先来看下慢日志里到底记录了哪些内容。</strong></p><p><strong>如下图是慢日志里其中一条 SQL 的记录内容，可以看到有时间戳，用户，查询时长及具体的 SQL 等信息.</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Time: 2022-02-23T13:50:45.005959Z
# User@Host: root[root] @ localhost []  Id:     3
# Query_time: 3.724273  Lock_time: 0.000371 Rows_sent: 5  Rows_examined: 5000000
SET timestamp=1645624245;
select * from test_index where hobby = &#39;20009951&#39; or hobby = &#39;10009931&#39; or hobby = &#39;30009931&#39; or dname = &#39;name4000&#39; or dname = &#39;name6600&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Time: 执行时间</strong></li><li><strong>User: 用户信息 ,Id 信息</strong></li><li><strong>Query_time: 查询时长</strong></li><li><strong>Lock_time: 等待锁的时长</strong></li><li><strong>Rows_sent:查询结果的行数</strong></li><li><strong>Rows_examined: 查询扫描的行数</strong></li><li><strong>SET timestamp: 时间戳</strong></li><li><strong>SQL 的具体信息</strong></li></ul><h3 id="三、慢查询-sql-优化思路" tabindex="-1"><a class="header-anchor" href="#三、慢查询-sql-优化思路" aria-hidden="true">#</a> 三、<strong>慢查询 SQL 优化思路</strong></h3><h4 id="_1-sql-性能下降的原因" tabindex="-1"><a class="header-anchor" href="#_1-sql-性能下降的原因" aria-hidden="true">#</a> <strong>1) SQL 性能下降的原因</strong></h4><p>在日常的运维过程中，经常会遇到 DBA 将一些执行效率较低的 SQL 发过来找开发人员分析，当我们拿到这个 SQL 语句之后，在对这些 SQL 进行分析之前，需要明确可能导致 SQL 执行性能下降的原因进行分析，执行性能下降可以体现在以下两个方面：</p><ul><li><p><strong>等待时间长</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>锁表导致查询一直处于等待状态，后续我们从MySQL锁的机制去分析SQL执行的原理
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><strong>执行时间长</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>1.查询语句写的烂
2.索引失效
3.关联查询太多join
4.服务器调优及各个参数的设置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-慢查询优化思路" tabindex="-1"><a class="header-anchor" href="#_2-慢查询优化思路" aria-hidden="true">#</a> <strong>2) 慢查询优化思路</strong></h4><ol><li><p>优先选择优化高并发执行的 SQL,因为高并发的 SQL 发生问题带来后果更严重.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>比如下面两种情况:
   SQL1: 每小时执行10000次, 每次20个IO 优化后每次18个IO,每小时节省2万次IO
   SQL2: 每小时10次,每次20000个IO,每次优化减少2000个IO,每小时节省2万次IO
   SQL2更难优化,SQL1更好优化.但是第一种属于高并发SQL,更急需优化 成本更低
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>定位优化对象的性能瓶颈(在优化之前了解性能瓶颈在哪)</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>在去优化SQL时,选择优化分方向有三个:
  1.IO(数据访问消耗的了太多的时间,查看是否正确使用了索引) ,
  2.CPU(数据运算花费了太多时间, 数据的运算分组 排序是不是有问题)
  3.网络带宽(加大网络带宽)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>明确优化目标</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>需要根据数据库当前的状态
数据库中与该条SQL的关系
当前SQL的具体功能
最好的情况消耗的资源,最差情况下消耗的资源,优化的结果只有一个给用户一个好的体验
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>从 explain 执行计划入手</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>只有explain能告诉你当前SQL的执行状态
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>永远用小的结果集驱动大的结果集</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>小的数据集驱动大的数据集<span class="token punctuation">,</span>减少内层表读取的次数

类似于嵌套循环
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
如果小的循环在外层<span class="token punctuation">,</span>对于数据库连接来说就只连接<span class="token number">5</span>次<span class="token punctuation">,</span>进行<span class="token number">5000</span>次操作<span class="token punctuation">,</span>如果<span class="token number">1000</span>在外<span class="token punctuation">,</span>则需要进行<span class="token number">1000</span>次数据库连接<span class="token punctuation">,</span>从而浪费资源，增加消耗<span class="token punctuation">.</span>这就是为什么要小表驱动大表。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>尽可能在索引中完成排序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>排序操作用的比较多,order by 后面的字段如果在索引中,索引本来就是排好序的,所以速度很快,没有索引的话,就需要从表中拿数据,在内存中进行排序,如果内存空间不够还会发生落盘操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>只获取自己需要的列</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>不要使用select  * ,select * 很可能不走索引,而且数据量过大
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>只使用最有效的过滤条件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>误区 where后面的条件越多越好,但实际上是应该用最短的路径访问到数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>尽可能避免复杂的 join 和子查询</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>每条SQL的JOIN操作 建议不要超过三张表
将复杂的SQL, 拆分成多个小的SQL 单个表执行,获取的结果 在程序中进行封装
如果join占用的资源比较多,会导致其他进程等待时间变长
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>合理设计并利用索引</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>如何判定是否需要创建索引?
 1.较为频繁的作为查询条件的字段应该创建索引.
 2.唯一性太差的字段不适合单独创建索引，即使频繁作为查询条件.（唯一性太差的字段主要是指哪些呢？如状态字段，类型字段等等这些字段中的数据可能总共就是那么几个几十个数值重复使用）（当一条Query所返回的数据超过了全表的15%的时候，就不应该再使用索引扫描来完成这个Query了）.
 3.更新非常频繁的字段不适合创建索引.（因为索引中的字段被更新的时候，不仅仅需要更新表中的数据，同时还要更新索引数据，以确保索引信息是准确的）.
 4.不会出现在WHERE子句中的字段不该创建索引.

如何选择合适索引?
 1.对于单键索引，尽量选择针对当前Query过滤性更好的索引.
 2.选择联合索引时,当前Query中过滤性最好的字段在索引字段顺序中排列要靠前.
 3.选择联合索引时,尽量索引字段出现在w中比较多的索引.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h1>`,29),d=[l];function t(r,o){return e(),s("div",null,d)}const v=n(i,[["render",t],["__file","mysql优化2、慢查询优化.html.vue"]]);export{v as default};
