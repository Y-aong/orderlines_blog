import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c as o,a as n,b as a,d as l,e as s}from"./app-2d0f66e1.js";const c={},u=s(`<h1 id="python-个人编程风格" tabindex="-1"><a class="header-anchor" href="#python-个人编程风格" aria-hidden="true">#</a> Python 个人编程风格</h1><h3 id="一、变量名" tabindex="-1"><a class="header-anchor" href="#一、变量名" aria-hidden="true">#</a> 一、变量名</h3><p><strong>变量名总体要求</strong></p><ol><li><p>尽可能使用<strong>有意义的英文单词</strong>给变量命名，禁止使用单字母作为变量【强制】</p><p><strong>反例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>a <span class="token operator">=</span> <span class="token string">&#39;杨勇&#39;</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>name <span class="token operator">=</span> <span class="token string">&#39;杨勇&#39;</span>
ages <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">22</span><span class="token punctuation">,</span> <span class="token number">33</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>不可以和保留字进行重复【强制】</p><p><strong>反例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token builtin">type</span> <span class="token operator">=</span> <span class="token string">&#39;number&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>正例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>search_type <span class="token operator">=</span> <span class="token string">&#39;number&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>私有变量不可以对外暴露【强制】</p></li><li><p>通用的变量名缩写【建议】</p><p><strong>反例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>dm <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
ct <span class="token operator">=</span> <span class="token boolean">None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>df <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
ctx <span class="token operator">=</span> <span class="token boolean">None</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><ul><li>模块名 ——模块名统一使用下划线命名 <code>redis_utils</code></li><li>类名——类名统一使用大驼峰命名 <code>Person</code></li><li>函数名——统一使用下划线命名 <code>get_name</code></li><li>变量名——统一使用下划线命名 <code>my_name</code></li></ul><h3 id="二、导入" tabindex="-1"><a class="header-anchor" href="#二、导入" aria-hidden="true">#</a> 二、导入</h3><ul><li><p>少用 <code>import *</code>，少导入不用的代码，避免循环导入【建议】</p></li><li><p>导入格式，每个导入应该独占一行 【建议】</p><p>导入总应该放在文件顶部, 位于模块注释和文档字符串之后, 模块全局变量和常量之前. 导入应该按照从最通用到最不通用的顺序分组，每种顺序之间添加一个空行</p><ul><li>标准库导入</li><li>第三方库导入</li><li>应用程序指定导入</li></ul><p>每种分组中, 应该根据每个模块的完整包路径按字典序排序, 忽略大小写.</p><p><strong>反例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> flask <span class="token keyword">import</span> Resquese
<span class="token keyword">from</span> foo<span class="token punctuation">.</span>bar <span class="token keyword">import</span> baz
<span class="token keyword">import</span> os
<span class="token keyword">from</span> foo<span class="token punctuation">.</span>bar <span class="token keyword">import</span> Quux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>正例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os

<span class="token keyword">from</span> flask <span class="token keyword">import</span> Resquese

<span class="token keyword">from</span> foo<span class="token punctuation">.</span>bar <span class="token keyword">import</span> baz
<span class="token keyword">from</span> foo<span class="token punctuation">.</span>bar <span class="token keyword">import</span> Quux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="三、注释" tabindex="-1"><a class="header-anchor" href="#三、注释" aria-hidden="true">#</a> 三、注释</h3>`,8),d=s(`<li><p>文件头设置【强制】</p><p>所有的文件强制添加以下文件头，其中替换为自己的名字，<strong>Description</strong>必写</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : \${NAME}.py
# Time       ：\${DATE} \${TIME}
# Author     ：your name
# version    ：python 3.10
# Description：
&quot;&quot;&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),r=n("p",null,"需要加注释的地方，根据实际情况【建议】",-1),k=n("li",null,[n("p",null,"文件头信息")],-1),v=n("li",null,[n("p",null,"类注释")],-1),m={href:"https://blog.csdn.net/dkjkls/article/details/88933950",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"Epytext",-1),g=s(`<p><strong>正例</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">dict</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试方法
    @param name:姓名
    @param age: 年龄
    @return: 个人信息
    &quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">get_name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;获取用户姓名&quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h=n("li",null,[n("p",null,"关键逻辑注释")],-1),y=n("li",null,[n("p",null,[n("code",null,"TODO"),a(" 注释")])],-1),f=n("li",null,[n("p",null,"注释不要太长，和代码最大长度一致")],-1),_=s(`<h3 id="四、异常处理" tabindex="-1"><a class="header-anchor" href="#四、异常处理" aria-hidden="true">#</a> 四、异常处理</h3><ul><li><p>异常日志必须打印，最好把堆栈信息打印出来【强制】</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> traceback
<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
  <span class="token keyword">try</span><span class="token punctuation">:</span>
      num <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span>
  <span class="token keyword">except</span> ZeroDivisionError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
      <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;异常信息::</span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>traceback<span class="token punctuation">.</span>format_exc<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>


test<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>except 处理，处理的错误具体处理</p></li></ul><h3 id="五、函数设计" tabindex="-1"><a class="header-anchor" href="#五、函数设计" aria-hidden="true">#</a> 五、函数设计</h3><ul><li><p>函数的if else过多层嵌套，不超过两层的if else 嵌套</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">demo</span><span class="token punctuation">(</span>num<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> num <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> num <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> num <span class="token operator">&gt;</span> <span class="token number">100</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;大于100&#39;</span><span class="token punctuation">)</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;小于100&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;小于10&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> num <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;等于0&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;小于0&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>for循环嵌套层数过多，一般不超过2层</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">demo</span><span class="token punctuation">(</span>data<span class="token punctuation">:</span> List<span class="token punctuation">[</span><span class="token builtin">list</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> items <span class="token keyword">in</span> data<span class="token punctuation">:</span>
        <span class="token keyword">if</span> items<span class="token punctuation">:</span>
            <span class="token keyword">for</span> item <span class="token keyword">in</span> items<span class="token punctuation">:</span>
                <span class="token keyword">for</span> temp <span class="token keyword">in</span> item<span class="token punctuation">:</span>
                    <span class="token keyword">print</span><span class="token punctuation">(</span>temp<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>过长的函数，函数长度远大于100行，一般在50行内</p></li><li><p>过多的函数参数(一般5个之内)</p><p>解决方法</p><ul><li>使用**kwargs，注释中解释参数的作用</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">do_something</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> age<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    @param name: 姓名
    @param age: 年龄
    @param kwargs: 
            hobbies:爱好
            sex:性别
            height:身高
    @return: 
    &quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用具名数组 <code>namedtuple</code></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> collections <span class="token keyword">import</span> namedtuple

Student <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">&#39;Student&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name, gender&#39;</span><span class="token punctuation">)</span>
s <span class="token operator">=</span> Student<span class="token punctuation">(</span><span class="token string">&#39;小花&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;女&#39;</span><span class="token punctuation">)</span>

Student <span class="token operator">=</span> namedtuple<span class="token punctuation">(</span><span class="token string">&#39;Student&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name,age,sex,height,hobbies&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">do_something</span><span class="token punctuation">(</span>student<span class="token punctuation">:</span> Student<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    @param student:学生
    @return:
    &quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>
stu <span class="token operator">=</span> Student<span class="token punctuation">(</span><span class="token string">&#39;小花&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;18&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;女&#39;</span><span class="token punctuation">,</span> <span class="token number">165</span><span class="token punctuation">,</span> <span class="token string">&#39;唱歌&#39;</span><span class="token punctuation">)</span>
do_something<span class="token punctuation">(</span>stu<span class="token punctuation">)</span>




</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用 <code>dataclasses</code>数据类，使用 <code>pydantic</code>类型提示类，自行百度</p></li><li><p>拒绝函数具有隐式返回值</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 反例</span>
<span class="token keyword">def</span> <span class="token function">demo</span><span class="token punctuation">(</span>num<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试隐私返回值方法
    @param num: 
    @return: 
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> num <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
      <span class="token keyword">return</span> num
    
<span class="token comment"># 正例</span>
<span class="token keyword">def</span> <span class="token function">demo</span><span class="token punctuation">(</span>num<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;
    测试隐私返回值方法
    @param num: 
    @return: 
    &quot;&quot;&quot;</span>
    <span class="token keyword">if</span> num <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> num
    <span class="token keyword">return</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>异常解析：函数正常情况下返回值为int类型，但是参数小于10时，返回值为None,这时如果使用函数返回值可能会有一些意料之外的结果。</p></li></ul><h3 id="六、类的设计" tabindex="-1"><a class="header-anchor" href="#六、类的设计" aria-hidden="true">#</a> 六、类的设计</h3><ul><li><p>类的分类：数据类和是实现类（功能类）</p><p>数据类：例如这个类中保存的基本都是数据相关的，没有其他功能</p><p>实现类：这个类中有大量的实现方法，涉及到一些功能操作和实现</p></li><li><p><code>__init__.py</code>文件中尽量少写或者是不写功能类方法，功能方法放在下面的子模块中</p><ul><li><code>__init__</code>文件作用是模块的初始化作用，不适合写功能</li><li><code>__init__</code>文件名称难以区分功能作用，起不到标识的作用</li></ul></li><li><p>过于庞大的类</p><ul><li>第一指的是代码行数过长</li><li>第二指的是类的功能过于复杂</li></ul></li><li><p>私有方法外部引用</p><p>反例</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
        self<span class="token punctuation">.</span>age <span class="token operator">=</span> age
        self<span class="token punctuation">.</span>_sex <span class="token operator">=</span> <span class="token string">&#39;未知&#39;</span>
        
  zs <span class="token operator">=</span> Person<span class="token punctuation">(</span><span class="token string">&#39;zs&#39;</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span>

  <span class="token keyword">print</span><span class="token punctuation">(</span>zs<span class="token punctuation">.</span>_sex<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>随意为类添加属性</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 反例</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
      self<span class="token punctuation">.</span>age <span class="token operator">=</span> age

    <span class="token keyword">def</span> <span class="token function">set_sex</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> sex<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token triple-quoted-string string">&quot;&quot;&quot;设置性别&quot;&quot;&quot;</span>
      self<span class="token punctuation">.</span>sex <span class="token operator">=</span> sex
        
<span class="token comment"># 正例</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">:</span>
      self<span class="token punctuation">.</span>name <span class="token operator">=</span> name
      self<span class="token punctuation">.</span>age <span class="token operator">=</span> age
      self<span class="token punctuation">.</span>sex <span class="token operator">=</span> <span class="token boolean">None</span>

    <span class="token keyword">def</span> <span class="token function">set_sex</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> sex<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
      <span class="token triple-quoted-string string">&quot;&quot;&quot;设置性别&quot;&quot;&quot;</span>
      self<span class="token punctuation">.</span>sex <span class="token operator">=</span> sex
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>类的继承和类的组合，尽量少用类的多继承，多使用类的组合</p><p>类的多继承是保证类的多态性，但是过长的继承规则，不利于写代码和业务调试，类的组合也是符合很多设计模式的思路。</p></li></ul><h3 id="_7、模块设计" tabindex="-1"><a class="header-anchor" href="#_7、模块设计" aria-hidden="true">#</a> 7、模块设计</h3><ul><li>模块解耦，各个功能的模块要明确</li><li>公共方法的提取，公共方法要进行方法的抽取</li></ul><h3 id="_8、其他" tabindex="-1"><a class="header-anchor" href="#_8、其他" aria-hidden="true">#</a> 8、其他</h3><ul><li>数据类不要过于凌乱</li><li>过多的重复代码</li><li>没有注释或者令人困惑的注释</li><li>缩进：统一使用 <code>tab</code>四个宫格</li><li>空格，空行，这个以 <code>pycharm</code>格式化为准，快捷键 <code>ctrl+alt+l</code></li><li>行长度：这个以 <code>pycharm</code>格式化为准，一般120个字符</li><li>全局变量和私有变量：少使用全局变量，全局变量使得程序更难理解和使用</li><li>密码，密钥，token：在日志打印中注重隐私保护，不打印密码，密钥，token</li><li>一个py文件一般不超过300行</li></ul>`,10);function w(q,x){const e=p("ExternalLinkIcon");return i(),o("div",null,[u,n("ul",null,[d,n("li",null,[r,n("ul",null,[k,v,n("li",null,[n("p",null,[n("a",m,[a("函数注释统一使用 "),b,a("风格"),l(e)])]),g])])]),h,y,f]),_])}const S=t(c,[["render",w],["__file","个人代码风格.html.vue"]]);export{S as default};
