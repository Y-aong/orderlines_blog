import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-2d0f66e1.js";const i={},l=e(`<h1 id="_1、安装配置" tabindex="-1"><a class="header-anchor" href="#_1、安装配置" aria-hidden="true">#</a> 1、安装配置</h1><h3 id="一、安装配置" tabindex="-1"><a class="header-anchor" href="#一、安装配置" aria-hidden="true">#</a> 一、安装配置</h3><ul><li><p>3台linux服务器，centos服务器本地设置2核4g</p></li><li><p>三台机器设置组内互信可以互相ping通</p></li><li><p>关闭机器的防火墙</p></li></ul><h3 id="二、基础安装配置" tabindex="-1"><a class="header-anchor" href="#二、基础安装配置" aria-hidden="true">#</a> 二、基础安装配置</h3><p>修改hostname</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 三台机器都要设置</span>
hostnamectl set-hostname k8s-01
<span class="token comment"># 设置 hostname 解析</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;127.0.0.1   <span class="token variable"><span class="token variable">$(</span><span class="token function">hostname</span><span class="token variable">)</span></span>&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/hosts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、安装脚本" tabindex="-1"><a class="header-anchor" href="#三、安装脚本" aria-hidden="true">#</a> 三、安装脚本</h3><ul><li>1.1创建<code>k8s.sh</code>并运行</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#/bin/sh</span>

<span class="token comment">#######################开始设置环境##################################### \\n</span>

<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################正在配置所有基础环境信息################## <span class="token entity" title="\\n">\\n</span>&quot;</span>


<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################关闭selinux################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/enforcing/disabled/&#39;</span> /etc/selinux/config
setenforce <span class="token number">0</span>
<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################关闭swap################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
swapoff <span class="token parameter variable">-a</span>  
<span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">&#39;s/.*swap.*/#&amp;/&#39;</span> /etc/fstab 

<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################配置路由转发################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/k8s.conf</span>
br_netfilter
EOF</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;net.ipv4.ip_forward = 1&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf

<span class="token comment">## 必须 ipv6流量桥接</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;net.bridge.bridge-nf-call-ip6tables = 1&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
<span class="token comment">## 必须 ipv4流量桥接</span>
<span class="token builtin class-name">echo</span> <span class="token string">&#39;net.bridge.bridge-nf-call-iptables = 1&#39;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv6.conf.all.disable_ipv6 = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv6.conf.default.disable_ipv6 = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv6.conf.lo.disable_ipv6 = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv6.conf.all.forwarding = 1&quot;</span>  <span class="token operator">&gt;&gt;</span> /etc/sysctl.d/k8s.conf
modprobe br_netfilter
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">--system</span>
	
	
<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################配置ipvs################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysconfig/modules/ipvs.modules</span>
#!/bin/bash
modprobe -- ip_vs
modprobe -- ip_vs_rr
modprobe -- ip_vs_wrr
modprobe -- ip_vs_sh
modprobe -- nf_conntrack_ipv4
EOF</span>

<span class="token function">chmod</span> <span class="token number">755</span> /etc/sysconfig/modules/ipvs.modules 
<span class="token function">sh</span> /etc/sysconfig/modules/ipvs.modules


<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################安装ipvsadm相关软件################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> ipset ipvsadm




<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################安装docker容器环境################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">sudo</span> yum remove docker*
<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
<span class="token function">sudo</span> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-19.03.9  docker-ce-cli-19.03.9 containerd.io
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
systemctl start <span class="token function">docker</span>

<span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
{
  &quot;registry-mirrors&quot;: [&quot;https://uzp8w2vr.mirror.aliyuncs.com&quot;]
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>


<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################安装k8s核心包 kubeadm kubelet kubectl################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment">###指定k8s安装版本</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.21.0 kubeadm-1.21.0 kubectl-1.21.0

<span class="token comment">###要把kubelet立即启动。</span>
systemctl <span class="token builtin class-name">enable</span> kubelet
systemctl start kubelet

<span class="token builtin class-name">printf</span> <span class="token string">&quot;##################下载api-server等核心镜像################## <span class="token entity" title="\\n">\\n</span>&quot;</span>
<span class="token function">sudo</span> <span class="token function">tee</span> ./images.sh <span class="token operator">&lt;&lt;-</span><span class="token string">&#39;EOF&#39;
#!/bin/bash
images=(
kube-apiserver:v1.21.0
kube-proxy:v1.21.0
kube-controller-manager:v1.21.0
kube-scheduler:v1.21.0
coredns:v1.8.0
etcd:3.4.13-0
pause:3.4.1
)
for imageName in \${images[@]} ; do
docker pull registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/$imageName
done
## 全部完成后重新修改coredns镜像
docker tag registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/coredns:v1.8.0 registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/coredns/coredns:v1.8.0
EOF</span>
   
<span class="token function">chmod</span> +x ./images.sh <span class="token operator">&amp;&amp;</span> ./images.sh
   
<span class="token comment">### k8s的所有基本环境全部完成</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>2、使用kubeadm引导集群（参照初始化master继续做）</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#### --apiserver-advertise-address 的地址一定写成自己master机器的ip地址</span>
<span class="token comment">#### 以下的只在master节点执行</span>
kubeadm init <span class="token punctuation">\\</span>
--apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.70.10 <span class="token punctuation">\\</span>
--image-repository registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images <span class="token punctuation">\\</span>
--kubernetes-version v1.21.0 <span class="token punctuation">\\</span>
--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/16 <span class="token punctuation">\\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">192.168</span>.0.0/16


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、按照控制台引导继续往下</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 第一步</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
<span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

<span class="token comment">##第二步</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

<span class="token comment">##第三步 部署网络插件,这里有可能下载失败，因为版本问题</span>
kubectl apply <span class="token parameter variable">-f</span> https://docs.projectcalico.org/manifests/calico.yaml

<span class="token comment">##第四步，用控制台打印的kubeadm join 去其他node节点执行</span>
kubeadm <span class="token function">join</span> <span class="token number">10.170</span>.11.8:6443 <span class="token parameter variable">--token</span> cnb7x2.lzgz7mfzcjutn0nk <span class="token punctuation">\\</span>
	--discovery-token-ca-cert-hash sha256:00c9e977ee52632098aadb515c90076603daee94a167728110ef8086d0d5b37d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、验证集群</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>kubectl get node -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5、设置kube-proxy的ipvs模式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">##修改kube-proxy默认的配置</span>
kubectl edit cm kube-proxy <span class="token parameter variable">-n</span> kube-system
<span class="token comment">## 修改mode: &quot;ipvs&quot;</span>

<span class="token comment">##改完以后重启kube-proxy</span>
<span class="token comment">### 查到所有的kube-proxy</span>
kubectl get pod <span class="token parameter variable">-n</span> kube-system <span class="token operator">|</span><span class="token function">grep</span> kube-proxy
<span class="token comment">### 删除之前的即可</span>
kubectl delete pod 【用自己查出来的kube-proxy-dw5sf kube-proxy-hsrwp kube-proxy-vqv7n】  <span class="token parameter variable">-n</span> kube-system

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),t=[l];function c(o,p){return s(),a("div",null,t)}const u=n(i,[["render",c],["__file","1、k8s安装.html.vue"]]);export{u as default};
