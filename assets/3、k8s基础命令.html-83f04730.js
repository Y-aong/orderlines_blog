import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,e as a}from"./app-2d0f66e1.js";const i={},l=a(`<h1 id="_3、基础命令" tabindex="-1"><a class="header-anchor" href="#_3、基础命令" aria-hidden="true">#</a> 3、基础命令</h1><h3 id="一、命令概述" tabindex="-1"><a class="header-anchor" href="#一、命令概述" aria-hidden="true">#</a> 一、命令概述</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 初学者掌握的命令</span>
Basic Commands <span class="token punctuation">(</span>Beginner<span class="token punctuation">)</span>: 
  create        从文件或stdin中创建资源。
  expose        获取一个复制控制器、服务、部署或pod
<span class="token comment"># k8s服务</span>
Kubernetes Service
  run           在集群上运行一个特定的映像
  <span class="token builtin class-name">set</span>           设置对象的具体特性

Basic Commands <span class="token punctuation">(</span>Intermediate<span class="token punctuation">)</span>: 基础命令
  explain       资源文档
  get           显示一个或多个资源
  edit          编辑服务器上的资源
  delete        按文件名、stdin、资源和名称或按资源和标签删除资源
  selector		选择器

Deploy Commands:   <span class="token comment">#部署用的命令</span>
  rollout       管理资源的回滚
  scale         为部署控制器、复制集控制器或复制控制器设置新的大小
  autoscale     自动缩放Deployment、ReplicaSet、StatefulSet或ReplicationController


Cluster Management Commands:  <span class="token comment">#集群管理的命令</span>
  certificate   修改证书资源。
  cluster-info  显示集群信息
  <span class="token function">top</span>           显示资源<span class="token punctuation">(</span>CPU/内存<span class="token punctuation">)</span>使用率。
  cordon        将节点标记为不可调度
  uncordon      将节点标记为可调度的
  drain         排水节点，为维护做好准备
  taint         更新一个或多个节点上的污点

Troubleshooting and Debugging Commands:  <span class="token comment"># debug的命令</span>
  describe      打印pod中容器的日志
  logs          打印pod中容器的日志
  attach        附着在运行中的容器上
  <span class="token builtin class-name">exec</span>          在容器中执行命令
  port-forward  将一个或多个本地端口转发到pod
  proxy         向Kubernetes API服务器运行代理
  <span class="token function">cp</span>            在容器中拷贝文件和目录。
  auth          检查授权
  debug         为故障排除工作负载和节点创建调试会话

Advanced Commands:  <span class="token comment"># 高阶命令</span>
  <span class="token function">diff</span>          实际版本与潜在应用版本的差异
  apply         通过文件名或stdin将配置应用到资源
  patch         patch资源的更新字段
  replace       用文件名或标准输入替换资源
  kustomize     从一个目录或URL构建一个定制目标。

Settings Commands:  <span class="token comment"># 设置</span>
  label         更新资源标签
  annotate      更新资源的注解
  completion    输出指定shell <span class="token punctuation">(</span>bash或zsh<span class="token punctuation">)</span> <span class="token comment">#的shell补全代码</span>

Other Commands:  <span class="token comment">#其他</span>
  api-resources 打印服务器上支持的API资源
  api-versions  打印服务器上支持的API版本，格式为<span class="token string">&quot;group/version&quot;</span>
  config        修改kubecconfig文件
  plugin        提供与插件交互的实用程序。
  version       打印客户端和服务器版本信息

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、简单示例" tabindex="-1"><a class="header-anchor" href="#二、简单示例" aria-hidden="true">#</a> 二、简单示例</h3><ul><li><strong>创建和部署</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#1、部署</span>
kubectl apply <span class="token parameter variable">-f</span> deployment.yaml

<span class="token comment">#2、移除</span>
kubectl delete <span class="token parameter variable">-f</span> deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl get 显示资源列表</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl get 资源类型</span>

<span class="token comment">#获取类型为Deployment的资源列表</span>
kubectl get deployments
<span class="token comment">#获取类型为Pod的资源列表</span>
kubectl get pods
<span class="token comment">#获取类型为Node的资源列表</span>
kubectl get nodes

<span class="token comment"># 查看所有名称空间的 Deployment</span>
kubectl get deployments <span class="token parameter variable">-A</span>
kubectl get deployments --all-namespaces
<span class="token comment"># 查看 kube-system 名称空间的 Deployment</span>
kubectl get deployments <span class="token parameter variable">-n</span> kube-system

<span class="token comment"># 查看pod详细信息</span>
kubectl get pods <span class="token parameter variable">-o</span> wide

<span class="token comment"># 以yaml形式查看pod</span>
kubectl get pod pod_name <span class="token parameter variable">-o</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl create 创建k8s集群中的一些对象</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl create 创建k8s集群中的一些对象</span>

kubectl create <span class="token parameter variable">--help</span>
kubectl create deployment 这次部署的名字 <span class="token parameter variable">--image</span><span class="token operator">=</span>应用的镜像

kubectl create deployment my-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx

<span class="token comment">##最终在一个机器上有pod、这个pod其实本质里面就是一个容器</span>
k8s_nginx_my-nginx-6b74b79f57-snlr4_default_dbeac79e-1ce9-42c9-bc59-c8ca0412674b_0
<span class="token comment">### k8s_镜像(nginx)_pod名(my-nginx-6b74b79f57-snlr4)_容器名(default_dbeac79e-1ce9-42c9-bc59-c8ca0412674b_0)</span>

<span class="token comment"># Create a deployment with command</span>
kubectl create deployment my-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx -- <span class="token function">date</span>

<span class="token comment"># Create a deployment named my-nginx that runs the nginx image with 3 replicas.</span>
kubectl create deployment my-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>

<span class="token comment"># Create a deployment named my-nginx that runs the nginx image and expose port 80.</span>
kubectl create deployment my-nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl describe</strong> <strong>显示有关资源的详细信息</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl describe 资源类型 资源名称</span>

<span class="token comment">#查看名称为nginx-XXXXXX的Pod的信息</span>
kubectl describe pod pod_name

<span class="token comment">#查看名称为nginx的Deployment的信息</span>
kubectl describe deployment deploy_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl logs 查看pod中的容器的打印日志</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl logs <span class="token parameter variable">-f</span> pod_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>kubectl exec 在pod中的容器环境内执行命令</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># kubectl exec Pod名称 操作命令,类似docker exec</span>

kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> pod_name /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl run 可以独立跑一个Pod</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl expose 暴露，形成一个负载均衡网络</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code> kubectl expose deployment tomcat6 <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8912</span> --target-port<span class="token operator">=</span><span class="token number">8080</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
 
 <span class="token comment">## --port：集群内访问service的端口 8912</span>
 <span class="token comment">## --target-port： pod容器的端口 8080</span>
 <span class="token comment">## --nodePort： 每个机器开发的端口 30403</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>kubectl rollout 回滚操作</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">### 查看历史记录</span>
kubectl rollout <span class="token function">history</span> deployment.apps/tomcat6
kubectl rollout <span class="token function">history</span> deploy tomcat6

<span class="token comment">### 回滚到指定版本</span>
kubectl rollout undo deployment.apps/tomcat6 --to-revision<span class="token operator">=</span><span class="token number">1</span>
kubectl rollout undo deploy tomcat6 --to-revision<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22),d=[l];function c(t,r){return e(),s("div",null,d)}const v=n(i,[["render",c],["__file","3、k8s基础命令.html.vue"]]);export{v as default};
