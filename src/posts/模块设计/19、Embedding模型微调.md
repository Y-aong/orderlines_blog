---
icon: pen-to-square
date: 2025-11-07
category:
  - Agent
tag:
  - RAG，Embedding微调
---

# Embedding模型微调



### 基本步骤

1. 数据准备：采集半导体领域的生僻术语相关数据，构建样本集：
- 正样本对：生僻术语与对应的解释（如“晶圆键合工艺-通过高温高压将两片晶圆连接的工艺”）、生僻术语的不同表述（如“晶圆键合-晶圆贴合”）；
- 负样本对：生僻术语与无关术语（如“晶圆键合工艺-芯片封装”）、生僻术语与错误解释；样本量：至少采集1000组正样本对、500组负样本对，确保样本的多样性和有效性。
2. 数据预处理：对样本进行清洗、标注，将生僻术语和解释进行分块，归一化处理适配模型输入，同
时标注术语的领域标签。
3. 微调训练：基于开源Embedding模型（如BGE-large），采用对比损失函数（Contrastive Loss），冻结模型底层基础层（前8层），仅训练顶层适配层（后4层），减少训练成本和过拟合；训练参数：学习率1e-5，批次大小32，训练轮次10-15轮。
4. 效果验证：通过“语义相似度计算、RAG检索召回率”验证，若生僻术语的检索召回率低于80%，则增加样本量、调整训练参数，重新微调。



### 第一步：数据准备（核心章节）

数据质量直接决定微调成败。**3000条高质量样本，远胜30000条垃圾数据。**

#### 1. 数据格式：你需要哪种训练对？

根据业务场景选择合适的格式：

| 格式                                  | 示例                                                        | 适用场景                    |
| ------------------------------------- | ----------------------------------------------------------- | --------------------------- |
| `(query, positive_doc)`               | “怎么退运费？” → “退货流程中点击申请退款，填写物流单号即可” | 语义搜索、RAG问答           |
| `(query, positive_doc, negative_doc)` | “怎么退运费？” + 正样（退款流程）+ 负样（“如何注册会员”）   | 需要模型明确区分相似/不相似 |
| `(sentence_A, sentence_B, score)`     | “苹果很好吃” → “我喜欢吃苹果”，相似度0.9                    | 有细粒度相似度标注的数据    |

> 💡 起步建议：优先使用 `(query, positive_doc)` 格式配合MNR损失，最简单高效。

#### 2. 数据量：需要多少？

| 场景                  | 最低 | 推荐       | 上限   |
| --------------------- | ---- | ---------- | ------ |
| POC验证               | 500  | 1000-2000  | -      |
| 生产环境              | 1000 | 3000-10000 | 50000+ |
| 复杂领域（医疗/法律） | 2000 | 5000-20000 | -      |

- **低于500条**：效果通常不明显，不如直接用通用模型
- **超过5万条**：收益递减，更建议排查数据质量或换用更大规模的基础模型

#### 3. 数据来源：三种途径对比

| 途径       | 质量  | 成本 | 速度 | 最佳实践                               |
| ---------- | ----- | ---- | ---- | -------------------------------------- |
| 人工标注   | ⭐⭐⭐⭐⭐ | 高   | 慢   | 适合核心场景，建议作为“黄金标准”验证集 |
| 大模型生成 | ⭐⭐⭐⭐  | 低   | 快   | 起步首选，用GPT-4/Qwen等批量生成       |
| 日志挖掘   | ⭐⭐⭐   | 极低 | 快   | 适合已有线上系统的冷启动               |

**方案A：用大模型生成合成数据（推荐入门）**

```python
import pandas as pd
from openai import OpenAI

client = OpenAI()

def generate_training_pairs(doc_text: str) -> list:
    prompt = f"""
    从以下文档中生成5组(query, answer)对。
    query应该是用户可能问的真实问题，answer必须是文档中的原话或精简摘要。
    
    文档：{doc_text[:800]}
    
    输出格式：每组一行，用“||”分隔
    """
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    # 解析并返回pairs...
    return pairs

# 批量处理你的文档库
all_pairs = []
for doc in your_documents:
    all_pairs.extend(generate_training_pairs(doc))
```

**方案B：人工标注的最佳实践**

- **标注工具**：LabelStudio、Doccano（都支持Embedding任务）
- **标注指南**：标注前必须写清楚“什么算相似”。例如在电商场景：“羽绒服保暖吗？”与“这件羽绒服抗冻吗？”算相似，但与“羽绒服怎么洗”不算。
- **质量控制**：建议每条数据由2-3人背靠背标注，取多数结果
- **预算参考**：标注1000条`(query, positive_doc)`对，国内众包平台约500-800元

**方案C：从日志挖掘负样本**

如果已有搜索系统上线，可以利用点击日志：
- **正样本**：query → 用户点击过的文档
- **强负样本**：query → 展示过但用户未点击的文档（模型最难区分）

#### 4. Hard Negative：让模型真正“长记性”

这是提升模型上限的关键技巧。

**什么是Hard Negative？**
普通负样本是“苹果”vs“汽车”，模型本来就知道它们不相似。Hard Negative是“苹果手机”vs“苹果水果”——看起来很相似，但语义不相关。模型在Hard Negative上犯错，训练后才能真正学会精细区分。

**如何挖掘Hard Negative？**

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("your-base-model")

def mine_hard_negatives(query, positive_doc, candidate_pool, top_k=5):
    # 先用模型计算所有候选的相似度
    query_emb = model.encode(query)
    cand_embs = model.encode(candidate_pool)
    
    # 找出相似度较高但不是正确答案的文档
    scores = util.cos_sim(query_emb, cand_embs)[0]
    # 排除正样本本身
    hard_negatives = []
    for idx, score in enumerate(scores):
        if candidate_pool[idx] != positive_doc and score > 0.6:  # 相似度阈值可调
            hard_negatives.append((candidate_pool[idx], score))
    
    return sorted(hard_negatives, key=lambda x: -x[1])[:top_k]
```

**进阶方案**：使用Cross-Encoder作为难负样本挖掘器。Cross-Encoder精度更高但速度慢，适合离线挖掘；挖掘出的难负样本再用于Bi-Encoder的训练。

#### 5. 数据质量检查清单

在开始训练前，务必逐项检查：

- [ ] 正样本确实相关吗？—— 抽样50条人工复核
- [ ] 负样本不会误伤吗？—— 确保负样本不是隐藏的正样本
- [ ] 数据有偏斜吗？—— 检查各类型query的分布是否均衡
- [ ] 有重复或泄露吗？—— 确保训练集和验证集没有重叠文档

> 🚨 一个常见错误：训练集中有`(query, docA)`作为正样本，但验证集中`query`的真实答案是`docB`，而`docA`也是相关的。这会导致评估指标虚高。建议用大模型做一轮去重和冲突检测。

#### 6. 数据格式转换：转为训练所需的格式

假设你已经有了原始数据，需要转换为`sentence-transformers`接受的格式：

```python
from sentence_transformers import InputExample

# 格式1：仅正样本（配合MNR损失）
train_examples = [
    InputExample(texts=["什么是RAG？", "RAG是检索增强生成技术"]),
    InputExample(texts=["如何微调Embedding？", "使用对比学习对Embedding模型进行微调"]),
]

# 格式2：三元组（配合TripletLoss）
triplet_examples = [
    InputExample(texts=["苹果好吃吗", "苹果是一种水果，口感脆甜", "苹果手机多少钱"]),
]

# 格式3：带分数（配合CosineSimilarityLoss）
score_examples = [
    InputExample(texts=["天气真好啊", "今天天气不错"], label=0.9),
    InputExample(texts=["天气真好啊", "我要去吃饭了"], label=0.1),
]
```





## 一、为什么需要微调Embedding模型？

Embedding模型的核心任务是把语义相似的文本映射到向量空间中相近的位置。预训练模型虽然强大，但它是在通用语料（如维基百科、网页数据）上训练的，存在明显的局限性：

- **领域鸿沟**：医疗、法律、金融等专业领域的术语和表达方式，通用模型难以准确理解
- **语义漂移**：新兴词汇（如“碳中和”、“具身智能”）在预训练时可能不存在，无法获得准确表示
- **任务失配**：通用相似度判断与你的业务场景对“相似”的定义可能完全不同

微调的核心目标就是**调整向量空间的分布**，让相关的文本在向量空间中更靠近，不相关的文本更远离。




## 二、什么时候该微调，什么时候不该？

**适合微调的场景**：
- 模型无法理解你领域内的专业术语和语义关系
- 你有高质量的标注数据或可以构造出足够的训练样本
- 检索效果确实成为系统瓶颈，其他优化手段（如分块策略、混合检索）已经尝试过

**不建议微调的场景**：
- 问题其实是分块不合理导致的，调整分块策略就能解决
- 需要精确的关键词匹配（这时候应该考虑BM25等关键词检索）
- 没有足够的领域数据（至少需要1000-5000个高质量样本）

> 💡 一个重要的建议：**先评估，再微调**。在选择微调之前，先在目标数据集上评估基础模型的性能，确定微调的必要性和方向。这个评估结果也将作为后续对比的基线。



## 三、微调的技术原理

与微调大语言模型（LLM）不同，Embedding模型的微调使用的是**对比学习**方法。核心思想很简单：模型学习判断“给定这个锚点，哪个候选结果是最相似的？”

训练过程中，优化算法会不断调整模型参数，让正样本对在向量空间中更接近，负样本对更远离。最终形成一个语义结构化的向量空间，相似的文本自然地聚集在一起。

### 常用的损失函数

根据你的数据和任务目标，可以选择不同的损失函数：

**Multiple Negatives Ranking Loss（MNR损失）**：
- 输入：`(query, positive_doc)` 文本对
- 特点：自动将batch内的其他样本作为负样本，简单高效
- 适用：语义搜索、信息检索等任务

**Triplet Loss（三元组损失）**：
- 输入：`(anchor, positive, negative)` 三元组
- 特点：需要精心构造有意义的难负样本
- 适用：需要精细控制相似/不相似边界的场景

**Cosine Embedding Loss（余弦嵌入损失）**：
- 输入：`(sentence_A, sentence_B, score)` 带相似度分数的文本对
- 特点：支持不同程度的相似性（不仅仅是二元判断）
- 适用：有细粒度相似度标注的数据



## 四、微调实战指南（基于LangChain & Sentence Transformers）



### 第一步：数据准备

数据质量直接决定微调效果。根据任务复杂度，建议的数据量：

| 任务复杂度         | 建议样本量 | 说明                       |
| ------------------ | ---------- | -------------------------- |
| 简单任务（二分类） | 500-1000   | 窄领域，词汇重叠度高       |
| 中等复杂度         | 1000-5000  | 一般领域适配场景           |
| 复杂任务           | 10000+     | 专业术语密集，语义关系复杂 |

数据来源有三种途径：
- 使用Hugging Face等平台的公开数据集
- 人工标注（质量最高，成本也最高）
- 使用大模型生成合成数据（如用GPT-4构造`(query, relevant_doc)`对）



### 第二步：选择基础模型

MTEB榜单是选型的重要参考。对于初次尝试，建议从轻量级模型开始——微调后的小模型在特定领域上，往往能超越通用的大模型。

推荐的开源模型：
- `all-MiniLM-L6-v2`（轻量快速，适合起步）
- `BAAI/bge-base-en-v1.5`（中文场景推荐）
- `Alibaba-NLP/gte-modernbert-base`（最新高性能模型）



### 第三步：微调代码示例

以下使用`sentence-transformers`库进行微调：

```python
from sentence_transformers import SentenceTransformer, losses, InputExample
from torch.utils.data import DataLoader

# 1. 加载预训练模型
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# 2. 准备训练数据（(query, positive_doc) 对）
train_examples = [
    InputExample(texts=["什么是Embedding微调？", "Embedding微调是调整预训练向量以适应特定任务的技术"]),
    InputExample(texts=["RAG是什么？", "RAG是检索增强生成，结合检索和生成的AI架构"]),
    # ... 更多数据
]

# 3. 配置数据加载器
train_dataloader = DataLoader(train_examples, shuffle=True, batch_size=16)

# 4. 使用MNR损失函数（自动将batch内其他样本作为负样本）
train_loss = losses.MultipleNegativesRankingLoss(model)

# 5. 执行微调（关键参数：epochs通常2-5，学习率2e-5）
model.fit(
    train_objectives=[(train_dataloader, train_loss)],
    epochs=3,
    warmup_steps=100,
    optimizer_params={"lr": 2e-5}
)

# 6. 保存微调后的模型
model.save("finetuned-embedding-model")
```



### 第四步：评估与部署

微调前后，需要用专门的检索指标来评估效果：

- **Recall@k**：Top-k结果中包含相关文档的比例
- **MRR（Mean Reciprocal Rank）**：第一个相关文档排名的倒数均值
- **NDCG（Normalized Discounted Cumulative Gain）**：考虑排序位置的影响

如果效果提升明显，就可以将模型部署到生产环境，替代原有的通用Embedding模型。



### 第五步：在LangChain中使用微调后的模型

```python
from langchain_community.embeddings import HuggingFaceEmbeddings

# 加载微调好的模型
embeddings = HuggingFaceEmbeddings(
    model_name="./finetuned-embedding-model",
    model_kwargs={"device": "cuda"},
    encode_kwargs={"normalize_embeddings": True}  # 归一化便于相似度计算
)

# 正常使用，就像使用任何Embedding模型一样
vectorstore = Chroma.from_documents(documents, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
```




## 写在最后

Embedding模型的微调并不是一个“非做不可”的步骤，但在合适的场景下，它能带来显著的检索效果提升。关键在于：

1. **先诊断问题**：确定瓶颈确实在Embedding环节
2. **准备高质量数据**：数据质量比数量更重要
3. **选择合适的损失函数和基础模型**
4. **用科学的评估方法验证效果**
