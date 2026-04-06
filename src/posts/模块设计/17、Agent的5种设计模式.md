---
icon: pen-to-square
date: 2025-10-03
category:
  - Agent
tag:
  - Agent
---

# Agent的五种设计模式



### 前言：当 AI 需要“三思而后行”

现在的 AI 已经不仅仅是聊天机器人了。当我们让 AI 去订机票、分析财报或者修 Bug 时，我们其实在要求它像人一样工作。

人类解决问题通常不是靠“灵光一现”（虽然有时候是），而是靠**逻辑推演、工具使用、自我反省和分工合作**。这就是 Agentic Design Patterns（智能体设计模式）的由来。

在 LangChain 生态中，构建 Agent 早已不是简单的 `LLMChain`，而是进入了 **LangGraph** 的时代。今天我们用最通俗的方式，聊聊构建稳健 AI Agent 的 5 种核心设计模式。

---

### 模式一：思维链 —— 让 AI 展示“草稿纸”

**设计思路：**
思维链的核心在于**将复杂问题拆解为中间步骤**。普通的 Prompt 像让 AI 直接猜答案，而 CoT 是让 AI 像做数学题一样写步骤。这样做的目的是把隐式的推理过程显式化，让模型在每一步都能基于上一步的结果进行调整，大幅提高逻辑正确率。

**技术实现：**
在 LangChain 中，最简单的实现就是通过 Prompt Template 强制要求模型输出 “Step 1, Step 2...”。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate

llm = ChatOpenAI(model="gpt-4o")

# 核心：显式要求模型展示推理过程
cot_template = PromptTemplate(
    input_variables=["question"],
    template="""问题: {question}
    请一步一步思考：
    1. 分析问题的关键点
    2. 回忆相关公式或逻辑
    3. 计算中间结果
    4. 得出最终结论
    
    思考过程:"""
)

chain = cot_template | llm
# 输入复杂逻辑题时，效果远好于直接问答案
response = chain.invoke({"question": "小明比小红大3岁，小红比小刚小2岁，谁最大？"})
print(response.content)
```

> **应用场景**：数学运算、逻辑推理、代码生成。

---

### 模式二：路由 —— 给 AI 装上“红绿灯”

**设计思路：**
一个通用模型什么都懂，但什么都不精。路由模式就是让 AI 当**调度员**：先听懂用户要什么（意图识别），然后把任务扔给最擅长这个领域的“专家 Agent”去处理。

**技术实现：**
利用 LangGraph 的 `Command` 机制，根据分类结果跳转到不同的子节点。

```python
from langgraph.graph import StateGraph, Command
from langchain_openai import ChatOpenAI
import json

llm = ChatOpenAI(model="gpt-4o")

# 定义状态
class State(dict):
    query: str
    next_agent: str

# 路由器节点：判断去哪个部门
def router_node(state: State):
    response = llm.invoke(f"分类问题：'{state['query']}' 属于 ['技术', '销售', '闲聊']？只输出词语。")
    category = response.content.strip()
    
    # 动态路由：返回 Command 改变 goto 方向
    if "技术" in category:
        return Command(goto="tech_agent")
    elif "销售" in category:
        return Command(goto="sales_agent")
    else:
        return Command(goto="chat_agent")

# 构建图
builder = StateGraph(State)
builder.add_node("router", router_node)
# ... 添加 tech_agent, sales_agent 等节点
builder.set_entry_point("router")

app = builder.compile()
```

> **应用场景**：客服系统（分单）、多知识库问答（分库）、多模态处理。

---

### 模式三：反思 —— 让 AI 学会“自我批评”

**设计思路：**
人类写完代码会 Review，写完文章会校对。反思模式就是引入一个 **“生成器-评判器”** 架构。生成器负责写，评判器负责找茬，然后把意见反馈回去重写，直到质量达标。

**技术实现：**
这是一个典型的循环结构。在 LangGraph 中，我们可以设置一个条件边（Conditional Edge），如果评分低于阈值，就跳回“重写”节点。

```python
from langgraph.graph import StateGraph, END

class ReflectionState(dict):
    content: str
    feedback: str
    score: int

def generate(state):
    # 根据反馈（如有）生成内容
    return {"content": llm.invoke(f"写文章: {state.get('feedback', '')}").content}

def reflect(state):
    # 评判内容并打分
    critique = llm.invoke(f"给这段打分(1-10)并提建议: {state['content']}")
    return {"feedback": critique.content, "score": extract_score(critique.content)}

def should_continue(state):
    if state["score"] < 8:
        return "generate"  # 不合格，回去重写
    return END

# 构建循环图
graph.add_node("generate", generate)
graph.add_node("reflect", reflect)
graph.add_edge("generate", "reflect")
graph.add_conditional_edges("reflect", should_continue)
```

> **应用场景**：代码调试、内容润色、机器翻译优化。

---

### 模式四：并行 —— 让 AI 学会“三头六臂”

**设计思路：**
当我们需要从不同维度分析同一份数据时，串行执行太慢。并行模式利用大模型的无状态特性，同时发起多个请求，最后合并结果。这能显著降低端到端的延迟。

**技术实现：**
LangChain 的 `RunnableParallel` 天生支持并发调用，非常适合让多个 Agent 同时处理同一个输入。

```python
from langchain_core.runnables import RunnableParallel

# 假设我们有三个专业分析师
sentiment_agent = prompt_sentiment | llm
keywords_agent = prompt_keywords | llm
summary_agent = prompt_summary | llm

# 构建并行任务
parallel_chain = RunnableParallel(
    sentiment=sentiment_agent,
    keywords=keywords_agent,
    summary=summary_agent
)

# 输入一次，三个 Agent 同时在后台跑
result = parallel_chain.invoke({"input": "这家公司财报不错，但负债率高。市场反应冷淡。"})
print(result)
```

> **应用场景**：多维度数据标注、竞品分析、安全审查。

---

### 模式五：计划-执行 —— 让 AI 成为“项目经理”

**设计思路：**
之前的模式都像是“接活干”。但如果任务极其复杂，比如“帮我策划一场婚礼”，AI 如果直接动手，肯定会乱套。

**计划-执行模式**借鉴了 **Plan-and-Solve** 论文的思路。它先让 AI 扮演**规划者（Planner）**：不干活，只列清单。列出任务 A -> 任务 B -> 任务 C。然后交给**执行者（Executor）**去干。如果中间出错了，规划者还能修改计划。

**技术实现：**
这是 LangGraph 最擅长的。主图负责调度，子图负责执行，甚至支持人类在中间环节进行审批（Human-in-the-loop）。

```python
# 伪代码思路展示
def planner(state):
    # 1. 生成任务列表 ["Search data", "Write code", "Test"]
    plan = llm.invoke(f"分解任务: {state['task']}")
    return {"plan": plan, "step_index": 0}

def executor(state):
    # 2. 执行当前步骤（调用工具或代码）
    current_task = state["plan"][state["step_index"]]
    result = call_tool(current_task)
    return {"result": result}

def replan_or_next(state):
    # 3. 决定是继续下一步，还是因为失败需要重新规划
    if "error" in state:
        return "planner"
    if state["step_index"] >= len(state["plan"]):
        return END
    return "executor"
```

> **应用场景**：自动化报告生成（先搜资料再写）、自动编程（先设计架构再写代码）、旅行规划。

---

