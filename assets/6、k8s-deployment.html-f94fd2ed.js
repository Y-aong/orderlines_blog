import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as t,c as r,a as e,b as n,d as i,e as a}from"./app-2d0f66e1.js";const o={},c=a(`<h1 id="_6、完成一次部署" tabindex="-1"><a class="header-anchor" href="#_6、完成一次部署" aria-hidden="true">#</a> 6、完成一次部署</h1><h3 id="一、定义" tabindex="-1"><a class="header-anchor" href="#一、定义" aria-hidden="true">#</a> 一、定义</h3><p>deployment为pod是和replicaSets提供声明式更新的能力。Delpoyment就是将实际状态变为期望状态的能力</p><h3 id="二、deployment的特点" tabindex="-1"><a class="header-anchor" href="#二、deployment的特点" aria-hidden="true">#</a> 二、deployment的特点</h3><ul><li>赋予Pod自愈和故障转移能力</li><li>水平扩容</li><li>灰度发布</li><li>滚动更新</li></ul><p>三、deployment-spec的字段</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>FIELDS:
   minReadySeconds	<span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
     新创建的pod应准备就绪的最小秒数

   paused	<span class="token operator">&lt;</span>boolean<span class="token operator">&gt;</span>
     表示部署暂停。

   progressDeadlineSeconds	<span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
     部署进展之前的最长时间<span class="token punctuation">(</span>以秒为单位<span class="token punctuation">)</span>。默认为600s。

   replicas	<span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
    所需的pod。默认值为1。

   revisionHistoryLimit	<span class="token operator">&lt;</span>integer<span class="token operator">&gt;</span>
     要保留以允许回滚的旧ReplicaSets的数量。默认为10.

   selector	<span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span> -required-
     标签选择器。

   strategy	<span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span>
     用于用新pod替换现有pod的部署策略。

   template	<span class="token operator">&lt;</span>Object<span class="token operator">&gt;</span> -required-
     模板描述了将要创建的pod。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、deployment规约" tabindex="-1"><a class="header-anchor" href="#三、deployment规约" aria-hidden="true">#</a> 三、deployment规约</h3>`,8),p={href:"https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/#pod-template",target:"_blank",rel:"noopener noreferrer"},m=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec 中只有 .spec.template 和 .spec.selector 是必需的字段。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="副本-replicas" tabindex="-1"><a class="header-anchor" href="#副本-replicas" aria-hidden="true">#</a> 副本 replicas</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.replicas 是指定所需 Pod 的可选字段。它的默认值是1。

如果你对某个 Deployment 执行了手动扩缩操作（例如，通过 kubectl scale deployment deployment --replicas=X）， 之后基于清单对 Deployment 执行了更新操作（例如通过运行 kubectl apply -f deployment.yaml），那么通过应用清单而完成的更新会覆盖之前手动扩缩所作的变更。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="选择符-selector" tabindex="-1"><a class="header-anchor" href="#选择符-selector" aria-hidden="true">#</a> 选择符 selector</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.selector 是指定本 Deployment 的 Pod 标签选择算符的必需字段。

.spec.selector 必须匹配 .spec.template.metadata.labels，否则请求会被 API 拒绝。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="策略-strategy" tabindex="-1"><a class="header-anchor" href="#策略-strategy" aria-hidden="true">#</a> 策略 strategy</h4><ul><li><h4 id="重新创建-deployment-recreate" tabindex="-1"><a class="header-anchor" href="#重新创建-deployment-recreate" aria-hidden="true">#</a> 重新创建 Deployment：Recreate</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>如果 .spec.strategy.type==Recreate，在创建新 Pod 之前，所有现有的 Pod 会被杀死。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><h4 id="滚动更新-deployment-rollingupdate" tabindex="-1"><a class="header-anchor" href="#滚动更新-deployment-rollingupdate" aria-hidden="true">#</a> 滚动更新 Deployment：RollingUpdate</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Deployment 会在 .spec.strategy.type==RollingUpdate时，采取 滚动更新的方式更新 Pod。你可以指定 maxUnavailable 和 maxSurge 来控制滚动更新 过程。

# 最大不可用
.spec.strategy.rollingUpdate.maxUnavailable 是一个可选字段，用来指定 更新过程中不可用的 Pod 的个数上限。该值可以是绝对数字（例如，5），也可以是所需 Pod 的百分比（例如，10%）。百分比值会转换成绝对数并去除小数部分。 如果 .spec.strategy.rollingUpdate.maxSurge 为 0，则此值不能为 0。 默认值为 25%。

例如，当此值设置为 30% 时，滚动更新开始时会立即将旧 ReplicaSet 缩容到期望 Pod 个数的70%。 新 Pod 准备就绪后，可以继续缩容旧有的 ReplicaSet，然后对新的 ReplicaSet 扩容， 确保在更新期间可用的 Pod 总数在任何时候都至少为所需的 Pod 个数的 70%。

# 最大峰值
.spec.strategy.rollingUpdate.maxSurge 是一个可选字段，用来指定可以创建的超出期望 Pod 个数的 Pod 数量。此值可以是绝对数（例如，5）或所需 Pod 的百分比（例如，10%）。 如果 MaxUnavailable 为 0，则此值不能为 0。百分比值会通过向上取整转换为绝对数。 此字段的默认值为 25%。

例如，当此值为 30% 时，启动滚动更新后，会立即对新的 ReplicaSet 扩容，同时保证新旧 Pod 的总数不超过所需 Pod 总数的 130%。一旦旧 Pod 被杀死，新的 ReplicaSet 可以进一步扩容， 同时确保更新期间的任何时候运行中的 Pod 总数最多为所需 Pod 总数的 130%。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="进度期限秒数-progressdeadlineseconds" tabindex="-1"><a class="header-anchor" href="#进度期限秒数-progressdeadlineseconds" aria-hidden="true">#</a> 进度期限秒数 progressDeadlineSeconds</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.progressDeadlineSeconds 是一个可选字段，用于指定系统在报告 Deployment 进展失败 之前等待 Deployment 取得进展的秒数。 这类报告会在资源状态中体现为 type: Progressing、status: False、 reason: ProgressDeadlineExceeded。Deployment 控制器将在默认 600 毫秒内持续重试 Deployment。 将来，一旦实现了自动回滚，Deployment 控制器将在探测到这样的条件时立即回滚 Deployment。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="最短就绪时间-minreadyseconds" tabindex="-1"><a class="header-anchor" href="#最短就绪时间-minreadyseconds" aria-hidden="true">#</a> 最短就绪时间 minReadySeconds</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.minReadySeconds 是一个可选字段，用于指定新创建的 Pod 在没有任意容器崩溃情况下的最小就绪时间， 只有超出这个时间 Pod 才被视为可用。默认值为 0（Pod 在准备就绪后立即将被视为可用）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="修订历史限制-revisionhistorylimit" tabindex="-1"><a class="header-anchor" href="#修订历史限制-revisionhistorylimit" aria-hidden="true">#</a> 修订历史限制 revisionHistoryLimit</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Deployment 的修订历史记录存储在它所控制的 ReplicaSets 中。

.spec.revisionHistoryLimit 是一个可选字段，用来设定出于回滚目的所要保留的旧 ReplicaSet 数量。 这些旧 ReplicaSet 会消耗 etcd 中的资源，并占用 kubectl get rs 的输出。 每个 Deployment 修订版本的配置都存储在其 ReplicaSets 中；因此，一旦删除了旧的 ReplicaSet， 将失去回滚到 Deployment 的对应修订版本的能力。 默认情况下，系统保留 10 个旧 ReplicaSet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="paused-暂停的" tabindex="-1"><a class="header-anchor" href="#paused-暂停的" aria-hidden="true">#</a> paused（暂停的）</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>.spec.paused 是用于暂停和恢复 Deployment 的可选布尔字段。 暂停的 Deployment 和未暂停的 Deployment 的唯一区别是，Deployment 处于暂停状态时， PodTemplateSpec 的任何修改都不会触发新的上线。 Deployment 在创建时是默认不会处于暂停状态。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="四、deployment-回滚解释" tabindex="-1"><a class="header-anchor" href="#四、deployment-回滚解释" aria-hidden="true">#</a> 四、deployment 回滚解释</h3><p>一个deployment产生三个资源</p><ul><li><p>deployment资源：Deployment控制RS，RS控制Pod的副本数。每部署一个新版本就会创建一个新的副本集，利用他记录状态，回滚也是直接让指定的rs生效</p></li><li><p>ReplicaSet： 只提供了副本数量的控制功能</p></li><li><p>Pod资源：这次部署实际的运行的内容</p></li></ul><h3 id="五、deployment更新机制" tabindex="-1"><a class="header-anchor" href="#五、deployment更新机制" aria-hidden="true">#</a> 五、deployment更新机制</h3><ul><li>仅当 Deployment Pod 模板（即 <code>.spec.template</code>）发生改变时，例如<strong>模板的标签或容器镜像被更新， 才会触发 Deployment 上线</strong>。 <strong>其他更新（如对 Deployment 执行扩缩容的操作）不会触发上线动作。</strong></li><li><strong>上线动作 原理： 创建新的rs，准备就绪后，替换旧的rs（此时不会删除，因为<code>revisionHistoryLimit</code> 指定了保留几个版本）</strong></li></ul><p>部署回滚常用命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">################更新#################################</span>
<span class="token comment">#kubectl  set image  deployment资源名  容器名=镜像名</span>
kubectl <span class="token builtin class-name">set</span> image deployment.apps/nginx-deployment php-redis<span class="token operator">=</span>tomcat:8 <span class="token parameter variable">--record</span>
<span class="token comment">## yaml提取可更新的关键所有字段计算的hash。</span>
web---- /hello
postman   aservice- /hello

<span class="token comment">#或者直接修改定义也行</span>
kubectl edit deployment.v1.apps/nginx-deployment
<span class="token comment">#查看状态</span>
kubectl rollout status deployment.v1.apps/nginx-deployment

<span class="token comment">################查看历史并回滚####################################</span>
<span class="token comment">#查看更新历史-看看我们设置的历史总记录数是否生效了</span>
kubectl rollout <span class="token function">history</span> deployment.v1.apps/nginx-deployment
<span class="token comment">#回滚</span>
kubectl rollout undo deployment.v1.apps/nginx-deployment --to-revision<span class="token operator">=</span><span class="token number">2</span>

<span class="token comment">###############累计更新##############</span>
<span class="token comment">#暂停记录版本</span>
kubectl rollout pause deployment.v1.apps/nginx-deployment
<span class="token comment">#多次更新操作。</span>
<span class="token comment">##比如更新了资源限制</span>
kubectl <span class="token builtin class-name">set</span> resources deployment.v1.apps/nginx-deployment <span class="token parameter variable">-c</span><span class="token operator">=</span>nginx <span class="token parameter variable">--limits</span><span class="token operator">=</span>cpu<span class="token operator">=</span>200m,memory<span class="token operator">=</span>512Mi
<span class="token comment">##比如更新了镜像版本</span>
kubectl <span class="token builtin class-name">set</span> image deployment.apps/nginx-deployment php-redis<span class="token operator">=</span>tomcat:8
<span class="token comment">##在继续操作多次</span>
<span class="token comment">##看看历史版本有没有记录变化</span>
kubectl rollout <span class="token function">history</span> deployment.v1.apps/nginx-deployment
<span class="token comment">#让多次累计生效</span>
kubectl rollout resume deployment.v1.apps/nginx-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-1-比例缩放" tabindex="-1"><a class="header-anchor" href="#_1-1-比例缩放" aria-hidden="true">#</a> 1.1 比例缩放</h4><p>maxSurge（最大增量）：除当前数量外还要添加多少个实例。</p><p>maxUnavailable（最大不可用量）：滚动更新过程中的不可用实例数。</p><h4 id="_1-2-hpa-动态扩缩容" tabindex="-1"><a class="header-anchor" href="#_1-2-hpa-动态扩缩容" aria-hidden="true">#</a> 1.2 HPA（动态扩缩容）</h4>`,26),u={href:"https://kubernetes.io/zh-cn/docs/tasks/run-application/horizontal-pod-autoscale-walkthrough/",target:"_blank",rel:"noopener noreferrer"},v=a(`<h4 id="_1-3-蓝绿部署" tabindex="-1"><a class="header-anchor" href="#_1-3-蓝绿部署" aria-hidden="true">#</a> 1.3 蓝绿部署</h4><h5 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h5><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>蓝绿发布，是在生产环境稳定集群之外，额外部署一个与稳定集群规模相同的新集群，并通过流量控制，逐步引入流量至新集群直至 100%，原先稳定集群将与新集群同时保持在线一段时间，期间发生任何异常，可立刻将所有流量切回至原稳定集群，实现快速回滚。直到全部验证成功后，下线老的稳定集群，新集群成为新的稳定集群。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Kubernetes 集群中需要部署 Nginx Ingress 作为 Ingress Controller，并且对外暴露了统一的流量入口。</p><h5 id="基础步骤" tabindex="-1"><a class="header-anchor" href="#基础步骤" aria-hidden="true">#</a> 基础步骤</h5><ul><li>新集群部署</li><li>切换流量</li><li>下线老集群</li></ul><h4 id="_1-4-金丝雀部署" tabindex="-1"><a class="header-anchor" href="#_1-4-金丝雀部署" aria-hidden="true">#</a> 1.4 金丝雀部署</h4><ul><li>在金丝雀发布开始后，先启动一个新版本应用，但是并不直接将流量切过来，而是测试人员对新版本进行线上测试，启动的这个新版本应用，就是我们的金丝雀。如果没有问题，那么可以将少量的用户流量导入到新版本上，然后再对新版本做运行状态观察，收集各种运行时数据，如果此时对新旧版本做各种数据对比，就是所谓的A/B测试。</li><li>当确认新版本运行良好后，再逐步将更多的流量导入到新版本上，在此期间，还可以不断地调整新旧两个版本的运行的服务器副本数量，以使得新版本能够承受越来越大的流量压力。直到将100%的流量都切换到新版本上，最后关闭剩下的老版本服务，完成金丝雀发布。</li><li>如果在金丝雀发布过程中（灰度期）发现了新版本有问题，就应该立即将流量切回老版本上，这样，就会将负面影响控制在最小范围内。</li></ul><h5 id="滚动发布的缺点-同时存在两个版本都能接受流量" tabindex="-1"><a class="header-anchor" href="#滚动发布的缺点-同时存在两个版本都能接受流量" aria-hidden="true">#</a> 滚动发布的缺点？（同时存在两个版本都能接受流量）</h5><ul><li><p>没法控制流量 ； 6 4， 8 2 ，3 7</p></li><li><p>滚动发布短时间就直接结束，不能直接控制新老版本的存活时间。</p></li></ul>`,10);function h(b,g){const s=d("ExternalLinkIcon");return t(),r("div",null,[c,e("p",null,[e("a",p,[n("Pod 模板"),i(s)]),n(" template")]),m,e("p",null,[e("a",u,[n("参考官网"),i(s)])]),v])}const k=l(o,[["render",h],["__file","6、k8s-deployment.html.vue"]]);export{k as default};
