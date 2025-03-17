import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2d0f66e1.js";const e={},p=t(`<h1 id="_3、内置模块functools" tabindex="-1"><a class="header-anchor" href="#_3、内置模块functools" aria-hidden="true">#</a> 3、内置模块functools</h1><h3 id="一、内置lru缓存" tabindex="-1"><a class="header-anchor" href="#一、内置lru缓存" aria-hidden="true">#</a> 一、内置lru缓存</h3><p>LRU是一种常用的缓存算法，即最近最少使用，如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小， LRU算法选择将最近最少使用的数据淘汰，保留那些经常被命中的数据。****</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">from</span> functools <span class="token keyword">import</span> lru_cache


<span class="token decorator annotation punctuation">@lru_cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>        <span class="token comment"># 测试无缓存时将本行注释掉</span>
<span class="token keyword">def</span> <span class="token function">fib_memoization</span><span class="token punctuation">(</span>number<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> number <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span> <span class="token keyword">return</span> <span class="token number">0</span>
    <span class="token keyword">if</span> number <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span> <span class="token keyword">return</span> <span class="token number">1</span>

    <span class="token keyword">return</span> fib_memoization<span class="token punctuation">(</span>number<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> fib_memoization<span class="token punctuation">(</span>number<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>

start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
res <span class="token operator">=</span> fib_memoization<span class="token punctuation">(</span><span class="token number">33</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;耗时: </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">}</span></span><span class="token string">s&#39;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="functools-lru-cache参数说明" tabindex="-1"><a class="header-anchor" href="#functools-lru-cache参数说明" aria-hidden="true">#</a> functools.lru_cache参数说明</h4><p>lru_cache装饰器定义如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">lru_cache</span><span class="token punctuation">(</span>maxsize<span class="token operator">=</span><span class="token number">128</span><span class="token punctuation">,</span> typed<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只有连个参数，第一个参数规定缓存的数量，第二个参数如果设置为True，则严格检查被装饰函数的参数类型，默认为False</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> functools <span class="token keyword">import</span> lru_cache

<span class="token decorator annotation punctuation">@lru_cache</span><span class="token punctuation">(</span>typed<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;add&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y


<span class="token keyword">print</span><span class="token punctuation">(</span>add<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>add<span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4.0</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二次调用add函数时参数是4.0， 如果你认为这种情况可以使用缓存命中上一次3+4的结果，就将typed设置为False，如果你严格要求只有函数的参数完全一致时才能命中，那么将typed设置为True</p><h3 id="二、wraps函数" tabindex="-1"><a class="header-anchor" href="#二、wraps函数" aria-hidden="true">#</a> 二、wraps函数</h3><h4 id="自省信息丢失" tabindex="-1"><a class="header-anchor" href="#自省信息丢失" aria-hidden="true">#</a> 自省信息丢失</h4><p>函数被装饰以后，一些原本属于自己的自省信息会丢失，先来看装饰前的样子</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试装饰器
    :param sleep_time:
    :return:
    &quot;&quot;&quot;</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__doc__<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行输出结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>test

    测试装饰器
    :param sleep_time:
    :return:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>test是函数的名字，__doc__是函数的注释说明</p><p>但在被普通的装饰器装饰以后，这些信息就会丢失</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time

<span class="token keyword">def</span> <span class="token function">cost</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">warpper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        t1 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        t2 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__ <span class="token operator">+</span> <span class="token string">&quot;执行耗时&quot;</span> <span class="token operator">+</span>  <span class="token builtin">str</span><span class="token punctuation">(</span>t2<span class="token operator">-</span>t1<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> res
    <span class="token keyword">return</span> warpper

<span class="token decorator annotation punctuation">@cost</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试装饰器
    :param sleep_time:
    :return:
    &quot;&quot;&quot;</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__doc__<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>程序输出结果</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>warpper
None
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是我们所不希望看到的</p><h4 id="修复自省信息" tabindex="-1"><a class="header-anchor" href="#修复自省信息" aria-hidden="true">#</a> 修复自省信息</h4><p>wraps可以防止被装饰的函数丢失自己的自省信息，只需要增加@wraps(func)即可</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps


<span class="token keyword">def</span> <span class="token function">cost</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@wraps</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">warpper</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        t1 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        t2 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>func<span class="token punctuation">.</span>__name__ <span class="token operator">+</span> <span class="token string">&quot;执行耗时&quot;</span> <span class="token operator">+</span>  <span class="token builtin">str</span><span class="token punctuation">(</span>t2<span class="token operator">-</span>t1<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> res
    <span class="token keyword">return</span> warpper

<span class="token decorator annotation punctuation">@cost</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试装饰器
    :param sleep_time:
    :return:
    &quot;&quot;&quot;</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>sleep_time<span class="token punctuation">)</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__name__<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>__doc__<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、偏函数partial" tabindex="-1"><a class="header-anchor" href="#三、偏函数partial" aria-hidden="true">#</a> 三、偏函数partial</h3><p>偏函数partial是functools 模块里提供的一个函数。和装饰器对比来理解，装饰器改变了一个函数的行为，而偏函数不能改变一个函数的行为。偏函数只能根据已有的函数生成一个新的函数，这个新的函数完成已有函数相同的功能，但是，这个新的函数的部分参数已被偏函数确定下来</p><h4 id="常规实现" tabindex="-1"><a class="header-anchor" href="#常规实现" aria-hidden="true">#</a> 常规实现</h4><p>为了便于理解，我们构造一个使用场景，假设我们的程序要在dest目录下新建一些文件夹，那么常见的实现功能代码如下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">from</span> os <span class="token keyword">import</span> mkdir


mkdir<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">&#39;./dest&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;dir1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
mkdir<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">&#39;./dest&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;dir2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
mkdir<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string">&#39;./dest&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;dir3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>功能很简单，代码很简洁，但是有个小小的不如意之处，每次都是在dest目录下新建文件夹，既然它这么固定，是不是可以不用传递dest参数呢？</p><h4 id="偏函数实现" tabindex="-1"><a class="header-anchor" href="#偏函数实现" aria-hidden="true">#</a> 偏函数实现</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">from</span> os <span class="token keyword">import</span> mkdir
<span class="token keyword">from</span> functools <span class="token keyword">import</span> partial


dest_join <span class="token operator">=</span> partial<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">,</span> <span class="token string">&#39;./dest&#39;</span><span class="token punctuation">)</span>

mkdir<span class="token punctuation">(</span>dest_join<span class="token punctuation">(</span><span class="token string">&#39;dir1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
mkdir<span class="token punctuation">(</span>dest_join<span class="token punctuation">(</span><span class="token string">&#39;dir2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
mkdir<span class="token punctuation">(</span>dest_join<span class="token punctuation">(</span><span class="token string">&#39;dir3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","3、functools.html.vue"]]);export{d as default};
