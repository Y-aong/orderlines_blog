---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - sqlalchemy
  - 序列化
---

# sqlalchemy 一对多关系



### 一、模型类

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : teacher_student_model.py
# Time       ：2023/7/16 10:42
# Author     ：Y-aong
# version    ：python 3.7
# Description：sqlalchemy一对多，一对一，多对多关系配置
"""
from public.base_model import db, Base


# 配置一对多关系
class Student(Base):
    __tablename__ = 'test_student'

    name = db.Column(db.String(64), comment='学生名称')
    teacher_id = db.Column(db.Integer, db.ForeignKey('test_teacher.id'))
    # 方式二
    # teacher = db.relationship("Teacher", back_populates="student")


class Teacher(Base):
    __tablename__ = 'test_teacher'
    name = db.Column(db.String(64), comment='教师名称')
    # 方式一、backref，要在一对多中建立双向关系，“反向”端是多对一，
    student = db.relationship('Student', backref='test_teacher')
    # 方式二、back_populates
    # student = db.relationship('Student', back_populates='student')

```



### 二、序列化类

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : teacher_student_schema.py
# Time       ：2023/7/16 21:41
# Author     ：Y-aong
# version    ：python 3.7
# Description：
"""
from marshmallow import fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field

from apis.test.models import Teacher, Student

from public.base_model import get_session


def get_teacher(obj):
    session = get_session()
    teacher_obj = session.query(Teacher).filter(Teacher.id == obj.teacher_id).first()
    return TeacherStudentSchema().dump(teacher_obj)


class StudentSchema(SQLAlchemyAutoSchema):
    teacher = fields.Function(serialize=lambda obj: get_teacher(obj))
    teacher_id = auto_field()

    class Meta:
        model = Student
        exclude = ['active']


class TeacherSchema(SQLAlchemyAutoSchema):
    student = fields.Nested(StudentSchema, many=True, dump_only=True, only=('id', 'name'))

    class Meta:
        model = Teacher


class TeacherStudentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Teacher
        fields = ["id", "name"]
```



### 三、视图类

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : teacher_student_view.py
# Time       ：2023/7/16 11:02
# Author     ：Y-aong
# version    ：python 3.7
# Description：一对多视图
"""
from apis.test.models.teacher_student_model import Teacher, Student
from apis.test.schemas.teacher_student_schema import TeacherSchema, StudentSchema
from public.base_view import BaseView


class TeacherView(BaseView):
    url = '/teacher'

    def __init__(self):
        super(TeacherView, self).__init__()
        self.table_orm = Teacher
        self.table_schema = TeacherSchema


class StudentView(BaseView):
    url = '/student'

    def __init__(self):
        super(StudentView, self).__init__()
        self.table_orm = Student
        self.table_schema = StudentSchema
```

这里使用到了一些自定义的基类请参考[flask_restful 基类](https://y-aong.github.io/orderlines_blog/zh/posts/flask/flask_restful%E5%9F%BA%E7%B1%BB%E7%A4%BA%E4%BE%8B.html)
