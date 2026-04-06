---
icon: pen-to-square
date: 2025-06-19
category:
  - python
tag:
  - RAG
---

# RAG存在的问题和解决思路



### **一、文档层（Document Layer）问题**

-  **1. PDF / Office 文档格式混乱**

  问题：PDF 结构丢失、段落断裂、表格识别错误、图像关联中断。  

  解决方案：文档结构化解析（Document Normalization），多模态解析。

- **文字/图像/表格之间的关联关系丢失**

  表格 + 解释性文本 绑定为一个 chunk  

  图像 + caption + 引用段落 绑定为一个 multimodal block  

  采用 **多模态 embedding（CLIP / siglip / Voyage-multimodal）**  

-  **Chunk 边界断裂（Chunking 不感知结构）**

  - 滑动窗口分块
  - 表格、图像不切碎，保持单独 chunk
  - 基于标题层级/段落

- **多文档版本混乱（旧版手册与新版矛盾）**

  - 元数据过滤
  - 检索时指定版本
  - 生成时表明冲突

- **多语言文档混合（中英并存）**

  - 索引时多语言
  - 检索时中英结合

- **专业领域知识**
  - Embedding微调



### **二、检索层（Retrieval Layer）问题**

- **6. Embedding 偏差、领域漂移**embedding 对行业术语（如 SMU、Id-Vgs）不敏感。  
  - 领域数据微调 embedding
  - 添加领域词表

- **7. 稠密向量检索召回不够**
  - 多路召回。BM25，向量，关键字，知识图谱
- **8. 多模态信息无法召回（图像/表格找不到）**
  - 索引时应该使用多模态模型处理
- **9. 多文档可信度排序**
  - 初级检索：向量召回 top-k  
  - 高级重排（rerank）：Cross-Encoder（如 bge-reranker）
  - 先规则后向量，最后重排。元数据优先级
- **10. 权限隔离缺失（A/B 团队数据暴露）**
  - 添加 metadata：`team`, `user_id`, `department`  
  - 检索时 vector DB 层过滤权限  
-  **11. 零样本/长尾查询无法召回**
  - 查询重写
  - 知识图谱
  - HYDE
- **12. 检索可解释性缺失**
  - 返回匹配字段 + 相似度 score  
  - 多路召回

###  **三、推理层（Reasoning Layer）问题**

-  **13. 多源文档互相矛盾 → 放大幻觉**
  - 规则排序
  - 若冲突存在 → 在答案中明确列出：
- **14.** **LLM** **不引用检索结果，自己胡编**
  - 提示词优化，规则放后面
  - json结构化输出
  - 检索的数据太多，噪声太大，优化检索结果
  - 反思模型
- **15. LLM 没能利用所有检索结果（Fusion Poor）**
  - 检索融合
  - 反思模型
- **16. 跨 chunk 依赖关系缺失（long-range dependency）**
  - GraphRAG（知识图谱 + 文本图）  
  - 小文本检索，大文本召回

###  **四、更新层（Ingestion & Index）问题**

- **17. 文档频繁更新无法实时同步**
  - 增量更新（Incremental Indexing）
  - 基于 hash 的 chunk 稳定 ID  

- **18. 大量文档更新导致向量库膨胀**
  - 对旧版本自动下架（soft delete）
  - 周期性 GC（清理废弃向量）  
  -  低频访问内容转离线存储

