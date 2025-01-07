---
icon: pen-to-square
date: 2024-04-17
category:
  - 算法笔记
  - 岛屿问题
tag:
  - bfs
---



# 岛屿问题中的dfs



### [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)



给你一个由 `'1'`（陆地）和 `'0'`（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

 

**示例 1：**

```
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
```

**示例 2：**

```
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
```

 

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` 的值为 `'0'` 或 `'1'`



```python
class Solution:
    def __init__(self):
        self.visited = None
        self.dirs = None
        self.m = None
        self.n = None
        self.grid = None

    def numIslands(self, grid: List[List[str]]) -> int:

        self.m, self.n = len(grid), len(grid[0])
        self.visited = [[False] * self.n for _ in range(self.m)]
        self.dirs = [(0, 1), (1, 0), (-1, 0), (0, -1)]
        result = 0
        for i in range(self.m):
            for j in range(self.n):
                if not self.visited[i][j] and grid[i][j] == "1":
                    self.visited[i][j] = True
                    result += 1
                    self.dfs(grid, i, j)

        return result

    def dfs(self, grid, x, y):
        for dir_x, dir_y in self.dirs:
            next_x = x + dir_x
            next_y = y + dir_y

            if next_x < 0 or next_x >= self.m or next_y < 0 or next_y >= self.n:
                continue
            if not self.visited[next_x][next_y] and grid[next_x][next_y] == "1":
                self.visited[next_x][next_y] = True
                self.dfs(grid, next_x, next_y)

```

### [695. 岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)



给你一个大小为 `m x n` 的二进制矩阵 `grid` 。

**岛屿** 是由一些相邻的 `1` (代表土地) 构成的组合，这里的「相邻」要求两个 `1` 必须在 **水平或者竖直的四个方向上** 相邻。你可以假设 `grid` 的四个边缘都被 `0`（代表水）包围着。

岛屿的面积是岛上值为 `1` 的单元格的数目。

计算并返回 `grid` 中最大的岛屿面积。如果没有岛屿，则返回面积为 `0` 。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/05/01/maxarea1-grid.jpg)

```
输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
```

**示例 2：**

```
输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0
```

 **提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` 为 `0` 或 `1`



```python
class Solution:
    def __init__(self):
        self.visited = None
        self.dirs = [(1, 0), (0, -1), (-1, 0), (0, 1)]

    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        result = 0
        self.visited = [[False] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 1 and not self.visited[i][j]:
                    self.total = 0
                    self.dfs(grid, i, j, m, n)
                    result = max(result, self.total, 1)
        return result

    def dfs(self, grid, x, y, m, n):
        for dir_x, dir_y in self.dirs:
            next_x, next_y = x + dir_x, y + dir_y

            if next_x < 0 or next_x >= m or next_y < 0 or next_y >= n:
                continue

            if not self.visited[next_x][next_y] and grid[next_x][next_y] == 1:
                self.visited[next_x][next_y] = True
                self.total += 1
                self.dfs(grid, next_x, next_y, m, n)

```

### [1020. 飞地的数量](https://leetcode.cn/problems/number-of-enclaves/)



给你一个大小为 `m x n` 的二进制矩阵 `grid` ，其中 `0` 表示一个海洋单元格、`1` 表示一个陆地单元格。

一次 **移动** 是指从一个陆地单元格走到另一个相邻（**上、下、左、右**）的陆地单元格或跨过 `grid` 的边界。

返回网格中 **无法** 在任意次数的移动中离开网格边界的陆地单元格的数量。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg)

```
输入：grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
输出：3
解释：有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg)

```
输入：grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
输出：0
解释：所有 1 都在边界上或可以到达边界。
```

 

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 500`
- `grid[i][j]` 的值为 `0` 或 `1`



本题要求找到不靠边的陆地面积，那么我们只要从周边找到陆地然后 通过 dfs或者bfs 将周边靠陆地且相邻的陆地都变成海洋，然后再去重新遍历地图的时候，统计此时还剩下的陆地就可以了。

```python
class Solution:
    def __init__(self):
        self.position = [[-1, 0], [0, 1], [1, 0], [0, -1]]	# 四个方向

    # 深度优先遍历，把可以通向边缘部分的 1 全部标记成 true
    def dfs(self, grid: List[List[int]], row: int, col: int, visited: List[List[bool]]) -> None:
        for current in self.position:
            newRow, newCol = row + current[0], col + current[1]
            # 索引下标越界
            if newRow < 0 or newRow >= len(grid) or newCol < 0 or newCol >= len(grid[0]): 
                continue
            # 当前位置值不是 1 或者已经被访问过了
            if grid[newRow][newCol] == 0 or visited[newRow][newCol]: continue
            visited[newRow][newCol] = True
            self.dfs(grid, newRow, newCol, visited)

    def numEnclaves(self, grid: List[List[int]]) -> int:
        rowSize, colSize, ans = len(grid), len(grid[0]), 0
        # 标记数组记录每个值为 1 的位置是否可以到达边界，可以为 True，反之为 False
        visited = [[False for _ in range(colSize)] for _ in range(rowSize)]
        # 搜索左边界和右边界，对值为 1 的位置进行深度优先遍历
        for row in range(rowSize):
            if grid[row][0] == 1:
                visited[row][0] = True
                self.dfs(grid, row, 0, visited)
            if grid[row][colSize - 1] == 1:
                visited[row][colSize - 1] = True
                self.dfs(grid, row, colSize - 1, visited)
        # 搜索上边界和下边界，对值为 1 的位置进行深度优先遍历，但是四个角不需要，因为上面遍历过了
        for col in range(1, colSize - 1):
            if grid[0][col] == 1:
                visited[0][col] = True
                self.dfs(grid, 0, col, visited)
            if grid[rowSize - 1][col] == 1:
                visited[rowSize - 1][col] = True
                self.dfs(grid, rowSize - 1, col, visited)
        # 找出矩阵中值为 1 但是没有被标记过的位置，记录答案
        for row in range(rowSize):
            for col in range(colSize):
                if grid[row][col] == 1 and not visited[row][col]:
                    ans += 1
        return ans
```

