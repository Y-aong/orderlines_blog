---
icon: pen-to-square
date: 2024-11-08
category:
  - 状态机
  - transitions
tag:
  - transitions
star: true
---

# 10、python状态机的使用



我在自己的工作流中之前使用到队列作为状态的转换，后面使用状态机来实现流程的状态控制。

状态机（State Machine）是一种用于描述系统行为的数学模型，它通过状态、事件和转换规则来定义系统的逻辑流程。在实际开发中，状态机常用于游戏开发、工作流引擎、自动化控制等场景。本文将介绍如何使用 **`transitions`** 这个 Python 库快速构建和管理状态机，并通过示例展示其核心功能。



### **一. 什么是状态机？**



状态机由以下核心元素组成：
- **状态（States）**：系统可能处于的不同模式（如“启动”、“运行”、“停止”）。
- **事件（Events）**：触发状态转换的外部输入（如“按下按钮”、“收到消息”）。
- **转换（Transitions）**：根据事件从一个状态转移到另一个状态的规则。

有限状态机（FSM）是状态机的一种，其状态和转换规则是有限且预先定义的。



### **二. 安装与快速入门**



安装 `transitions`：
```bash
pip install transitions
```

---



### **三. 基础示例：交通灯状态机**



我们以交通灯为例，演示如何用 `transitions` 定义一个简单的状态机。

```python
from transitions import Machine

# 定义状态和事件
class TrafficLight:
    def __init__(self):
        # 状态列表
        self.states = ['red', 'green', 'yellow']
        
        # 事件与转换规则
        self.transitions = [
            {'trigger': 'change', 'source': 'red',   'dest': 'green'},
            {'trigger': 'change', 'source': 'green', 'dest': 'yellow'},
            {'trigger': 'change', 'source': 'yellow', 'dest': 'red'}
        ]
        
        # 初始化状态机
        self.machine = Machine(model=self, states=self.states, transitions=self.transitions, initial='red')

    def on_enter_state(self, state):
        print(f"Light turned {state}.")

# 创建实例并测试
light = TrafficLight()
print("Current state:", light.state)  # 输出：red

light.change()  # 触发事件
print("Current state:", light.state)  # 输出：green

light.change()
print("Current state:", light.state)  # 输出：yellow

light.change()
print("Current state:", light.state)  # 输出：red
```



### **四. 核心功能详解**



#### **4.1 状态转换的条件判断**
通过 `conditions` 参数添加条件，只有满足条件时才允许转换：
```python
from transitions import Machine

class Order:
    def __init__(self):
        self.states = ['pending', 'processing', 'shipped', 'delivered']
        self.transitions = [
            {'trigger': 'process', 'source': 'pending', 'dest': 'processing'},
            {
                'trigger': 'ship',
                'source': 'processing',
                'dest': 'shipped',
                'conditions': lambda self: self.is_ready  # 自定义条件
            },
            {'trigger': 'deliver', 'source': 'shipped', 'dest': 'delivered'}
        ]
        self.machine = Machine(model=self, states=self.states, transitions=self.transitions, initial='pending')
        self.is_ready = False  # 假设订单未准备好

order = Order()
order.process()  # 转到 processing
order.ship()     # 未满足条件，不转换
order.is_ready = True
order.ship()     # 现在可以转换到 shipped
```



#### **4.2 回调函数**

在状态转换时执行自定义逻辑：
```python
class TrafficLight:
    def __init__(self):
        self.states = ['red', 'green', 'yellow']
        self.transitions = [
            {'trigger': 'change', 'source': 'red', 'dest': 'green', 'before': 'on_leave_red'},
            {'trigger': 'change', 'source': 'green', 'dest': 'yellow', 'after': 'on_enter_yellow'}
        ]
        self.machine = Machine(model=self, states=self.states, transitions=self.transitions, initial='red')

    def on_leave_red(self):
        print("Leaving red state...")

    def on_enter_yellow(self):
        print("Entered yellow state!")

light = TrafficLight()
light.change()  # 输出：Leaving red state...
light.change()  # 输出：Entered yellow state!
```



### **五. 可视化状态机**



通过 `Machine.get_graph()` 生成状态图（需安装 `graphviz`）：
```python
from transitions import Machine
from transitions.extensions import GraphMachine

class TrafficLight(GraphMachine):
    def __init__(self):
        states = ['red', 'green', 'yellow']
        transitions = [
            {'trigger': 'change', 'source': 'red', 'dest': 'green'},
            {'trigger': 'change', 'source': 'green', 'dest': 'yellow'},
            {'trigger': 'change', 'source': 'yellow', 'dest': 'red'}
        ]
        super().__init__(self, states=states, transitions=transitions, initial='red', 
                        graph=True, auto_transitions=False, title="Traffic Light FSM")

light = TrafficLight()
light.get_graph().draw('traffic_light.png', prog='dot')  # 生成 PNG 图片
```



### **六. 进阶用法**



#### **6.1 分层状态机**

支持嵌套状态（Hierarchical State Machines）：
```python
from transitions.extensions import HierarchicalMachine

class Elevator(HierarchicalMachine):
    def __init__(self):
        states = [
            'stopped', 
            {'name': 'moving', 'children': ['up', 'down']}  # 子状态
        ]
        transitions = [
            {'trigger': 'start', 'source': 'stopped', 'dest': 'moving'},
            {'trigger': 'stop', 'source': 'moving', 'dest': 'stopped'},
            {'trigger': 'go_up', 'source': 'moving', 'dest': 'moving.up'},
            {'trigger': 'go_down', 'source': 'moving', 'dest': 'moving.down'}
        ]
        super().__init__(self, states=states, transitions=transitions, initial='stopped')

elevator = Elevator()
elevator.start()       # 进入 moving 状态
elevator.go_up()       # 进入 moving.up
elevator.stop()        # 返回 stopped
```



#### **6.2 并发状态机**

通过 `parallel=True` 支持多状态并发（需安装 `transitions-parallel`）：
```python
from transitions.extensions import ParallelMachine

class Robot(ParallelMachine):
    def __init__(self):
        states = [
            {'name': 'idle', 'on_enter': ['start_idle']},
            {'name': 'moving', 'on_enter': ['start_moving']},
            {'name': 'sensing', 'on_enter': ['start_sensing']}
        ]
        transitions = [
            {'trigger': 'start', 'source': 'initial', 'dest': ['moving', 'sensing']},
            {'trigger': 'stop', 'source': ['moving', 'sensing'], 'dest': 'idle'}
        ]
        super().__init__(self, states=states, transitions=transitions, initial='initial', 
                        parallel=True, auto_transitions=False)

robot = Robot()
robot.start()  # 并发进入 moving 和 sensing 状态
```

---



### **七. 常见问题**



#### **Q1: 如何处理无效的事件？**
```python
light = TrafficLight()
try:
    light.change()  # 如果当前状态不允许 change 事件，会抛出 MachineError
except MachineError as e:
    print(e)
```



#### **Q2: 如何自定义状态转换逻辑？**

通过 `conditions` 或 `unless` 参数添加条件判断：
```python
{'trigger': 'approve', 'source': 'pending', 'dest': 'approved', 
 'conditions': [self.is_valid, self.is_paid]}
```

---

### **八. 总结**



`transitions` 是一个功能强大且易用的状态机库，适合快速构建和管理复杂的业务逻辑。通过以下步骤，你可以轻松上手：
1. 定义状态和事件。
2. 使用 `Machine` 初始化状态机。
3. 添加条件和回调函数增强功能。
4. 可视化状态图辅助调试。
