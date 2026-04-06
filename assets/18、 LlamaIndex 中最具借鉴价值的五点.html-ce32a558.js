import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,e as a}from"./app-01aedd85.js";const r={},s=a(`<h1 id="llamaindex-中最具借鉴价值的五点" tabindex="-1"><a class="header-anchor" href="#llamaindex-中最具借鉴价值的五点" aria-hidden="true">#</a> LlamaIndex 中最具借鉴价值的五点</h1><p>这是AI帮我总结出来LlamaIndex 中最具借鉴价值的五点</p><h3 id="✅-亮点-1-分层索引-hierarchical-indexing-父子文档检索-parent-child-chunking" tabindex="-1"><a class="header-anchor" href="#✅-亮点-1-分层索引-hierarchical-indexing-父子文档检索-parent-child-chunking" aria-hidden="true">#</a> ✅ 亮点 1：<strong>分层索引（Hierarchical Indexing） + 父子文档检索（Parent-Child Chunking）</strong></h3><h4 id="🔍-llamaindex-做法" tabindex="-1"><a class="header-anchor" href="#🔍-llamaindex-做法" aria-hidden="true">#</a> 🔍 LlamaIndex 做法：</h4><ul><li>将文档切分为 <strong>小块（child nodes）</strong> 用于精确检索；</li><li>同时保留 <strong>大块（parent nodes，如整段/整页）</strong> 作为上下文容器；</li><li>检索时先找最相关的 child，再返回其 parent 作为上下文，避免信息碎片化。</li></ul><h4 id="🛠️-langchain-实现方案" tabindex="-1"><a class="header-anchor" href="#🛠️-langchain-实现方案" aria-hidden="true">#</a> 🛠️ LangChain 实现方案：</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.text_splitter import RecursiveCharacterTextSplitter

# Step 1: 切分 parent chunks（大块）
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
parent_docs = parent_splitter.split_documents(docs)

# Step 2: 为每个 parent 切分 child chunks（小块），并记录 parent_id
child_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
child_docs = []
for i, parent in enumerate(parent_docs):
    childs = child_splitter.split_documents([parent])
    for child in childs:
        child.metadata[&quot;parent_id&quot;] = i  # 关键：建立父子映射
        child.metadata[&quot;parent_content&quot;] = parent.page_content  # 或只存 ID，查时 join
    child_docs.extend(childs)

# Step 3: 仅用 child_docs 构建向量库
vectorstore = FAISS.from_documents(child_docs, embeddings)

# Step 4: 检索后，用 parent_content 作为上下文（而非 child）
retriever = vectorstore.as_retriever()
docs = retriever.invoke(query)
context = &quot;\\n\\n&quot;.join(set(doc.metadata[&quot;parent_content&quot;] for doc in docs))  # 去重
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="✅-亮点-2-自动上下文压缩-context-compression-re-ranking" tabindex="-1"><a class="header-anchor" href="#✅-亮点-2-自动上下文压缩-context-compression-re-ranking" aria-hidden="true">#</a> ✅ 亮点 2：<strong>自动上下文压缩（Context Compression / Re-Ranking）</strong></h3><h4 id="🔍-llamaindex-做法-1" tabindex="-1"><a class="header-anchor" href="#🔍-llamaindex-做法-1" aria-hidden="true">#</a> 🔍 LlamaIndex 做法：</h4><ul><li>检索出 N 个候选文档后，用 LLM 或 Cross-Encoder 对其与 query 的相关性<strong>重新打分</strong>；</li><li>只保留高相关片段，甚至<strong>提取关键句子</strong>，减少 token 浪费。</li></ul><h4 id="🛠️-langchain-实现方案-1" tabindex="-1"><a class="header-anchor" href="#🛠️-langchain-实现方案-1" aria-hidden="true">#</a> 🛠️ LangChain 实现方案：</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
# 或使用 Embedding+Cross-Encoder 压缩

# 方案 A：用 LLM 提取关键信息（适合小规模）
compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={&quot;k&quot;: 10})
)

# 方案 B：用 bge-reranker（推荐，高效）
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from langchain.retrievers.document_compressors import CrossEncoderReranker

model = HuggingFaceCrossEncoder(model_name=&quot;BAAI/bge-reranker-base&quot;)
compressor = CrossEncoderReranker(model=model, top_n=3)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={&quot;k&quot;: 10})
)

# 使用
compressed_docs = compression_retriever.invoke(&quot;你的问题&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="✅-亮点-3-元数据过滤-结构化查询-metadata-filtering" tabindex="-1"><a class="header-anchor" href="#✅-亮点-3-元数据过滤-结构化查询-metadata-filtering" aria-hidden="true">#</a> ✅ 亮点 3：<strong>元数据过滤 + 结构化查询（Metadata Filtering）</strong></h3><h4 id="🔍-llamaindex-做法-2" tabindex="-1"><a class="header-anchor" href="#🔍-llamaindex-做法-2" aria-hidden="true">#</a> 🔍 LlamaIndex 做法：</h4><ul><li>为每个 chunk 添加丰富元数据（如 source、date、author、category）；</li><li>支持在检索时按元数据过滤（如“只查 2023 年后的政策文件”）。</li></ul><h4 id="🛠️-langchain-实现方案-2" tabindex="-1"><a class="header-anchor" href="#🛠️-langchain-实现方案-2" aria-hidden="true">#</a> 🛠️ LangChain 实现方案：</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code># 在切分时注入 metadata
for doc in docs:
    doc.metadata.update({
        &quot;source&quot;: &quot;annual_report_2024.pdf&quot;,
        &quot;year&quot;: 2024,
        &quot;quarter&quot;: &quot;Q2&quot;,
        &quot;doc_type&quot;: &quot;financial&quot;
    })

# 检索时过滤
retriever = vectorstore.as_retriever(
    search_kwargs={
        &quot;k&quot;: 5,
        &quot;filter&quot;: {&quot;year&quot;: 2024, &quot;doc_type&quot;: &quot;financial&quot;}  # FAISS / Chroma 支持
    }
)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>✅ <strong>注意</strong>：确保你用的向量库支持 metadata filter（Chroma、Pinecone、Weaviate 支持，FAISS 需自定义）。</p></blockquote><h3 id="✅-亮点-4-查询理解与改写-query-understanding-transformation" tabindex="-1"><a class="header-anchor" href="#✅-亮点-4-查询理解与改写-query-understanding-transformation" aria-hidden="true">#</a> ✅ 亮点 4：**查询理解与改写（**<strong>Query</strong> <strong>Understanding / Transformation）</strong></h3><h4 id="🔍-llamaindex-做法-3" tabindex="-1"><a class="header-anchor" href="#🔍-llamaindex-做法-3" aria-hidden="true">#</a> 🔍 LlamaIndex 做法：</h4><ul><li>在检索前，用 LLM 对用户 query 做<strong>意图识别、关键词提取、查询扩展</strong>；</li><li>例如将“苹果怎么样？” → “苹果公司 2024 财报表现、股价趋势、新产品发布”。</li></ul><h4 id="🛠️-langchain-实现方案-3" tabindex="-1"><a class="header-anchor" href="#🛠️-langchain-实现方案-3" aria-hidden="true">#</a> 🛠️ LangChain 实现方案：</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

query_rewrite_prompt = PromptBuilder(
    template=&quot;你是一个查询优化器。请将以下用户问题改写为一个更清晰、包含关键实体和意图的搜索查询。\\n\\n用户问题: {question}\\n优化后查询:&quot;
)
rewrite_chain = LLMChain(llm=llm, prompt=query_rewrite_prompt)

original_query = &quot;苹果最近咋样？&quot;
optimized_query = rewrite_chain.run(original_query)  # 输出：&quot;苹果公司 2024 年最新财报和产品动态&quot;

# 用 optimized_query 去检索
docs = retriever.invoke(optimized_query)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="✅-亮点-5-评估闭环-evaluation-with-custom-metrics" tabindex="-1"><a class="header-anchor" href="#✅-亮点-5-评估闭环-evaluation-with-custom-metrics" aria-hidden="true">#</a> ✅ 亮点 5：<strong>评估闭环（Evaluation with Custom Metrics）</strong></h3><h4 id="🔍-llamaindex-做法-4" tabindex="-1"><a class="header-anchor" href="#🔍-llamaindex-做法-4" aria-hidden="true">#</a> 🔍 LlamaIndex 做法：</h4><ul><li>内置 <code>ResponseEvaluator</code>、<code>FaithfulnessEvaluator</code> 等工具；</li><li>强调用 <strong>ground truth + LLM-as-a-judge</strong> 评估 RAG 质量。</li></ul><h4 id="🛠️-langchain-实现方案-4" tabindex="-1"><a class="header-anchor" href="#🛠️-langchain-实现方案-4" aria-hidden="true">#</a> 🛠️ LangChain 实现方案：</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>from langchain.evaluation import load_evaluator
from langchain.evaluation.qa import QAEvalChain

# 忠实度评估（答案是否基于上下文）
faithfulness_evaluator = load_evaluator(&quot;labeled_score_string&quot;, llm=llm, criteria=&quot;faithfulness&quot;)

result = faithfulness_evaluator.evaluate_strings(
    prediction=answer,
    input=query,
    reference=context
)
print(result[&quot;score&quot;])  # 1-5 分
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),d=[s];function l(t,o){return n(),i("div",null,d)}const v=e(r,[["render",l],["__file","18、 LlamaIndex 中最具借鉴价值的五点.html.vue"]]);export{v as default};
