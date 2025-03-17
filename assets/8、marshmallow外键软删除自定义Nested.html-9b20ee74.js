import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-2d0f66e1.js";const t={},p=e(`<h1 id="_8、marshmallow-外键软删除自定义-nested" tabindex="-1"><a class="header-anchor" href="#_8、marshmallow-外键软删除自定义-nested" aria-hidden="true">#</a> 8、marshmallow 外键软删除自定义 Nested</h1><h3 id="问题一" tabindex="-1"><a class="header-anchor" href="#问题一" aria-hidden="true">#</a> 问题一：</h3><p><strong>你们平时数据库是真删除还是软删除？</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>一般来讲都会设置软删除，软删除的好处可以保证数据库索引的顺序，避免数据库索引的稀疏性。大量的真实删除会造成数据库的索引稀疏，导致数据库的查询数据变慢。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="问题二" tabindex="-1"><a class="header-anchor" href="#问题二" aria-hidden="true">#</a> 问题二：</h3><p><strong>你在使用 marshmallow 时带有外键的软删除时怎么处理的？</strong></p><p><strong>我在一开始处理时发现，带有外键的软删除在使用 Nested 时会出现一系列的问题，比如，软删除完成了，但是在外键时 Nested 会造成已经软删除的数据还会继续出现。</strong></p><h3 id="一、数据库基类设置" tabindex="-1"><a class="header-anchor" href="#一、数据库基类设置" aria-hidden="true">#</a> 一、数据库基类设置</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : base_model.py
# Time       ：2023/6/25 14:35
# Author     ：YangYong
# version    ：python 3.10
# Description：表基类
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> flask_sqlalchemy <span class="token keyword">import</span> SQLAlchemy <span class="token keyword">as</span> _SQLAlchemy
<span class="token keyword">from</span> sqlalchemy <span class="token keyword">import</span> Column<span class="token punctuation">,</span> SmallInteger
<span class="token keyword">from</span> contextlib <span class="token keyword">import</span> contextmanager
<span class="token keyword">from</span> sqlalchemy <span class="token keyword">import</span> create_engine
<span class="token keyword">from</span> sqlalchemy<span class="token punctuation">.</span>orm <span class="token keyword">import</span> sessionmaker<span class="token punctuation">,</span> scoped_session
<span class="token keyword">from</span> sqlalchemy<span class="token punctuation">.</span>pool <span class="token keyword">import</span> NullPool

<span class="token keyword">from</span> conf<span class="token punctuation">.</span>config <span class="token keyword">import</span> FlaskConfig


<span class="token keyword">def</span> <span class="token function">get_session</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    db_uri <span class="token operator">=</span> FlaskConfig<span class="token punctuation">.</span>SQLALCHEMY_DATABASE_URI
    engine <span class="token operator">=</span> create_engine<span class="token punctuation">(</span>
        url<span class="token operator">=</span>db_uri<span class="token punctuation">,</span>
        poolclass<span class="token operator">=</span>NullPool
    <span class="token punctuation">)</span>
    session_factory <span class="token operator">=</span> sessionmaker<span class="token punctuation">(</span>bind<span class="token operator">=</span>engine<span class="token punctuation">)</span>
    <span class="token keyword">return</span> scoped_session<span class="token punctuation">(</span>session_factory<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">SQLAlchemy</span><span class="token punctuation">(</span>_SQLAlchemy<span class="token punctuation">)</span><span class="token punctuation">:</span>
    @contextmanager
    <span class="token keyword">def</span> <span class="token function">auto_commit</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">yield</span>
            self<span class="token punctuation">.</span>session<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>session<span class="token punctuation">.</span>flush<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            db<span class="token punctuation">.</span>session<span class="token punctuation">.</span>rollback<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">raise</span> e


db <span class="token operator">=</span> SQLAlchemy<span class="token punctuation">(</span><span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">Base</span><span class="token punctuation">(</span>db<span class="token punctuation">.</span>Model<span class="token punctuation">)</span><span class="token punctuation">:</span>
    __abstract__ <span class="token operator">=</span> <span class="token boolean">True</span>
    <span class="token builtin">id</span> <span class="token operator">=</span> db<span class="token punctuation">.</span>Column<span class="token punctuation">(</span>db<span class="token punctuation">.</span>Integer<span class="token punctuation">,</span> primary_key<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> autoincrement<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    active <span class="token operator">=</span> Column<span class="token punctuation">(</span>SmallInteger<span class="token punctuation">,</span> default<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">set_attrs</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> attrs_dict<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">for</span> key<span class="token punctuation">,</span> value <span class="token keyword">in</span> attrs_dict<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token builtin">hasattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">)</span> <span class="token keyword">and</span> key <span class="token operator">!=</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">:</span>
                <span class="token builtin">setattr</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">delete</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>active <span class="token operator">=</span> <span class="token number">0</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 active 来进行软删除。</strong></p><h3 id="二、自定义-nested" tabindex="-1"><a class="header-anchor" href="#二、自定义-nested" aria-hidden="true">#</a> 二、自定义 Nested</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : custom_schema.py
# Time       ：2023/8/9 18:40
# Author     ：YangYong
# version    ：python 3.10
# Description：
&quot;&quot;&quot;</span>
<span class="token keyword">import</span> typing
<span class="token keyword">from</span> marshmallow<span class="token punctuation">.</span>fields <span class="token keyword">import</span> Nested


<span class="token keyword">class</span> <span class="token class-name">CustomNested</span><span class="token punctuation">(</span>Nested<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">serialize</span><span class="token punctuation">(</span>
            self<span class="token punctuation">,</span>
            attr<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span>
            obj<span class="token punctuation">:</span> typing<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
            accessor<span class="token punctuation">:</span> typing<span class="token punctuation">.</span>Any <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span>
            <span class="token operator">**</span>kwargs
    <span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> typing<span class="token punctuation">.</span>Union<span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        result <span class="token operator">=</span> <span class="token builtin">super</span><span class="token punctuation">(</span>CustomNested<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>serialize<span class="token punctuation">(</span>attr<span class="token punctuation">,</span> obj<span class="token punctuation">,</span> accessor<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token builtin">list</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            result <span class="token operator">=</span> <span class="token punctuation">[</span>item <span class="token keyword">for</span> item <span class="token keyword">in</span> result <span class="token keyword">if</span> item<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">elif</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">)</span> <span class="token keyword">and</span> <span class="token keyword">not</span> result<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

        <span class="token keyword">return</span> result

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、序列化配置" tabindex="-1"><a class="header-anchor" href="#三、序列化配置" aria-hidden="true">#</a> 三、序列化配置</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">ComponentSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    main_device_id <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    main_device_name <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    temp <span class="token operator">=</span> fields<span class="token punctuation">.</span>Function<span class="token punctuation">(</span>serialize<span class="token operator">=</span><span class="token keyword">lambda</span> obj<span class="token punctuation">:</span> get_patrol_point<span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Component


<span class="token keyword">class</span> <span class="token class-name">MainDeviceSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    bay_id <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    bay_name <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    temp <span class="token operator">=</span> CustomNested<span class="token punctuation">(</span>ComponentSchema<span class="token punctuation">,</span> many<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> dump_only<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> MainDevice


<span class="token keyword">class</span> <span class="token class-name">BaySchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    area_id <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    area_name <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>
    temp <span class="token operator">=</span> CustomNested<span class="token punctuation">(</span>MainDeviceSchema<span class="token punctuation">,</span> many<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> dump_only<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Bay


<span class="token keyword">class</span> <span class="token class-name">AreaSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    temp <span class="token operator">=</span> CustomNested<span class="token punctuation">(</span>BaySchema<span class="token punctuation">,</span> many<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> dump_only<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Area
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="四、实现结果" tabindex="-1"><a class="header-anchor" href="#四、实现结果" aria-hidden="true">#</a> 四、实现结果</h3><p><strong>实现了过滤掉软删除的数据</strong></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;code&quot;</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token property">&quot;data&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;items&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;active&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;temp&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token property">&quot;active&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">&quot;area_id&quot;</span><span class="token operator">:</span> <span class="token number">14</span><span class="token punctuation">,</span>
            <span class="token property">&quot;area_name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">28</span><span class="token punctuation">,</span>
            <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;12&quot;</span><span class="token punctuation">,</span>
            <span class="token property">&quot;temp&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;active&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;测试区域001&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;temp&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;active&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1212&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;temp&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token property">&quot;active&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">&quot;id&quot;</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span>
        <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;121212&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;temp&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;total&quot;</span><span class="token operator">:</span> <span class="token number">4</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;message&quot;</span><span class="token operator">:</span> <span class="token string">&quot;success&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;success&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","8、marshmallow外键软删除自定义Nested.html.vue"]]);export{d as default};
