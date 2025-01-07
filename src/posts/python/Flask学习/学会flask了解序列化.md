---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - 序列化
---

# flask序列化




### **一、为什么需要序列化**

- 序列化常见的使用场景是web，比如一个接口需要返回一个对象，这个对象不可以被`flask`的`jsonify`函数所序列化

```python
@api.route('', methods=["GET"])
@auth.login_required
def get_user():
    uid = g.user.uid
    user = User.query.filter_by(id=uid).first_or_404_for_api()
    return jsonify(user)
```



### **二、问题为什么对象不可以直接被序列化**



#### **2.1、可以被`json`直接序列化的为`dict`类型，python对象如何转为`dict`？**

类中需要有两个方法`keys`, `__getitem__`

```python
class Person(object):
    name = "blue"
    age = 18

    def __init__(self, gender):
        self.gender = gender

    def keys(self):
        return ("name", "age", "gender")

    def __getitem__(self, item):
        return getattr(self, item)

```

测试结果

```python
person = Person("name")
print(dict(person))

# {'name': 'blue', 'age': 18, 'gender': '男'}
```

`dict`方法可以自定义字典的key, 它是读取class中的keys方法的[返回值](https://www.zhihu.com/search?q=返回值&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2470374865})，作为字典的key

```python
class Person(object):
    name = "blue"
    age = 18

    def __init__(self, gender):
        self.gender = gender

    def keys(self):
        return ("name", "age")

    def __getitem__(self, item):
        return getattr(self, item)
        
person = Person("name")
print(dict(person))

# {'name': 'blue', 'age': 18}
```



#### **2.2、对象的`__dict__`有什么用？**

class的`__dict__`方法是可以将对象中的实例属性返回，不返回类的[类属性](https://www.zhihu.com/search?q=类属性&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2470374865})

```python
class Person(object):
    name = "blue"
    age = 18

    def __init__(self, gender):
        self.gender = gender

    def keys(self):
        return ("name", "age", "gender")

    def __getitem__(self, item):
        return getattr(self, item)
    
    
person = Person("男")
print(person.__dict__) # {'gender': '男'}
```



### **三、自定义flask的序列化**



#### 一、指定flask的`JSONEncoder`，重写`JSONEncoder`的default方法

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : __init__.py.py
# Time       ：2022-05-03 10:42
# Author     ：author name
# version    ：python 3.7-32bit
# Description：
"""
import dataclasses
import decimal
import typing as t
import uuid
from datetime import date
from flask import Flask as _Flask
from flask.json import JSONEncoder as _JSONEncoder
from werkzeug.http import http_date

from app.libs.api_exceptions.api_exception import APIException


class JSONEncoder(_JSONEncoder):
    def default(self, o: t.Any) -> t.Any:

        if isinstance(o, date):
            return http_date(o)
        if isinstance(o, (decimal.Decimal, uuid.UUID)):
            return str(o)
        if dataclasses and dataclasses.is_dataclass(o):
            return dataclasses.asdict(o)
        if hasattr(o, "__html__"):
            return str(o.__html__())
        if hasattr(o, 'keys') and hasattr(o, '__getitem__'):
            return dict(o)
        raise APIException("serialize error")


# 后续使用这个Flask进行实例化
class Flask(_Flask):
    json_encoder = JSONEncoder

```



#### 二、修改模型类

模型类中必须要有这两个方法`keys`, `__getitem__`，`__getitem__`方法可以写在Base类中

```python
class User(Base):
    id = Column(Integer, primary_key=True)
    email = Column(String(24), unique=True, nullable=False)
    nickname = Column(String(24), unique=True)
    auth = Column(SmallInteger, default=1)
    _password = Column('password', String(128))

    def keys(self):
        return ["id", "email", "nickname", "auth"]
    
    def __getitem__(self, key):
        return getattr(self, key)
```