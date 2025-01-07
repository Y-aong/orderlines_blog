---
icon: pen-to-square
date: 2023-07-15
category:
  - python
  - flask
tag:
  - jwt
---

# jwt token认证



### 问题一、什么要认证

- 安全，如果用户不登录就可以访问数据和服务器是及其不安全
- http 是一种无状态的请求，浏览器是无法知道你是否在线的，通过认证可以知道是否在线



### 问题二、[为什么要token认证](https://cloud.tencent.com/developer/article/1683290)

这个问题就必须要涉及到session,cookie,token之间的区别了

#### `http`是一个无状态协议

什么是无状态呢？就是说这一次请求和上一次请求是没有任何关系的，互不认识的，没有关联的。这种无状态的的好处是快速。

#### cookie和session

由于`http`的无状态性，为了使某个[域名](https://cloud.tencent.com/act/pro/domain-sales?from=20065&from_column=20065)下的所有网页能够共享某些数据，session和cookie出现了。客户端访问服务器的流程如下

- 首先，客户端会发送一个`http`请求到服务器端。
- 服务器端接受客户端请求后，建立一个session，并发送一个http响应到客户端，这个响应头，其中就包含Set-Cookie头部。该头部包含了sessionId。Set-Cookie格式如下，具体请看Cookie详解 `Set-Cookie: value[; expires=date][; domain=domain][; path=path][; secure]`
- 在客户端发起的第二次请求，假如服务器给了set-Cookie，浏览器会自动在请求头中添加cookie
- 服务器接收请求，分解cookie，验证信息，核对成功后返回response给客户端

#### token定义

token 也称作令牌，由uid+time+sign[+固定参数] token 的认证方式类似于临时的证书签名, 并且是一种服务端无状态的认证方式, 非常适合于 REST API 的场景. 所谓无状态就是服务端并不会保存身份认证相关的数据。

#### token认证流程

token 的认证流程与cookie很相似

- 用户登录，成功后服务器返回Token给客户端。

- 客户端收到数据后保存在客户端

- 客户端再次访问服务器，将token放入headers中

- 服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

  

### 问题三、什么是`jwt`认证

Json Web Toke（JWT），是为了在网络应用环境间传递声明而执行的一种基于JSON的开放标准[RFC7519](https://tools.ietf.org/html/rfc7519?spm=a2c4g.11186623.2.18.661d167c396yae)。JWT一般可以用作独立的身份验证令牌，可以包含用户标识、用户角色和权限等信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，特别适用于分布式站点的登录场景。

#### JWT就是一个字符串，由三部分构成：

- Header（头部）
- Payload（数据）
- Signature（签名）

###### Header



#### JWT的头部承载两个信息：

- 声明类型，这里是JWT
- 声明加密的算法

#### Payload

载荷就是存放有效信息的地方。定义细节如下：

```
iss：令牌颁发者。表示该令牌由谁创建，该声明是一个字符串
sub:  Subject Identifier，iss提供的终端用户的标识，在iss范围内唯一，最长为255个ASCII个字符，区分大小写
aud：Audience(s)，令牌的受众，分大小写的字符串数组
exp：Expiration time，令牌的过期时间戳。超过此时间的token会作废， 该声明是一个整数，是1970年1月1日以来的秒数
iat: 令牌的颁发时间，该声明是一个整数，是1970年1月1日以来的秒数
jti: 令牌的唯一标识，该声明的值在令牌颁发者创建的每一个令牌中都是唯一的，为了防止冲突，它通常是一个密码学随机值。这个值相当于向结构化令牌中加入了一个攻击者无法获得的随机熵组件，有利于防止令牌猜测攻击和重放攻击。
```

#### Signature

这个部分需要Base64编码后的Header和Base64编码后的Payload使用 `.` 连接组成的字符串，然后通过Header中声明的加密方式进行加密（`$secret` 表示用户的私钥），然后就构成了jwt的第三部分。

#### `jwt`的特点

1. JWT 默认是不加密，不能将秘密数据写入 JWT。
2. JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。
3. JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。
4. 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用HTTPS 协议传输。