---
icon: pen-to-square
date: 2023-07-19
category:
  - python
  - flask
tag:
  - flask_restful
  - 基类
---

# 6、flask restful 基类展示



### 一、为什么要抽象基类

flask 是作为高度自由的框架，因此 flask 的代码可能会写的比较自由，这种自由可能是带有一定风险的，就是 flask 的代码可复用性并不会很高，对于简单单表的增删查改可以参考我的这种方式可以对于单表的操作变得比较简单。

我在这家工作刚来的时候公司的同事写一个增删改查接口用了将近100行代码，使用这套代码模版后相关代码只有10行内就可以完成一个增删改查的功能。这肯定大大提高了工作效率，我们可以花费更多的精力在更复杂的业务逻辑上。



### 二、BaseModel

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : base_model.py
# Time       ：2023/1/10 22:39
# Author     ：Y-aong
# version    ：python 3.7
# Description：base model
"""
from flask_sqlalchemy import SQLAlchemy as _SQLAlchemy
from sqlalchemy import Column, SmallInteger
from contextlib import contextmanager

from conf.config import FlaskConfig
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def get_filter(table_orm, filter_data: dict):
    filters = list()
    for key, item in filter_data.items():
        if hasattr(table_orm, key):
            _filter = getattr(table_orm, key, ) == item
            filters.append(_filter)
    return filters


def get_session():
    db_uri = FlaskConfig.SQLALCHEMY_DATABASE_URI
    engine = create_engine(db_uri)
    return sessionmaker(engine)()


class SQLAlchemy(_SQLAlchemy):
    @contextmanager
    def auto_commit(self):
        try:
            yield
            self.session.commit()
        except Exception as e:
            db.session.rollback()
            raise e


db = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True
    id = Column(db.Integer, primary_key=True, autoincrement=True)
    active = Column(SmallInteger, default=1)

    def set_attrs(self, attrs_dict):
        for key, value in attrs_dict.items():
            if hasattr(self, key) and key != 'id':
                setattr(self, key, value)

    def delete(self):
        self.active = 0

    def __getitem__(self, key):
        return getattr(self, key)

```



### 三、base view 基类

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : base_view.py
# Time       ：2023/3/12 13:10
# Author     ：Y-aong
# version    ：python 3.7
# Description：flask视图基类
"""
from flask import request
from flask_restful import Resource

from conf.config import FlaskConfig
from .api_handle_exception import handle_api_error
from .base_model import db
from .base_response import generate_response


class BaseView(Resource):

    def __init__(self):
        self.table_orm = None
        self.table_schema = None
        if request.method == 'GET':
            self.form_data: dict = request.args
        else:
            self.form_data: dict = request.json
        self._filter = list()
        self.table_id = self.form_data.get('id')
        self.response_data = dict()
        self.page = FlaskConfig.PAGE
        self.pre_page = FlaskConfig.PRE_PAGE

    def handle_filter(self):
        if self.table_orm:
            self._filter.append(self.table_orm.active == 1)
        for key, value in self.form_data.items():
            if hasattr(self.table_orm, key):
                self._filter.append(getattr(self.table_orm, key) == value)

    def handle_request_params(self):
        """处理请求参数"""
        pass

    def handle_response_data(self):
        """处理返回值参数"""
        pass

    def response_callback(self):
        """处理response的其他后续操作"""
        pass

    def _get_single(self):
        """单条查询"""
        single_data = db.session.query(self.table_orm).filter(*self._filter).first()
        if single_data:
            return self.table_schema().dump(single_data)
        return {}

    def _get_multi(self):
        """多条查询"""
        multi_data = db.session.query(self.table_orm).filter(*self._filter).order_by(
            self.table_orm.id).paginate(page=self.page, per_page=self.pre_page)
        items = self.table_schema().dump(multi_data.items, many=True)
        total = multi_data.total
        return {'items': items, 'total': total}

    @handle_api_error
    def get(self):
        # 获取全部
        self.handle_filter()
        if not self.form_data or self.form_data.get('pre_page'):
            data = self._get_multi()
        else:
            data = self._get_single()
        return generate_response(data)

    @handle_api_error
    def post(self):
        self.handle_request_params()
        form_data = dict()
        for key, value in self.form_data.items():
            if hasattr(self.table_orm, key):
                form_data.setdefault(key, value)
        task = self.table_schema().load(form_data)
        with db.auto_commit():
            obj = self.table_orm(**task)
            db.session.add(obj)
        self.response_data['table_id'] = obj.id
        self.table_id = obj.id
        self.handle_response_data()
        self.response_callback()
        return generate_response(message='创建成功', data=self.response_data)

    @handle_api_error
    def put(self):
        self.handle_request_params()
        obj = db.session.query(self.table_orm).filter(self.table_orm.id == self.table_id).first()
        form_data = dict()
        for key, value in self.form_data.items():
            if hasattr(self.table_orm, key):
                form_data.setdefault(key, value)
        info = self.table_schema().load(form_data)
        if not obj:
            raise ValueError(f'根据table_id:{self.table_id}找不到记录')
        with db.auto_commit():
            db.session.query(self.table_orm).filter(self.table_orm.id == self.table_id).update(info)
        self.response_data['table_id'] = obj.id
        self.handle_response_data()
        self.response_callback()
        return generate_response(message='修改成功', data=self.response_data)

    @handle_api_error
    def delete(self):
        self.handle_request_params()
        with db.auto_commit():
            if hasattr(self.table_orm, 'active'):
                db.session.query(self.table_orm).filter(self.table_orm.id == self.table_id).update({'active': 0})
            else:
                db.session.query(self.table_orm).filter(self.table_orm.id == self.table_id).delete()

        self.response_data['table_id'] = self.table_id
        self.response_callback()
        return generate_response(message='删除成功', data=self.response_data)

```



### 四、response 基类

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : base_response.py
# Time       ：2023/3/12 10:44
# Author     ：Y-aong
# version    ：python 3.7
# Description：response基类
"""

from flask import jsonify, abort


def generate_response(data=None, code=200, message='success'):
    """
    自定义响应
    :param code:状态码
    :param data:返回数据
    :param message:返回消息
    :return:
    """
    success = True if code == 200 else False
    res = jsonify(dict(code=code, success=success, data=data, message=message))
    res.status_code = 200
    return res


def generate_abort(code=401, success='failure', **kwargs):
    kwargs.setdefault('success', success)
    kwargs.setdefault('code', code)
    return abort(code, kwargs)
```



### 五、基本使用



#### 1、创建模型类

```python
from public.base_model import db, Base


class Teacher(Base):
    __tablename__ = 'test_teacher'
    name = db.Column(db.String(64), comment='教师名称')
    sex = db.Column(db.String(64), comment='性别')

```



#### 2、创建序列化类

```python
class TeacherSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Teacher

```



#### 3、视图类

```python
class TeacherView(BaseView):
    url = '/teacher'

    def __init__(self):
        super(TeacherView, self).__init__()
        self.table_orm = Teacher
        self.table_schema = TeacherSchema
```



这样就完成了 teacher 表的增删查改，是不是比较简单
