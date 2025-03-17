import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,a as n,b as c,d as l,e as s}from"./app-2d0f66e1.js";const i={},u=s(`<h1 id="_5、flask中的线程隔离" tabindex="-1"><a class="header-anchor" href="#_5、flask中的线程隔离" aria-hidden="true">#</a> 5、flask中的线程隔离</h1><h3 id="一、问题-flask中会接收多个请求-那他们不会搞混吗" tabindex="-1"><a class="header-anchor" href="#一、问题-flask中会接收多个请求-那他们不会搞混吗" aria-hidden="true">#</a> 一、问题：flask中会接收多个请求，那他们不会搞混吗？</h3><p>Flask内部，通过维护一个dict来实现线程隔离。伪代码如下 <code>request={thread_key1:Request1,thread_key2:Request2}</code> 其中thread_key是线程的唯一id号，Request就是每次请求的Request对象</p><p>Flask内部引入了一个werkzeug的库，这个库里有一个local模块，里面有一个Local对象，Flask内部线程隔离就是通过操作Local对象实现的。</p><h3 id="二、local对象" tabindex="-1"><a class="header-anchor" href="#二、local对象" aria-hidden="true">#</a> 二、Local对象</h3><p>Local对象实际上就是对字典原理的一个封装</p><p>class Local(object):<br><strong>slots</strong> = (&#39;<strong>storage</strong>&#39;, &#39;<strong>ident_func</strong>&#39;)</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 一个私有变量__storage__字典</span>
    <span class="token builtin">object</span><span class="token punctuation">.</span>__setattr__<span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token string">&#39;__storage__&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token builtin">object</span><span class="token punctuation">.</span>__setattr__<span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token string">&#39;__ident_func__&#39;</span><span class="token punctuation">,</span> get_ident<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">__iter__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token builtin">iter</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>__storage__<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> proxy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;Create a proxy for a name.&quot;&quot;&quot;</span>
    <span class="token keyword">return</span> LocalProxy<span class="token punctuation">(</span>self<span class="token punctuation">,</span> proxy<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">__release_local__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    self<span class="token punctuation">.</span>__storage__<span class="token punctuation">.</span>pop<span class="token punctuation">(</span>self<span class="token punctuation">.</span>__ident_func__<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">__getattr__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>__storage__<span class="token punctuation">[</span>self<span class="token punctuation">.</span>__ident_func__<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span>
    <span class="token keyword">except</span> KeyError<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> AttributeError<span class="token punctuation">(</span>name<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">__setattr__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 取当前线程的线程ID号</span>
    ident <span class="token operator">=</span> self<span class="token punctuation">.</span>__ident_func__<span class="token punctuation">(</span><span class="token punctuation">)</span>
    storage <span class="token operator">=</span> self<span class="token punctuation">.</span>__storage__
    <span class="token comment"># 操作字典</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        storage<span class="token punctuation">[</span>ident<span class="token punctuation">]</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> value
    <span class="token keyword">except</span> KeyError<span class="token punctuation">:</span>
        <span class="token comment"># 把线程id号作为key保存了起来</span>
        storage<span class="token punctuation">[</span>ident<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token punctuation">:</span> value<span class="token punctuation">}</span>

<span class="token keyword">def</span> <span class="token function">__delattr__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">del</span> self<span class="token punctuation">.</span>__storage__<span class="token punctuation">[</span>self<span class="token punctuation">.</span>__ident_func__<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span>
    <span class="token keyword">except</span> KeyError<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> AttributeError<span class="token punctuation">(</span>name<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、使用线程隔离和不适用线程隔离的区别" tabindex="-1"><a class="header-anchor" href="#三、使用线程隔离和不适用线程隔离的区别" aria-hidden="true">#</a> 三、使用线程隔离和不适用线程隔离的区别</h3><p>定义一个对象，启动一个线程去修改这个对象，使用主线程打印这个对象</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> time
<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">:</span>
    b <span class="token operator">=</span> <span class="token number">1</span>

my_obj <span class="token operator">=</span> A<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">worker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    my_obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>

new_thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>worker<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;new_thread&quot;</span><span class="token punctuation">)</span>
new_thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment"># 主线程</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>my_obj<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token comment"># 打印结果为2</span>
<span class="token comment"># 因为my_obj是主线程和新线程共享的对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将my_obj实例化改为使用Local线程隔离对象</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> threading
<span class="token keyword">import</span> time
<span class="token keyword">from</span> werkzeug<span class="token punctuation">.</span>local <span class="token keyword">import</span> Local

<span class="token keyword">class</span> <span class="token class-name">A</span><span class="token punctuation">:</span>
    b <span class="token operator">=</span> <span class="token number">1</span>


my_obj <span class="token operator">=</span> Local<span class="token punctuation">(</span><span class="token punctuation">)</span>
my_obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">1</span>


<span class="token keyword">def</span> <span class="token function">worker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    my_obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;in new thread b is: &quot;</span><span class="token punctuation">,</span> my_obj<span class="token punctuation">.</span>b<span class="token punctuation">)</span>


new_thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>worker<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&quot;new_thread&quot;</span><span class="token punctuation">)</span>
new_thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;in main thread b is:&quot;</span><span class="token punctuation">,</span> my_obj<span class="token punctuation">.</span>b<span class="token punctuation">)</span>
<span class="token comment"># 结果</span>

<span class="token keyword">in</span> new thread b <span class="token keyword">is</span><span class="token punctuation">:</span>  <span class="token number">2</span>
<span class="token keyword">in</span> main thread b <span class="token keyword">is</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于my_obj是一个线程隔离的对象，所以我们在新线程里修改my_obj是不会影响主线程里my_obj中的值的。他们保持了两个线程之间的数据的独立</p><p>Local的高明在于，他不需要我们去关心底层Local字典内部的细节，我们之间去操作Local对象的相关属性，这个操作本就是线程隔离的，给我们带来了很大的方便</p><h3 id="四、线程隔离的栈-localstack" tabindex="-1"><a class="header-anchor" href="#四、线程隔离的栈-localstack" aria-hidden="true">#</a> 四、线程隔离的栈：LocalStack</h3><figure><img src="https://bineanju.gitee.io/blog/post/20160505flask05/1.jpg" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p>接下来来继续讲解之前这张图右下角的部分。 通过Flask的源码，我们可以了解到_app_ctx_stack和_request_ctx_stack实际上是指向了LocalStack()对象，也就是一个线程隔离的栈,下面来看下源码</p>`,18),r={href:"http://globals.py",target:"_blank",rel:"noopener noreferrer"},k=s(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># context locals</span>
<span class="token comment"># 是一个LocalStack对象</span>
_request_ctx_stack <span class="token operator">=</span> LocalStack<span class="token punctuation">(</span><span class="token punctuation">)</span>
_app_ctx_stack <span class="token operator">=</span> LocalStack<span class="token punctuation">(</span><span class="token punctuation">)</span>
current_app <span class="token operator">=</span> LocalProxy<span class="token punctuation">(</span>_find_app<span class="token punctuation">)</span>
request <span class="token operator">=</span> LocalProxy<span class="token punctuation">(</span>partial<span class="token punctuation">(</span>_lookup_req_object<span class="token punctuation">,</span> <span class="token string">&#39;request&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
session <span class="token operator">=</span> LocalProxy<span class="token punctuation">(</span>partial<span class="token punctuation">(</span>_lookup_req_object<span class="token punctuation">,</span> <span class="token string">&#39;session&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
g <span class="token operator">=</span> LocalProxy<span class="token punctuation">(</span>partial<span class="token punctuation">(</span>_lookup_app_object<span class="token punctuation">,</span> <span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>LocalStack源码，依旧在werkzeug库 的local模块下</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">LocalStack</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 内部维护了一个Local对象作为私有变量</span>
        self<span class="token punctuation">.</span>_local <span class="token operator">=</span> Local<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__release_local__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_local<span class="token punctuation">.</span>__release_local__<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">_get__ident_func__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_local<span class="token punctuation">.</span>__ident_func__

    <span class="token keyword">def</span> <span class="token function">_set__ident_func__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">object</span><span class="token punctuation">.</span>__setattr__<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_local<span class="token punctuation">,</span> <span class="token string">&#39;__ident_func__&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    __ident_func__ <span class="token operator">=</span> <span class="token builtin">property</span><span class="token punctuation">(</span>_get__ident_func__<span class="token punctuation">,</span> _set__ident_func__<span class="token punctuation">)</span>
    <span class="token keyword">del</span> _get__ident_func__<span class="token punctuation">,</span> _set__ident_func__

    <span class="token keyword">def</span> <span class="token function">__call__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">def</span> <span class="token function">_lookup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            rv <span class="token operator">=</span> self<span class="token punctuation">.</span>top
            <span class="token keyword">if</span> rv <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                <span class="token keyword">raise</span> RuntimeError<span class="token punctuation">(</span><span class="token string">&#39;object unbound&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> rv
        <span class="token keyword">return</span> LocalProxy<span class="token punctuation">(</span>_lookup<span class="token punctuation">)</span>

    <span class="token comment"># 提供了push，pop方法，实际上就是在操作Local中的一个Stack</span>
    <span class="token keyword">def</span> <span class="token function">push</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Pushes a new item to the stack&quot;&quot;&quot;</span>
        rv <span class="token operator">=</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_local<span class="token punctuation">,</span> <span class="token string">&#39;stack&#39;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> rv <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_local<span class="token punctuation">.</span>stack <span class="token operator">=</span> rv <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        rv<span class="token punctuation">.</span>append<span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
        <span class="token keyword">return</span> rv

    <span class="token keyword">def</span> <span class="token function">pop</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;Removes the topmost item from the stack, will return the
        old value or \`None\` if the stack was already empty.
        &quot;&quot;&quot;</span>
        stack <span class="token operator">=</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_local<span class="token punctuation">,</span> <span class="token string">&#39;stack&#39;</span><span class="token punctuation">,</span> <span class="token boolean">None</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> stack <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">None</span>
        <span class="token keyword">elif</span> <span class="token builtin">len</span><span class="token punctuation">(</span>stack<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
            release_local<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_local<span class="token punctuation">)</span>
            <span class="token keyword">return</span> stack<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> stack<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@property</span>
    <span class="token keyword">def</span> <span class="token function">top</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;The topmost item on the stack.  If the stack is empty,
        \`None\` is returned.
        &quot;&quot;&quot;</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>_local<span class="token punctuation">.</span>stack<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">except</span> <span class="token punctuation">(</span>AttributeError<span class="token punctuation">,</span> IndexError<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Local,Local Stack,字典的关系 Local使用字典的方式实现了线程隔离 Local Stack封装了Local对象，将其作为自己的一个属性，实现了线程隔离的栈结构</p><p>3.LocalStack的基本用法<br> Local是使用·来直接操作字典中保存的对象。 LocalStack是使用它提供的一些push，pop的栈方法来操作对象</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> werkzeug<span class="token punctuation">.</span>local <span class="token keyword">import</span> LocalStack
s <span class="token operator">=</span> LocalStack<span class="token punctuation">(</span><span class="token punctuation">)</span>
s<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
s<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token comment"># top是属性@property,所以不需要加括号调用；</span>

<span class="token comment"># 栈结构先进后出，所以先输出2print(s.top)</span>

<span class="token comment"># top只取栈顶元素，不会讲他从栈中移除，所以这次还是2print(s.top)</span>

<span class="token comment"># pop()是方法，会取出并移除栈顶元素print(s.pop())print(s.top)</span>

<span class="token comment"># 结果2221</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function d(v,m){const a=e("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[n("a",r,[c("globals.py"),l(a)])]),k])}const y=t(i,[["render",d],["__file","5、学会flask了解python线程隔离.html.vue"]]);export{y as default};
