import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as t}from"./app-2d0f66e1.js";const p={},e=t(`<h1 id="_7、flask中使用jwt" tabindex="-1"><a class="header-anchor" href="#_7、flask中使用jwt" aria-hidden="true">#</a> 7、flask中使用jwt</h1><p>关于jwt的特点上一篇博客已经有所介绍</p><p>这里拿flask举例说明</p><h3 id="一、下载" tabindex="-1"><a class="header-anchor" href="#一、下载" aria-hidden="true">#</a> 一、下载</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pip install PyJWT==2.3.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="二、使用" tabindex="-1"><a class="header-anchor" href="#二、使用" aria-hidden="true">#</a> 二、使用</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : jwt_token.py
# Time       ：2022-05-03 23:03
# Author     ：author name
# version    ：python 3.7-32bit
# Description：
&quot;&quot;&quot;</span>
<span class="token keyword">import</span> datetime
<span class="token keyword">import</span> typing <span class="token keyword">as</span> t
<span class="token keyword">import</span> jwt
<span class="token keyword">from</span> dataclasses <span class="token keyword">import</span> dataclass
<span class="token keyword">from</span> flask <span class="token keyword">import</span> current_app
<span class="token keyword">from</span> jwt <span class="token keyword">import</span> ExpiredSignatureError<span class="token punctuation">,</span> DecodeError
<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>api_exceptions<span class="token punctuation">.</span>exceptions <span class="token keyword">import</span> JWTVerifyException


<span class="token decorator annotation punctuation">@dataclass</span>
<span class="token keyword">class</span> <span class="token class-name">JWTPayload</span><span class="token punctuation">:</span>
    uid<span class="token punctuation">:</span> <span class="token builtin">int</span>
    auth<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&#39;blue&#39;</span>
    scope<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token number">1</span>
    ac_type<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&#39;email&#39;</span>


<span class="token keyword">def</span> <span class="token function">generate_payload</span><span class="token punctuation">(</span>uid<span class="token punctuation">,</span> auth<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> scope<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> ac_type<span class="token operator">=</span><span class="token string">&quot;email&quot;</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> JWTPayload<span class="token punctuation">(</span>uid<span class="token punctuation">,</span> auth<span class="token punctuation">,</span> scope<span class="token punctuation">,</span> ac_type<span class="token punctuation">)</span><span class="token punctuation">.</span>__dict__


<span class="token keyword">def</span> <span class="token function">generate_token</span><span class="token punctuation">(</span>payload<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">,</span> expiry<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> secret<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    _payload <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;exp&quot;</span><span class="token punctuation">:</span> datetime<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>now<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> datetime<span class="token punctuation">.</span>timedelta<span class="token punctuation">(</span>seconds<span class="token operator">=</span>expiry<span class="token punctuation">)</span><span class="token punctuation">}</span>
    _payload<span class="token punctuation">.</span>update<span class="token punctuation">(</span>payload<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> secret<span class="token punctuation">:</span>
        secret <span class="token operator">=</span> current_app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&quot;SECRET_KEY&quot;</span><span class="token punctuation">]</span>
    <span class="token keyword">return</span> jwt<span class="token punctuation">.</span>encode<span class="token punctuation">(</span>_payload<span class="token punctuation">,</span> secret<span class="token punctuation">,</span> algorithm<span class="token operator">=</span><span class="token string">&quot;HS256&quot;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">verify_token</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> secret<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> secret<span class="token punctuation">:</span>
        secret <span class="token operator">=</span> current_app<span class="token punctuation">.</span>config<span class="token punctuation">[</span><span class="token string">&quot;SECRET_KEY&quot;</span><span class="token punctuation">]</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        payload <span class="token operator">=</span> jwt<span class="token punctuation">.</span>decode<span class="token punctuation">(</span>token<span class="token punctuation">,</span> secret<span class="token punctuation">,</span> algorithms<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;HS256&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> ExpiredSignatureError<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> JWTVerifyException<span class="token punctuation">(</span><span class="token string">&quot;当前jwt已经过期了&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> DecodeError<span class="token punctuation">:</span>
        <span class="token keyword">raise</span> DecodeError<span class="token punctuation">(</span><span class="token string">&quot;jwt decode error&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> payload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、view登录界面" tabindex="-1"><a class="header-anchor" href="#三、view登录界面" aria-hidden="true">#</a> 三、view登录界面</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> flask <span class="token keyword">import</span> request

<span class="token keyword">from</span> app<span class="token punctuation">.</span>form<span class="token punctuation">.</span>validators_client_form <span class="token keyword">import</span> ClientForm
<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>enums <span class="token keyword">import</span> ClientTypeEnum
<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>jwt_token <span class="token keyword">import</span> generate_payload<span class="token punctuation">,</span> generate_token
<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>red_print <span class="token keyword">import</span> RedPrint
<span class="token keyword">from</span> app<span class="token punctuation">.</span>libs<span class="token punctuation">.</span>success <span class="token keyword">import</span> Success
<span class="token keyword">from</span> app<span class="token punctuation">.</span>models<span class="token punctuation">.</span>user <span class="token keyword">import</span> User

api <span class="token operator">=</span> RedPrint<span class="token punctuation">(</span><span class="token string">&quot;token&quot;</span><span class="token punctuation">)</span>
<span class="token decorator annotation punctuation">@api<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> methods<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&quot;POST&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">get_token</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    data <span class="token operator">=</span> request<span class="token punctuation">.</span>json
    client_form <span class="token operator">=</span> ClientForm<span class="token punctuation">(</span>data<span class="token operator">=</span>data<span class="token punctuation">)</span>
    client_form<span class="token punctuation">.</span>validate_for_api<span class="token punctuation">(</span><span class="token punctuation">)</span>

    promise <span class="token operator">=</span> <span class="token punctuation">{</span>
        ClientTypeEnum<span class="token punctuation">.</span>USER_EMAIL<span class="token punctuation">:</span> User<span class="token punctuation">.</span>verify<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    identity<span class="token punctuation">:</span> <span class="token builtin">dict</span> <span class="token operator">=</span> promise<span class="token punctuation">[</span>client_form<span class="token punctuation">.</span><span class="token builtin">type</span><span class="token punctuation">.</span>data<span class="token punctuation">]</span><span class="token punctuation">(</span>
        client_form<span class="token punctuation">.</span>account<span class="token punctuation">.</span>data<span class="token punctuation">,</span> client_form<span class="token punctuation">.</span>secret<span class="token punctuation">.</span>data<span class="token punctuation">)</span>

    token <span class="token operator">=</span> _generate_auth_token<span class="token punctuation">(</span>identity<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">&quot;uid&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                                 client_form<span class="token punctuation">.</span><span class="token builtin">type</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>value<span class="token punctuation">,</span>
                                 identity<span class="token punctuation">[</span><span class="token string">&#39;scope&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
                                 expiration<span class="token operator">=</span><span class="token number">7200</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> Success<span class="token punctuation">(</span>msg<span class="token operator">=</span>token<span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">_generate_auth_token</span><span class="token punctuation">(</span>uid<span class="token punctuation">,</span> ac_type<span class="token punctuation">,</span> scope<span class="token operator">=</span><span class="token boolean">None</span><span class="token punctuation">,</span> expiration<span class="token operator">=</span><span class="token number">7200</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    payload <span class="token operator">=</span> generate_payload<span class="token punctuation">(</span>uid<span class="token operator">=</span>uid<span class="token punctuation">,</span> ac_type<span class="token operator">=</span>ac_type<span class="token punctuation">,</span> scope<span class="token operator">=</span>scope<span class="token punctuation">)</span>
    <span class="token keyword">return</span> generate_token<span class="token punctuation">(</span>payload<span class="token punctuation">,</span> expiry<span class="token operator">=</span>expiration<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(p,[["render",c],["__file","7、flask中使用jwt.html.vue"]]);export{k as default};
