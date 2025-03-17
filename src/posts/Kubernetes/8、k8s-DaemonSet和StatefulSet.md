---
icon: pen-to-square
date: 2023-07-15
category:
  - k8s
  - 部署
tag:
  - devops
---

# 8、DaemonSet和StatefulSet



### 一、DaemonSet



####  1、定义

DaemonSet 控制器确保所有（或一部分）的节点都运行了一个指定的 Pod 副本。

- 每当向集群中添加一个节点时，指定的 Pod 副本也将添加到该节点上
- 当节点从集群中移除时，Pod 也就被垃圾回收了
- 删除一个 DaemonSet 可以清理所有由其创建的 Pod



#### 2、使用场景：

- 在每个节点上运行集群的**存储守护进程**
- 在每个节点上运行**日志收集守护进程**
- 在每个节点上运行**监控守护进程**



### 二、StatefulSet



#### 1、定义

有状态副本集；Deployment等属于无状态的应用部署（stateless）

#### 2、特点

- 给定 Pod 的存储必须由 [PersistentVolume 驱动](https://github.com/kubernetes/examples/tree/master/staging/persistent-volume-provisioning/README.md) 基于所请求的 `storage class` 来提供，或者由管理员预先提供
- 删除或者收缩 StatefulSet 并*不会*删除它关联的存储卷
- StatefulSet 当前需要[无头服务](https://kubernetes.io/zh/docs/concepts/services-networking/service/#headless-services) 来负责 Pod 的网络标识。
- 当删除 StatefulSets 时，StatefulSet 不提供任何终止 Pod 的保证。 为了实现 StatefulSet 中的 Pod 可以有序地且体面地终止，可以在删除之前将 StatefulSet 缩放为 0。
- 在默认 [Pod 管理策略](https://kubernetes.io/zh/docs/concepts/workloads/controllers/statefulset/#pod-management-policies)(`OrderedReady`) 时使用 [滚动更新](https://kubernetes.io/zh/docs/concepts/workloads/controllers/statefulset/#rolling-updates)，可能进入需要[人工干预](https://kubernetes.io/zh/docs/concepts/workloads/controllers/statefulset/#forced-rollback) 才能修复的损坏状态。
- 按照顺序进行创建和删除pod

#### 3、使用场景

- **稳定、唯一的网络标识（dnsname）**
  - StatefulSet**通过与其相关的无头服务为每个pod提供DNS解析条目**
- **稳定的、持久的存储；【每个Pod始终对应各自的存储路径（PersistantVolumeClaimTemplate）】**
- **有序的、优雅的部署和缩放。【按顺序地增加副本、减少副本，并在减少副本时执行清理】**
- **有序的、自动的滚动更新。【按顺序自动地执行滚动更新】**