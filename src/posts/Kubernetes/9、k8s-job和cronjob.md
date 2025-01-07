---
icon: pen-to-square
date: 2023-07-15
category:
  - k8s
  - 部署
tag:
  - devops
---

# 9、k8s——job和crontab



### 一、JOB



#### 1、定义

`kubernetes`中的 Job 对象将创建一个或多个 Pod，并确保指定数量的 Pod 可以成功执行到进程正常结束：



#### 2、特点

- 当 Job 创建的 Pod 执行成功并正常结束时，Job 将记录成功结束的 Pod 数量
- 当成功结束的 Pod 达到指定的数量时，Job 将完成执行
- 删除 Job 对象时，将清理掉由 Job 创建的 Pod

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
        - name: pi
          image: perl
          command: [ "perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)" ]
      restartPolicy: Never #Job情况下，不支持Always
  backoffLimit: 4 #任务4次都没成，认为失败
  activeDeadlineSeconds: 10
```

#### 参数说明

```shell
#参数说明
  kubectl explain job.spec
  activeDeadlineSeconds：10 总共维持10s
  #该字段限定了 Job 对象在集群中的存活时长，一旦达到 .spec.activeDeadlineSeconds 指定的时长，该 Job 创建的所有的 Pod 都将被终止。但是Job不会删除，Job需要手动删除，或者使用ttl进行清理
  backoffLimit
  #设定 Job 最大的重试次数。该字段的默认值为 6；一旦重试次数达到了 backoffLimit 中的值，Job 将被标记为失败，且尤其创建的所有 Pod 将被终止；
  completions #Job结束需要成功运行的Pods。默认为1
  manualSelector
  parallelism: 1 #并行运行的Pod个数，默认为1
  ttlSecondsAfterFinished: 0 #在job执行完时马上删除
  ttlSecondsAfterFinished: 100 #在job执行完后，等待100s再删除
      #除了 CronJob 之外，TTL 机制是另外一种自动清理已结束Job（Completed 或 Finished）的方式：
      #TTL 机制由 TTL 控制器 提供，ttlSecondsAfterFinished 字段可激活该特性
      #当 TTL 控制器清理 Job 时，TTL 控制器将删除 Job 对象，以及由该 Job 创建的所有 Pod 对象。
    
      # job超时以后 已经完成的不删，正在运行的Pod就删除
      #单个Pod时，Pod成功运行，Job就结束了
      #如果Job中定义了多个容器，则Job的状态将根据所有容器的执行状态来变化。
      #Job任务不建议去运行nginx，tomcat，mysql等阻塞式的，否则这些任务永远完不了。
      #如果Job定义的容器中存在http server、mysql等长期的容器和一些批处理容器，
      #则Job状态不会发生变化（因为长期运行的容器不会主动结束）。此时可以通过Pod的.
      #status.containerStatuses获取指定容器的运行状态。

  manualSelector：

  - job同样可以指定selector来关联pod。需要注意的是job目前可以使用两个API组来操作，batch/v1和extensions/v1beta1。当用户需要自定义selector时，使用两种API组时定义的参数有所差异。
  - 使用batch/v1时，用户需要将jod的spec.manualSelector设置为true，才可以定制selector。默认为false。
  - 使用extensions/v1beta1时，用户不需要额外的操作。因为extensions/v1beta1的spec.autoSelector默认为false，该项与batch/v1的spec.manualSelector含义正好相反。换句话说，使用extensions/v1beta1时，用户不想定制selector时，需要手动将spec.autoSelector设置为true。

```



### 二、cronJob



#### 1、定义

CronJob 按照预定的时间计划（schedule）创建 Job（注意：启动的是Job不是Deploy，rs）。一个 CronJob 对象类似于 crontab (cron table)
文件中的一行记录。该对象根据 [Cron](https://en.wikipedia.org/wiki/Cron) 格式定义的时间计划，周期性地创建 Job 对象。

```
Schedule

所有 CronJob 的 `schedule` 中所定义的时间，都是基于 master 所在时区来进行计算的
```



#### 2、特点

当以下两个条件都满足时，Job 将至少运行一次：

- `startingDeadlineSeconds` 被设置为一个较大的值，或者不设置该值（默认值将被采纳）
- `concurrencyPolicy` 被设置为 `Allow`



#### 3、参数

```yaml
# kubectl explain cronjob.spec

  concurrencyPolicy：并发策略
    "Allow" (允许，default):
    "Forbid" (禁止): forbids；前个任务没执行完，要并发下一个的话，下一个会被跳过
    "Replace"(替换): 新任务，替换当前运行的任务

    failedJobsHistoryLimit：记录失败数的上限，Defaults to 1.
    successfulJobsHistoryLimit： 记录成功任务的上限。 Defaults to 3.
  #指定了 CronJob 应该保留多少个 completed 和 failed 的 Job 记录。将其设置为 0，则 CronJob 不会保留已经结束的 Job 的记录。

    jobTemplate： job怎么定义（与前面我们说的job一样定义法）

    schedule： cron 表达式；

    startingDeadlineSeconds： 表示如果Job因为某种原因无法按调度准时启动，
    在spec.startingDeadlineSeconds时间段之内，CronJob仍然试图重新启动Job，
    如果在.spec.startingDeadlineSeconds时间之内没有启动成功，则不再试图重新启动。
    如果spec.startingDeadlineSeconds的值没有设置，则没有按时启动的任务不会被尝试重新启动。



    suspend	暂停定时任务，对已经执行了的任务，不会生效； Defaults to false.
```



#### 4、实例

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"    #分、时、日、月、周
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: hello
              image: busybox
              args:
                - /bin/sh
                - -c
                - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```

