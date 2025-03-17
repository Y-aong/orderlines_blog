import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,a as n,b as s,d as p,e as t}from"./app-2d0f66e1.js";const l={},u=n("h1",{id:"_6、矩形路径",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_6、矩形路径","aria-hidden":"true"},"#"),s(" 6、矩形路径")],-1),r={href:"https://leetcode.cn/problems/unique-paths/",target:"_blank",rel:"noopener noreferrer"},k=t(`<p>一个机器人位于一个 <code>m x n</code> 网格的左上角 （起始点在下图中标记为 “Start” ）。</p><p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。</p><p>问总共有多少条不同的路径？</p><p><strong>示例 1：</strong></p><figure><img src="https://pic.leetcode.cn/1697422740-adxmsI-image.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：m = 3, n = 7
输出：28
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -&gt; 向下 -&gt; 向下
2. 向下 -&gt; 向下 -&gt; 向右
3. 向下 -&gt; 向右 -&gt; 向下
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 3：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：m = 7, n = 3
输出：28
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 4：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：m = 3, n = 3
输出：6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>思路</p><p><code>dp[i][j]</code>：表示着到达i，j位置一共有dp[i][j]种方法</p><pre><code>dp[i][j]一共有几种方式可以到达

上方或者是左方

\`dp[i][j] = dp[i-1][j] + dp[i][j-1]\`

初始化：

\`dp[0][j], dp[i][0] = 1, 1\`

遍历顺序：从左到右，从上到下
</code></pre><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">uniquePaths</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> m<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> n<span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&quot;&quot;&quot;
        dp[i][j]：表示着到达i，j位置一共有dp[i][j]种方法

        dp[i][j]一共有几种方式可以到达
        上方或者是左方
        dp[i][j] = dp[i-1][j] + dp[i][j-1]
        初始化：
            dp[0][j], dp[i][0] = 1, 1
        遍历顺序：从左到右，从上到下
        &quot;&quot;&quot;</span>
        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> n <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>dp<span class="token punctuation">)</span> 
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),d={href:"https://leetcode.cn/problems/unique-paths-ii/",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>一个机器人位于一个 <code>m x n</code> 网格的左上角 （起始点在下图中标记为 “Start” ）。</p><p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish”）。</p><p>现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？</p><p>网格中的障碍物和空位置分别用 <code>1</code> 和 <code>0</code> 来表示。</p><p><strong>示例 1：</strong></p><figure><img src="https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -&gt; 向右 -&gt; 向下 -&gt; 向下
2. 向下 -&gt; 向下 -&gt; 向右 -&gt; 向右
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><figure><img src="https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：obstacleGrid = [[0,1],[0,0]]
输出：1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>m == obstacleGrid.length</code></li><li><code>n == obstacleGrid[i].length</code></li><li><code>1 &lt;= m, n &lt;= 100</code></li><li><code>obstacleGrid[i][j]</code> 为 <code>0</code> 或 <code>1</code></li></ul><p>思路和递推公式基本一致，只是初始化不一样，增加点判断条件</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">uniquePathsWithObstacles</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> obstacleGrid<span class="token punctuation">:</span> List<span class="token punctuation">[</span>List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> obstacleGrid<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">0</span>

        m <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>obstacleGrid<span class="token punctuation">)</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>obstacleGrid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> n <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> obstacleGrid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">if</span> obstacleGrid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                <span class="token keyword">break</span>
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> obstacleGrid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">:</span>
                    <span class="token keyword">continue</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>dp<span class="token punctuation">)</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),b={href:"https://leetcode.cn/problems/minimum-path-sum/",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>给定一个包含非负整数的 <code>*m* x *n*</code> 网格 <code>grid</code> ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。</p><p>**说明：**每次只能向下或者向右移动一步。</p><p><strong>示例 1：</strong></p><figure><img src="https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：grid = [[1,2,3],[4,5,6]]
输出：12
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>思路：</p><p>这道题求得是到达右下角的最短路径，（ij）的位置只能从(i-1, j)和(im j-1)得来，那么如何得来呢 <code>(i-1, j)+grid[i][j]</code> <code>(i, j-1)+grid[i][j]</code></p><p>递归五部曲：</p><ul><li>确定dp数组含义:<code>dp[i][j]</code>到达(i,j)位置的最小路径</li><li>递推公式：<code>dp[i][j]=min(dp[i-1][j], dp[i][j-1])+grid[i][j]</code></li><li>初始化：首行首列需要递加求和</li><li>遍历顺序：从左到右，从上到下正序即可</li><li>打印</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">minPathSum</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> grid<span class="token punctuation">:</span> List<span class="token punctuation">[</span>List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        m <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>grid<span class="token punctuation">)</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>grid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> n <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token comment"># dp[i][j] = min(dp[i-1][j]+grid[i][j], dp[i][j-1]+grid[i][j])</span>
        dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> grid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> grid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>m<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>n<span class="token punctuation">)</span><span class="token punctuation">:</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),g={href:"https://leetcode.cn/problems/dungeon-game/",target:"_blank",rel:"noopener noreferrer"},y=t(`<p>恶魔们抓住了公主并将她关在了地下城 <code>dungeon</code> 的 <strong>右下角</strong> 。地下城是由 <code>m x n</code> 个房间组成的二维网格。我们英勇的骑士最初被安置在 <strong>左上角</strong> 的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。</p><p>骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。</p><p>有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为<em>负整数</em>，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 <em>0</em>），要么包含增加骑士健康点数的魔法球（若房间里的值为<em>正整数</em>，则表示骑士将增加健康点数）。</p><p>为了尽快解救公主，骑士决定每次只 <strong>向右</strong> 或 <strong>向下</strong> 移动一步。</p><p>返回确保骑士能够拯救到公主所需的最低初始健康点数。</p><p>**注意：**任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。</p><p><strong>示例 1：</strong></p><figure><img src="https://assets.leetcode.com/uploads/2021/03/13/dungeon-grid-1.jpg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
输出：7
解释：如果骑士遵循最佳路径：右 -&gt; 右 -&gt; 下 -&gt; 下 ，则骑士的初始健康点数至少为 7 。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>输入：dungeon = [[0]]
输出：1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>思路：</p><p>一开始我想的是从左上角到右下角进行遍历</p><p>但是这里有个问题就是我们一开始初始化这个左上角的值后，我们在遍历的过程中需要不断的更新我们初始化的值，这样是非常麻烦的。</p><p>因此我们可以从右下角往左上角进行遍历。</p><p>我们这里需要确保每个格子的初始hp都是1，初始化的就是1，和前一个格子-当前格子的血量取最大值</p><p>遍历顺序是从下往上，从右到左，也就是倒叙</p><p>动规五部曲</p><ul><li><p>确定dp数组含义：<code>dp[i][j]</code>到达i，j位置需要的最小血量</p></li><li><p>dp公式：<code>dp[i][j] = max(min(dp[i + 1][j], dp[i][j + 1])- dungeon[i][j], 1)</code>前一个格子的最小血量减去当前格子的血量，且最小值为1</p></li><li><p>初始化：</p><ul><li><code>dp[0][0]</code>最后一个格子的需要的血量 <code>max(1-dungeon[i][j], 1)</code></li><li><code>dp[-1][j]</code> = <code>max(1, dp[-1][i + 1] - dungeon[-1][i])</code></li><li><code>dp[i][-1] = max(1, dp[i + 1][-1] - dungeon[i][-1])</code></li></ul></li><li><p>遍历顺序倒序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>for i in range(m - 2, -1, -1):
for j in range(n - 2, -1, -1):
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">calculateMinimumHP</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> dungeon<span class="token punctuation">:</span> List<span class="token punctuation">[</span>List<span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token builtin">int</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> dungeon<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token number">0</span>
        m <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>dungeon<span class="token punctuation">)</span>
        n <span class="token operator">=</span> <span class="token builtin">len</span><span class="token punctuation">(</span>dungeon<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        dp <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">*</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span><span class="token punctuation">]</span>
        dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token operator">-</span> dungeon<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> dungeon<span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">-</span> dungeon<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>m <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">for</span> j <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                temp <span class="token operator">=</span> <span class="token builtin">min</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token builtin">max</span><span class="token punctuation">(</span>temp <span class="token operator">-</span> dungeon<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>dp<span class="token punctuation">)</span>
        <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20);function j(f,x){const a=o("ExternalLinkIcon");return c(),i("div",null,[u,n("p",null,[n("a",r,[s("62. 不同路径"),p(a)]),s("——基础类型")]),k,n("p",null,[n("a",d,[s("63. 不同路径 II"),p(a)]),s("——障碍物版本")]),m,n("p",null,[n("a",b,[s("64. 最小路径和"),p(a)]),s("——路径和")]),v,n("p",null,[n("a",g,[s("174. 地下城游戏"),p(a)])]),y])}const _=e(l,[["render",j],["__file","6、矩形路径.html.vue"]]);export{_ as default};
