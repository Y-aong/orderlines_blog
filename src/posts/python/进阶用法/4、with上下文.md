---
icon: pen-to-square
date: 2023-07-15
category:
  - python 
tag:
  - with 上下文语句
---


# with 上下文语句

**一、什么是with 上下文语句**

- with 语句用于管理上下文语句，可以使用with作为上下文管理器
- 上下文，相当于现实生活中的上下文语义，在python中脱离了上下文环境所声明的类，属性可能会失效



### **二、什么情况下会声明上下文**

在我们需要操作资源的时候，可以使用上下文语句，来操作资源的连接和关闭，专注于业务代码的实现

经典的例子就是操作文件时使用的

```python
with open("demo.txt") as f:
    f.read()
```



### **三、我们如何声明一个上下文管理器**

声明一个类，类中实现了`__enter__`, `__exit__`方法的就是一个上下文管理器

**例子**

```python
class MyResource:
    def __enter__(self):
        print("begin connect resource")
        return self

    def __exit__(self, exc_type, exc_value, tb):
        print("close connection")

    def query(self):
        print("begin execute resource")


with MyResource() as resource:
    resource.query()
```

**打印结果**

```text
begin connect resource
begin execute resource
close connection
```

- 问题一、这个as 后面的到底是什么
  在当前上下文环境中它是`__enter__`方法中返回的值，当脱离了这个上下文环境就是`None`

- 问题二、 `__exit__`中参数 exc_type, exc_value, tb是代表着什么
  当上下文中的代码正常执行的时候这些参数都是`None`没有任何意义，当上下文代码中出现异常时，这里的参数就代表这异常信息

  ```python
  class MyResource:
      def __enter__(self):
          print("begin connect resource")
          return self
  
      def __exit__(self, exc_type, exc_value, tb):
          print(f"exc_type=={exc_type}")
          print(f"exc_value=={exc_value}")
          print(f"tb=={tb}")
          print("close connection")
  
      def query(self):
          print("begin execute resource")
  
  
  with MyResource() as resource:
      resource.query()
  
  # 结果
  # begin connect resource
  # exc_type==<class 'ZeroDivisionError'>
  # exc_value==division by zero
  # tb==<traceback object at 0x018DEA80>
  # close connection
  ```

  

- 问题三、`__exit__`是否有返回值

`__exit__`可以有返回值，返回值只可以为True和False两种，True代表着出现异常，会在上下文中进行处理，不会返回出结果，False代表着出现异常会将错误信息返回出来可以被try except所捕获，**默认没有返回值就是返回None,也就是False**

```python
try:
    with MyResource() as resource:
        1/0
        resource.query()
except Exception as e:
    print(f"error==={e}")
    
# 没有返回值->False
begin connect resource
exc_type==<class 'ZeroDivisionError'>
exc_value==division by zero
tb==<traceback object at 0x0152FA58>
close connection
error===division by zero


# 有返回值 ->True
begin connect resource
exc_type==<class 'ZeroDivisionError'>
exc_value==division by zero
tb==<traceback object at 0x01B1EAD0>
close connection
```



### **四、使用其他方法声明一个上下文管理器**

```python
from contextlib import contextmanager

@contextmanager
def file_open(path):
    f = None
    try:
        f = open(path, "w")
        yield f
    except OSError:
        print("We had an error!")
    finally:
        print("Closing file")
        f.close()

if __name__ == "__main__":
    with file_open("test.txt") as f:
        f.write("Testing context managers")
```



也可以在类中进行使用，具体请参考官网

参考案例

```python
base.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy as _SQLAlchemy, BaseQuery
from sqlalchemy import Column, Integer, SmallInteger
from contextlib import contextmanager

from app.libs.api_exceptions.exceptions import NotFundException


class SQLAlchemy(_SQLAlchemy):
    @contextmanager
    def auto_commit(self):
        try:
            yield
            self.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e


class Query(BaseQuery):
    def filter_by(self, **kwargs):
        if 'status' not in kwargs.keys():
            kwargs['status'] = 1
        return super(Query, self).filter_by(**kwargs)

    def get_or_404_for_api(self, ident, description=None):
        rv = self.get(ident)
        if rv is None:
            raise NotFundException()
        return rv

    def first_or_404_for_api(self, description=None):
        rv = self.first()
        if rv is None:
            raise NotFundException()
        return rv



db = SQLAlchemy(query_class=Query)


class Base(db.Model):
    __abstract__ = True
    create_time = Column(Integer)
    status = Column(SmallInteger, default=1)

    def __init__(self):
        self.create_time = int(datetime.now().timestamp())

    @property
    def create_datetime(self):
        if self.create_time:
            return datetime.fromtimestamp(self.create_time)
        else:
            return None

    def set_attrs(self, attrs_dict):
        for key, value in attrs_dict.items():
            if hasattr(self, key) and key != 'id':
                setattr(self, key, value)

    def delete(self):
        self.status = 0

    def __getitem__(self, key):
        return getattr(self, key)
```



```python
user_view.py
@api.route('', methods=["DELETE"])
@auth.login_required
def delete_user():
    uid = g.user.uid
    with db.auto_commit():
        user = User.query.filter_by(id=uid).first_or_404_for_api()
        user.delete()
    return DeleteSuccess()
```