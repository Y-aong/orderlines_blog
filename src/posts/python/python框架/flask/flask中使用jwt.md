---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - jwt
---

# flask中使用jwt

关于jwt的特点上一篇博客已经有所介绍

这里拿flask举例说明

### 下载

```
pip install PyJWT==2.3.0
```

### 使用

```python
# !/usr/bin/env python
# -*-coding:utf-8 -*-
"""
# File       : jwt_token.py
# Time       ：2022-05-03 23:03
# Author     ：author name
# version    ：python 3.7-32bit
# Description：
"""
import datetime
import typing as t
import jwt
from dataclasses import dataclass
from flask import current_app
from jwt import ExpiredSignatureError, DecodeError
from app.libs.api_exceptions.exceptions import JWTVerifyException


@dataclass
class JWTPayload:
    uid: int
    auth: str = 'blue'
    scope: str = 1
    ac_type: str = 'email'


def generate_payload(uid, auth=None, scope=None, ac_type="email"):
    return JWTPayload(uid, auth, scope, ac_type).__dict__


def generate_token(payload: dict, expiry: int, secret=None):
    _payload = {"exp": datetime.datetime.now() + datetime.timedelta(seconds=expiry)}
    _payload.update(payload)
    if not secret:
        secret = current_app.config["SECRET_KEY"]
    return jwt.encode(_payload, secret, algorithm="HS256")


def verify_token(token, secret=None):
    if not secret:
        secret = current_app.config["SECRET_KEY"]
    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
    except ExpiredSignatureError:
        raise JWTVerifyException("当前jwt已经过期了")
    except DecodeError:
        raise DecodeError("jwt decode error")

    return payload
```

### view登录界面

```python
from flask import request

from app.form.validators_client_form import ClientForm
from app.libs.enums import ClientTypeEnum
from app.libs.jwt_token import generate_payload, generate_token
from app.libs.red_print import RedPrint
from app.libs.success import Success
from app.models.user import User

api = RedPrint("token")
@api.route("/", methods=["POST"])
def get_token():
    data = request.json
    client_form = ClientForm(data=data)
    client_form.validate_for_api()

    promise = {
        ClientTypeEnum.USER_EMAIL: User.verify,
    }

    identity: dict = promise[client_form.type.data](
        client_form.account.data, client_form.secret.data)

    token = _generate_auth_token(identity.get("uid"),
                                 client_form.type.data.value,
                                 identity['scope'],
                                 expiration=7200)
    return Success(msg=token)


def _generate_auth_token(uid, ac_type, scope=None, expiration=7200):
    payload = generate_payload(uid=uid, ac_type=ac_type, scope=scope)
    return generate_token(payload, expiry=expiration)
```