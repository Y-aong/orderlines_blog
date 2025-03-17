---
icon: pen-to-square

date: 2023-08-11

category:
  - flask

tag:
  - marshmallow

  - flask
---

# 8、marshmallow 外键软删除自定义 Nested



### 问题一：

**你们平时数据库是真删除还是软删除？**

```
一般来讲都会设置软删除，软删除的好处可以保证数据库索引的顺序，避免数据库索引的稀疏性。大量的真实删除会造成数据库的索引稀疏，导致数据库的查询数据变慢。
```

### 问题二：

**你在使用 marshmallow 时带有外键的软删除时怎么处理的？**

**我在一开始处理时发现，带有外键的软删除在使用 Nested 时会出现一系列的问题，比如，软删除完成了，但是在外键时 Nested 会造成已经软删除的数据还会继续出现。**



### 一、数据库基类设置

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-

"""
# File       : base_model.py
# Time       ：2023/6/25 14:35
# Author     ：YangYong
# version    ：python 3.10
# Description：表基类
"""
from flask_sqlalchemy import SQLAlchemy as _SQLAlchemy
from sqlalchemy import Column, SmallInteger
from contextlib import contextmanager
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.pool import NullPool

from conf.config import FlaskConfig


def get_session():
    db_uri = FlaskConfig.SQLALCHEMY_DATABASE_URI
    engine = create_engine(
        url=db_uri,
        poolclass=NullPool
    )
    session_factory = sessionmaker(bind=engine)
    return scoped_session(session_factory)


class SQLAlchemy(_SQLAlchemy):
    @contextmanager
    def auto_commit(self):
        try:
            yield
            self.session.commit()
            self.session.flush()
        except Exception as e:
            db.session.rollback()
            raise e


db = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    active = Column(SmallInteger, default=1)

    def set_attrs(self, attrs_dict):
        for key, value in attrs_dict.items():
            if hasattr(self, key) and key != 'id':
                setattr(self, key, value)

    def delete(self):
        self.active = 0

```

**使用 active 来进行软删除。**



### 二、自定义 Nested

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-

"""
# File       : custom_schema.py
# Time       ：2023/8/9 18:40
# Author     ：YangYong
# version    ：python 3.10
# Description：
"""
import typing
from marshmallow.fields import Nested


class CustomNested(Nested):
    def serialize(
            self,
            attr: str,
            obj: typing.Any,
            accessor: typing.Any = None,
            **kwargs
    ) -> typing.Union[dict, list]:
        result = super(CustomNested, self).serialize(attr, obj, accessor)
        if isinstance(result, list):
            result = [item for item in result if item.get('active')]
        elif isinstance(result, dict) and not result.get('active'):
            result = {}

        return result

```



### 三、序列化配置

```python
class ComponentSchema(SQLAlchemyAutoSchema):
    main_device_id = auto_field()
    main_device_name = auto_field()
    temp = fields.Function(serialize=lambda obj: get_patrol_point(obj))

    class Meta:
        model = Component


class MainDeviceSchema(SQLAlchemyAutoSchema):
    bay_id = auto_field()
    bay_name = auto_field()
    temp = CustomNested(ComponentSchema, many=True, dump_only=True)

    class Meta:
        model = MainDevice


class BaySchema(SQLAlchemyAutoSchema):
    area_id = auto_field()
    area_name = auto_field()
    temp = CustomNested(MainDeviceSchema, many=True, dump_only=True)

    class Meta:
        model = Bay


class AreaSchema(SQLAlchemyAutoSchema):
    temp = CustomNested(BaySchema, many=True, dump_only=True)

    class Meta:
        model = Area
```



### 四、实现结果

**实现了过滤掉软删除的数据**

```json
{
  "code": 200,
  "data": {
    "items": [
      {
        "active": 1,
        "id": 14,
        "name": "1",
        "temp": [
          {
            "active": 1,
            "area_id": 14,
            "area_name": "1",
            "id": 28,
            "name": "12",
            "temp": []
          }
        ]
      },
      {
        "active": 1,
        "id": 15,
        "name": "测试区域001",
        "temp": []
      },
      {
        "active": 1,
        "id": 16,
        "name": "1212",
        "temp": []
      },
      {
        "active": 1,
        "id": 17,
        "name": "121212",
        "temp": []
      }
    ],
    "total": 4
  },
  "message": "success",
  "success": true
}
```
