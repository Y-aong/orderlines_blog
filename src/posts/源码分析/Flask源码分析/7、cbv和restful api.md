---
icon: pen-to-square
date: 2024-03-05
category:
  - 源码分析
  - flask
tag:
  - 源码分析
  - flask
  - restful
---

# 7、Flask CBV 与 RESTful API



我曾经在之前的工作中，使用20行代码实现使用传统视图100多行实现的增删改查的功能。之前使用的是flask_restful，但是这个模块没有swagger文档，还挺说这个模块的负责人是物理层面的找不到了，后面我又接触到flask_restx这个模块，实现了文档自动生成这个很重要的功能。





### **一、为什么需要 Class-Based Views（CBV）和 RESTful API**



#### **1.1 函数视图的局限性**

传统的 Flask 函数视图（Function-Based Views）虽然简单，但在复杂场景下存在以下问题：
- **代码重复**：多个视图可能共享逻辑（如权限校验、日志记录）。

- **状态管理困难**：难以在多个方法间共享数据或状态。

- **可维护性差**：大规模 API 需要大量函数，代码结构混乱。

  

#### **1.2 Class-Based Views（CBV）的优势**

Flask 的 **Class-Based Views（CBV）** 通过类来组织视图，提供以下优势：
- **代码复用**：通过继承和混入（Mixin）共享通用逻辑。

- **清晰的职责划分**：不同 HTTP 方法（GET/POST/PUT 等）对应不同类方法。

- **状态管理**：类实例可保存临时数据（如数据库会话）。

  

#### **1.3 RESTful API 的核心原则**
RESTful API 遵循以下设计原则：
1. **资源导向**：通过 URL 路径标识资源（如 `/users/{id}`）。
2. **HTTP 方法**：使用标准方法（GET/POST/PUT/DELETE）定义操作。
3. **状态码**：返回语义明确的 HTTP 状态码（如 200 OK, 404 Not Found）。
4. **无状态通信**：服务器不保存客户端状态，所有信息通过请求传递。



### **二、Flask-Restx：RESTful API 的终极解决方案**



#### **2.1 Flask-Restx 是什么？**
- **前身**：基于 `Flask-RESTful` 的升级版，解决了其文档不足、验证缺失等问题。
- **核心功能**：
  - **资源组织**：用类定义 API 资源（Resource）。
  - **请求验证**：通过 `@api.expect` 自动校验请求参数。
  - **自动文档**：生成交互式 Swagger UI 文档。
  - **命名空间管理**：模块化组织 API 端点。



#### **2.2 安装与快速入门**

```bash
pip install flask flask-restx
```

```python
from flask import Flask
from flask_restx import Api, Resource, fields

app = Flask(__name__)
api = Api(
    app,
    version='1.0',
    title='Sample API',
    description='A simple RESTful API with Flask-Restx',
    doc='/docs'  # 文档路径
)

# 定义资源模型
user_model = api.model('User', {
    'id': fields.Integer(required=True, description='User ID'),
    'name': fields.String(required=True, description='User Name')
})

# 定义资源类
@api.route('/users/<int:user_id>')
class UserResource(Resource):
    @api.doc(description='Get a user by ID')
    @api.marshal_with(user_model)
    def get(self, user_id):
        return {'id': user_id, 'name': 'John Doe'}

    @api.expect(user_model)
    def put(self, user_id):
        data = api.payload
        return {'message': f'Updated user {user_id}: {data}'}

if __name__ == '__main__':
    app.run(debug=True)
```



### **三、Flask-Restx 核心功能详解**



#### **3.1 资源定义（Resource）**
- **继承 `Resource` 类**：每个资源对应一个或多个 HTTP 方法。
- **方法映射**：
  ```python
  class UserResource(Resource):
      def get(self):    # GET 请求
          pass
      def post(self):   # POST 请求
          pass
      def put(self):    # PUT 请求
          pass
      def delete(self): # DELETE 请求
          pass
  ```



#### **3.2 请求参数校验**

- **定义模型（Model）**：
  ```python
  user_model = api.model('User', {
      'name': fields.String(required=True),
      'age': fields.Integer(min=0, max=150)
  })
  ```
- **绑定参数**：
  ```python
  @api.expect(user_model)
  def post(self):
      data = api.payload  # 自动校验后的数据
      # 处理逻辑
  ```



#### **3.3 自动文档生成**

- **Swagger UI**：访问 `/docs` 路径，自动生成交互式文档。
- **API 文档注释**：
  ```python
  @api.doc(
      description='Create a new user',
      params={'user_id': 'User ID'}
  )
  def post(self, user_id):
      pass
  ```



#### **3.4 命名空间（Namespace）**

- **模块化组织 API**：
  ```python
  from flask_restx import Namespace
  
  api = Namespace('users', description='User operations')
  
  @api.route('/')
  class UserListResource(Resource):
      # ...
  ```





### **四、Flask-Restx 的优势与最佳实践**



#### **4.1 优势总结**
- **代码组织清晰**：通过类和命名空间分离不同功能。
- **自动文档**：减少维护 API 文档的工作量。
- **请求验证**：减少手动校验参数的代码。
- **可扩展性**：支持插件和自定义验证逻辑。

#### **4.2 最佳实践**
1. **分模块管理 API**：使用 `Namespace` 将资源分组（如 `/users`, `/books`）。
2. **统一错误处理**：通过 `@api.errorhandler` 自定义错误响应。
3. **使用数据库 ORM**：结合 `SQLAlchemy` 或 `MongoEngine` 简化数据操作。
4. **性能优化**：缓存高频查询结果（如使用 `Flask-Caching`）。

#### **5.3 与 Flask-RESTful 的对比**
| **特性**   | **Flask-RESTful** | **Flask-Restx**          |
| ---------- | ----------------- | ------------------------ |
| 文档支持   | 无                | 内置 Swagger UI          |
| 请求验证   | 需第三方库        | 内置 `@api.expect`       |
| 模型定义   | 简单字段支持      | 支持复杂模型（嵌套字段） |
| 社区活跃度 | 停止维护          | 活跃维护                 |

---

