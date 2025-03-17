import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-2d0f66e1.js";const t={},p=e(`<h1 id="_4、with-上下文语句" tabindex="-1"><a class="header-anchor" href="#_4、with-上下文语句" aria-hidden="true">#</a> 4、with 上下文语句</h1><h3 id="一、什么是with-上下文语句" tabindex="-1"><a class="header-anchor" href="#一、什么是with-上下文语句" aria-hidden="true">#</a> <strong>一、什么是with 上下文语句</strong></h3><ul><li>with 语句用于管理上下文语句，可以使用with作为上下文管理器</li><li>上下文，相当于现实生活中的上下文语义，在python中脱离了上下文环境所声明的类，属性可能会失效</li></ul><h3 id="二、什么情况下会声明上下文" tabindex="-1"><a class="header-anchor" href="#二、什么情况下会声明上下文" aria-hidden="true">#</a> <strong>二、什么情况下会声明上下文</strong></h3><p>在我们需要操作资源的时候，可以使用上下文语句，来操作资源的连接和关闭，专注于业务代码的实现</p><p>经典的例子就是操作文件时使用的</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;demo.txt&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
    f<span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、我们如何声明一个上下文管理器" tabindex="-1"><a class="header-anchor" href="#三、我们如何声明一个上下文管理器" aria-hidden="true">#</a> <strong>三、我们如何声明一个上下文管理器</strong></h3><p>声明一个类，类中实现了<code>__enter__</code>, <code>__exit__</code>方法的就是一个上下文管理器</p><p><strong>例子</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">MyResource</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;begin connect resource&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_value<span class="token punctuation">,</span> tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;close connection&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">query</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;begin execute resource&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">with</span> MyResource<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> resource<span class="token punctuation">:</span>
    resource<span class="token punctuation">.</span>query<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>打印结果</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>begin connect resource
begin execute resource
close connection
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>问题一、这个as 后面的到底是什么<br> 在当前上下文环境中它是<code>__enter__</code>方法中返回的值，当脱离了这个上下文环境就是<code>None</code></p></li><li><p>问题二、 <code>__exit__</code>中参数 exc_type, exc_value, tb是代表着什么<br> 当上下文中的代码正常执行的时候这些参数都是<code>None</code>没有任何意义，当上下文代码中出现异常时，这里的参数就代表这异常信息</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">MyResource</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__enter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;begin connect resource&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self

    <span class="token keyword">def</span> <span class="token function">__exit__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> exc_type<span class="token punctuation">,</span> exc_value<span class="token punctuation">,</span> tb<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;exc_type==</span><span class="token interpolation"><span class="token punctuation">{</span>exc_type<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;exc_value==</span><span class="token interpolation"><span class="token punctuation">{</span>exc_value<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;tb==</span><span class="token interpolation"><span class="token punctuation">{</span>tb<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;close connection&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">query</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;begin execute resource&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">with</span> MyResource<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> resource<span class="token punctuation">:</span>
    resource<span class="token punctuation">.</span>query<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 结果</span>
<span class="token comment"># begin connect resource</span>
<span class="token comment"># exc_type==&lt;class &#39;ZeroDivisionError&#39;&gt;</span>
<span class="token comment"># exc_value==division by zero</span>
<span class="token comment"># tb==&lt;traceback object at 0x018DEA80&gt;</span>
<span class="token comment"># close connection</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>问题三、<code>__exit__</code>是否有返回值</p></li></ul><p><code>__exit__</code>可以有返回值，返回值只可以为True和False两种，True代表着出现异常，会在上下文中进行处理，不会返回出结果，False代表着出现异常会将错误信息返回出来可以被try except所捕获，<strong>默认没有返回值就是返回None,也就是False</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> MyResource<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">as</span> resource<span class="token punctuation">:</span>
        <span class="token number">1</span><span class="token operator">/</span><span class="token number">0</span>
        resource<span class="token punctuation">.</span>query<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;error===</span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    
<span class="token comment"># 没有返回值-&gt;False</span>
begin connect resource
exc_type<span class="token operator">==</span><span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">&#39;ZeroDivisionError&#39;</span><span class="token operator">&gt;</span>
exc_value<span class="token operator">==</span>division by zero
tb<span class="token operator">==</span><span class="token operator">&lt;</span>traceback <span class="token builtin">object</span> at <span class="token number">0x0152FA58</span><span class="token operator">&gt;</span>
close connection
error<span class="token operator">==</span><span class="token operator">=</span>division by zero


<span class="token comment"># 有返回值 -&gt;True</span>
begin connect resource
exc_type<span class="token operator">==</span><span class="token operator">&lt;</span><span class="token keyword">class</span> <span class="token string">&#39;ZeroDivisionError&#39;</span><span class="token operator">&gt;</span>
exc_value<span class="token operator">==</span>division by zero
tb<span class="token operator">==</span><span class="token operator">&lt;</span>traceback <span class="token builtin">object</span> at <span class="token number">0x01B1EAD0</span><span class="token operator">&gt;</span>
close connection
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、使用其他方法声明一个上下文管理器" tabindex="-1"><a class="header-anchor" href="#四、使用其他方法声明一个上下文管理器" aria-hidden="true">#</a> <strong>四、使用其他方法声明一个上下文管理器</strong></h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> contextlib <span class="token keyword">import</span> contextmanager

<span class="token decorator annotation punctuation">@contextmanager</span>
<span class="token keyword">def</span> <span class="token function">file_open</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span><span class="token punctuation">:</span>
    f <span class="token operator">=</span> <span class="token boolean">None</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        f <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span>path<span class="token punctuation">,</span> <span class="token string">&quot;w&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">yield</span> f
    <span class="token keyword">except</span> OSError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;We had an error!&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">finally</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Closing file&quot;</span><span class="token punctuation">)</span>
        f<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> file_open<span class="token punctuation">(</span><span class="token string">&quot;test.txt&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> f<span class="token punctuation">:</span>
        f<span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&quot;Testing context managers&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以在类中进行使用，具体请参考官网</p><p>参考案例</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>base<span class="token punctuation">.</span>py
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> datetime
<span class="token keyword">from</span> flask_sqlalchemy <span class="token keyword">import</span> SQLAlchemy <span class="token keyword">as</span> _SQLAlchemy<span class="token punctuation">,</span> BaseQuery
<span class="token keyword">from</span> sqlalchemy <span class="token keyword">import</span> Column<span class="token punctuation">,</span> Integer<span class="token punctuation">,</span> SmallInteger
<span class="token keyword">from</span> contextlib <span class="token keyword">import</span> contextmanager

<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>api_exceptions<span class="token punctuation">.</span>exceptions <span class="token keyword">import</span> NotFundException


<span class="token keyword">class</span> <span class="token class-name">SQLAlchemy</span><span class="token punctuation">(</span>_SQLAlchemy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token decorator annotation punctuation">@contextmanager</span>
    <span class="token keyword">def</span> <span class="token function">auto_commit</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">yield</span>
            self<span class="token punctuation">.</span>session<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            db<span class="token punctuation">.</span>session<span class="token punctuation">.</span>rollback<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">raise</span> e


<span class="token keyword">class</span> <span class="token class-name">Query</span><span class="token punctuation">(</span>BaseQuery<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">filter_by</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token string">&#39;status&#39;</span> <span class="token keyword">not</span> <span class="token keyword">in</span> kwargs<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            kwargs<span class="token punctuation">[</span><span class="token string">&#39;status&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">return</span> <span class="token builtin">super</span><span class="token punctuation">(</span>Query<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>filter_by<span class="token punctuation">(</span><span class="token operator">**</span>kwargs<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">get_or_404_for_api</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> ident<span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        rv <span class="token operator">=</span> self<span class="token punctuation">.</span>get<span class="token punctuation">(</span>ident<span class="token punctuation">)</span>
        <span class="token keyword">if</span> rv <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> NotFundException<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> rv

    <span class="token keyword">def</span> <span class="token function">first_or_404_for_api</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> description<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        rv <span class="token operator">=</span> self<span class="token punctuation">.</span>first<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> rv <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> NotFundException<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> rv



db <span class="token operator">=</span> SQLAlchemy<span class="token punctuation">(</span>query_class<span class="token operator">=</span>Query<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Base</span><span class="token punctuation">(</span>db<span class="token punctuation">.</span>Model<span class="token punctuation">)</span><span class="token punctuation">:</span>
    __abstract__ <span class="token operator">=</span> <span class="token boolean">True</span>
    create_time <span class="token operator">=</span> Column<span class="token punctuation">(</span>Integer<span class="token punctuation">)</span>
    status <span class="token operator">=</span> Column<span class="token punctuation">(</span>SmallInteger<span class="token punctuation">,</span> default<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>create_time <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>timestamp<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@property</span>
    <span class="token keyword">def</span> <span class="token function">create_datetime</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>create_time<span class="token punctuation">:</span>
            <span class="token keyword">return</span> datetime<span class="token punctuation">.</span>fromtimestamp<span class="token punctuation">(</span>self<span class="token punctuation">.</span>create_time<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">set_attrs</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> attrs_dict<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> attrs_dict<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token keyword">and</span> key <span class="token operator">!=</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">:</span>
                <span class="token builtin">setattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">delete</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>status <span class="token operator">=</span> <span class="token number">0</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>user_view<span class="token punctuation">.</span>py
<span class="token decorator annotation punctuation">@api<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;DELETE&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@auth<span class="token punctuation">.</span>login_required</span>
<span class="token keyword">def</span> <span class="token function">delete_user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    uid <span class="token operator">=</span> g<span class="token punctuation">.</span>user<span class="token punctuation">.</span>uid
    <span class="token keyword">with</span> db<span class="token punctuation">.</span>auto_commit<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        user <span class="token operator">=</span> User<span class="token punctuation">.</span>query<span class="token punctuation">.</span>filter_by<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span>uid<span class="token punctuation">)</span><span class="token punctuation">.</span>first_or_404_for_api<span class="token punctuation">(</span><span class="token punctuation">)</span>
        user<span class="token punctuation">.</span>delete<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> DeleteSuccess<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","4、with上下文.html.vue"]]);export{d as default};
