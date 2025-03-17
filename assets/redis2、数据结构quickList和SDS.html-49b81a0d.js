import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as s}from"./app-2d0f66e1.js";const a={},d=s(`<h1 id="_2、quicklist和sds" tabindex="-1"><a class="header-anchor" href="#_2、quicklist和sds" aria-hidden="true">#</a> 2、quickList和SDS</h1><h3 id="一、quicklist定义" tabindex="-1"><a class="header-anchor" href="#一、quicklist定义" aria-hidden="true">#</a> 一、quickList定义</h3><p>list用quicklist来存储，quicklist存储了一个双向链表，每个节点都是一个ziplist</p><figure><img src="https://hunter-image.oss-cn-beijing.aliyuncs.com/redis/quicklist/QuickList.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在低版本的Redis中，list采用的底层数据结构是ziplist+linkedList；</p><p>高版本的Redis中底层数据结构是quicklist(它替换了ziplist+linkedList)，而quicklist也用到了ziplist</p><h3 id="二、sds定义" tabindex="-1"><a class="header-anchor" href="#二、sds定义" aria-hidden="true">#</a> 二、SDS定义</h3><p>Redis 没有直接使用 C 语言传统的字符串表示（以空字符结尾的字符数组，以下简称 C 字符串）， 而是自己构建了一种名为简单动态字符串（simple dynamic string，SDS）的抽象类型， 并将 SDS 用作 Redis 的默认字符串表示。</p><h3 id="三、sds-代码的定义" tabindex="-1"><a class="header-anchor" href="#三、sds-代码的定义" aria-hidden="true">#</a> 三、SDS 代码的定义</h3><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sdshdr</span> <span class="token punctuation">{</span>

    <span class="token comment">// 记录 buf 数组中已使用字节的数量</span>
    <span class="token comment">// 等于 SDS 所保存字符串的长度</span>
    <span class="token keyword">int</span> len<span class="token punctuation">;</span>

    <span class="token comment">// 记录 buf 数组中未使用字节的数量</span>
    <span class="token keyword">int</span> free<span class="token punctuation">;</span>

    <span class="token comment">// 字节数组，用于保存字符串</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、sds-与-c-字符串的区别" tabindex="-1"><a class="header-anchor" href="#四、sds-与-c-字符串的区别" aria-hidden="true">#</a> 四、SDS 与 C 字符串的区别</h3><ul><li>常数复杂度获取字符串长度</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>因为 C 字符串并不记录自身的长度信息， 所以为了获取一个 C 字符串的长度， 程序必须遍历整个字符串， 对遇到的每个字符进行计数， 
直到遇到代表字符串结尾的空字符为止， 这个操作的复杂度为 O(N) 。
和 C 字符串不同， 因为 SDS 在 len 属性中记录了 SDS 本身的长度， 所以获取一个 SDS 长度的复杂度仅为 O(1) 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>杜绝缓冲区溢出</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>除了获取字符串长度的复杂度高之外， C 字符串不记录自身长度带来的另一个问题是容易造成缓冲区溢出（buffer overflow）。
因为 C 字符串不记录自身的长度， 所以 strcat 假定用户在执行这个函数时， 已经为 dest 分配了足够多的内存， 可以容纳
 src 字符串中的所有内容， 而一旦这个假定不成立时， 就会产生缓冲区溢出。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>减少修改字符串时带来的内存重分配次数</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>如果程序执行的是增长字符串的操作， 比如拼接操作（append）， 那么在执行这个操作之前， 
程序需要先通过内存重分配来扩展底层数组的空间大小 —— 如果忘了这一步就会产生缓冲区溢出。
如果程序执行的是缩短字符串的操作， 比如截断操作（trim）， 那么在执行这个操作之后， 
程序需要通过内存重分配来释放字符串不再使用的那部分空间 —— 如果忘了这一步就会产生内存泄漏。

为了避免 C 字符串的这种缺陷， SDS 通过未使用空间解除了字符串长度和底层数组长度之间的关联： 
在 SDS 中， buf 数组的长度不一定就是字符数量加一， 数组里面可以包含未使用的字节， 而这
些字节的数量就由 SDS 的 free 属性记录。

通过未使用空间， SDS 实现了空间预分配和惰性空间释放两种优化策略。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>惰性空间释放</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>惰性空间释放用于优化 SDS 的字符串缩短操作： 当 SDS 的 API 需要缩短 SDS 保存的字符串时， 
程序并不立即使用内存重分配来回收缩短后多出来的字节， 而是使用 free 属性将这些字节的数量
记录起来， 并等待将来使用。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>空间预分配</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>空间预分配用于优化 SDS 的字符串增长操作： 当 SDS 的 API 对一个 SDS 进行修改， 并且需
要对SDS 进行空间扩展的时候， 程序不仅会为 SDS 分配修改所必须要的空间， 还会为 SDS 分配
额外的未使用空间。

其中， 额外分配的未使用空间数量由以下公式决定：

如果对 SDS 进行修改之后， SDS 的长度（也即是 len 属性的值）将小于 1 MB ， 那么程序分
配和 len 属性同样大小的未使用空间， 这时 SDS len 属性的值将和 free 属性的值相同。 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举个例子， 如果进行修改之后， SDS 的 len 将变成 13 字节， 那么程序也会分配 13 字节的未<br> 使用空间， SDS 的 buf 数组的实际长度将变成 13 + 13 + 1 = 27 字节（额外的一字节用于保存空字符）。</p><p>如果对 SDS 进行修改之后， SDS 的长度将大于等于 1 MB ， 那么程序会分配 1 MB 的未使用空间。<br> 举个例子， 如果进行修改之后， SDS 的 len 将变成 30 MB ， 那么程序会分配 1 MB 的未使用空间，<br> SDS 的 buf 数组的实际长度将为 30 MB + 1 MB + 1 byte 。</p></li><li><p>二进制安全</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> 字符串中的字符必须符合某种编码（比如 ASCII）， 并且除了字符串的末尾之外， 字符串里面不能包含空字符， 
否则最先被程序读入的空字符将被误认为是字符串结尾 —— 这些限制使得 C 字符串只能保存文本数据， 而不能保
存像图片、音频、视频、压缩文件这样的二进制数据。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>举个例子， 如果有一种使用空字符来分割多个单词的特殊数据格式， 如图 2-17 所示， 那么这种格式就不能使<br> 用 C 字符串来保存， 因为 C 字符串所用的函数只会识别出其中的 &quot;Redis&quot; ， 而忽略之后的 &quot;Cluster&quot; 。</p></li></ul>`,16),l=[d];function t(c,r){return i(),n("div",null,l)}const p=e(a,[["render",t],["__file","redis2、数据结构quickList和SDS.html.vue"]]);export{p as default};
