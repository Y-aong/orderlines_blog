import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as e,e as a}from"./app-2d0f66e1.js";const o={},l=a(`<h1 id="_1、变量作用域" tabindex="-1"><a class="header-anchor" href="#_1、变量作用域" aria-hidden="true">#</a> 1、变量作用域</h1><h3 id="一、定义" tabindex="-1"><a class="header-anchor" href="#一、定义" aria-hidden="true">#</a> 一、定义</h3><p>python变量的作用域取决于变量被赋值的位置，python中，只有当变量在模块，类，函数中定义的时候才会有作用域的概念。一共有四种作用域:</p><h3 id="二、局部作用域" tabindex="-1"><a class="header-anchor" href="#二、局部作用域" aria-hidden="true">#</a> 二、局部作用域</h3><p>在函数中创建的变量，是局部变量，当函数被执行时，会创建一个局部作用域，这些局部变量只能在这个作用域内使用，出了这个作用域就无法使用了</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    value <span class="token operator">=</span> <span class="token number">100</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、嵌套作用域" tabindex="-1"><a class="header-anchor" href="#三、嵌套作用域" aria-hidden="true">#</a> 三、嵌套作用域</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    value <span class="token operator">=</span> <span class="token number">100</span>
    <span class="token keyword">def</span> <span class="token function">test_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        value2 <span class="token operator">=</span> <span class="token number">99</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>value2<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token keyword">return</span> test_2

a <span class="token operator">=</span> test<span class="token punctuation">(</span><span class="token punctuation">)</span>
a<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果一个函数的内部又定义了一个函数，那么这样就产生了嵌套作用域，其实嵌套作用域是一个相对概念。</p><h3 id="四、全局作用域" tabindex="-1"><a class="header-anchor" href="#四、全局作用域" aria-hidden="true">#</a> 四、全局作用域</h3><p>在Python中，全局作用域指的是在整个程序范围内都可以访问的变量和函数的集合。全局作用域中的变量和函数可以在程序的任何地方被访问和修改，除非它们被限定在更小的作用域内（如局部作用域或嵌套作用域）。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>value <span class="token operator">=</span> <span class="token number">100</span>

<span class="token keyword">def</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>

test<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>全局作用域与局部作用域</strong>：</p><ul><li>如果在局部作用域（如函数内部）定义了一个与全局作用域中同名的变量，那么在局部作用域中对这个变量的修改不会影响到全局作用域中的变量，除非使用<code>global</code>关键字。</li></ul><p><strong>修改全局变量</strong>：</p><ul><li><p>在函数内部，如果你想修改全局变量，需要使用<code>global</code>关键字来声明这个变量是全局的。</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>x <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">def</span> <span class="token function">my_function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> x
    x <span class="token operator">=</span> <span class="token number">10</span>

my_function<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>  <span class="token comment"># 输出: 10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p><strong>全局作用域与类</strong>：</p><ul><li>在类定义中，类变量属于全局作用域，因为它们是在模块级别定义的。</li><li>实例变量则属于局部作用域，因为它们是针对每个类的实例单独创建的。</li></ul><h3 id="五、内置作用域-系统内固定模块中定义的变量" tabindex="-1"><a class="header-anchor" href="#五、内置作用域-系统内固定模块中定义的变量" aria-hidden="true">#</a> 五、内置作用域，系统内固定模块中定义的变量</h3><p>在Python中，内置作用域指的是Python解释器自动提供的一组预定义的变量和函数，它们是Python语言的一部分，不需要导入任何模块即可直接使用。这些内置的变量和函数是Python语言的核心组成部分，它们包括：</p><ol><li><p><strong>内置常量</strong>：</p><ul><li><code>True</code> 和 <code>False</code>：布尔值。</li><li><code>None</code>：表示空值或无值。</li></ul></li><li><p><strong>内置类型</strong>：</p><ul><li><code>int</code>、<code>float</code>、<code>str</code>、<code>list</code>、<code>tuple</code>、<code>dict</code>、<code>set</code>、<code>frozenset</code>、<code>bool</code>、<code>bytes</code>、<code>bytearray</code>、<code>complex</code> 等。</li></ul></li><li><p><strong>内置函数</strong>：</p><ul><li><code>len()</code>：返回对象（如列表、元组、字典等）的长度。</li><li><code>range()</code>：返回一个可迭代的数字序列。</li><li><code>min()</code>、<code>max()</code>：返回一组值中的最小值或最大值。</li><li><code>type()</code>：返回对象的类型。</li><li><code>isinstance()</code>：检查一个对象是否是一个已知的类型。</li><li><code>print()</code>：打印输出。</li><li><code>open()</code>：打开一个文件。</li><li><code>help()</code>：提供关于对象的文档字符串。</li><li><code>dir()</code>：返回对象的属性列表。</li><li><code>eval()</code>：计算字符串表达式的值。</li><li><code>exec()</code>：执行字符串中的Python代码。</li><li><code>globals()</code>、<code>locals()</code>：返回当前全局和局部符号表的字典。</li></ul></li><li><p><strong>内置异常</strong>：</p><ul><li><code>Exception</code>：所有内置非系统退出异常的基类。</li><li><code>TypeError</code>、<code>ValueError</code>、<code>IndexError</code>、<code>KeyError</code> 等。</li></ul></li><li><p><strong>内置模块</strong>：</p><ul><li><code>__main__</code>：如果Python脚本作为主程序运行，这个模块会包含脚本的代码。</li><li><code>sys</code>：提供访问解释器的变量和函数。</li><li><code>math</code>：提供数学运算函数。</li><li><code>datetime</code>：提供日期和时间处理的类。</li><li><code>json</code>：用于解析和生成JSON数据。</li><li><code>os</code>：提供操作系统相关功能。</li><li><code>re</code>：提供正则表达式匹配操作。</li><li><code>random</code>：提供生成随机数的函数。</li></ul></li></ol><p>这些内置的变量和函数是Python语言的一部分，它们被存储在内置作用域中，可以直接访问，无需任何导入语句。这些内置功能为Python编程提供了极大的便利，使得开发者可以快速地进行各种操作，而不需要依赖外部库。</p>`,22),c=[l];function i(t,d){return s(),e("div",null,c)}const u=n(o,[["render",i],["__file","1、python变量的作用域.html.vue"]]);export{u as default};
