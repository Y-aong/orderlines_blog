import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as s,b as n,d as e,e as a}from"./app-2d0f66e1.js";const l={},u=a(`<h1 id="_2、flask序列化" tabindex="-1"><a class="header-anchor" href="#_2、flask序列化" aria-hidden="true">#</a> 2、flask序列化</h1><h3 id="一、为什么需要序列化" tabindex="-1"><a class="header-anchor" href="#一、为什么需要序列化" aria-hidden="true">#</a> <strong>一、为什么需要序列化</strong></h3><ul><li>序列化常见的使用场景是web，比如一个接口需要返回一个对象，这个对象不可以被<code>flask</code>的<code>jsonify</code>函数所序列化</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@api<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;GET&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@auth<span class="token punctuation">.</span>login_required</span>
<span class="token keyword">def</span> <span class="token function">get_user</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    uid <span class="token operator">=</span> g<span class="token punctuation">.</span>user<span class="token punctuation">.</span>uid
    user <span class="token operator">=</span> User<span class="token punctuation">.</span>query<span class="token punctuation">.</span>filter_by<span class="token punctuation">(</span><span class="token builtin">id</span><span class="token operator">=</span>uid<span class="token punctuation">)</span><span class="token punctuation">.</span>first_or_404_for_api<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> jsonify<span class="token punctuation">(</span>user<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、问题为什么对象不可以直接被序列化" tabindex="-1"><a class="header-anchor" href="#二、问题为什么对象不可以直接被序列化" aria-hidden="true">#</a> <strong>二、问题为什么对象不可以直接被序列化</strong></h3><h4 id="_2-1、可以被json直接序列化的为dict类型-python对象如何转为dict" tabindex="-1"><a class="header-anchor" href="#_2-1、可以被json直接序列化的为dict类型-python对象如何转为dict" aria-hidden="true">#</a> <strong>2.1、可以被<code>json</code>直接序列化的为<code>dict</code>类型，python对象如何转为<code>dict</code>？</strong></h4><p>类中需要有两个方法<code>keys</code>, <code>__getitem__</code></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    name <span class="token operator">=</span> <span class="token string">&quot;blue&quot;</span>
    age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> gender<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>gender <span class="token operator">=</span> gender

    <span class="token keyword">def</span> <span class="token function">keys</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;gender&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试结果</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>person <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">dict</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># {&#39;name&#39;: &#39;blue&#39;, &#39;age&#39;: 18, &#39;gender&#39;: &#39;男&#39;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),r=s("code",null,"dict",-1),d={href:"https://www.zhihu.com/search?q=%E8%BF%94%E5%9B%9E%E5%80%BC&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2470374865%7D",target:"_blank",rel:"noopener noreferrer"},k=a(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    name <span class="token operator">=</span> <span class="token string">&quot;blue&quot;</span>
    age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> gender<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>gender <span class="token operator">=</span> gender

    <span class="token keyword">def</span> <span class="token function">keys</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span>
        
person <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">dict</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># {&#39;name&#39;: &#39;blue&#39;, &#39;age&#39;: 18}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2、对象的-dict-有什么用" tabindex="-1"><a class="header-anchor" href="#_2-2、对象的-dict-有什么用" aria-hidden="true">#</a> <strong>2.2、对象的<code>__dict__</code>有什么用？</strong></h4>`,2),v=s("code",null,"__dict__",-1),m={href:"https://www.zhihu.com/search?q=%E7%B1%BB%E5%B1%9E%E6%80%A7&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2470374865%7D",target:"_blank",rel:"noopener noreferrer"},b=a(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    name <span class="token operator">=</span> <span class="token string">&quot;blue&quot;</span>
    age <span class="token operator">=</span> <span class="token number">18</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> gender<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>gender <span class="token operator">=</span> gender

    <span class="token keyword">def</span> <span class="token function">keys</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">&quot;name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;age&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;gender&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> item<span class="token punctuation">)</span>
    
    
person <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token string">&quot;男&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>__dict__<span class="token punctuation">)</span> <span class="token comment"># {&#39;gender&#39;: &#39;男&#39;}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、自定义flask的序列化" tabindex="-1"><a class="header-anchor" href="#三、自定义flask的序列化" aria-hidden="true">#</a> <strong>三、自定义flask的序列化</strong></h3><h4 id="一、指定flask的jsonencoder-重写jsonencoder的default方法" tabindex="-1"><a class="header-anchor" href="#一、指定flask的jsonencoder-重写jsonencoder的default方法" aria-hidden="true">#</a> 一、指定flask的<code>JSONEncoder</code>，重写<code>JSONEncoder</code>的default方法</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : __init__.py.py
# Time       ：2022-05-03 10:42
# Author     ：author name
# version    ：python 3.7-32bit
# Description：
&quot;&quot;&quot;</span>
<span class="token keyword">import</span> dataclasses
<span class="token keyword">import</span> decimal
<span class="token keyword">import</span> typing <span class="token keyword">as</span> t
<span class="token keyword">import</span> uuid
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> date
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask <span class="token keyword">as</span> _Flask
<span class="token keyword">from</span> flask<span class="token punctuation">.</span>json <span class="token keyword">import</span> JSONEncoder <span class="token keyword">as</span> _JSONEncoder
<span class="token keyword">from</span> werkzeug<span class="token punctuation">.</span>http <span class="token keyword">import</span> http_date

<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>api_exceptions<span class="token punctuation">.</span>api_exception <span class="token keyword">import</span> APIException


<span class="token keyword">class</span> <span class="token class-name">JSONEncoder</span><span class="token punctuation">(</span>_JSONEncoder<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">default</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> o<span class="token punctuation">:</span> t<span class="token punctuation">.</span>Any<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> t<span class="token punctuation">.</span>Any<span class="token punctuation">:</span>

        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> date<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> http_date<span class="token punctuation">(</span>o<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token punctuation">(</span>decimal<span class="token punctuation">.</span>Decimal<span class="token punctuation">,</span> uuid<span class="token punctuation">.</span>UUID<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token builtin">str</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
        <span class="token keyword">if</span> dataclasses <span class="token keyword">and</span> dataclasses<span class="token punctuation">.</span>is_dataclass<span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> dataclasses<span class="token punctuation">.</span>asdict<span class="token punctuation">(</span>o<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token string">&quot;__html__&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token builtin">str</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span>__html__<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token string">&#39;keys&#39;</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>o<span class="token punctuation">,</span> <span class="token string">&#39;__getitem__&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span>
        <span class="token keyword">raise</span> APIException<span class="token punctuation">(</span><span class="token string">&quot;serialize error&quot;</span><span class="token punctuation">)</span>


<span class="token comment"># 后续使用这个Flask进行实例化</span>
<span class="token keyword">class</span> <span class="token class-name">Flask</span><span class="token punctuation">(</span>_Flask<span class="token punctuation">)</span><span class="token punctuation">:</span>
    json_encoder <span class="token operator">=</span> JSONEncoder

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="二、修改模型类" tabindex="-1"><a class="header-anchor" href="#二、修改模型类" aria-hidden="true">#</a> 二、修改模型类</h4><p>模型类中必须要有这两个方法<code>keys</code>, <code>__getitem__</code>，<code>__getitem__</code>方法可以写在Base类中</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">(</span>Base<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">id</span> <span class="token operator">=</span> Column<span class="token punctuation">(</span>Integer<span class="token punctuation">,</span> primary_key<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    email <span class="token operator">=</span> Column<span class="token punctuation">(</span>String<span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unique<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> nullable<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span>
    nickname <span class="token operator">=</span> Column<span class="token punctuation">(</span>String<span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span><span class="token punctuation">,</span> unique<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    auth <span class="token operator">=</span> Column<span class="token punctuation">(</span>SmallInteger<span class="token punctuation">,</span> default<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
    _password <span class="token operator">=</span> Column<span class="token punctuation">(</span><span class="token string">&#39;password&#39;</span><span class="token punctuation">,</span> String<span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">keys</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;email&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;nickname&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;auth&quot;</span><span class="token punctuation">]</span>
    
    <span class="token keyword">def</span> <span class="token function">__getitem__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">getattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7);function _(y,h){const t=o("ExternalLinkIcon");return c(),i("div",null,[u,s("p",null,[r,n("方法可以自定义字典的key, 它是读取class中的keys方法的"),s("a",d,[n("返回值"),e(t)]),n("，作为字典的key")]),k,s("p",null,[n("class的"),v,n("方法是可以将对象中的实例属性返回，不返回类的"),s("a",m,[n("类属性"),e(t)])]),b])}const w=p(l,[["render",_],["__file","2、学会flask了解序列化.html.vue"]]);export{w as default};
