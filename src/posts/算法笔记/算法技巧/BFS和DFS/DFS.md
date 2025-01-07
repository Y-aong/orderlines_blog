---
icon: pen-to-square
date: 2024-04-08
category:
  - 算法笔记
  - dfs
tag:
  - dfs
---



# DFS算法



### 一、基础概念

bfs，这个算法我一开始接触的时候简直就是一脸懵，在学习回溯算法的时候就看到有的题解中提到了dfs,学习递归的时候也有人提到bfs，它的出现频率特别高。在学习二叉树时候bfs的出现频率更高。终于在学习图论的时候我来把它搞清楚。

dfs是**可一个方向去搜，不到黄河不回头，直到遇到绝境了，搜不下去了，再换方向**（换方向的过程就涉及到了回溯）。

下面我借用代码随想录中的图片进行解释

上面说道dfs是可一个方向搜，不到黄河不回头。 那么我们来举一个例子。

如图一，是一个无向图，我们要搜索从节点1到节点6的所有路径。

![图一](https://code-thinking-1253855093.file.myqcloud.com/pics/20220707093643.png)

那么dfs搜索的第一条路径是这样的： （假设第一次延默认方向，就找到了节点6），图二

![图二](https://code-thinking-1253855093.file.myqcloud.com/pics/20220707093807.png)

此时我们找到了节点6，（遇到黄河了，是不是应该回头了），那么应该再去搜索其他方向了。 如图三：

![图三](https://code-thinking-1253855093.file.myqcloud.com/pics/20220707094011.png)

路径2撤销了，改变了方向，走路径3（红色线）， 接着也找到终点6。 那么撤销路径2，改为路径3，在dfs中其实就是回溯的过程（这一点很重要，很多录友不理解dfs代码中回溯是用来干什么的）

又找到了一条从节点1到节点6的路径，又到黄河了，此时再回头，下图图四中，路径4撤销（回溯的过程），改为路径5。

![图四](https://code-thinking-1253855093.file.myqcloud.com/pics/20220707094322.png)

- 搜索方向，是认准一个方向搜，直到碰壁之后再换方向
- 换方向是撤销原路径，改为节点链接的下一个路径，回溯的过程。

### 二、dfs其他

#### 2.1、dfs和递归

正是因为dfs搜索可一个方向，并需要回溯，所以用递归的方式来实现是最方便的。

递归是一种代码技巧，dfs把递归更加具象化，是一种解决特定问题的方式，也是递归的一种。

所以递归三部曲中同样也适用于dfs



#### 2.1、dfs和回溯

回溯是dfs中的一种解决类似二叉树问题的一种具体解决方式。但是dfs不仅可以解决二叉树问题也可以解决图论中的问题。

关于回溯算法之前的算法模版类似于

```python
def backtracking(参数) {
    if (终止条件) {
        存放结果;
        return;
    }

    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }
}

```



但是图论中的dfs又是这样的

```python
# 记录被遍历过的节点
visited = []
# 记录从起点到当前节点的路径
onPath = []

""" 图遍历框架 """
def traverse(graph, s):
    if visited[s]:
        return
    # 经过节点 s，标记为已遍历
    visited[s] = True
    # 做选择：标记节点 s 在路径上
    onPath[s] = True
    for neighbor in graph.neighbors(s):
        traverse(graph, neighbor)
    # 撤销选择：节点 s 离开路径
    onPath[s] = False
```

有没有发现回溯的地方不一致。这里是因为

- DFS 算法，关注点在节点
- 回溯算法，关注点在树枝

如果执行这段代码，你会发现根节点被漏掉了：

```python
def traverse(root):
    if root is None:
        return
    for child in root.children:
        print("进入节点 {}".format(child))
        traverse(child)
        print("离开节点 {}".format(child))
```

