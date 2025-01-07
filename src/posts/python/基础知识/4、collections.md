---
icon: pen-to-square
date: 2023-07-15
category:
  - python 
tag:
  - collections
---

# 内置模块collections 



### 一、Counter--统计对象的个数

Counter类可以统计对象的个数， 它是字典的子类, 它有3种创建方法, 它支持访问缺失键, 更新计数器, 返回top N数据, 算术和集合操作，下面讲解Counter类的用法

#### 1. 创建

Counter有3种创建对象的方法

```python
from collections import Counter

c1 = Counter()      # 创建一个空的Counter对象
c2 = Counter('hello world')      # 从一个可迭代对象(列表,元组,字典,字符串)创建
c3 = Counter(a=3, b=4)      # 从一组键值对创建

print(c2)
print(c3)
```

程序输出结果

```python
Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})
Counter({'b': 4, 'a': 3})
```

只看c2的话，不禁让人感到以后，使用字符串的方法不是可以实现相同的功能么？

```python
word = 'hello world'
print(word.count('h'))  # 1
print(word.count('l'))  # 3
```

其实不然，虽然列表，字符串都提供了count方法，但是想要查看所有元素的数量，却需要你逐个调用才能获取，而Counter类则要简单便捷的多。

#### 2. 访问缺失的键

Counter虽然是字典的子类，但访问缺失的键时，不会引发KeyError, 而是返回0

```python
from collections import Counter

c1 = Counter()      # 创建一个空的Counter对象
print(c1['apple'])  # 0
```

#### 3. 计数器更新

更新有两种方法，一种是使用update方法，一种是使用subtract方法， update方法用来新增计数， subtract方法用来减少计数， 分别来演示

**使用update**

```python
from collections import Counter

c1 = Counter('hello world')
c1.update('hello')  # 使用另一个iterable对象更新
print(c1['o'])      # 3

c2 = Counter('world')
c1.update(c2)       # 使用另一个Counter对象更新
print(c1['o'])      # 4
```

**使用subtract**

```python
from collections import Counter

c1 = Counter('hello world')
c1.subtract('hello')  # 使用另一个iterable对象更新
print(c1['o'])      # 1

c2 = Counter('world')
c1.subtract(c2)       # 使用另一个Counter对象更新
print(c1['o'])      # 0
```

#### 4. 键的删除

同字典一样，使用del即可删除键值对

```python
from collections import Counter

c1 = Counter('hello world')
del c1['o']
print(c1['o'])      # 0
```

#### 5. elements()

elements()返回一个迭代器，一个元素的计数是多少，在迭代器中就会有多少

```python
from collections import Counter

c1 = Counter('hello world')
lst = list(c1.elements())
print(lst)      # ['h', 'e', 'l', 'l', 'l', 'o', 'o', ' ', 'w', 'r', 'd']
```

#### 6. most_common([n])

most_common返回top N的列表，列表里的元素是元组，如果计数相同，排列无指定顺序, 如果不指定n， 则返回所有元素

```python
from collections import Counter

c1 = Counter('hello world')
print(c1.most_common(2))        # [('l', 3), ('o', 2)]
```

#### 7. 算术和集合操作

Counter类还支持+、-、&、|操作， &和|操作分别返回两个Counter对象各元素的最小值和最大值， 需要强调一点， 通过算数和集合操作得到Counter对象将删除计数值小于1的元素

```python
from collections import Counter

c = Counter(a=1, b=3)
d = Counter(a=2, b=2)
print(c + d)  # Counter({'b': 5, 'a': 3})
print(c - d)  # Counter({'b': 1})
print(c & d)  # Counter({'b': 2, 'a': 1})
print(c | d)  # Counter({'b': 3, 'a': 2})
```

