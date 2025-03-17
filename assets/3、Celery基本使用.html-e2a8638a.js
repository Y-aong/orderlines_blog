import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-2d0f66e1.js";const t="/orderlines_blog/assets/images/image-20250317145513794.png",p={},o=e(`<h1 id="_3、celery基本使用" tabindex="-1"><a class="header-anchor" href="#_3、celery基本使用" aria-hidden="true">#</a> 3、Celery基本使用</h1><h3 id="引言" tabindex="-1"><a class="header-anchor" href="#引言" aria-hidden="true">#</a> 引言</h3><p>在现代Web应用中，异步任务处理是提升用户体验和系统性能的关键。例如，发送邮件、生成报表、处理文件上传等操作，如果同步执行会阻塞用户请求，影响响应速度。<strong>Celery</strong> 是一个基于Python的分布式任务队列（也称为异步任务框架），它允许我们将耗时操作交给后台执行，从而解放主线程，提升应用的响应能力。</p><p>本文将从基础用法、配置到注意事项，手把手教你如何在Python项目中使用Celery，并规避常见问题。</p><h3 id="一、安装与配置" tabindex="-1"><a class="header-anchor" href="#一、安装与配置" aria-hidden="true">#</a> 一、安装与配置</h3><h4 id="_1-安装依赖" tabindex="-1"><a class="header-anchor" href="#_1-安装依赖" aria-hidden="true">#</a> 1. 安装依赖</h4><p>Celery需要一个消息中间件（Broker）来传递任务，常用的有 <strong>RabbitMQ</strong> 和 <strong>Redis</strong>。这里以Redis为例：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pip <span class="token function">install</span> celery redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-配置celery实例" tabindex="-1"><a class="header-anchor" href="#_2-配置celery实例" aria-hidden="true">#</a> 2. 配置Celery实例</h4><p>创建一个 <code>celery_app.py</code> 文件：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> celery <span class="token keyword">import</span> Celery

app <span class="token operator">=</span> Celery<span class="token punctuation">(</span><span class="token string">&#39;myproject&#39;</span><span class="token punctuation">,</span> broker<span class="token operator">=</span><span class="token string">&#39;redis://localhost:6379/0&#39;</span><span class="token punctuation">,</span> backend<span class="token operator">=</span><span class="token string">&#39;redis://localhost:6379/0&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 可选：设置任务序列化方式（默认JSON）</span>
app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>update<span class="token punctuation">(</span>
    task_serializer<span class="token operator">=</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">,</span>
    result_serializer<span class="token operator">=</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">,</span>
    accept_content<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;json&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-启动celery-worker" tabindex="-1"><a class="header-anchor" href="#_3-启动celery-worker" aria-hidden="true">#</a> 3. 启动Celery Worker</h4><p>在终端执行：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>celery <span class="token parameter variable">-A</span> celery_app worker <span class="token parameter variable">--loglevel</span><span class="token operator">=</span>info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="二、基本用法示例" tabindex="-1"><a class="header-anchor" href="#二、基本用法示例" aria-hidden="true">#</a> 二、基本用法示例</h3><h4 id="_1-定义任务" tabindex="-1"><a class="header-anchor" href="#_1-定义任务" aria-hidden="true">#</a> 1. 定义任务</h4><p>在 <code>tasks.py</code> 中定义一个异步任务：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> celery_app <span class="token keyword">import</span> app

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>task</span>
<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> x <span class="token operator">+</span> y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-调用任务" tabindex="-1"><a class="header-anchor" href="#_2-调用任务" aria-hidden="true">#</a> 2. 调用任务</h4><p>在应用中调用任务（例如在Flask视图或Django视图中）：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 同步调用（不推荐，会阻塞）</span>
result <span class="token operator">=</span> add<span class="token punctuation">.</span>delay<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 返回10</span>

<span class="token comment"># 异步调用（推荐）</span>
result <span class="token operator">=</span> add<span class="token punctuation">.</span>delay<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span>  <span class="token comment"># 返回AsyncResult对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_3-获取任务结果" tabindex="-1"><a class="header-anchor" href="#_3-获取任务结果" aria-hidden="true">#</a> 3. 获取任务结果</h4><p>通过 <code>AsyncResult</code> 查询任务状态：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> celery<span class="token punctuation">.</span>result <span class="token keyword">import</span> AsyncResult

task_id <span class="token operator">=</span> <span class="token string">&#39;your_task_id&#39;</span>
result <span class="token operator">=</span> AsyncResult<span class="token punctuation">(</span>task_id<span class="token punctuation">,</span> app<span class="token operator">=</span>app<span class="token punctuation">)</span>
<span class="token keyword">if</span> result<span class="token punctuation">.</span>ready<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Result:&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">.</span>result<span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Task is still running.&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、任务队列配置" tabindex="-1"><a class="header-anchor" href="#三、任务队列配置" aria-hidden="true">#</a> 三、任务队列配置</h3><p>Celery通过配置文件优化任务执行：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>update<span class="token punctuation">(</span>
    <span class="token comment"># 任务超时时间（秒）</span>
    task_time_limit<span class="token operator">=</span><span class="token number">30</span><span class="token punctuation">,</span>

    <span class="token comment"># 允许重试次数</span>
    task_always_eager<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">,</span>  <span class="token comment"># 开发环境设为True可同步执行调试</span>

    <span class="token comment"># 任务路由（将任务分配到不同队列）</span>
    task_routes <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;tasks.add&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">&#39;queue&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;high_priority&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="四、常见问题与注意事项" tabindex="-1"><a class="header-anchor" href="#四、常见问题与注意事项" aria-hidden="true">#</a> 四、常见问题与注意事项</h3><h4 id="_1-任务未执行-检查以下几点" tabindex="-1"><a class="header-anchor" href="#_1-任务未执行-检查以下几点" aria-hidden="true">#</a> 1. <strong>任务未执行？检查以下几点</strong></h4><ul><li><strong>Broker和Worker是否运行</strong>：确保Redis/RabbitMQ服务启动，Worker进程正常。</li><li><strong>任务名称是否正确</strong>：Celery通过任务函数名的路径定位任务（如 <code>tasks.add</code>）。</li><li><strong>序列化问题</strong>：默认使用JSON序列化，如果任务返回复杂对象（如自定义类），需改用 <code>pickle</code> 或自定义序列化器。</li></ul><h4 id="_2-任务结果存储" tabindex="-1"><a class="header-anchor" href="#_2-任务结果存储" aria-hidden="true">#</a> 2. <strong>任务结果存储</strong></h4><ul><li>默认存储在Broker中，但生产环境建议使用 <strong>Redis</strong> 或 <strong>数据库</strong> 作为结果后端（Result Backend）：<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>result_backend <span class="token operator">=</span> <span class="token string">&#39;db+sqlite:///results.sqlite&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_3-任务幂等性与重试" tabindex="-1"><a class="header-anchor" href="#_3-任务幂等性与重试" aria-hidden="true">#</a> 3. <strong>任务幂等性与重试</strong></h4><ul><li>对于幂等任务（如发送邮件），设置 <code>task_ignore_result=True</code> 避免重复存储结果。</li><li>配置重试机制：<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>task</span><span class="token punctuation">(</span>bind<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> max_retries<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">unreliable_task</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token comment"># 可能失败的代码</span>
        <span class="token keyword">pass</span>
    <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>retry<span class="token punctuation">(</span>countdown<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>  <span class="token comment"># 5秒后重试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_4-性能优化" tabindex="-1"><a class="header-anchor" href="#_4-性能优化" aria-hidden="true">#</a> 4. <strong>性能优化</strong></h4><ul><li><strong>并发执行</strong>：通过 <code>--concurrency</code> 参数设置Worker线程/进程数（如 <code>--concurrency=4</code>）。</li><li><strong>任务优先级</strong>：为不同任务分配队列，并设置 <code>worker_pool</code>（如 <code>eventlet</code> 实现异步IO）。</li></ul><h4 id="_5-监控与日志" tabindex="-1"><a class="header-anchor" href="#_5-监控与日志" aria-hidden="true">#</a> 5. <strong>监控与日志</strong></h4><ul><li>使用 <strong>Celery Flower</strong> 监控任务状态：<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>celery flower <span class="token parameter variable">--address</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0 <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">5555</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li>给任务添加日志：<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging
logger <span class="token operator">=</span> logging<span class="token punctuation">.</span>getLogger<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>task</span>
<span class="token keyword">def</span> <span class="token function">my_task</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    logger<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&quot;Task started&quot;</span><span class="token punctuation">)</span>
    <span class="token comment"># 任务逻辑</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="五、最佳实践" tabindex="-1"><a class="header-anchor" href="#五、最佳实践" aria-hidden="true">#</a> 五、最佳实践</h3><ol><li><strong>任务保持轻量级</strong>：避免在任务中执行耗时操作（如循环调用API），可拆分为多个子任务。</li><li><strong>错误处理</strong>：每个任务应包含 <code>try-except</code> 块，并记录错误信息。</li><li><strong>定期清理任务结果</strong>：使用 <code>celery result backend</code> 的清理工具避免数据堆积。</li><li><strong>使用定时任务（Celery Beat）</strong>：<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> celery<span class="token punctuation">.</span>schedules <span class="token keyword">import</span> crontab

app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>beat_schedule <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">&#39;run-every-30-seconds&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;task&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;tasks.add&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;schedule&#39;</span><span class="token punctuation">:</span> <span class="token number">30.0</span><span class="token punctuation">,</span>
        <span class="token string">&#39;args&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token number">16</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h3 id="六、flask和celery结合" tabindex="-1"><a class="header-anchor" href="#六、flask和celery结合" aria-hidden="true">#</a> 六、Flask和Celery结合</h3><p>1、目录结构</p><img src="`+t+`" alt="image-20250317145513794" style="zoom:67%;"><p><strong>celery_config.py</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : celery_config.py
# Time       ：2023/7/8 10:40
# Author     ：Y-aong
# version    ：python 3.7
# Description：celery config
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> datetime <span class="token keyword">import</span> timedelta

<span class="token keyword">from</span> conf<span class="token punctuation">.</span>config <span class="token keyword">import</span> CeleryConfig

imports <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token string">&#39;tasks.orderlines_run&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;tasks.jenkins_data_collection&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;tasks.gitlab_data_collection&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;tasks.alarm_data_collection&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>

<span class="token comment"># 时区配置，默认为UTC</span>
enable_utc <span class="token operator">=</span> CeleryConfig<span class="token punctuation">.</span>enable_utc
timezone <span class="token operator">=</span> CeleryConfig<span class="token punctuation">.</span>timezone

<span class="token comment"># Broker和Backend配置</span>
broker_url <span class="token operator">=</span> CeleryConfig<span class="token punctuation">.</span>broker_url
result_backend <span class="token operator">=</span> CeleryConfig<span class="token punctuation">.</span>broker_url
beat_dburi <span class="token operator">=</span> CeleryConfig<span class="token punctuation">.</span>beat_db_uri

<span class="token comment"># celery作为一个单独项目运行，在settings文件中设置</span>
broker_connection_retry_on_startup <span class="token operator">=</span> <span class="token boolean">True</span>
<span class="token comment"># Celery作为第三方模块集成到项目中，在全局配置中添加</span>
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP <span class="token operator">=</span> <span class="token boolean">True</span>

beat_schedule <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment"># jenkins数据采集</span>
    <span class="token string">&#39;jenkins_job&#39;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">&#39;task&#39;</span><span class="token punctuation">:</span> <span class="token string">&#39;get_jenkins_info&#39;</span><span class="token punctuation">,</span>
        <span class="token string">&#39;schedule&#39;</span><span class="token punctuation">:</span> timedelta<span class="token punctuation">(</span>minutes<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>定时任务</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>

<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : jenkins_data_collection.py
# Time       ：2024/12/1 9:56
# Author     ：Y-aong
# version    ：python 3.10
# Description：jenkins数据采集任务
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> apis <span class="token keyword">import</span> celery
<span class="token keyword">from</span> apis<span class="token punctuation">.</span>jenkins<span class="token punctuation">.</span>models<span class="token punctuation">.</span>jenkins <span class="token keyword">import</span> JenkinsInfo<span class="token punctuation">,</span> JenkinsInstance
<span class="token keyword">from</span> public<span class="token punctuation">.</span>base_model <span class="token keyword">import</span> session_scope
<span class="token keyword">from</span> public<span class="token punctuation">.</span>logger <span class="token keyword">import</span> logger
<span class="token keyword">from</span> public<span class="token punctuation">.</span>utils<span class="token punctuation">.</span>jenkins_utils <span class="token keyword">import</span> JenkinsUtils


<span class="token decorator annotation punctuation">@celery<span class="token punctuation">.</span>task</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&#39;get_jenkins_info&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">get_jenkins_info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&quot;&quot;&quot;获取jenkins配置信息&quot;&quot;&quot;</span>
    <span class="token keyword">pass</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>celery 注册到flask</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : __init__.py
# Time       ：2023/2/19 21:05
# Author     ：Y-aong
# version    ：python 3.7
# Description：
&quot;&quot;&quot;</span>
<span class="token keyword">import</span> os<span class="token punctuation">.</span>path

<span class="token keyword">from</span> celery <span class="token keyword">import</span> Celery
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask
<span class="token keyword">from</span> flask_cors <span class="token keyword">import</span> CORS
<span class="token keyword">from</span> sqlalchemy <span class="token keyword">import</span> inspect

<span class="token keyword">from</span> public<span class="token punctuation">.</span>api_utils<span class="token punctuation">.</span>permission_handlers <span class="token keyword">import</span> PermissionAuth

celery <span class="token operator">=</span> Celery<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>
celery<span class="token punctuation">.</span>config_from_object<span class="token punctuation">(</span><span class="token string">&#39;tasks.celery_config&#39;</span><span class="token punctuation">)</span>


<span class="token keyword">def</span> <span class="token function">_register_plugin</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">_register_webhook</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">_register_db</span><span class="token punctuation">(</span>app<span class="token punctuation">:</span> Flask<span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">_register_resource</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">:</span>
	<span class="token keyword">pass</span>

<span class="token keyword">def</span> <span class="token function">create_app</span><span class="token punctuation">(</span>is_test<span class="token operator">=</span><span class="token boolean">False</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    src_file_path <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    template <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span>src_file_path<span class="token punctuation">,</span> <span class="token string">&#39;templates&#39;</span><span class="token punctuation">)</span>
    app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">,</span> template_folder<span class="token operator">=</span>template<span class="token punctuation">)</span>
    app<span class="token punctuation">.</span>config<span class="token punctuation">.</span>from_object<span class="token punctuation">(</span><span class="token string">&#39;conf.config.FlaskConfig&#39;</span><span class="token punctuation">)</span>
    CORS<span class="token punctuation">(</span>app<span class="token punctuation">,</span> origins<span class="token operator">=</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">,</span> supports_credentials<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    _register_db<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
    _register_webhook<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
    _register_resource<span class="token punctuation">(</span>app<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token keyword">not</span> is_test<span class="token punctuation">:</span>
        _register_plugin<span class="token punctuation">(</span>app<span class="token punctuation">)</span>

    <span class="token keyword">return</span> app

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>celery_worker.py</strong></p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : celery_worker.py
# Time       ：2023/7/8 10:41
# Author     ：Y-aong
# version    ：python 3.7
# Description：celery worker
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> apis <span class="token keyword">import</span> create_app<span class="token punctuation">,</span> celery


app <span class="token operator">=</span> create_app<span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span>app_context<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动命令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动worker</span>
celery <span class="token parameter variable">-A</span> celery_worker.celery worker <span class="token parameter variable">--loglevel</span><span class="token operator">=</span>info <span class="token parameter variable">--pool</span><span class="token operator">=</span>solo
<span class="token comment"># 启动beat</span>
celery <span class="token parameter variable">-A</span> celery_worker.celery beat <span class="token parameter variable">-l</span> info <span class="token parameter variable">-s</span> celery_logs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Celery 中，Worker 的类型（或称为 <strong>Worker Pool Types</strong>）决定了任务执行的并发模式和资源管理方式。不同的 Worker 类型适用于不同的场景，理解它们的区别可以帮助你优化任务执行效率和资源利用。以下是 Celery 中常见的几种 Worker 类型及其特点：</p><h3 id="八、celery中几种worker的区别" tabindex="-1"><a class="header-anchor" href="#八、celery中几种worker的区别" aria-hidden="true">#</a> 八、celery中几种worker的区别</h3><h4 id="_1-prefork-pool-默认" tabindex="-1"><a class="header-anchor" href="#_1-prefork-pool-默认" aria-hidden="true">#</a> <strong>1. Prefork Pool（默认）</strong></h4><ul><li><p><strong>工作原理</strong>：基于 <strong>多进程</strong>，每个任务在独立的子进程中执行。</p></li><li><p><strong>适用场景</strong>：<strong>CPU 密集型任务</strong>（如计算、图像处理等）。</p></li><li><p>优点：</p><ul><li>避免 Python 的全局解释器锁（GIL）限制，多核 CPU 可充分利用。</li><li>稳定可靠，适合需要高隔离性的任务。</li></ul></li><li><p>缺点：</p><ul><li>内存占用较高（每个进程需复制整个 Python 环境）。</li><li>不适合 <strong>IO 密集型任务</strong>（如网络请求、数据库查询），因为进程需要等待 I/O 完成，导致资源浪费。</li></ul></li><li><p>配置方式</p><p>深色版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动命令（默认即为 prefork）</span>
celery <span class="token parameter variable">-A</span> your_app worker <span class="token parameter variable">--loglevel</span><span class="token operator">=</span>info

<span class="token comment"># 显式指定 pool 类型</span>
celery <span class="token parameter variable">-A</span> your_app worker <span class="token parameter variable">--pool</span><span class="token operator">=</span>prefork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或在配置文件中：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>worker_pool <span class="token operator">=</span> <span class="token string">&#39;prefork&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_2-eventlet-pool" tabindex="-1"><a class="header-anchor" href="#_2-eventlet-pool" aria-hidden="true">#</a> <strong>2. Eventlet Pool</strong></h4><ul><li><p><strong>工作原理</strong>：基于 <strong>协程（Green Threads）</strong>，通过 <strong>非阻塞 I/O</strong> 实现并发。</p></li><li><p><strong>适用场景</strong>：<strong>IO 密集型任务</strong>（如网络请求、HTTP 调用、数据库查询）。</p></li><li><p>优点：</p><ul><li>高并发下性能优异，适合需要频繁等待外部服务的任务。</li><li>内存占用低，资源利用率高。</li></ul></li><li><p>缺点：</p><ul><li>需要第三方库 <code>eventlet</code> 支持。</li><li>部分第三方库（如未支持非阻塞的库）可能需要打补丁（如 <code>requests</code> 需要 <code>eventlet.patcher</code>）。</li></ul></li><li><p>配置方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>celery <span class="token parameter variable">-A</span> your_app worker <span class="token parameter variable">--pool</span><span class="token operator">=</span>eventlet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或在配置文件中：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>worker_pool <span class="token operator">=</span> <span class="token string">&#39;eventlet&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_3-gevent-pool" tabindex="-1"><a class="header-anchor" href="#_3-gevent-pool" aria-hidden="true">#</a> <strong>3. Gevent Pool</strong></h4><ul><li><p><strong>工作原理</strong>：与 Eventlet 类似，基于 <strong>协程（Green Threads）</strong>，但使用 <code>gevent</code> 库实现。</p></li><li><p><strong>适用场景</strong>：与 Eventlet 相同，适合 <strong>IO 密集型任务</strong>。</p></li><li><p>优点：</p><ul><li>社区支持广泛，兼容性较好（如 <code>gevent</code> 对常见库的补丁更完善）。</li></ul></li><li><p>缺点：</p><ul><li>需要安装 <code>gevent</code> 库。</li><li>同样需要注意第三方库的兼容性。</li></ul></li><li><p>配置方式</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>celery <span class="token parameter variable">-A</span> your_app worker <span class="token parameter variable">--pool</span><span class="token operator">=</span>gevent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或在配置文件中：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>worker_pool <span class="token operator">=</span> <span class="token string">&#39;gevent&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="_4-solo-pool" tabindex="-1"><a class="header-anchor" href="#_4-solo-pool" aria-hidden="true">#</a> <strong>4. Solo Pool</strong></h4><ul><li><p><strong>工作原理</strong>：单进程单线程，逐个执行任务。</p></li><li><p><strong>适用场景</strong>：<strong>调试或测试环境</strong>，用于简单验证任务逻辑。</p></li><li><p>优点：</p><ul><li>简单直观，调试方便。</li></ul></li><li><p>缺点：</p><ul><li>无并发能力，性能极低。</li></ul></li><li><p>配置方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>celery <span class="token parameter variable">-A</span> your_app worker <span class="token parameter variable">--pool</span><span class="token operator">=</span>solo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或在配置文件中：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>app<span class="token punctuation">.</span>conf<span class="token punctuation">.</span>worker_pool <span class="token operator">=</span> <span class="token string">&#39;solo&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="如何选择-worker-类型" tabindex="-1"><a class="header-anchor" href="#如何选择-worker-类型" aria-hidden="true">#</a> <strong>如何选择 Worker 类型？</strong></h4><table><thead><tr><th>场景</th><th>推荐 Worker 类型</th><th>原因</th></tr></thead><tbody><tr><td><strong>CPU 密集型任务</strong>（如计算）</td><td><code>prefork</code></td><td>多进程充分利用多核 CPU。</td></tr><tr><td><strong>IO 密集型任务</strong>（如网络请求）</td><td><code>eventlet</code> 或 <code>gevent</code></td><td>协程实现高并发非阻塞 I/O。</td></tr><tr><td><strong>调试/测试环境</strong></td><td><code>solo</code></td><td>单线程便于调试。</td></tr></tbody></table><hr><h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> <strong>注意事项</strong></h4><ol><li><p>第三方库兼容性：</p><ul><li><p>在eventlet或gevent模式下，某些阻塞式库（如requests，urllib3）可能需要打补丁：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> eventlet <span class="token keyword">import</span> monkey_patch
monkey_patch<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 启动前打补丁</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ul></li><li><p>资源限制：</p><ul><li><code>prefork</code> 的进程数可通过 <code>--concurrency</code> 参数调整（如 <code>--concurrency=4</code>）。</li><li>协程池（<code>eventlet/gevent</code>）的协程数通常由任务数量自动管理，但需注意内存限制。</li></ul></li></ol><h4 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> <strong>总结</strong></h4><ul><li><strong>CPU 密集型</strong> → <code>prefork</code></li><li><strong>IO 密集型</strong> → <code>eventlet</code> 或 <code>gevent</code></li><li><strong>调试</strong> → <code>solo</code></li></ul>`,71),i=[o];function l(c,r){return s(),a("div",null,i)}const k=n(p,[["render",l],["__file","3、Celery基本使用.html.vue"]]);export{k as default};
