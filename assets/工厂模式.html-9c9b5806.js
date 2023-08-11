import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-58fd5dfd.js";const e={},o=t(`<h1 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h1><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3><p><strong>工厂方法模式</strong>是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。</p><h3 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h3><ol><li><p><strong>产品</strong> （Product） 将会对接口进行声明。 对于所有由创建者及其子类构建的对象， 这些接口都是通用的。</p></li><li><p><strong>具体产品</strong> （Concrete Products） 是产品接口的不同实现。</p></li><li><p><strong>创建者</strong> （Creator） 类声明返回产品对象的工厂方法。 该方法的返回对象类型必须与产品接口相匹配。</p></li><li><p><strong>具体创建者</strong> （Concrete Creators） 将会重写基础工厂方法， 使其返回不同类型的产品。</p><p>注意， 并不一定每次调用工厂方法都会<strong>创建</strong>新的实例。 工厂方法也可以返回缓存、 对象池或其他来源的已有对象。</p></li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> __future__ <span class="token keyword">import</span> annotations
<span class="token keyword">from</span> abc <span class="token keyword">import</span> ABC<span class="token punctuation">,</span> abstractmethod


<span class="token keyword">class</span> <span class="token class-name">Creator</span><span class="token punctuation">(</span>ABC<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    抽象类接口
    &quot;&quot;&quot;</span>

    <span class="token decorator annotation punctuation">@abstractmethod</span>
    <span class="token keyword">def</span> <span class="token function">factory_method</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>

    <span class="token keyword">def</span> <span class="token function">some_operation</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        product <span class="token operator">=</span> self<span class="token punctuation">.</span>factory_method<span class="token punctuation">(</span><span class="token punctuation">)</span>
        result <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&quot;Creator: The same creator&#39;s code has just worked with </span><span class="token interpolation"><span class="token punctuation">{</span>product<span class="token punctuation">.</span>operation<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token keyword">return</span> result


<span class="token keyword">class</span> <span class="token class-name">ConcreteCreator1</span><span class="token punctuation">(</span>Creator<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;具体实现1&quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">factory_method</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Product<span class="token punctuation">:</span>
        <span class="token keyword">return</span> ConcreteProduct1<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">ConcreteCreator2</span><span class="token punctuation">(</span>Creator<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;具体实现2&quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">factory_method</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Product<span class="token punctuation">:</span>
        <span class="token keyword">return</span> ConcreteProduct2<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Product</span><span class="token punctuation">(</span>ABC<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@abstractmethod</span>
    <span class="token keyword">def</span> <span class="token function">operation</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>


<span class="token keyword">class</span> <span class="token class-name">ConcreteProduct1</span><span class="token punctuation">(</span>Product<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">operation</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&quot;{Result of the ConcreteProduct1}&quot;</span>


<span class="token keyword">class</span> <span class="token class-name">ConcreteProduct2</span><span class="token punctuation">(</span>Product<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">operation</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">str</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&quot;{Result of the ConcreteProduct2}&quot;</span>


<span class="token keyword">def</span> <span class="token function">client_code</span><span class="token punctuation">(</span>creator<span class="token punctuation">:</span> Creator<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Client: I&#39;m not aware of the creator&#39;s class, but it still works.\\n&quot;</span></span>
          <span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>creator<span class="token punctuation">.</span>some_operation<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">,</span> end<span class="token operator">=</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;App: Launched with the ConcreteCreator1.&quot;</span><span class="token punctuation">)</span>
    client_code<span class="token punctuation">(</span>ConcreteCreator1<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;App: Launched with the ConcreteCreator2.&quot;</span><span class="token punctuation">)</span>
    client_code<span class="token punctuation">(</span>ConcreteCreator2<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mysql组件库的实现使用简单工厂</p>`,7),p=[o];function c(i,l){return s(),a("div",null,p)}const d=n(e,[["render",c],["__file","工厂模式.html.vue"]]);export{d as default};
