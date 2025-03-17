import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as l,a as n,b as s,d as o,e as c}from"./app-2d0f66e1.js";const i={},u=n("h1",{id:"_5、什么叫pod",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_5、什么叫pod","aria-hidden":"true"},"#"),s(" 5、什么叫pod")],-1),d=n("h3",{id:"一、pod概念",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#一、pod概念","aria-hidden":"true"},"#"),s(" 一、pod概念")],-1),r=n("em",null,"Pod",-1),k={href:"https://kubernetes.io/zh/docs/concepts/overview/what-is-kubernetes/#why-containers",target:"_blank",rel:"noopener noreferrer"},m=c(`<h3 id="二、pod特点" tabindex="-1"><a class="header-anchor" href="#二、pod特点" aria-hidden="true">#</a> 二、pod特点</h3><ul><li><p>pod对于容器有自律能力（pod自动重启失败的容器）</p></li><li><p>pod不能恢复自己</p></li><li><p>pod分为单容器和多容器</p></li><li><p>pod为其成员容器提供两种共享资源：网络和存储</p></li><li><p>一个pod由一个pause容器设置好整个pod里面所有的容器的网络和名称空间等信息</p></li></ul><h3 id="三、容器的生命周期" tabindex="-1"><a class="header-anchor" href="#三、容器的生命周期" aria-hidden="true">#</a> 三、容器的生命周期</h3><ul><li><p>pod启动，会依次启动所有的初始化容器，有一个失败，则pod都不能启动</p></li><li><p>接下来<strong>启动所有的应用容器</strong>（每一个应用容器都必须能一直运行起来），Pod开始正式工作，一个启动失败就会<strong>尝试重启Pod内的这个容器</strong>，Pod只要是NotReady，Pod就不对外提供服务了</p></li></ul><h3 id="四、pod的重启策略" tabindex="-1"><a class="header-anchor" href="#四、pod的重启策略" aria-hidden="true">#</a> 四、pod的重启策略</h3><p>Pod 的 <code>spec</code> 中包含一个 <code>restartPolicy</code> 字段，其可能取值包括 Always、OnFailure 和 Never。默认值是 Always。</p><p><code>restartPolicy</code> 适用于 Pod 中的所有容器。</p><h3 id="五、静态pod" tabindex="-1"><a class="header-anchor" href="#五、静态pod" aria-hidden="true">#</a> 五、静态pod</h3><p>在 <strong>/etc/kubernetes/manifests</strong> 位置放的所有Pod.yaml文件，机器启动kubelet自己就把他启动起来。</p><p>静态Pod一直守护在他的这个机器上</p><h3 id="六、prode探针机制-健康检查机制" tabindex="-1"><a class="header-anchor" href="#六、prode探针机制-健康检查机制" aria-hidden="true">#</a> 六、prode探针机制（健康检查机制）</h3><h4 id="三种探针" tabindex="-1"><a class="header-anchor" href="#三种探针" aria-hidden="true">#</a> 三种探针</h4><ul><li><p>启动探针：一次性成功探针，只要启动了就不用了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 功能
用来检测应用是否成功启动。如果启动就可以进行后续的检查。满容器一定要指定启动探针
# 特点
一旦启动后续就不用了，剩下存活探针和就绪探针持续运行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>存货探针：用于检查容器是否正常存活，如果检查失败就会重新启动这个容器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 功能
用于检查容器是否正常存活，如果检查失败就会重启这个容器
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>就绪探针：用于检查容器是否准备好了可以接受流量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 功能
用于检查容器是否准备好接收流量，当一个pod中所有容器都准备好，才接受流量，否则将service负载均衡中剔除
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="prode配置" tabindex="-1"><a class="header-anchor" href="#prode配置" aria-hidden="true">#</a> prode配置</h4><ul><li><code>initialDelaySeconds</code>：容器启动后要等待多少秒后存活和就绪探测器才被初始化，默认是 0 秒，最小值是 0。这是针对以前没有</li><li><code>periodSeconds</code>：执行探测的时间间隔（单位是秒）。默认是 10 秒。<strong>最小值是 1</strong>。</li><li><code>successThreshold</code>：探测器在失败后，被视为成功的最小连续成功数。<strong>默认值是 1</strong>。 <ul><li>存活和启动探针的这个值必须是 1。最小值是 1。</li></ul></li><li><code>failureThreshold</code>：当探测失败时，Kubernetes 的重试次数。 存活探测情况下的放弃就意味着重新启动容器。 就绪探测情况下的放弃 Pod 会被打上未就绪的标签。<strong>默认值是 3</strong>。最小值是 1。</li><li><code>timeoutSeconds</code>：探测的超时时间。<strong>默认值是 1 秒</strong>。最小值是 1。</li></ul><p>使用yaml测试探针机制</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx-start-probe02&quot;</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx-start-probe02&quot;</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>vol
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /app
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>html
    <span class="token key atrule">hostPath</span><span class="token punctuation">:</span> 
      <span class="token key atrule">path</span><span class="token punctuation">:</span> /html
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;nginx&quot;</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token comment"># 启动探针</span>
    <span class="token key atrule">startupProbe</span><span class="token punctuation">:</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>  <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;cat /app/abc&quot;</span><span class="token punctuation">]</span>  <span class="token comment">## 返回不是0，那就是探测失败</span>
      <span class="token comment"># initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">## 每隔几秒来运行这个</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">##探测超时，到了超时时间探测还没返回结果说明失败</span>
      <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">## 成功阈值，连续几次成才算成功</span>
      <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment">## 失败阈值，连续几次失败才算真失败</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>vol
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /app
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>html
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
    <span class="token comment"># 存活探针</span>
    <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>   <span class="token comment">## nginx容器有没有 /abc.html，</span>
      <span class="token comment"># 方式一，发送http请求</span>
      <span class="token comment"># httpGet:</span>
      <span class="token comment">#   host: 127.0.0.1</span>
      <span class="token comment">#   path: /abc.html</span>
      <span class="token comment">#   port: 80</span>
      <span class="token comment">#   scheme: HTTP</span>
      <span class="token comment"># periodSeconds: 5  ## 每隔几秒来运行这个</span>
      <span class="token comment"># successThreshold: 1 ## 成功阈值，连续几次成才算成功</span>
      <span class="token comment"># failureThreshold: 5 ## 失败阈值，连续几次失败才算真失败</span>
      <span class="token comment"># 方式二，运行sh命令</span>
      <span class="token key atrule">exec</span><span class="token punctuation">:</span>
        <span class="token key atrule">command</span><span class="token punctuation">:</span>  <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;cat /usr/share/nginx/html/abc.html&quot;</span><span class="token punctuation">]</span>  <span class="token comment">## 返回不是0，那就是探测失败</span>
      <span class="token comment"># initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">## 每隔几秒来运行这个</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">##探测超时，到了超时时间探测还没返回结果说明失败</span>
      <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">1</span> <span class="token comment">## 成功阈值，连续几次成才算成功</span>
      <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment">## 失败阈值，连续几次失败才算真失败</span>
    <span class="token comment"># 就绪探针</span>
    <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span> <span class="token comment">##就绪检测，都是http</span>
      <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>  
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /abc.html  <span class="token comment">## 给容器发请求</span>
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">scheme</span><span class="token punctuation">:</span> HTTP <span class="token comment">## 返回不是0，那就是探测失败</span>
      <span class="token key atrule">initialDelaySeconds</span><span class="token punctuation">:</span> <span class="token number">2</span> <span class="token comment">## 指定的这个秒以后才执行探测</span>
      <span class="token key atrule">periodSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">## 每隔几秒来运行这个</span>
      <span class="token key atrule">timeoutSeconds</span><span class="token punctuation">:</span> <span class="token number">5</span>  <span class="token comment">##探测超时，到了超时时间探测还没返回结果说明失败</span>
      <span class="token key atrule">successThreshold</span><span class="token punctuation">:</span> <span class="token number">3</span> <span class="token comment">## 成功阈值，连续几次成才算成功</span>
      <span class="token key atrule">failureThreshold</span><span class="token punctuation">:</span> <span class="token number">5</span> <span class="token comment">## 失败阈值，连续几次失败才算真失败</span>
     
    <span class="token comment"># livenessProbe:</span>
    <span class="token comment">#   exec: [&quot;/bin/sh&quot;,&quot;-c&quot;,&quot;sleep 30;abc &quot;]  ## 返回不是0，那就是探测失败</span>
    <span class="token comment">#   initialDelaySeconds: 20 ## 指定的这个秒以后才执行探测</span>
    <span class="token comment">#   periodSeconds: 5  ## 每隔几秒来运行这个</span>
    <span class="token comment">#   timeoutSeconds: 5  ##探测超时，到了超时时间探测还没返回结果说明失败</span>
    <span class="token comment">#   successThreshold: 5 ## 成功阈值，连续几次成才算成功</span>
    <span class="token comment">#   failureThreshold: 5 ## 失败阈值，连续几次失败才算真失败</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="七、停止pod" tabindex="-1"><a class="header-anchor" href="#七、停止pod" aria-hidden="true">#</a> 七、停止pod</h3><p>pod.spec.<strong>terminationGracePeriodSeconds</strong> = 30s 优雅停机；给一个缓冲时间</p><p>健康检查+优雅停机 = 0宕机</p><p>start完成以后，liveness和readness并存。 liveness失败导致重启。readness失败导致不给Service负载均衡网络中加，不接受流量。</p>`,21);function v(b,h){const a=t("ExternalLinkIcon");return p(),l("div",null,[u,d,n("p",null,[r,s("是一组（一个或多个） "),n("a",k,[s("容器（docker容器）"),o(a)]),s("的集合 （就像在豌豆荚中）；这些容器共享存储、网络、以及怎样运行这些容器的声明。")]),m])}const x=e(i,[["render",v],["__file","5、k8s-pod.html.vue"]]);export{x as default};
