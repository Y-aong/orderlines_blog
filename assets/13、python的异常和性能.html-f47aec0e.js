import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-01aedd85.js";const t={},o=e(`<h1 id="python异常和运行性能" tabindex="-1"><a class="header-anchor" href="#python异常和运行性能" aria-hidden="true">#</a> python异常和运行性能</h1><h3 id="一、引言" tabindex="-1"><a class="header-anchor" href="#一、引言" aria-hidden="true">#</a> 一、引言：</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;name&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;blue&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;age&#39;</span><span class="token punctuation">:</span> <span class="token number">18</span>
<span class="token punctuation">}</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    name <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">&#39;name&#39;</span><span class="token punctuation">]</span>
<span class="token keyword">except</span> KeyError<span class="token punctuation">:</span>
    name <span class="token operator">=</span> <span class="token string">&#39;default&#39;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个代码我们可能写的很常见，实际上就是利用KeyError异常。如果程序抛出了这个异常，那说明要获取的键不在字典里。不要较真说这种方式不可行，我是说这种方式是利用异常做控制流，那么异常会影响性能吗？。</p><h3 id="二、python-中异常与性能的关系" tabindex="-1"><a class="header-anchor" href="#二、python-中异常与性能的关系" aria-hidden="true">#</a> 二、<strong>Python 中异常与性能的关系</strong></h3><h4 id="_1-正常执行时的开销-无异常发生" tabindex="-1"><a class="header-anchor" href="#_1-正常执行时的开销-无异常发生" aria-hidden="true">#</a> <strong>1. 正常执行时的开销（无异常发生）</strong></h4><ul><li><strong>几乎可以忽略</strong>：当 <code>try/except</code> 块中没有发生异常时，Python 的优化使得其开销极小。</li></ul><p><strong>示例：无异常时的性能对比</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>
<span class="token keyword">import</span> timeit

<span class="token keyword">def</span> <span class="token function">no_exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            x <span class="token operator">=</span> <span class="token number">5</span>
        <span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">no_try</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        x <span class="token operator">=</span> <span class="token number">5</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;With try/except:&quot;</span><span class="token punctuation">,</span> timeit<span class="token punctuation">.</span>timeit<span class="token punctuation">(</span>no_exception<span class="token punctuation">,</span> number<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Without try/except:&quot;</span><span class="token punctuation">,</span> timeit<span class="token punctuation">.</span>timeit<span class="token punctuation">(</span>no_try<span class="token punctuation">,</span> number<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>E:<span class="token function selector">\\code</span><span class="token function selector">\\od</span><span class="token function selector">\\orderlines</span><span class="token function selector">\\venv</span><span class="token function selector">\\Scripts</span><span class="token function selector">\\python</span>.exe E:<span class="token function selector">\\code</span><span class="token function selector">\\od</span><span class="token function selector">\\orderlines</span><span class="token function selector">\\demo</span>.py 
With try/except: 0.13516389999949752
Without try/except: 0.10620410000046832

Process finished with exit code 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-异常发生时的开销" tabindex="-1"><a class="header-anchor" href="#_2-异常发生时的开销" aria-hidden="true">#</a> <strong>2. 异常发生时的开销</strong></h4><ul><li><strong>显著性能下降</strong>：当异常被抛出时，Python 需要创建异常对象、遍历调用栈（栈展开）、执行清理操作，这些操作的开销可能比正常代码高几个数量级。</li></ul><p><strong>示例：频繁抛出异常的性能测试</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> timeit


<span class="token keyword">def</span> <span class="token function">with_exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span> ValueError<span class="token punctuation">(</span><span class="token string">&quot;Error&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
            <span class="token keyword">pass</span>


<span class="token keyword">def</span> <span class="token function">without_exception</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">100000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">pass</span>  <span class="token comment"># 不抛出异常</span>


<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;With exception:&quot;</span><span class="token punctuation">,</span> timeit<span class="token punctuation">.</span>timeit<span class="token punctuation">(</span>with_exception<span class="token punctuation">,</span> number<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Without exception:&quot;</span><span class="token punctuation">,</span> timeit<span class="token punctuation">.</span>timeit<span class="token punctuation">(</span>without_exception<span class="token punctuation">,</span> number<span class="token operator">=</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-tex line-numbers-mode" data-ext="tex"><pre class="language-tex"><code>E:<span class="token function selector">\\code</span><span class="token function selector">\\od</span><span class="token function selector">\\orderlines</span><span class="token function selector">\\venv</span><span class="token function selector">\\Scripts</span><span class="token function selector">\\python</span>.exe E:<span class="token function selector">\\code</span><span class="token function selector">\\od</span><span class="token function selector">\\orderlines</span><span class="token function selector">\\demo</span>.py 
With exception: 0.840917200000149
Without exception: 0.0752133000005415

Process finished with exit code 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结论</strong>：抛出异常的代码比正常代码慢数百倍。</p><h3 id="二、《effective-python》中关于异常的建议" tabindex="-1"><a class="header-anchor" href="#二、《effective-python》中关于异常的建议" aria-hidden="true">#</a> <strong>二、《Effective Python》中关于异常的建议</strong></h3><h4 id="_1-只在异常情况下抛出异常" tabindex="-1"><a class="header-anchor" href="#_1-只在异常情况下抛出异常" aria-hidden="true">#</a> **1. <strong>只在异常情况下抛出异常</strong></h4><ul><li><strong>建议</strong>：不要将异常用于常规控制流。例如，避免用异常代替条件判断</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 错误示例：用异常代替条件判断（低效）</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    value <span class="token operator">=</span> get_value<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    value <span class="token operator">=</span> default_value

<span class="token comment"># 正确示例：直接判断（高效）</span>
value <span class="token operator">=</span> get_value<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> value <span class="token keyword">is</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
    value <span class="token operator">=</span> default_value
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-捕获具体异常而非通用异常" tabindex="-1"><a class="header-anchor" href="#_2-捕获具体异常而非通用异常" aria-hidden="true">#</a> **2. <strong>捕获具体异常而非通用异常</strong></h4><ul><li><strong>建议</strong>：仅捕获预期的异常类型，避免捕获所有异常（except Exception或except:）。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 错误示例：捕获所有异常（隐藏潜在错误）</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    risky_call<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span><span class="token punctuation">:</span>
    handle_error<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 正确示例：捕获具体异常（精准处理）</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    risky_call<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ConnectionError<span class="token punctuation">:</span>
    retry<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> TimeoutError<span class="token punctuation">:</span>
    <span class="token keyword">raise</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-避免在循环中抛出异常" tabindex="-1"><a class="header-anchor" href="#_3-避免在循环中抛出异常" aria-hidden="true">#</a> **3. **避免在循环中抛出异常</h4><ul><li><strong>建议</strong>：在循环内部频繁抛出异常会导致性能问题。例如，避免在循环中用异常代替条件判断</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 错误示例：在循环中频繁抛出异常（低效）</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> items<span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        process<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
    <span class="token keyword">except</span> InvalidItemError<span class="token punctuation">:</span>
        <span class="token keyword">continue</span>

<span class="token comment"># 正确示例：提前验证（高效）</span>
<span class="token keyword">for</span> item <span class="token keyword">in</span> items<span class="token punctuation">:</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> is_valid<span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">continue</span>
    process<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4-使用-else-和-finally-明确代码逻辑" tabindex="-1"><a class="header-anchor" href="#_4-使用-else-和-finally-明确代码逻辑" aria-hidden="true">#</a> **4. **使用 <code>else</code> 和 <code>finally</code> 明确代码逻辑</h4><ul><li><strong>建议</strong>：用 <code>else</code> 块替代重复的条件判断，用 <code>finally</code> 确保资源释放。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    resource <span class="token operator">=</span> acquire_resource<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ResourceError<span class="token punctuation">:</span>
    log_error<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    use_resource<span class="token punctuation">(</span>resource<span class="token punctuation">)</span>
    release_resource<span class="token punctuation">(</span>resource<span class="token punctuation">)</span>
<span class="token keyword">finally</span><span class="token punctuation">:</span>
    cleanup<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-自定义异常应继承-exception" tabindex="-1"><a class="header-anchor" href="#_5-自定义异常应继承-exception" aria-hidden="true">#</a> **5. **自定义异常应继承 <code>Exception</code></h4><ul><li><strong>建议</strong>：自定义异常应继承自 <code>Exception</code>（而非 <code>BaseException</code>），并避免使用字符串异常（Python 2 遗留问题）。</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">MyError</span><span class="token punctuation">(</span>Exception<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

<span class="token keyword">try</span><span class="token punctuation">:</span>
    <span class="token keyword">raise</span> MyError<span class="token punctuation">(</span><span class="token string">&quot;Custom error&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> MyError <span class="token keyword">as</span> e<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_6、总结" tabindex="-1"><a class="header-anchor" href="#_6、总结" aria-hidden="true">#</a> 6、总结</h4><ul><li><strong>异常处理的性能陷阱</strong>：异常本身开销小，但<strong>频繁抛出异常</strong>会导致性能崩溃。</li><li><strong>Effective Python 的核心思想</strong>：异常是“异常”，而非“常规控制流”工具。合理使用异常可以提升代码健壮性，但需避免滥用</li></ul>`,34),p=[o];function i(c,l){return s(),a("div",null,p)}const d=n(t,[["render",i],["__file","13、python的异常和性能.html.vue"]]);export{d as default};
