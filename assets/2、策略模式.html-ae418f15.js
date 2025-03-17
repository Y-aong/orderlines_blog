import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2d0f66e1.js";const p={},o=t(`<h1 id="_2、策略模式" tabindex="-1"><a class="header-anchor" href="#_2、策略模式" aria-hidden="true">#</a> 2、策略模式</h1><h3 id="一、定义" tabindex="-1"><a class="header-anchor" href="#一、定义" aria-hidden="true">#</a> 一、定义</h3><p>策略模式（Strategy Pattern）是行为设计模式的一种，它定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。在Python中实现策略模式通常涉及创建一个接口或基类，以及多个实现了该接口或继承自该基类的具体策略类。</p><h3 id="二、策略模式结构" tabindex="-1"><a class="header-anchor" href="#二、策略模式结构" aria-hidden="true">#</a> 二、策略模式结构</h3><ol><li><strong>上下文</strong> （Context） 维护指向具体策略的引用， 且仅通过策略接口与该对象进行交流。</li><li><strong>策略</strong> （Strategy） 接口是所有具体策略的通用接口， 它声明了一个上下文用于执行策略的方法。</li><li><strong>具体策略</strong> （Concrete Strategies） 实现了上下文所用算法的各种不同变体。</li></ol><p>策略模式是最常用的一种设计模式</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> __future__ <span class="token keyword">import</span> annotations
<span class="token keyword">from</span> abc <span class="token keyword">import</span> ABC<span class="token punctuation">,</span> abstractmethod
<span class="token keyword">from</span> typing <span class="token keyword">import</span> List


<span class="token keyword">class</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;上下文&quot;&quot;&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> strategy<span class="token punctuation">:</span> Strategy<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_strategy <span class="token operator">=</span> strategy

    <span class="token decorator annotation punctuation">@property</span>
    <span class="token keyword">def</span> <span class="token function">strategy</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Strategy<span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_strategy

    <span class="token decorator annotation punctuation">@strategy<span class="token punctuation">.</span>setter</span>
    <span class="token keyword">def</span> <span class="token function">strategy</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> strategy<span class="token punctuation">:</span> Strategy<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_strategy <span class="token operator">=</span> strategy

    <span class="token keyword">def</span> <span class="token function">do_some_business_logic</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Context: Sorting data using the strategy (not sure how it&#39;ll do it)&quot;</span><span class="token punctuation">)</span>
        result <span class="token operator">=</span> self<span class="token punctuation">.</span>_strategy<span class="token punctuation">.</span>do_algorithm<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;d&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;e&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;,&quot;</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Strategy</span><span class="token punctuation">(</span>ABC<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;策略接口&quot;&quot;&quot;</span>

    <span class="token decorator annotation punctuation">@abstractmethod</span>
    <span class="token keyword">def</span> <span class="token function">do_algorithm</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> data<span class="token punctuation">:</span> List<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>


<span class="token keyword">class</span> <span class="token class-name">ConcreteStrategyA</span><span class="token punctuation">(</span>Strategy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 具体策略A</span>
    <span class="token keyword">def</span> <span class="token function">do_algorithm</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> data<span class="token punctuation">:</span> List<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">sorted</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">ConcreteStrategyB</span><span class="token punctuation">(</span>Strategy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 具体策略B</span>
    <span class="token keyword">def</span> <span class="token function">do_algorithm</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> data<span class="token punctuation">:</span> List<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> List<span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">reversed</span><span class="token punctuation">(</span><span class="token builtin">sorted</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    context <span class="token operator">=</span> Context<span class="token punctuation">(</span>ConcreteStrategyA<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Client: Strategy is set to normal sorting.&quot;</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span>do_some_business_logic<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Client: Strategy is set to reverse sorting.&quot;</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span>strategy <span class="token operator">=</span> ConcreteStrategyB<span class="token punctuation">(</span><span class="token punctuation">)</span>
    context<span class="token punctuation">.</span>do_some_business_logic<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>《流畅的Python》一书中关于策略模式的说明非常详细，它不仅展示了如何使用面向对象的方式实现策略模式，还介绍了如何利用Python的一等函数特性来简化这种设计模式的实现。</p><p>由于Python中的函数是一等公民，可以像其他任何值一样被传递、赋值或作为参数传递给其他函数，因此可以直接用函数来代替类来实现具体策略</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 策略模式(函数实现)</span>
 
<span class="token keyword">import</span> inspect
<span class="token keyword">import</span> promotions
<span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple
 
 
Customer <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">&quot;Customer&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name fidelity&quot;</span><span class="token punctuation">)</span>
 
 
<span class="token keyword">class</span> <span class="token class-name">LineItem</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> product<span class="token punctuation">,</span> quantity<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>product <span class="token operator">=</span> product
        self<span class="token punctuation">.</span>quantity <span class="token operator">=</span> quantity
        self<span class="token punctuation">.</span>price <span class="token operator">=</span> price
 
    <span class="token keyword">def</span> <span class="token function">total</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>price <span class="token operator">*</span> self<span class="token punctuation">.</span>quantity
 
 
<span class="token keyword">class</span> <span class="token class-name">Order</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> customer<span class="token punctuation">,</span> cart<span class="token punctuation">,</span> promotion<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>customer <span class="token operator">=</span> customer
        self<span class="token punctuation">.</span>cart <span class="token operator">=</span> cart
        self<span class="token punctuation">.</span>promotion <span class="token operator">=</span> promotion
 
    <span class="token keyword">def</span> <span class="token function">total</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token string">&quot;__total&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>    <span class="token comment"># 优点：这样只用计算一次</span>
            self<span class="token punctuation">.</span>__total <span class="token operator">=</span> <span class="token builtin">sum</span><span class="token punctuation">(</span>item<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> item <span class="token keyword">in</span> self<span class="token punctuation">.</span>cart<span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__total
 
    <span class="token keyword">def</span> <span class="token function">due</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>promotion <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            discount <span class="token operator">=</span> <span class="token number">0</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            discount <span class="token operator">=</span> self<span class="token punctuation">.</span>promotion<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> discount
 
    <span class="token keyword">def</span> <span class="token function">__repr__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        fmt <span class="token operator">=</span> <span class="token string">&quot;&lt;Order total: {:.2f} due: {:.2f}&gt;&quot;</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>due<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 
 
<span class="token keyword">def</span> <span class="token function">fidelity_promo</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 为积分为1000或以上的顾客提供5%折扣 &quot;&quot;&quot;</span>
    <span class="token keyword">return</span> order<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">.05</span> <span class="token keyword">if</span> order<span class="token punctuation">.</span>customer<span class="token punctuation">.</span>fidelity <span class="token operator">&gt;=</span> <span class="token number">1000</span> <span class="token keyword">else</span> <span class="token number">0</span>
 
 
<span class="token keyword">def</span> <span class="token function">bulk_item_promo</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 单个商品为20个或以上时提供10%折扣 &quot;&quot;&quot;</span>
    discount <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">for</span> item <span class="token keyword">in</span> order<span class="token punctuation">.</span>cart<span class="token punctuation">:</span>
        <span class="token keyword">if</span> item<span class="token punctuation">.</span>quantity <span class="token operator">&gt;=</span> <span class="token number">20</span><span class="token punctuation">:</span>
            discount <span class="token operator">+=</span> item<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">.1</span>
    <span class="token keyword">return</span> discount
 
 
<span class="token keyword">def</span> <span class="token function">large_order_promo</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 订单中不同商品达到10个或以上时提供7%折扣 &quot;&quot;&quot;</span>
    distinct_items <span class="token operator">=</span> <span class="token punctuation">{</span>item<span class="token punctuation">.</span>product <span class="token keyword">for</span> item <span class="token keyword">in</span> order<span class="token punctuation">.</span>cart<span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token builtin">len</span><span class="token punctuation">(</span>distinct_items<span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> order<span class="token punctuation">.</span>total<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">.07</span>
    <span class="token keyword">return</span> <span class="token number">0</span>
 
 
<span class="token comment"># promos = [fidelity_promo, bulk_item_promo, large_order_promo]</span>
<span class="token comment"># promos = [globals()[name] for name in globals() if name.endswith(&quot;_promo&quot;)]</span>
promos <span class="token operator">=</span> <span class="token punctuation">[</span>func <span class="token keyword">for</span> name<span class="token punctuation">,</span> func <span class="token keyword">in</span> inspect<span class="token punctuation">.</span>getmembers<span class="token punctuation">(</span>promotions<span class="token punctuation">,</span> inspect<span class="token punctuation">.</span>isfunction<span class="token punctuation">)</span><span class="token punctuation">]</span>
 
 
<span class="token keyword">def</span> <span class="token function">best_promo</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot; 选择可用的最佳折扣 &quot;&quot;&quot;</span>
    <span class="token keyword">return</span> <span class="token builtin">max</span><span class="token punctuation">(</span>promo<span class="token punctuation">(</span>order<span class="token punctuation">)</span> <span class="token keyword">for</span> promo <span class="token keyword">in</span> promos<span class="token punctuation">)</span>
 
 
<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    joe <span class="token operator">=</span> Customer<span class="token punctuation">(</span><span class="token string">&#39;John Doe&#39;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
    ann <span class="token operator">=</span> Customer<span class="token punctuation">(</span><span class="token string">&quot;Ann Smith&quot;</span><span class="token punctuation">,</span> <span class="token number">1100</span><span class="token punctuation">)</span>
    cart <span class="token operator">=</span> <span class="token punctuation">[</span>LineItem<span class="token punctuation">(</span><span class="token string">&quot;banana&quot;</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            LineItem<span class="token punctuation">(</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            LineItem<span class="token punctuation">(</span><span class="token string">&quot;watermellon&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> cart<span class="token punctuation">,</span> fidelity_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>ann<span class="token punctuation">,</span> cart<span class="token punctuation">,</span> fidelity_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
 
    banana_cart <span class="token operator">=</span> <span class="token punctuation">[</span>LineItem<span class="token punctuation">(</span><span class="token string">&quot;banana&quot;</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">.5</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                   LineItem<span class="token punctuation">(</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1.5</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> banana_cart<span class="token punctuation">,</span> bulk_item_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
 
    long_cart <span class="token operator">=</span> <span class="token punctuation">[</span>LineItem<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>item_code<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1.0</span><span class="token punctuation">)</span> <span class="token keyword">for</span> item_code <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> long_cart<span class="token punctuation">,</span> large_order_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> cart<span class="token punctuation">,</span> large_order_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
 
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> long_cart<span class="token punctuation">,</span> best_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>joe<span class="token punctuation">,</span> banana_cart<span class="token punctuation">,</span> best_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>Order<span class="token punctuation">(</span>ann<span class="token punctuation">,</span> cart<span class="token punctuation">,</span> best_promo<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时我在工作中也会这么使用。即通过将算法或行为封装起来，使得它们可以在运行时根据需要选择和替换。然而，这段代码更接近于一个简单的查找表或者说是基于函数的一等公民特性实现的轻量级策略模式，我觉得他也体现了策略模式的思路。即在这个例子中，Python 的一等函数特性被用来直接将函数作为策略对象，从而避免了为每个新策略创建额外的类所带来的复杂性。这种方式简化了代码结构，并且更加符合 Pythonic 的风格。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">handle_week</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;处理一周数据&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">handle_day</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;处理一天数据&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">handle_month</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;处理一月数据&#39;</span><span class="token punctuation">)</span>
  

handlers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;week&#39;</span><span class="token punctuation">:</span> handle_week<span class="token punctuation">,</span>
    <span class="token string">&#39;day&#39;</span><span class="token punctuation">:</span> handle_day<span class="token punctuation">,</span>
    <span class="token string">&#39;month&#39;</span><span class="token punctuation">:</span> handle_month
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在传统的面向对象编程中，策略模式通常涉及定义一个接口（或抽象基类），然后创建多个实现了该接口的具体策略类。每个具体策略类都提供了一种特定的行为实现。</p><p>但是《流畅的python》一书中还探讨了如何利用Python的一等函数特性来进一步简化策略模式。由于Python中的函数是一等公民，可以像其他任何值一样被传递、赋值或作为参数传递给其他函数，因此可以直接用函数来代替类来实现具体策略。</p>`,14),e=[o];function c(i,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","2、策略模式.html.vue"]]);export{k as default};
