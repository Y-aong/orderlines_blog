---
icon: pen-to-square
date: 2023-07-15
category:
  - k8s
  - 部署 
tag:
  - devops
---

# 6、完成一次部署



### 一、定义

deployment为pod是和replicaSets提供声明式更新的能力。Delpoyment就是将实际状态变为期望状态的能力



### 二、deployment的特点

- 赋予Pod自愈和故障转移能力
- 水平扩容
- 灰度发布
- 滚动更新

三、deployment-spec的字段

```sh
FIELDS:
   minReadySeconds	<integer>
     新创建的pod应准备就绪的最小秒数

   paused	<boolean>
     表示部署暂停。

   progressDeadlineSeconds	<integer>
     部署进展之前的最长时间(以秒为单位)。默认为600s。

   replicas	<integer>
    所需的pod。默认值为1。

   revisionHistoryLimit	<integer>
     要保留以允许回滚的旧ReplicaSets的数量。默认为10.

   selector	<Object> -required-
     标签选择器。

   strategy	<Object>
     用于用新pod替换现有pod的部署策略。

   template	<Object> -required-
     模板描述了将要创建的pod。

```



### 三、deployment规约

[Pod 模板](https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#pod-template) template

```
.spec 中只有 .spec.template 和 .spec.selector 是必需的字段。
```

#### 副本 replicas

```
.spec.replicas 是指定所需 Pod 的可选字段。它的默认值是1。

如果你对某个 Deployment 执行了手动扩缩操作（例如，通过 kubectl scale deployment deployment --replicas=X）， 之后基于清单对 Deployment 执行了更新操作（例如通过运行 kubectl apply -f deployment.yaml），那么通过应用清单而完成的更新会覆盖之前手动扩缩所作的变更。
```

#### 选择符 selector

```
.spec.selector 是指定本 Deployment 的 Pod 标签选择算符的必需字段。

.spec.selector 必须匹配 .spec.template.metadata.labels，否则请求会被 API 拒绝。
```

#### 策略 strategy

- #### 重新创建 Deployment：Recreate

  ```
  如果 .spec.strategy.type==Recreate，在创建新 Pod 之前，所有现有的 Pod 会被杀死。
  ```

- #### 滚动更新 Deployment：RollingUpdate

  ```
  Deployment 会在 .spec.strategy.type==RollingUpdate时，采取 滚动更新的方式更新 Pod。你可以指定 maxUnavailable 和 maxSurge 来控制滚动更新 过程。
  
  # 最大不可用
  .spec.strategy.rollingUpdate.maxUnavailable 是一个可选字段，用来指定 更新过程中不可用的 Pod 的个数上限。该值可以是绝对数字（例如，5），也可以是所需 Pod 的百分比（例如，10%）。百分比值会转换成绝对数并去除小数部分。 如果 .spec.strategy.rollingUpdate.maxSurge 为 0，则此值不能为 0。 默认值为 25%。
  
  例如，当此值设置为 30% 时，滚动更新开始时会立即将旧 ReplicaSet 缩容到期望 Pod 个数的70%。 新 Pod 准备就绪后，可以继续缩容旧有的 ReplicaSet，然后对新的 ReplicaSet 扩容， 确保在更新期间可用的 Pod 总数在任何时候都至少为所需的 Pod 个数的 70%。
  
  # 最大峰值
  .spec.strategy.rollingUpdate.maxSurge 是一个可选字段，用来指定可以创建的超出期望 Pod 个数的 Pod 数量。此值可以是绝对数（例如，5）或所需 Pod 的百分比（例如，10%）。 如果 MaxUnavailable 为 0，则此值不能为 0。百分比值会通过向上取整转换为绝对数。 此字段的默认值为 25%。
  
  例如，当此值为 30% 时，启动滚动更新后，会立即对新的 ReplicaSet 扩容，同时保证新旧 Pod 的总数不超过所需 Pod 总数的 130%。一旦旧 Pod 被杀死，新的 ReplicaSet 可以进一步扩容， 同时确保更新期间的任何时候运行中的 Pod 总数最多为所需 Pod 总数的 130%。
  ```

#### 进度期限秒数 progressDeadlineSeconds

```
.spec.progressDeadlineSeconds 是一个可选字段，用于指定系统在报告 Deployment 进展失败 之前等待 Deployment 取得进展的秒数。 这类报告会在资源状态中体现为 type: Progressing、status: False、 reason: ProgressDeadlineExceeded。Deployment 控制器将在默认 600 毫秒内持续重试 Deployment。 将来，一旦实现了自动回滚，Deployment 控制器将在探测到这样的条件时立即回滚 Deployment。
```

#### 最短就绪时间  minReadySeconds

```
.spec.minReadySeconds 是一个可选字段，用于指定新创建的 Pod 在没有任意容器崩溃情况下的最小就绪时间， 只有超出这个时间 Pod 才被视为可用。默认值为 0（Pod 在准备就绪后立即将被视为可用）。
```

#### 修订历史限制 revisionHistoryLimit

```
Deployment 的修订历史记录存储在它所控制的 ReplicaSets 中。

.spec.revisionHistoryLimit 是一个可选字段，用来设定出于回滚目的所要保留的旧 ReplicaSet 数量。 这些旧 ReplicaSet 会消耗 etcd 中的资源，并占用 kubectl get rs 的输出。 每个 Deployment 修订版本的配置都存储在其 ReplicaSets 中；因此，一旦删除了旧的 ReplicaSet， 将失去回滚到 Deployment 的对应修订版本的能力。 默认情况下，系统保留 10 个旧 ReplicaSet
```

#### paused（暂停的）

```
.spec.paused 是用于暂停和恢复 Deployment 的可选布尔字段。 暂停的 Deployment 和未暂停的 Deployment 的唯一区别是，Deployment 处于暂停状态时， PodTemplateSpec 的任何修改都不会触发新的上线。 Deployment 在创建时是默认不会处于暂停状态。
```



### 四、deployment 回滚解释

一个deployment产生三个资源

- deployment资源：Deployment控制RS，RS控制Pod的副本数。每部署一个新版本就会创建一个新的副本集，利用他记录状态，回滚也是直接让指定的rs生效

- ReplicaSet： 只提供了副本数量的控制功能

- Pod资源：这次部署实际的运行的内容

  

### 五、deployment更新机制

- 仅当 Deployment Pod 模板（即 `.spec.template`）发生改变时，例如**模板的标签或容器镜像被更新， 才会触发 Deployment 上线**。 **其他更新（如对 Deployment 执行扩缩容的操作）不会触发上线动作。**
- **上线动作 原理： 创建新的rs，准备就绪后，替换旧的rs（此时不会删除，因为`revisionHistoryLimit` 指定了保留几个版本）**

部署回滚常用命令

```sh
################更新#################################
#kubectl  set image  deployment资源名  容器名=镜像名
kubectl set image deployment.apps/nginx-deployment php-redis=tomcat:8 --record
## yaml提取可更新的关键所有字段计算的hash。
web---- /hello
postman   aservice- /hello

#或者直接修改定义也行
kubectl edit deployment.v1.apps/nginx-deployment
#查看状态
kubectl rollout status deployment.v1.apps/nginx-deployment

################查看历史并回滚####################################
#查看更新历史-看看我们设置的历史总记录数是否生效了
kubectl rollout history deployment.v1.apps/nginx-deployment
#回滚
kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision=2

###############累计更新##############
#暂停记录版本
kubectl rollout pause deployment.v1.apps/nginx-deployment
#多次更新操作。
##比如更新了资源限制
kubectl set resources deployment.v1.apps/nginx-deployment -c=nginx --limits=cpu=200m,memory=512Mi
##比如更新了镜像版本
kubectl set image deployment.apps/nginx-deployment php-redis=tomcat:8
##在继续操作多次
##看看历史版本有没有记录变化
kubectl rollout history deployment.v1.apps/nginx-deployment
#让多次累计生效
kubectl rollout resume deployment.v1.apps/nginx-deployment
```

#### 1.1 比例缩放

maxSurge（最大增量）：除当前数量外还要添加多少个实例。

maxUnavailable（最大不可用量）：滚动更新过程中的不可用实例数。

#### 1.2 HPA（动态扩缩容）

[参考官网](https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/)

#### 1.3 蓝绿部署

##### 概念

```
蓝绿发布，是在生产环境稳定集群之外，额外部署一个与稳定集群规模相同的新集群，并通过流量控制，逐步引入流量至新集群直至 100%，原先稳定集群将与新集群同时保持在线一段时间，期间发生任何异常，可立刻将所有流量切回至原稳定集群，实现快速回滚。直到全部验证成功后，下线老的稳定集群，新集群成为新的稳定集群。
```

Kubernetes 集群中需要部署 Nginx Ingress 作为 Ingress Controller，并且对外暴露了统一的流量入口。

##### 基础步骤

- 新集群部署
- 切换流量
- 下线老集群

#### 1.4 金丝雀部署

- 在金丝雀发布开始后，先启动一个新版本应用，但是并不直接将流量切过来，而是测试人员对新版本进行线上测试，启动的这个新版本应用，就是我们的金丝雀。如果没有问题，那么可以将少量的用户流量导入到新版本上，然后再对新版本做运行状态观察，收集各种运行时数据，如果此时对新旧版本做各种数据对比，就是所谓的A/B测试。
- 当确认新版本运行良好后，再逐步将更多的流量导入到新版本上，在此期间，还可以不断地调整新旧两个版本的运行的服务器副本数量，以使得新版本能够承受越来越大的流量压力。直到将100%的流量都切换到新版本上，最后关闭剩下的老版本服务，完成金丝雀发布。
- 如果在金丝雀发布过程中（灰度期）发现了新版本有问题，就应该立即将流量切回老版本上，这样，就会将负面影响控制在最小范围内。

##### 滚动发布的缺点？（同时存在两个版本都能接受流量）

- 没法控制流量 ；    6   4，   8  2  ，3  7

- 滚动发布短时间就直接结束，不能直接控制新老版本的存活时间。



