import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as i,c,a as n,b as s,d as e,e as t}from"./app-2d0f66e1.js";const o={},u=t(`<h1 id="_10、存储和配置" tabindex="-1"><a class="header-anchor" href="#_10、存储和配置" aria-hidden="true">#</a> 10、存储和配置</h1><h3 id="一、k8s的存储" tabindex="-1"><a class="header-anchor" href="#一、k8s的存储" aria-hidden="true">#</a> 一、k8s的存储</h3><h4 id="_1、必要条件安装nfs-utils" tabindex="-1"><a class="header-anchor" href="#_1、必要条件安装nfs-utils" aria-hidden="true">#</a> 1、必要条件安装nfs-utils</h4><p>所有节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 所有机器安装nfs-utils</span>
<span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>主节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#nfs主节点</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;/nfs/data/ *(insecure,rw,sync,no_root_squash)&quot;</span> <span class="token operator">&gt;</span> /etc/exports

<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
systemctl <span class="token builtin class-name">enable</span> rpcbind <span class="token parameter variable">--now</span>
systemctl <span class="token builtin class-name">enable</span> nfs-server <span class="token parameter variable">--now</span>
<span class="token comment">#配置生效</span>
exportfs <span class="token parameter variable">-r</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从节点</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>showmount <span class="token parameter variable">-e</span> 主节点ip

<span class="token comment">#执行以下命令挂载 nfs 服务器上的共享目录到本机路径 /root/nfsmount</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data

<span class="token function">mount</span> <span class="token parameter variable">-t</span> nfs <span class="token number">172.31</span>.0.4:/nfs/data /nfs/data
<span class="token comment"># 写入一个测试文件</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;hello nfs server&quot;</span> <span class="token operator">&gt;</span> /nfs/data/test.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、原生方式挂载" tabindex="-1"><a class="header-anchor" href="#_2、原生方式挂载" aria-hidden="true">#</a> 2、原生方式挂载</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 主节点ip
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/nginx<span class="token punctuation">-</span>pv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、pv和pvc" tabindex="-1"><a class="header-anchor" href="#二、pv和pvc" aria-hidden="true">#</a> 二、pv和pvc</h3><h4 id="_1、定义" tabindex="-1"><a class="header-anchor" href="#_1、定义" aria-hidden="true">#</a> 1、定义</h4><p><strong>pv</strong>：<em>持久卷（Persistent Volume），将应用需要持久化的数据保存到指定位置</em></p><p><strong>pvc</strong>：<em>持久卷申明（<strong>Persistent Volume Claim</strong>），申明需要使用的持久卷规格</em></p><h4 id="_2、步骤" tabindex="-1"><a class="header-anchor" href="#_2、步骤" aria-hidden="true">#</a> 2、步骤</h4><ul><li><strong>创建pv池</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#nfs主节点</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/01
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/02
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv01<span class="token punctuation">-</span>10m
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/01
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 主机ip
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv02<span class="token punctuation">-</span>30M
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 30M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/02
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 主机ip
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv03<span class="token punctuation">-</span>80Mi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 80Mi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/03
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 主机ip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p><strong>pvc创建和绑定</strong></p><ul><li><p>创建pvc</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 5Mi
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建pod绑定pvc</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li></ul>`,20),r={id:"三、configmap",tabindex:"-1"},d=n("a",{class:"header-anchor",href:"#三、configmap","aria-hidden":"true"},"#",-1),k={href:"https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-pod-configmap/",target:"_blank",rel:"noopener noreferrer"},v=t(`<h4 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h4><p>configMap卷提供了向 Pod 注入配置数据的方法。 ConfigMap 对象中存储的数据可以被 <code>configMap</code> 类型的卷引用，然后被 Pod 中运行的容器化应用使用。</p><p>引用 configMap 对象时，你可以在卷中通过它的名称来引用。 你可以自定义 ConfigMap 中特定条目所要使用的路径。 下面的配置显示了如何将名为 <code>log-config</code> 的 ConfigMap 挂载到名为 <code>configmap-pod</code> 的 Pod 中：</p><h4 id="创建configmap的方式" tabindex="-1"><a class="header-anchor" href="#创建configmap的方式" aria-hidden="true">#</a> 创建configMap的方式</h4><ul><li><p>使用yaml文件</p></li><li><p>使用命令行方式 from-literal</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap special-config --from-literal<span class="token operator">=</span>special.how<span class="token operator">=</span>very --from-literal<span class="token operator">=</span>special.type<span class="token operator">=</span>charm

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用文件的方式 from-file</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create configmap game-config-3 --from-file<span class="token operator">=</span><span class="token operator">&lt;</span>我的键名<span class="token operator">&gt;=</span><span class="token operator">&lt;</span>文件路径<span class="token operator">&gt;</span>
kubectl create configmap game-config-3 --from-file<span class="token operator">=</span>game-special-key<span class="token operator">=</span>configure-pod-container/configmap/game.properties
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用挂载的方式</p></li></ul><h4 id="配置configmap的四种方式" tabindex="-1"><a class="header-anchor" href="#配置configmap的四种方式" aria-hidden="true">#</a> 配置configMap的四种方式</h4><ul><li>在容器命令和参数内</li><li>容器的环境变量</li><li>在只读卷中添加一个文件，让应用来读取</li><li>编写代码在pod中运行，让k8s读取configMap</li></ul><h4 id="使用configmap步骤" tabindex="-1"><a class="header-anchor" href="#使用configmap步骤" aria-hidden="true">#</a> 使用configMap步骤</h4><ul><li>创建一个configMap对象或者使用现有的configMap对象，多个pod可以使用同一个configMap</li><li>修改pod在spec.volumns下添加一个卷，将spec.volumns.configMap.name设置为所要使用configMap对象的引用</li><li>为每个需要该configMap的容器添加一个spec.containers,volumeMounts.设置 <code>.spec.containers[].volumeMounts[].readOnly=true</code> 并将 <code>.spec.containers[].volumeMounts[].mountPath</code> 设置为一个未使用的目录名， ConfigMap 的内容将出现在该目录中。</li><li>更改你的镜像或者命令行，使得程序能够从该目录中查找文件，configMap中每一个data键会变成mountPath下面的一个文件名</li></ul><h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h4><ul><li><p>创建configMap对象</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ConfigMap <span class="token comment"># 类型为configmap</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base
<span class="token comment"># 实际的配置信息是放在data中的</span>
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">appVersion</span><span class="token punctuation">:</span> 1.0.0
  <span class="token key atrule">jdkVersion</span><span class="token punctuation">:</span> <span class="token string">&quot;1.8&quot;</span> <span class="token comment">#不能是number，如果符合number类型就加个引号</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span> prod
  <span class="token key atrule">logDir</span><span class="token punctuation">:</span> /var/data
  <span class="token key atrule">logLevel</span><span class="token punctuation">:</span> info
  <span class="token key atrule">1err_config</span><span class="token punctuation">:</span> err <span class="token comment">#定义一个不合规范的key，看能否使用,貌似现在可以以数字开头了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建configmap</span>
kubectl create <span class="token parameter variable">-f</span> configmap-base.yaml
<span class="token comment"># 查看configmap</span>
kubectl get configMap configmap-base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>创建pod对象使用configmap</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>valuefrom
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base<span class="token punctuation">-</span>busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;env&quot;</span><span class="token punctuation">]</span>
    <span class="token comment"># 环境变量中使用configmap</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> APP_VERSION
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base
          <span class="token key atrule">key</span><span class="token punctuation">:</span> appVersion
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> LOG_LEVEL
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base
          <span class="token key atrule">key</span><span class="token punctuation">:</span> logLevel
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> LOG_LEVEL
      <span class="token key atrule">valueFrom</span><span class="token punctuation">:</span>
        <span class="token key atrule">configMapKeyRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base
          <span class="token key atrule">key</span><span class="token punctuation">:</span> logLevel
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建pod对象</span>
kubectl create <span class="token parameter variable">-f</span> kube-configMap-valueFrom.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>查看环境变量</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>root@master config<span class="token punctuation">]</span><span class="token comment"># kubectl logs configmap-valuefrom </span>
<span class="token assign-left variable">MY_NGINX_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">8848</span>
<span class="token assign-left variable">MY_NGINX_PORT</span><span class="token operator">=</span>tcp://10.96.190.196:8848
<span class="token assign-left variable">KUBERNETES_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">KUBERNETES_PORT</span><span class="token operator">=</span>tcp://10.96.0.1:443
<span class="token assign-left variable">LOG_LEVEL</span><span class="token operator">=</span>info
<span class="token assign-left variable"><span class="token environment constant">HOSTNAME</span></span><span class="token operator">=</span>configmap-valuefrom
<span class="token assign-left variable">MY_NGINX_PORT_8848_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.96</span>.190.196
<span class="token assign-left variable"><span class="token environment constant">SHLVL</span></span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">PHP_APACHE_PORT_80_TCP</span><span class="token operator">=</span>tcp://10.96.64.244:80
<span class="token assign-left variable"><span class="token environment constant">HOME</span></span><span class="token operator">=</span>/root
<span class="token assign-left variable">MY_NGINX_PORT_8848_TCP_PORT</span><span class="token operator">=</span><span class="token number">8848</span>
<span class="token assign-left variable">MY_NGINX_PORT_8848_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">MY_NGINX_PORT_8848_TCP</span><span class="token operator">=</span>tcp://10.96.190.196:8848
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.96</span>.0.1
<span class="token assign-left variable">PHP_APACHE_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.96</span>.64.244
<span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_PORT</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">PHP_APACHE_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">PHP_APACHE_PORT</span><span class="token operator">=</span>tcp://10.96.64.244:80
<span class="token assign-left variable">KUBERNETES_SERVICE_PORT_HTTPS</span><span class="token operator">=</span><span class="token number">443</span>
<span class="token assign-left variable">KUBERNETES_PORT_443_TCP</span><span class="token operator">=</span>tcp://10.96.0.1:443
<span class="token assign-left variable">MY_NGINX_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.96</span>.190.196
<span class="token assign-left variable">KUBERNETES_SERVICE_HOST</span><span class="token operator">=</span><span class="token number">10.96</span>.0.1
<span class="token assign-left variable">PHP_APACHE_PORT_80_TCP_ADDR</span><span class="token operator">=</span><span class="token number">10.96</span>.64.244
<span class="token assign-left variable"><span class="token environment constant">PWD</span></span><span class="token operator">=</span>/
<span class="token assign-left variable">PHP_APACHE_PORT_80_TCP_PORT</span><span class="token operator">=</span><span class="token number">80</span>
<span class="token assign-left variable">PHP_APACHE_PORT_80_TCP_PROTO</span><span class="token operator">=</span>tcp
<span class="token assign-left variable">APP_VERSION</span><span class="token operator">=</span><span class="token number">1.0</span>.0

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用envFrom一次性将所有的配置问价内容写到环境变量</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>envfrom
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base<span class="token punctuation">-</span>busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/bin/sh&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;-c&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;env&quot;</span><span class="token punctuation">]</span>
    <span class="token key atrule">envFrom</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">configMapRef</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> configmap<span class="token punctuation">-</span>base
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="挂载的-configmap-会被自动更新" tabindex="-1"><a class="header-anchor" href="#挂载的-configmap-会被自动更新" aria-hidden="true">#</a> 挂载的 ConfigMap 会被自动更新</h4><p>当已挂载的 ConfigMap 被更新时，所投射的内容最终也会被更新。 这适用于 Pod 启动后可选引用的 ConfigMap 重新出现的情况。</p><p>Kubelet 在每次定期同步时都会检查所挂载的 ConfigMap 是否是最新的。 然而，它使用其基于 TTL 机制的本地缓存来获取 ConfigMap 的当前值。 因此，从 ConfigMap 更新到新键映射到 Pod 的总延迟可能与 kubelet 同步周期（默认为1分钟）+ kubelet 中 ConfigMap 缓存的 TTL（默认为1分钟）一样长。 你可以通过更新 Pod 的一个注解来触发立即刷新。</p>`,14),m={href:"https://zhuanlan.zhihu.com/p/582026003",target:"_blank",rel:"noopener noreferrer"},b=n("h3",{id:"四、secret",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#四、secret","aria-hidden":"true"},"#"),s(" 四、Secret")],-1),g=n("h4",{id:"定义-1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#定义-1","aria-hidden":"true"},"#"),s(" 定义")],-1),y={href:"https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/",target:"_blank",rel:"noopener noreferrer"},h=t(`<p>由于创建 Secret 可以独立于使用它们的 Pod， 因此在创建、查看和编辑 Pod 的工作流程中暴露 Secret（及其数据）的风险较小。 Kubernetes 和在集群中运行的应用程序也可以对 Secret 采取额外的预防措施， 例如避免将机密数据写入非易失性存储。</p><h4 id="使用方式" tabindex="-1"><a class="header-anchor" href="#使用方式" aria-hidden="true">#</a> 使用方式</h4><ul><li><strong>挂载文件</strong>——作为挂载到一个或者多个容器卷中的文件</li><li><strong>容器变量</strong>——作为容器的变量</li><li><strong>拉取镜像</strong>——由kubelet在pod拉去镜像时使用</li></ul><h4 id="secret基本操作" tabindex="-1"><a class="header-anchor" href="#secret基本操作" aria-hidden="true">#</a> secret基本操作</h4><h5 id="命令操作secret" tabindex="-1"><a class="header-anchor" href="#命令操作secret" aria-hidden="true">#</a> 命令操作secret</h5><ul><li><p>创建secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl create secret generic db-user-pass <span class="token punctuation">\\</span>
    --from-literal<span class="token operator">=</span>username<span class="token operator">=</span>admin <span class="token punctuation">\\</span>
    --from-literal<span class="token operator">=</span>password<span class="token operator">=</span><span class="token string">&#39;S!B\\*d$zDsb=&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>验证secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl get secrets
<span class="token comment"># 查看 Secret 的细节：</span>
kubectl describe secret db-user-pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>编辑secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl edit secrets <span class="token operator">&lt;</span>secret-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>删除secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl delete secret db-user-pass
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h5 id="使用配置文件操作secret" tabindex="-1"><a class="header-anchor" href="#使用配置文件操作secret" aria-hidden="true">#</a> 使用配置文件操作secret</h5><ul><li><p>创建yaml文件</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mysecret
<span class="token key atrule">type</span><span class="token punctuation">:</span> Opaque
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> YWRtaW4=
  <span class="token key atrule">password</span><span class="token punctuation">:</span> MWYyZDFlMmU2N2Rm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用secret</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> ./secret.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="pod中使用secret" tabindex="-1"><a class="header-anchor" href="#pod中使用secret" aria-hidden="true">#</a> pod中使用secret</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">##命令格式</span>
kubectl create secret docker-registry my_secret <span class="token punctuation">\\</span>
  --docker-server<span class="token operator">=</span><span class="token operator">&lt;</span>你的镜像仓库服务器<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
  --docker-username<span class="token operator">=</span><span class="token operator">&lt;</span>你的用户名<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
  --docker-password<span class="token operator">=</span><span class="token operator">&lt;</span>你的密码<span class="token operator">&gt;</span> <span class="token punctuation">\\</span>
  --docker-email<span class="token operator">=</span><span class="token operator">&lt;</span>你的邮箱地址<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> private<span class="token punctuation">-</span>nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> private<span class="token punctuation">-</span>nginx
    <span class="token key atrule">image</span><span class="token punctuation">:</span> leifengyang/guignginx<span class="token punctuation">:</span>v1.0
  <span class="token key atrule">imagePullSecrets</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my_secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function f(_,P){const a=p("ExternalLinkIcon");return i(),c("div",null,[u,n("h3",r,[d,s(" 三、"),n("a",k,[s("configMap"),e(a)])]),v,n("p",null,[n("strong",null,[n("a",m,[s("configmap使用参考"),e(a)])])]),b,g,n("p",null,[s("Secret 是一种包含少量敏感信息例如密码、令牌或密钥的对象。 这样的信息可能会被放在 "),n("a",y,[s("Pod"),e(a)]),s(" 规约中或者镜像中。 使用 Secret 意味着你不需要在应用程序代码中包含机密数据。")]),h])}const E=l(o,[["render",f],["__file","10、k8s-储存和配置.html.vue"]]);export{E as default};
