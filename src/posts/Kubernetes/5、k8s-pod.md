---
icon: pen-to-square
date: 2023-07-15
category:
  - k8s
  - 部署 
tag:
  - devops
---

# 5、什么叫pod



### 一、pod概念

*Pod*是一组（一个或多个） [容器（docker容器）](https://kubernetes.io/zh/docs/concepts/overview/what-is-kubernetes/#why-containers)的集合 （就像在豌豆荚中）；这些容器共享存储、网络、以及怎样运行这些容器的声明。



### 二、pod特点

- pod对于容器有自律能力（pod自动重启失败的容器）

- pod不能恢复自己

- pod分为单容器和多容器

- pod为其成员容器提供两种共享资源：网络和存储

- 一个pod由一个pause容器设置好整个pod里面所有的容器的网络和名称空间等信息

  

### 三、容器的生命周期

- pod启动，会依次启动所有的初始化容器，有一个失败，则pod都不能启动

- 接下来**启动所有的应用容器**（每一个应用容器都必须能一直运行起来），Pod开始正式工作，一个启动失败就会**尝试重启Pod内的这个容器**，Pod只要是NotReady，Pod就不对外提供服务了

  

### 四、pod的重启策略

Pod 的 `spec` 中包含一个 `restartPolicy` 字段，其可能取值包括 Always、OnFailure 和 Never。默认值是 Always。

`restartPolicy` 适用于 Pod 中的所有容器。



### 五、静态pod

在  **/etc/kubernetes/manifests** 位置放的所有Pod.yaml文件，机器启动kubelet自己就把他启动起来。

静态Pod一直守护在他的这个机器上



### 六、prode探针机制（健康检查机制）



#### 三种探针

- 启动探针：一次性成功探针，只要启动了就不用了

  ```
  # 功能
  用来检测应用是否成功启动。如果启动就可以进行后续的检查。满容器一定要指定启动探针
  # 特点
  一旦启动后续就不用了，剩下存活探针和就绪探针持续运行
  ```

- 存货探针：用于检查容器是否正常存活，如果检查失败就会重新启动这个容器

  ```
  # 功能
  用于检查容器是否正常存活，如果检查失败就会重启这个容器
  ```

- 就绪探针：用于检查容器是否准备好了可以接受流量

  ```
  # 功能
  用于检查容器是否准备好接收流量，当一个pod中所有容器都准备好，才接受流量，否则将service负载均衡中剔除
  ```

  

#### prode配置

- `initialDelaySeconds`：容器启动后要等待多少秒后存活和就绪探测器才被初始化，默认是 0 秒，最小值是 0。这是针对以前没有
- `periodSeconds`：执行探测的时间间隔（单位是秒）。默认是 10 秒。**最小值是 1**。
- `successThreshold`：探测器在失败后，被视为成功的最小连续成功数。**默认值是 1**。 
  - 存活和启动探针的这个值必须是 1。最小值是 1。
- `failureThreshold`：当探测失败时，Kubernetes 的重试次数。 存活探测情况下的放弃就意味着重新启动容器。 就绪探测情况下的放弃 Pod 会被打上未就绪的标签。**默认值是 3**。最小值是 1。
- `timeoutSeconds`：探测的超时时间。**默认值是 1 秒**。最小值是 1。 

使用yaml测试探针机制

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: "nginx-start-probe02"
  namespace: default
  labels:
    app: "nginx-start-probe02"
spec:
  volumes:
  - name: nginx-vol
    hostPath: 
      path: /app
  - name: nginx-html
    hostPath: 
      path: /html
  containers:
  - name: nginx
    image: "nginx"
    ports:
    - containerPort: 80
    # 启动探针
    startupProbe:
      exec:
        command:  ["/bin/sh","-c","cat /app/abc"]  ## 返回不是0，那就是探测失败
      # initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测
      periodSeconds: 5  ## 每隔几秒来运行这个
      timeoutSeconds: 5  ##探测超时，到了超时时间探测还没返回结果说明失败
      successThreshold: 1 ## 成功阈值，连续几次成才算成功
      failureThreshold: 3 ## 失败阈值，连续几次失败才算真失败
    volumeMounts:
    - name: nginx-vol
      mountPath: /app
    - name: nginx-html
      mountPath: /usr/share/nginx/html
    # 存活探针
    livenessProbe:   ## nginx容器有没有 /abc.html，
      # 方式一，发送http请求
      # httpGet:
      #   host: 127.0.0.1
      #   path: /abc.html
      #   port: 80
      #   scheme: HTTP
      # periodSeconds: 5  ## 每隔几秒来运行这个
      # successThreshold: 1 ## 成功阈值，连续几次成才算成功
      # failureThreshold: 5 ## 失败阈值，连续几次失败才算真失败
      # 方式二，运行sh命令
      exec:
        command:  ["/bin/sh","-c","cat /usr/share/nginx/html/abc.html"]  ## 返回不是0，那就是探测失败
      # initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测
      periodSeconds: 5  ## 每隔几秒来运行这个
      timeoutSeconds: 5  ##探测超时，到了超时时间探测还没返回结果说明失败
      successThreshold: 1 ## 成功阈值，连续几次成才算成功
      failureThreshold: 3 ## 失败阈值，连续几次失败才算真失败
    # 就绪探针
    readinessProbe: ##就绪检测，都是http
      httpGet:  
        path: /abc.html  ## 给容器发请求
        port: 80
        scheme: HTTP ## 返回不是0，那就是探测失败
      initialDelaySeconds: 2 ## 指定的这个秒以后才执行探测
      periodSeconds: 5  ## 每隔几秒来运行这个
      timeoutSeconds: 5  ##探测超时，到了超时时间探测还没返回结果说明失败
      successThreshold: 3 ## 成功阈值，连续几次成才算成功
      failureThreshold: 5 ## 失败阈值，连续几次失败才算真失败
     
    # livenessProbe:
    #   exec: ["/bin/sh","-c","sleep 30;abc "]  ## 返回不是0，那就是探测失败
    #   initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测
    #   periodSeconds: 5  ## 每隔几秒来运行这个
    #   timeoutSeconds: 5  ##探测超时，到了超时时间探测还没返回结果说明失败
    #   successThreshold: 5 ## 成功阈值，连续几次成才算成功
    #   failureThreshold: 5 ## 失败阈值，连续几次失败才算真失败
```



### 七、停止pod

pod.spec.**terminationGracePeriodSeconds** = 30s  优雅停机；给一个缓冲时间

健康检查+优雅停机 = 0宕机

start完成以后，liveness和readness并存。   liveness失败导致重启。readness失败导致不给Service负载均衡网络中加，不接受流量。  





