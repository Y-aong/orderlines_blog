import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-2d0f66e1.js";const e={},t=p(`<h1 id="_3、python装饰器" tabindex="-1"><a class="header-anchor" href="#_3、python装饰器" aria-hidden="true">#</a> 3、python装饰器</h1><p>定义：装饰器可以在不改变原有代码的基础上，引用源代码的变量和返回值从而可以改变源代码的行为。</p><h3 id="一、简单示例" tabindex="-1"><a class="header-anchor" href="#一、简单示例" aria-hidden="true">#</a> 一、简单示例</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time


<span class="token keyword">def</span> <span class="token function">time_use</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        start <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token punctuation">)</span>
        end <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;执行用时::</span><span class="token interpolation"><span class="token punctuation">{</span>end <span class="token operator">-</span> start<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> res

    <span class="token keyword">return</span> wrapper


<span class="token decorator annotation punctuation">@time_use</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>

test<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、带有参数" tabindex="-1"><a class="header-anchor" href="#二、带有参数" aria-hidden="true">#</a> 二、带有参数</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">from</span> functools <span class="token keyword">import</span> wraps


<span class="token keyword">def</span> <span class="token function">retry</span><span class="token punctuation">(</span>count<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">,</span> sleep<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token decorator annotation punctuation">@wraps</span>
        <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            res <span class="token operator">=</span> <span class="token boolean">None</span>
            <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">try</span><span class="token punctuation">:</span>
                    res <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
                <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;函数执行出错::</span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
                    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span>sleep<span class="token punctuation">)</span>
                    <span class="token keyword">continue</span>
            <span class="token keyword">return</span> res

        <span class="token keyword">return</span> inner

    <span class="token keyword">return</span> wrapper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、基于类的装饰器" tabindex="-1"><a class="header-anchor" href="#三、基于类的装饰器" aria-hidden="true">#</a> 三、基于类的装饰器</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time


<span class="token keyword">class</span> <span class="token class-name">Decorator</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>func <span class="token operator">=</span> func

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        t1 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        res <span class="token operator">=</span> self<span class="token punctuation">.</span>func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
        t2 <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;函数执行时长:&quot;</span><span class="token operator">+</span> <span class="token builtin">str</span><span class="token punctuation">(</span>t2 <span class="token operator">-</span> t1<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token decorator annotation punctuation">@Decorator</span>
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1.5</span><span class="token punctuation">)</span>

test<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、使用装饰器实现缓存" tabindex="-1"><a class="header-anchor" href="#四、使用装饰器实现缓存" aria-hidden="true">#</a> 四、使用装饰器实现缓存</h3><h4 id="_1-缓存算法" tabindex="-1"><a class="header-anchor" href="#_1-缓存算法" aria-hidden="true">#</a> 1. 缓存算法</h4><p>经典的缓存算法有3个：</p><ol><li><code>FIFO</code>算法</li><li><code>LFU</code>算法</li><li><code>LRU</code>算法</li></ol><h4 id="_1-1-fifo算法" tabindex="-1"><a class="header-anchor" href="#_1-1-fifo算法" aria-hidden="true">#</a> 1.1 FIFO算法</h4><p>FIFO（First in First out），先进先出， 该算法的核心原则是： 如果一个数据最先进入缓存中，则应该最早淘汰掉，当缓存容量满了以后，应当将最早被缓存的数据淘汰掉。FIFO算法是一种比较简单的算法，使用队列就可以轻易的实现。</p><h4 id="_1-2-lfu算法" tabindex="-1"><a class="header-anchor" href="#_1-2-lfu算法" aria-hidden="true">#</a> 1.2 <code>LFU</code>算法</h4><p><code>LFU</code>（Least Frequently Used）最近最少使用算法， 这个算法的核心在于：<strong>如果一个数据在最近一段时间内使用次数很少，那么在将来一段时间内被使用的可能性也很小</strong>。</p><h4 id="_1-3-lru算法" tabindex="-1"><a class="header-anchor" href="#_1-3-lru算法" aria-hidden="true">#</a> 1.3<code> LRU</code>算法</h4><p><code>LRU</code> (Least Recently Used)， 最近最久未使用算法，该算法的核心原则是：<strong>如果一个数据在最近一段时间没有被访问到，那么在将来它被访问的可能性也很小</strong></p><p><code>LFU</code>算法和<code>LRU</code>算法乍看起来是一个意思，但其实很不同，<code>LRU</code>的淘汰规则是基于访问时间，而<code>LFU</code>是基于访问次数的。</p><p>一个缓存的数据，一段时间内被命中很多次，这个数据在<code>LFU</code>算法里会被保留，但在<code>LRU</code>算法里则可能被淘汰，虽然这段时间内，比如2分钟内被命中了很多次，可是，这些事情都发生在1分50秒之前的10秒钟里，自那以后就再也没有被命中，<code>LRU</code>算法则可能会将其淘汰。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> inspect <span class="token keyword">import</span> signature


<span class="token keyword">def</span> <span class="token function">fifo_cache</span><span class="token punctuation">(</span>maxsize<span class="token operator">=</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    cache <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    cache_list <span class="token operator">=</span> <span class="token builtin">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">wrapper</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">:</span>
        sig <span class="token operator">=</span> signature<span class="token punctuation">(</span>func<span class="token punctuation">)</span>

        <span class="token keyword">def</span> <span class="token function">inner</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
            bound_values <span class="token operator">=</span> sig<span class="token punctuation">.</span>bind<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            key <span class="token operator">=</span> bound_values<span class="token punctuation">.</span>__str__<span class="token punctuation">(</span><span class="token punctuation">)</span>
            value <span class="token operator">=</span> cache<span class="token punctuation">.</span>get<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
            <span class="token keyword">if</span> value<span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;命中缓存&#39;</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> value
            <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>cache_list<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> maxsize<span class="token punctuation">:</span>
                old_key <span class="token operator">=</span> cache_list<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> old_key <span class="token keyword">in</span> cache<span class="token punctuation">:</span> cache<span class="token punctuation">.</span>pop<span class="token punctuation">(</span>old_key<span class="token punctuation">)</span>

            result <span class="token operator">=</span> func<span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span>
            cache_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>key<span class="token punctuation">)</span>
            cache<span class="token punctuation">.</span>setdefault<span class="token punctuation">(</span>key<span class="token punctuation">,</span> result<span class="token punctuation">)</span>
            <span class="token keyword">return</span> result

        <span class="token keyword">return</span> inner

    <span class="token keyword">return</span> wrapper


<span class="token decorator annotation punctuation">@fifo_cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">test1</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y


<span class="token decorator annotation punctuation">@fifo_cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">test2</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y <span class="token operator">+</span> z


<span class="token decorator annotation punctuation">@fifo_cache</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">test3</span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token number">5</span>


<span class="token keyword">print</span><span class="token punctuation">(</span>test1<span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>test2<span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>test2<span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>  <span class="token comment"># 不会命中缓存</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>test3<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> x<span class="token operator">=</span><span class="token number">6</span><span class="token punctuation">,</span> y<span class="token operator">=</span><span class="token number">9</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>test1<span class="token punctuation">(</span><span class="token number">19</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21),o=[t];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","3、装饰器.html.vue"]]);export{d as default};
