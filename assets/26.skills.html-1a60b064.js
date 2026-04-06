import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c as p,a as n,b as s,d as e,e as o}from"./app-01aedd85.js";const c={},d=n("h1",{id:"skills注意点",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#skills注意点","aria-hidden":"true"},"#"),s(" skills注意点")],-1),r={id:"一、什么是skills-https-claudecn-com-docs-agent-skills",tabindex:"-1"},u=n("a",{class:"header-anchor",href:"#一、什么是skills-https-claudecn-com-docs-agent-skills","aria-hidden":"true"},"#",-1),v={href:"https://claudecn.com/docs/agent-skills/%EF%BC%89",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,"skills包含三种类型的内容，每种数据都在不同的时间加载。",-1),m=n("p",null,[n("strong",null,"元数据：始终加载")],-1),b=n("ul",null,[n("li",null,"Skill 的 YAML frontmatter 提供发现信息"),n("li",null,"Claude 在启动时加载此元数据并包含在系统提示中")],-1),h=n("p",null,[n("strong",null,"指令（触发时加载）")],-1),g={href:"http://SKILL.md",target:"_blank",rel:"noopener noreferrer"},_={href:"http://SKILL.md",target:"_blank",rel:"noopener noreferrer"},f=n("li",null,"只有这时内容才进入上下文窗口",-1),x=o(`<p><strong>资源和代码（按需加载）</strong></p><ul><li><strong>指令</strong>: 额外的 markdown 文件</li><li><strong>代码</strong>: Claude 通过 bash 运行的可执行脚本</li><li><strong>资源</strong>: 数据库模式、API 文档、模板或示例等参考材料</li></ul><h3 id="二、skill的结构" tabindex="-1"><a class="header-anchor" href="#二、skill的结构" aria-hidden="true">#</a> 二、skill的结构</h3><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">name</span><span class="token punctuation">:</span> 你的 Skill 名称
<span class="token key atrule">description</span><span class="token punctuation">:</span> 此 Skill 的简要描述以及何时使用它</span>
<span class="token punctuation">---</span></span>

<span class="token title important"><span class="token punctuation">#</span> Skill Name</span>

<span class="token title important"><span class="token punctuation">##</span> 快速开始</span>

<span class="token title important"><span class="token punctuation">###</span> 基本用法</span>
步骤 1：准备工作
步骤 2：执行任务

<span class="token title important"><span class="token punctuation">###</span> 高级用法</span>
步骤 1：配置选项
步骤 2：优化性能

<span class="token title important"><span class="token punctuation">##</span> 最佳实践</span>

<span class="token title important"><span class="token punctuation">###</span> 性能优化</span>
<span class="token list punctuation">-</span> 建议 1
<span class="token list punctuation">-</span> 建议 2

<span class="token title important"><span class="token punctuation">###</span> 错误处理</span>
<span class="token list punctuation">-</span> 常见错误及解决方案
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>必需字段</strong>: <code>name</code> 和 <code>description</code></p><p><strong>Frontmatter 限制</strong>:</p><ul><li><code>name</code>: 最多 64 字符</li><li><code>description</code>: 最多 1024 字符</li></ul><h3 id="三、skill的编写技巧" tabindex="-1"><a class="header-anchor" href="#三、skill的编写技巧" aria-hidden="true">#</a> 三、skill的编写技巧</h3><h4 id="描述示例" tabindex="-1"><a class="header-anchor" href="#描述示例" aria-hidden="true">#</a> 描述示例</h4><p>description: 处理财务报表</p><p><strong>问题</strong>：</p><ul><li>缺少触发场景描述</li><li>意图模糊</li><li>命中准确率低</li></ul><p><strong>修改</strong></p><ul><li>采用动作+触发时机的结构</li><li>什么时候用于什么</li></ul><h4 id="结构化指令" tabindex="-1"><a class="header-anchor" href="#结构化指令" aria-hidden="true">#</a> 结构化指令</h4><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> Skill Name</span>

<span class="token title important"><span class="token punctuation">##</span> 快速开始</span>

<span class="token title important"><span class="token punctuation">###</span> 基本用法</span>
步骤 1：准备工作
步骤 2：执行任务

<span class="token title important"><span class="token punctuation">###</span> 高级用法</span>
步骤 1：配置选项
步骤 2：优化性能

<span class="token title important"><span class="token punctuation">##</span> 最佳实践</span>

<span class="token title important"><span class="token punctuation">###</span> 性能优化</span>
<span class="token list punctuation">-</span> 建议 1
<span class="token list punctuation">-</span> 建议 2

<span class="token title important"><span class="token punctuation">###</span> 错误处理</span>
<span class="token list punctuation">-</span> 常见错误及解决方案
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="提供具体示例" tabindex="-1"><a class="header-anchor" href="#提供具体示例" aria-hidden="true">#</a> 提供具体示例</h4><p><strong>包含可运行的代码</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">## 示例：提取 PDF 文本</span>

\`\`\`python
<span class="token keyword">import</span> pdfplumber

<span class="token keyword">with</span> pdfplumber<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;document.pdf&quot;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> pdf<span class="token punctuation">:</span>
    <span class="token keyword">for</span> page <span class="token keyword">in</span> pdf<span class="token punctuation">.</span>pages<span class="token punctuation">:</span>
        text <span class="token operator">=</span> page<span class="token punctuation">.</span>extract_text<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span>
\`\`\`

<span class="token operator">**</span>输出<span class="token operator">**</span>：
\`\`\`
Page <span class="token number">1</span> content here<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>避免抽象描述</strong>：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 示例</span>
使用相关库读取 PDF 文件并提取内容。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="复杂内容单独文件" tabindex="-1"><a class="header-anchor" href="#复杂内容单独文件" aria-hidden="true">#</a> 复杂内容单独文件</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>pdf-skill/
├── SKILL.md          # 主指令（&lt; 5k tokens）
├── FORMS.md          # 表单处理详细指南
├── MERGE.md          # PDF 合并指南
├── REFERENCE.md      # 完整 API 参考
└── scripts/
    └── utilities.py  # 实用脚本
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="何时使用脚本" tabindex="-1"><a class="header-anchor" href="#何时使用脚本" aria-hidden="true">#</a> 何时使用脚本</h4><p><strong>使用脚本的场景</strong>：</p><ul><li>确定性操作（文件格式转换、数据验证）</li><li>复杂算法（加密、压缩）</li><li>需要特定库的操作</li></ul><p><strong>使用指令的场景</strong>：</p><ul><li>需要灵活判断的任务</li><li>上下文相关的决策</li><li>创意性工作</li></ul><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">##</span> 数据验证</span>

使用验证脚本确保数据格式正确：

<span class="token code"><span class="token punctuation">\`\`\`</span><span class="token code-language">bash</span>
<span class="token code-block language-bash language-bash language-bash">python scripts/validate.py data.json</span>
<span class="token punctuation">\`\`\`</span></span>

脚本会检查：
<span class="token list punctuation">-</span> JSON 格式有效性
<span class="token list punctuation">-</span> 必需字段存在
<span class="token list punctuation">-</span> 数据类型正确
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h4><p>编写高质量 Agent Skills 的关键：</p><ol><li><strong>清晰的描述</strong> - Claude 知道何时使用</li><li><strong>结构化内容</strong> - 易于理解和导航</li><li><strong>具体示例</strong> - 可直接使用的代码</li><li><strong>渐进式披露</strong> - 从简单到复杂</li><li><strong>完善的文档</strong> - 限制、错误、最佳实践</li></ol><h3 id="四、通过工具验证skill" tabindex="-1"><a class="header-anchor" href="#四、通过工具验证skill" aria-hidden="true">#</a> 四、通过工具验证skill</h3><p>通过skills-ref 进行验证skill</p><ul><li>YAML格式语法检查</li><li>name匹配度验证</li><li>文件应用完整性检查</li></ul><p><strong>CLI</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Validate a skill</span>
skills-ref validate path/to/skill

<span class="token comment"># Read skill properties (outputs JSON)</span>
skills-ref read-properties path/to/skill

<span class="token comment"># Generate &lt;available_skills&gt; XML for agent prompts</span>
skills-ref to-prompt path/to/skill-a path/to/skill-b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>python API</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> pathlib <span class="token keyword">import</span> Path
<span class="token keyword">from</span> skills_ref <span class="token keyword">import</span> validate<span class="token punctuation">,</span> read_properties<span class="token punctuation">,</span> to_prompt

<span class="token comment"># Validate a skill directory</span>
problems <span class="token operator">=</span> validate<span class="token punctuation">(</span>Path<span class="token punctuation">(</span><span class="token string">&quot;my-skill&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> problems<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Validation errors:&quot;</span><span class="token punctuation">,</span> problems<span class="token punctuation">)</span>

<span class="token comment"># Read skill properties</span>
props <span class="token operator">=</span> read_properties<span class="token punctuation">(</span>Path<span class="token punctuation">(</span><span class="token string">&quot;my-skill&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Skill: </span><span class="token interpolation"><span class="token punctuation">{</span>props<span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string"> - </span><span class="token interpolation"><span class="token punctuation">{</span>props<span class="token punctuation">.</span>description<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># Generate prompt for available skills</span>
prompt <span class="token operator">=</span> to_prompt<span class="token punctuation">(</span><span class="token punctuation">[</span>Path<span class="token punctuation">(</span><span class="token string">&quot;skill-a&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Path<span class="token punctuation">(</span><span class="token string">&quot;skill-b&quot;</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>prompt<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,39);function y(w,S){const a=l("ExternalLinkIcon");return t(),p("div",null,[d,n("h3",r,[u,s(" 一、什么是skills（"),n("a",v,[s("https://claudecn.com/docs/agent-skills/）"),e(a)])]),k,m,b,h,n("ul",null,[n("li",null,[n("a",g,[s("SKILL.md"),e(a)]),s(" 主体包含过程知识：工作流、最佳实践和指导")]),n("li",null,[s("当你请求与 Skill 描述匹配的内容时，Claude 通过 bash 从文件系统读取 "),n("a",_,[s("SKILL.md"),e(a)])]),f]),x])}const P=i(c,[["render",y],["__file","26.skills.html.vue"]]);export{P as default};
