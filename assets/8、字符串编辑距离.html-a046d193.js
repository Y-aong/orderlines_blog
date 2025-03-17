import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,d as t,e as p}from"./app-2d0f66e1.js";const l={},u=n("h1",{id:"_8、字符串编辑距离",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_8、字符串编辑距离","aria-hidden":"true"},"#"),s(" 8、字符串编辑距离")],-1),r={id:"_392-判断子序列——入门题-公共子序列问题",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#_392-判断子序列——入门题-公共子序列问题","aria-hidden":"true"},"#",-1),k={href:"https://leetcode.cn/problems/is-subsequence/",target:"_blank",rel:"noopener noreferrer"},b=p(`<p>给定字符串 <strong>s</strong> 和 <strong>t</strong> ，判断 <strong>s</strong> 是否为 <strong>t</strong> 的子序列。</p><p>字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，<code>&quot;ace&quot;</code>是<code>&quot;abcde&quot;</code>的一个子序列，而<code>&quot;aec&quot;</code>不是）</p><p><strong>进阶：</strong></p><p>如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k &gt;= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;abc&quot;, t = &quot;ahbgdc&quot;
输出：true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;axc&quot;, t = &quot;ahbgdc&quot;
输出：false
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>0 &lt;= s.length &lt;= 100</code></li><li><code>0 &lt;= t.length &lt;= 10^4</code></li><li>两个字符串都只由小写字符组成。</li></ul><p>思路：</p><p>当s[i]==t[j],<code>dp[i+1][j+1] = dp[i][j]+1</code></p><p>当s[i]!=t[j],<code>dp[i+1][j+1] = max(dp[i+1][j], dp[i][j])</code></p><p>递归五部曲</p><ul><li>dp数组含义：<strong>表示以下标i为结尾的字符串s，和以下标j为结尾的字符串t，相同子序列的长度为<code>dp[i][j]</code></strong>。</li><li>递归公式 <ul><li>s[i]==t[j],<code>dp[i+1][j+1] = dp[i][j]+1</code></li><li>s[i]!=t[j],<code>dp[i+1][j+1] = max(dp[i+1][j], dp[i][j])</code></li></ul></li><li>初始化0即可</li><li>遍历顺序，从上到下从左到右，正序</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">isSubsequence</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> s<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> t<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">bool</span><span class="token punctuation">:</span>
        m <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>

        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> t<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">:</span>
                    dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token comment"># print(dp)</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> m

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),v={id:"_115-不同的子序列——出现个数",tabindex:"-1"},m=n("a",{class:"header-anchor",href:"#_115-不同的子序列——出现个数","aria-hidden":"true"},"#",-1),g={href:"https://leetcode.cn/problems/distinct-subsequences/",target:"_blank",rel:"noopener noreferrer"},_=p(`<p>给你两个字符串 <code>s</code> 和 <code>t</code> ，统计并返回在 <code>s</code> 的 <strong>子序列</strong> 中 <code>t</code> 出现的个数，结果需要对 109 + 7 取模。</p><p><strong>示例 1：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;rabbbit&quot;, t = &quot;rabbit&quot;
输出：3
解释：
如下所示, 有 3 种可以从 s 中得到 &quot;rabbit&quot; 的方案。
rabbbit
rabbbit
rabbbit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：s = &quot;babgbag&quot;, t = &quot;bag&quot;
输出：5
解释：
如下所示, 有 5 种可以从 s 中得到 &quot;bag&quot; 的方案。 
babgbag
babgbag
babgbag
babgbag
babgbag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">numDistinct</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> s<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">,</span> t<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        m <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span>

        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token builtin">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token builtin">len</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> t<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">:</span>
                    dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span>
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token comment"># print(dp)</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6);function h(f,j){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("h3",r,[d,s(),n("a",k,[s("392. 判断子序列"),t(a)]),s("——入门题(公共子序列问题)")]),b,n("h3",v,[m,s(),n("a",g,[s("115. 不同的子序列"),t(a)]),s("——出现个数")]),_])}const q=e(l,[["render",h],["__file","8、字符串编辑距离.html.vue"]]);export{q as default};
