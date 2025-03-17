import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-2d0f66e1.js";const t={},i=e(`<h1 id="_2、python闭包" tabindex="-1"><a class="header-anchor" href="#_2、python闭包" aria-hidden="true">#</a> 2、python闭包</h1><h3 id="一、定义" tabindex="-1"><a class="header-anchor" href="#一、定义" aria-hidden="true">#</a> 一、定义</h3><p>闭包概念：在一个内部函数中，对外部作用域的变量进行引用，(并且一般外部函数的返回值为内部函数)，那么内部函数就被认为是闭包。</p><h3 id="一、闭包的作用" tabindex="-1"><a class="header-anchor" href="#一、闭包的作用" aria-hidden="true">#</a> 一、闭包的作用</h3><ul><li>闭包可以保存当前的运行环境</li><li>外函数返回了内函数的引用</li><li>外函数把临时变量绑定给内函数</li><li>闭包是装饰器的基础</li></ul><h3 id="二、闭包实例" tabindex="-1"><a class="header-anchor" href="#二、闭包实例" aria-hidden="true">#</a> 二、闭包实例</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#闭包函数的实例</span>
<span class="token comment"># outer是外部函数 a和b都是外函数的临时变量</span>
<span class="token keyword">def</span> outer<span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">:</span>
    b <span class="token operator">=</span> <span class="token number">10</span>
    <span class="token comment"># inner是内函数</span>
    <span class="token keyword">def</span> inner<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment">#在内函数中 用到了外函数的临时变量</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>a<span class="token operator">+</span>b<span class="token punctuation">)</span>
    <span class="token comment"># 外函数的返回值是内函数的引用</span>
    <span class="token keyword">return</span> inner

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token comment"># 在这里我们调用外函数传入参数5</span>
    <span class="token comment">#此时外函数两个临时变量 a是5 b是10 ，并创建了内函数，然后把内函数的引用返回存给了demo</span>
    <span class="token comment"># 外函数结束的时候发现内部函数将会用到自己的临时变量，这两个临时变量就不会释放，会绑定给这个内部函数</span>
    demo <span class="token operator">=</span> outer<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
    <span class="token comment"># 我们调用内部函数，看一看内部函数是不是能使用外部函数的临时变量</span>
    <span class="token comment"># demo存了外函数的返回值，也就是inner函数的引用，这里相当于执行inner函数</span>
    demo<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 15</span>

    demo2 <span class="token operator">=</span> outer<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
    demo2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">#17</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),o=[i];function c(p,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","2、闭包的实现.html.vue"]]);export{u as default};
