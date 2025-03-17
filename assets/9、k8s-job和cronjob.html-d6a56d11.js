import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c,a as s,b as n,d as o,e as a}from"./app-2d0f66e1.js";const d={},p=a(`<h1 id="_9、任务和定时任务" tabindex="-1"><a class="header-anchor" href="#_9、任务和定时任务" aria-hidden="true">#</a> 9、任务和定时任务</h1><h3 id="一、job" tabindex="-1"><a class="header-anchor" href="#一、job" aria-hidden="true">#</a> 一、JOB</h3><h4 id="_1、定义" tabindex="-1"><a class="header-anchor" href="#_1、定义" aria-hidden="true">#</a> 1、定义</h4><p><code>kubernetes</code>中的 Job 对象将创建一个或多个 Pod，并确保指定数量的 Pod 可以成功执行到进程正常结束：</p><h4 id="_2、特点" tabindex="-1"><a class="header-anchor" href="#_2、特点" aria-hidden="true">#</a> 2、特点</h4><ul><li>当 Job 创建的 Pod 执行成功并正常结束时，Job 将记录成功结束的 Pod 数量</li><li>当成功结束的 Pod 达到指定的数量时，Job 将完成执行</li><li>删除 Job 对象时，将清理掉由 Job 创建的 Pod</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Job
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> pi
          <span class="token key atrule">image</span><span class="token punctuation">:</span> perl
          <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;perl&quot;</span><span class="token punctuation">,</span>  <span class="token string">&quot;-Mbignum=bpi&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;-wle&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;print bpi(2000)&quot;</span> <span class="token punctuation">]</span>
      <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Never <span class="token comment">#Job情况下，不支持Always</span>
  <span class="token key atrule">backoffLimit</span><span class="token punctuation">:</span> <span class="token number">4</span> <span class="token comment">#任务4次都没成，认为失败</span>
  <span class="token key atrule">activeDeadlineSeconds</span><span class="token punctuation">:</span> <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="参数说明" tabindex="-1"><a class="header-anchor" href="#参数说明" aria-hidden="true">#</a> 参数说明</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#参数说明</span>
  kubectl explain job.spec
  activeDeadlineSeconds：10 总共维持10s
  <span class="token comment">#该字段限定了 Job 对象在集群中的存活时长，一旦达到 .spec.activeDeadlineSeconds 指定的时长，该 Job 创建的所有的 Pod 都将被终止。但是Job不会删除，Job需要手动删除，或者使用ttl进行清理</span>
  backoffLimit
  <span class="token comment">#设定 Job 最大的重试次数。该字段的默认值为 6；一旦重试次数达到了 backoffLimit 中的值，Job 将被标记为失败，且尤其创建的所有 Pod 将被终止；</span>
  completions <span class="token comment">#Job结束需要成功运行的Pods。默认为1</span>
  manualSelector
  parallelism: <span class="token number">1</span> <span class="token comment">#并行运行的Pod个数，默认为1</span>
  ttlSecondsAfterFinished: <span class="token number">0</span> <span class="token comment">#在job执行完时马上删除</span>
  ttlSecondsAfterFinished: <span class="token number">100</span> <span class="token comment">#在job执行完后，等待100s再删除</span>
      <span class="token comment">#除了 CronJob 之外，TTL 机制是另外一种自动清理已结束Job（Completed 或 Finished）的方式：</span>
      <span class="token comment">#TTL 机制由 TTL 控制器 提供，ttlSecondsAfterFinished 字段可激活该特性</span>
      <span class="token comment">#当 TTL 控制器清理 Job 时，TTL 控制器将删除 Job 对象，以及由该 Job 创建的所有 Pod 对象。</span>
    
      <span class="token comment"># job超时以后 已经完成的不删，正在运行的Pod就删除</span>
      <span class="token comment">#单个Pod时，Pod成功运行，Job就结束了</span>
      <span class="token comment">#如果Job中定义了多个容器，则Job的状态将根据所有容器的执行状态来变化。</span>
      <span class="token comment">#Job任务不建议去运行nginx，tomcat，mysql等阻塞式的，否则这些任务永远完不了。</span>
      <span class="token comment">#如果Job定义的容器中存在http server、mysql等长期的容器和一些批处理容器，</span>
      <span class="token comment">#则Job状态不会发生变化（因为长期运行的容器不会主动结束）。此时可以通过Pod的.</span>
      <span class="token comment">#status.containerStatuses获取指定容器的运行状态。</span>

  manualSelector：

  - job同样可以指定selector来关联pod。需要注意的是job目前可以使用两个API组来操作，batch/v1和extensions/v1beta1。当用户需要自定义selector时，使用两种API组时定义的参数有所差异。
  - 使用batch/v1时，用户需要将jod的spec.manualSelector设置为true，才可以定制selector。默认为false。
  - 使用extensions/v1beta1时，用户不需要额外的操作。因为extensions/v1beta1的spec.autoSelector默认为false，该项与batch/v1的spec.manualSelector含义正好相反。换句话说，使用extensions/v1beta1时，用户不想定制selector时，需要手动将spec.autoSelector设置为true。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、cronjob" tabindex="-1"><a class="header-anchor" href="#二、cronjob" aria-hidden="true">#</a> 二、cronJob</h3><h4 id="_1、定义-1" tabindex="-1"><a class="header-anchor" href="#_1、定义-1" aria-hidden="true">#</a> 1、定义</h4>`,11),r=s("br",null,null,-1),u={href:"https://en.wikipedia.org/wiki/Cron",target:"_blank",rel:"noopener noreferrer"},v=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Schedule

所有 CronJob 的 \`schedule\` 中所定义的时间，都是基于 master 所在时区来进行计算的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2、特点-1" tabindex="-1"><a class="header-anchor" href="#_2、特点-1" aria-hidden="true">#</a> 2、特点</h4><p>当以下两个条件都满足时，Job 将至少运行一次：</p><ul><li><code>startingDeadlineSeconds</code> 被设置为一个较大的值，或者不设置该值（默认值将被采纳）</li><li><code>concurrencyPolicy</code> 被设置为 <code>Allow</code></li></ul><h4 id="_3、参数" tabindex="-1"><a class="header-anchor" href="#_3、参数" aria-hidden="true">#</a> 3、参数</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># kubectl explain cronjob.spec</span>

  concurrencyPolicy：并发策略
    &quot;Allow&quot; (允许，default)<span class="token punctuation">:</span>
    &quot;Forbid&quot; (禁止)<span class="token punctuation">:</span> forbids；前个任务没执行完，要并发下一个的话，下一个会被跳过
    &quot;Replace&quot;(替换)<span class="token punctuation">:</span> 新任务，替换当前运行的任务

    failedJobsHistoryLimit：记录失败数的上限，Defaults to 1.
    successfulJobsHistoryLimit： 记录成功任务的上限。 Defaults to 3.
  <span class="token comment">#指定了 CronJob 应该保留多少个 completed 和 failed 的 Job 记录。将其设置为 0，则 CronJob 不会保留已经结束的 Job 的记录。</span>

    jobTemplate： job怎么定义（与前面我们说的job一样定义法）

    schedule： cron 表达式；

    startingDeadlineSeconds： 表示如果Job因为某种原因无法按调度准时启动，
    在spec.startingDeadlineSeconds时间段之内，CronJob仍然试图重新启动Job，
    如果在.spec.startingDeadlineSeconds时间之内没有启动成功，则不再试图重新启动。
    如果spec.startingDeadlineSeconds的值没有设置，则没有按时启动的任务不会被尝试重新启动。



    suspend	暂停定时任务，对已经执行了的任务，不会生效； Defaults to false.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_4、实例" tabindex="-1"><a class="header-anchor" href="#_4、实例" aria-hidden="true">#</a> 4、实例</h4><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> batch/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CronJob
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> hello
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">&quot;*/1 * * * *&quot;</span>    <span class="token comment">#分、时、日、月、周</span>
  <span class="token key atrule">jobTemplate</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">template</span><span class="token punctuation">:</span>
        <span class="token key atrule">spec</span><span class="token punctuation">:</span>
          <span class="token key atrule">containers</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> hello
              <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
              <span class="token key atrule">args</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> /bin/sh
                <span class="token punctuation">-</span> <span class="token punctuation">-</span>c
                <span class="token punctuation">-</span> date; echo Hello from the Kubernetes cluster
          <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> OnFailure
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8);function b(m,k){const e=l("ExternalLinkIcon");return t(),c("div",null,[p,s("p",null,[n("CronJob 按照预定的时间计划（schedule）创建 Job（注意：启动的是Job不是Deploy，rs）。一个 CronJob 对象类似于 crontab (cron table)"),r,n(" 文件中的一行记录。该对象根据 "),s("a",u,[n("Cron"),o(e)]),n(" 格式定义的时间计划，周期性地创建 Job 对象。")]),v])}const J=i(d,[["render",b],["__file","9、k8s-job和cronjob.html.vue"]]);export{J as default};
