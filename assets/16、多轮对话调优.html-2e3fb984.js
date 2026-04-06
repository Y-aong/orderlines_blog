import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,e as r}from"./app-01aedd85.js";const a={},s=r(`<h1 id="多轮对话调优" tabindex="-1"><a class="header-anchor" href="#多轮对话调优" aria-hidden="true">#</a> 多轮对话调优</h1><p><strong>仅靠 LangChain 提供的“开箱即用”组件构建多轮 RAG 对话系统，往往在真实场景中效果不佳</strong>。</p><p>原因包括：</p><ul><li><strong>对话历史冗余或噪声累积</strong>：越聊越长，LLM 注意力被分散；</li><li><strong>检索</strong> <strong>query</strong> <strong>不准确</strong>：后续问题依赖上下文（如“他指的是谁？”），但原始 query 无法独立检索；</li><li><strong>上下文窗口限制</strong>：LLM 输入长度有限，无法塞入全部历史 + 检索结果；</li><li><strong>幻觉增强</strong>：错误的历史理解会误导后续回答；</li><li><strong>LangChain 默认链式结构较“线性”</strong>，缺乏对多轮语义状态的显式建模。</li></ul><table><thead><tr><th>问题</th><th>工程化解决方案</th></tr></thead><tbody><tr><td>1. 历史太长 → LLM 上下文溢出</td><td>使用 对话摘要（Summary） 或 滑动窗口（Window） 管理历史</td></tr><tr><td>2. 后续问题指代模糊（如“它”、“上文提到的…”）</td><td>引入 查询重写（Query Rewriting / Coreference Resolution）</td></tr><tr><td>3. 检索结果与当前意图不匹配</td><td>使用 HyDE（Hypothetical Document Embeddings） 或 多阶段检索</td></tr><tr><td>4. 回答偏离事实或产生幻觉</td><td>加入 答案验证（Answer Validation） 或 引用溯源（Citation）</td></tr><tr><td>5. 多轮语义状态丢失</td><td>引入 对话状态跟踪（DST）轻量版，如关键词/意图缓存</td></tr></tbody></table><h3 id="_1-智能查询重写-query-rewriting-——最关键" tabindex="-1"><a class="header-anchor" href="#_1-智能查询重写-query-rewriting-——最关键" aria-hidden="true">#</a> 1. **智能查询重写（**<strong>Query</strong> <strong>Rewriting）——最关键！</strong></h3><p>目标：把模糊的后续问题（如“那怎么用？”）改写成可独立检索的完整问题（如“RAG 怎么使用？”）</p><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 使用 create_history_aware_retriever（LangChain 内置）
from langchain.chains import create_history_aware_retriever

query_rewrite_prompt = ChatPromptTemplate.from_messages([
    (&quot;system&quot;, &quot;你是一个助手，负责将用户当前的问题改写成一个独立、完整、可用于检索的问题。&quot;),
    MessagesPlaceholder(&quot;chat_history&quot;),
    (&quot;human&quot;, &quot;当前问题：{input}\\n\\n改写后的问题：&quot;)
])

history_aware_retriever = create_history_aware_retriever(
    llm, base_retriever, query_rewrite_prompt
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-对话历史压缩-history-compression" tabindex="-1"><a class="header-anchor" href="#_2-对话历史压缩-history-compression" aria-hidden="true">#</a> 2. <strong>对话历史压缩（History Compression）</strong></h3><h4 id="方案-a-滑动窗口-推荐简单场景" tabindex="-1"><a class="header-anchor" href="#方案-a-滑动窗口-推荐简单场景" aria-hidden="true">#</a> 方案 A：滑动窗口（推荐简单场景）</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.memory import ConversationBufferWindowMemory
memory = ConversationBufferWindowMemory(k=3, return_messages=True)  # 只保留最近3轮
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="方案-b-动态摘要-适合长对话" tabindex="-1"><a class="header-anchor" href="#方案-b-动态摘要-适合长对话" aria-hidden="true">#</a> 方案 B：动态摘要（适合长对话）</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.memory import ConversationSummaryBufferMemory

memory = ConversationSummaryBufferMemory(
    llm=llm,
    max_token_limit=500,  # 超出后自动摘要
    return_messages=True
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-上下文注入策略优化" tabindex="-1"><a class="header-anchor" href="#_3-上下文注入策略优化" aria-hidden="true">#</a> 3. <strong>上下文注入策略优化</strong></h3><p>不要简单拼接所有 retrieved docs + 全部 history。建议：</p><ul><li><strong>只保留与当前问题最相关的 top-k 文档</strong>（如 k=3~5）</li><li><strong>对文档做 chunk 重排序或过滤</strong>（如用 LLM 判断相关性）</li><li><strong>在 prompt 中明确区分“历史”和“检索上下文”</strong></li></ul><div class="language-Plain line-numbers-mode" data-ext="Plain"><pre class="language-Plain"><code>[系统指令]
你是一个专业助手，请基于以下【检索文档】和【最近对话】回答问题。
若文档未提及，请说“我不知道”，不要编造。

【检索文档】
{context}

【最近对话】
{chat_history}

【用户问题】
{input}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-引入-反思-或-自验证-机制-减少幻觉" tabindex="-1"><a class="header-anchor" href="#_4-引入-反思-或-自验证-机制-减少幻觉" aria-hidden="true">#</a> 4. <strong>引入“反思”或“自验证”机制（减少幻觉）</strong></h3><p>在生成答案后，让 LLM 自己检查是否与文档一致：</p><h3 id="_5-session-级缓存与状态管理" tabindex="-1"><a class="header-anchor" href="#_5-session-级缓存与状态管理" aria-hidden="true">#</a> 5. <strong>Session 级缓存与状态管理</strong></h3><p>对于同一会话，可以缓存：</p><ul><li>用户意图（如“正在咨询 RAG 部署”）</li><li>关键实体（如“用户提到的模型是 Llama3”）</li><li>已检索过的文档 ID（避免重复）</li></ul><blockquote><p><strong>LangChain 是工具，不是解决方案</strong>。 多轮 RAG 的效果瓶颈不在框架，而在<strong>对话状态建模 + 检索-生成协同设计</strong>。</p></blockquote><p>你需要在 LangChain 之上做：</p><ul><li>查询重写（必须）</li><li>历史管理（滑动 or 摘要）</li><li>上下文精炼</li><li>答案校验</li><li>日志与评估闭环</li></ul>`,25),t=[s];function d(l,o){return i(),n("div",null,t)}const m=e(a,[["render",d],["__file","16、多轮对话调优.html.vue"]]);export{m as default};
