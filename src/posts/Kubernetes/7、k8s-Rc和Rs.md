---
icon: pen-to-square
date: 2023-07-15
category:
  - k8s
  - 部署 
tag:
  - devops
---

# 7、RC和RS



### 一、什么是控制器

kubernetes中内建了很多controller（控制器），这些相当于一个状态机，用来控制pod的具体状态和行为。

**部分控制器类型如下：**

- ReplicationController 和 ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job/CronJob
- HorizontalPodAutoscaler



### 二、ReplicationController 和 ReplicaSet

ReplicationController (RC)用来确保[容器](https://cloud.tencent.com/product/tke?from=20065&from_column=20065)应用的副本数始终保持在用户定义的副本数，即如果有容器异常退出，会自动创建新的pod来替代；而异常多出来的容器也会自动回收。

在新版的Kubernetes中建议使用ReplicaSet (RS)来取代ReplicationController。ReplicaSet跟ReplicationController没有本质的不同，只是名字不一样，但ReplicaSet支持集合式selector。

虽然 ReplicaSets 可以独立使用，但如今它主要被Deployments 用作协调 Pod 的创建、删除和更新的机制。当使用 Deployment 时，你不必担心还要管理它们创建的 ReplicaSet，Deployment 会拥有并管理它们的 ReplicaSet。

*ReplicaSet 是下一代的 Replication Controller。 ReplicaSet 和 Replication Controller 的唯一区别是选择器的支持。ReplicaSet 支持新的基于集合的选择器需求，这在标签用户指南中有描述。而 Replication Controller 仅支持基于相等选择器的需求。*

##### 相同点

- 作用：用于确保容器的应用副本数始终保持在用户定义的副本数，容器发生异常可以自动创建新的容器，异常容器会自动回收
- 出现：都是deployment用于协调pod的创建，删除，更新。

#### 不同点

- rs支持新的基于集合的选择器需求，rc仅支持基于相等选择器的需求

  

### 三、典型的应用场景

- 滚动升级，回滚应用
- 扩缩容
- 暂停和继续deployment



### 四、[例子](https://cloud.tencent.com/developer/article/1718407)

- 多 Deployment 动态更新

  ```
  假设创建一个 Deployment 以创建 nginx:1.7.9 的 5 个副本，
  然后更新 Deployment 以创建 5 个 nginx:1.9.1 的副本，
  而此时只有 3 个nginx:1.7.9 的副本已创建。在这种情况下，
  Deployment 会立即开始杀死3个 nginx:1.7.9 Pods，并
  开始创建 nginx:1.9.1 Pods。它不等待nginx:1.7.9的 5
  个副本完成后再更新为nginx:1.9.1。
  ```

  

