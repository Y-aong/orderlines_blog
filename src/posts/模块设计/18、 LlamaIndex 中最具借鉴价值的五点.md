---
icon: pen-to-square
date: 2025-10-07
category:
  - Agent
tag:
  - RAG
---

#  LlamaIndex 中最具借鉴价值的五点



这是AI帮我总结出来LlamaIndex 中最具借鉴价值的五点



### ✅ 亮点 1：**分层索引（Hierarchical Indexing） + 父子文档检索（Parent-Child Chunking）**



#### 🔍 LlamaIndex 做法：

- 将文档切分为 **小块（child nodes）** 用于精确检索；
- 同时保留 **大块（parent nodes，如整段/整页）** 作为上下文容器；
- 检索时先找最相关的 child，再返回其 parent 作为上下文，避免信息碎片化。

#### 🛠️ LangChain 实现方案：

```Python
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Step 1: 切分 parent chunks（大块）
parent_splitter = RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=200)
parent_docs = parent_splitter.split_documents(docs)

# Step 2: 为每个 parent 切分 child chunks（小块），并记录 parent_id
child_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
child_docs = []
for i, parent in enumerate(parent_docs):
    childs = child_splitter.split_documents([parent])
    for child in childs:
        child.metadata["parent_id"] = i  # 关键：建立父子映射
        child.metadata["parent_content"] = parent.page_content  # 或只存 ID，查时 join
    child_docs.extend(childs)

# Step 3: 仅用 child_docs 构建向量库
vectorstore = FAISS.from_documents(child_docs, embeddings)

# Step 4: 检索后，用 parent_content 作为上下文（而非 child）
retriever = vectorstore.as_retriever()
docs = retriever.invoke(query)
context = "\n\n".join(set(doc.metadata["parent_content"] for doc in docs))  # 去重
```





### ✅ 亮点 2：**自动上下文压缩（Context Compression / Re-Ranking）**

#### 🔍 LlamaIndex 做法：

- 检索出 N 个候选文档后，用 LLM 或 Cross-Encoder 对其与 query 的相关性**重新打分**；
- 只保留高相关片段，甚至**提取关键句子**，减少 token 浪费。

#### 🛠️ LangChain 实现方案：

```Python
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
# 或使用 Embedding+Cross-Encoder 压缩

# 方案 A：用 LLM 提取关键信息（适合小规模）
compressor = LLMChainExtractor.from_llm(llm)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10})
)

# 方案 B：用 bge-reranker（推荐，高效）
from langchain_community.cross_encoders import HuggingFaceCrossEncoder
from langchain.retrievers.document_compressors import CrossEncoderReranker

model = HuggingFaceCrossEncoder(model_name="BAAI/bge-reranker-base")
compressor = CrossEncoderReranker(model=model, top_n=3)
compression_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=vectorstore.as_retriever(search_kwargs={"k": 10})
)

# 使用
compressed_docs = compression_retriever.invoke("你的问题")
```



### ✅ 亮点 3：**元数据过滤 + 结构化查询（Metadata Filtering）**



#### 🔍 LlamaIndex 做法：

- 为每个 chunk 添加丰富元数据（如 source、date、author、category）；
- 支持在检索时按元数据过滤（如“只查 2023 年后的政策文件”）。



#### 🛠️ LangChain 实现方案：

```Python
# 在切分时注入 metadata
for doc in docs:
    doc.metadata.update({
        "source": "annual_report_2024.pdf",
        "year": 2024,
        "quarter": "Q2",
        "doc_type": "financial"
    })

# 检索时过滤
retriever = vectorstore.as_retriever(
    search_kwargs={
        "k": 5,
        "filter": {"year": 2024, "doc_type": "financial"}  # FAISS / Chroma 支持
    }
)
```

> ✅ **注意**：确保你用的向量库支持 metadata filter（Chroma、Pinecone、Weaviate 支持，FAISS 需自定义）。



### ✅ 亮点 4：**查询理解与改写（****Query** **Understanding / Transformation）**



#### 🔍 LlamaIndex 做法：

- 在检索前，用 LLM 对用户 query 做**意图识别、关键词提取、查询扩展**；
- 例如将“苹果怎么样？” → “苹果公司 2024 财报表现、股价趋势、新产品发布”。



#### 🛠️ LangChain 实现方案：

```Python
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

query_rewrite_prompt = PromptBuilder(
    template="你是一个查询优化器。请将以下用户问题改写为一个更清晰、包含关键实体和意图的搜索查询。\n\n用户问题: {question}\n优化后查询:"
)
rewrite_chain = LLMChain(llm=llm, prompt=query_rewrite_prompt)

original_query = "苹果最近咋样？"
optimized_query = rewrite_chain.run(original_query)  # 输出："苹果公司 2024 年最新财报和产品动态"

# 用 optimized_query 去检索
docs = retriever.invoke(optimized_query)
```



### ✅ 亮点 5：**评估闭环（Evaluation with Custom Metrics）**

#### 🔍 LlamaIndex 做法：

- 内置 `ResponseEvaluator`、`FaithfulnessEvaluator` 等工具；
- 强调用 **ground truth + LLM-as-a-judge** 评估 RAG 质量。



#### 🛠️ LangChain 实现方案：

```Python
from langchain.evaluation import load_evaluator
from langchain.evaluation.qa import QAEvalChain

# 忠实度评估（答案是否基于上下文）
faithfulness_evaluator = load_evaluator("labeled_score_string", llm=llm, criteria="faithfulness")

result = faithfulness_evaluator.evaluate_strings(
    prediction=answer,
    input=query,
    reference=context
)
print(result["score"])  # 1-5 分
```