import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c as o,a as n,b as s,d as c,e as i}from"./app-2d0f66e1.js";const l={},u=i(`<h1 id="_9、sqlalchemy-一对多关系" tabindex="-1"><a class="header-anchor" href="#_9、sqlalchemy-一对多关系" aria-hidden="true">#</a> 9、sqlalchemy 一对多关系</h1><h3 id="一、模型类" tabindex="-1"><a class="header-anchor" href="#一、模型类" aria-hidden="true">#</a> 一、模型类</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : teacher_student_model.py
# Time       ：2023/7/16 10:42
# Author     ：Y-aong
# version    ：python 3.7
# Description：sqlalchemy一对多，一对一，多对多关系配置
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> public<span class="token punctuation">.</span>base_model <span class="token keyword">import</span> db<span class="token punctuation">,</span> Base


<span class="token comment"># 配置一对多关系</span>
<span class="token keyword">class</span> <span class="token class-name">Student</span><span class="token punctuation">(</span>Base<span class="token punctuation">)</span><span class="token punctuation">:</span>
    __tablename__ <span class="token operator">=</span> <span class="token string">&#39;test_student&#39;</span>

    name <span class="token operator">=</span> db<span class="token punctuation">.</span>Column<span class="token punctuation">(</span>db<span class="token punctuation">.</span>String<span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span> comment<span class="token operator">=</span><span class="token string">&#39;学生名称&#39;</span><span class="token punctuation">)</span>
    teacher_id <span class="token operator">=</span> db<span class="token punctuation">.</span>Column<span class="token punctuation">(</span>db<span class="token punctuation">.</span>Integer<span class="token punctuation">,</span> db<span class="token punctuation">.</span>ForeignKey<span class="token punctuation">(</span><span class="token string">&#39;test_teacher.id&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token comment"># 方式二</span>
    <span class="token comment"># teacher = db.relationship(&quot;Teacher&quot;, back_populates=&quot;student&quot;)</span>


<span class="token keyword">class</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span>Base<span class="token punctuation">)</span><span class="token punctuation">:</span>
    __tablename__ <span class="token operator">=</span> <span class="token string">&#39;test_teacher&#39;</span>
    name <span class="token operator">=</span> db<span class="token punctuation">.</span>Column<span class="token punctuation">(</span>db<span class="token punctuation">.</span>String<span class="token punctuation">(</span><span class="token number">64</span><span class="token punctuation">)</span><span class="token punctuation">,</span> comment<span class="token operator">=</span><span class="token string">&#39;教师名称&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 方式一、backref，要在一对多中建立双向关系，“反向”端是多对一，</span>
    student <span class="token operator">=</span> db<span class="token punctuation">.</span>relationship<span class="token punctuation">(</span><span class="token string">&#39;Student&#39;</span><span class="token punctuation">,</span> backref<span class="token operator">=</span><span class="token string">&#39;test_teacher&#39;</span><span class="token punctuation">)</span>
    <span class="token comment"># 方式二、back_populates</span>
    <span class="token comment"># student = db.relationship(&#39;Student&#39;, back_populates=&#39;student&#39;)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、序列化类" tabindex="-1"><a class="header-anchor" href="#二、序列化类" aria-hidden="true">#</a> 二、序列化类</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : teacher_student_schema.py
# Time       ：2023/7/16 21:41
# Author     ：Y-aong
# version    ：python 3.7
# Description：
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> marshmallow <span class="token keyword">import</span> fields
<span class="token keyword">from</span> marshmallow_sqlalchemy <span class="token keyword">import</span> SQLAlchemyAutoSchema<span class="token punctuation">,</span> auto_field

<span class="token keyword">from</span> apis<span class="token punctuation">.</span>test<span class="token punctuation">.</span>models <span class="token keyword">import</span> Teacher<span class="token punctuation">,</span> Student

<span class="token keyword">from</span> public<span class="token punctuation">.</span>base_model <span class="token keyword">import</span> get_session


<span class="token keyword">def</span> <span class="token function">get_teacher</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">:</span>
    session <span class="token operator">=</span> get_session<span class="token punctuation">(</span><span class="token punctuation">)</span>
    teacher_obj <span class="token operator">=</span> session<span class="token punctuation">.</span>query<span class="token punctuation">(</span>Teacher<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token builtin">filter</span><span class="token punctuation">(</span>Teacher<span class="token punctuation">.</span><span class="token builtin">id</span> <span class="token operator">==</span> obj<span class="token punctuation">.</span>teacher_id<span class="token punctuation">)</span><span class="token punctuation">.</span>first<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> TeacherStudentSchema<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>dump<span class="token punctuation">(</span>teacher_obj<span class="token punctuation">)</span>


<span class="token keyword">class</span> <span class="token class-name">StudentSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    teacher <span class="token operator">=</span> fields<span class="token punctuation">.</span>Function<span class="token punctuation">(</span>serialize<span class="token operator">=</span><span class="token keyword">lambda</span> obj<span class="token punctuation">:</span> get_teacher<span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>
    teacher_id <span class="token operator">=</span> auto_field<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Student
        exclude <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&#39;active&#39;</span><span class="token punctuation">]</span>


<span class="token keyword">class</span> <span class="token class-name">TeacherSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    student <span class="token operator">=</span> fields<span class="token punctuation">.</span>Nested<span class="token punctuation">(</span>StudentSchema<span class="token punctuation">,</span> many<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> dump_only<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span> only<span class="token operator">=</span><span class="token punctuation">(</span><span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Teacher


<span class="token keyword">class</span> <span class="token class-name">TeacherStudentSchema</span><span class="token punctuation">(</span>SQLAlchemyAutoSchema<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">class</span> <span class="token class-name">Meta</span><span class="token punctuation">:</span>
        model <span class="token operator">=</span> Teacher
        fields <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;name&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三、视图类" tabindex="-1"><a class="header-anchor" href="#三、视图类" aria-hidden="true">#</a> 三、视图类</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># !/usr/bin/env python</span>
<span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token triple-quoted-string string">&quot;&quot;&quot;
# File       : teacher_student_view.py
# Time       ：2023/7/16 11:02
# Author     ：Y-aong
# version    ：python 3.7
# Description：一对多视图
&quot;&quot;&quot;</span>
<span class="token keyword">from</span> apis<span class="token punctuation">.</span>test<span class="token punctuation">.</span>models<span class="token punctuation">.</span>teacher_student_model <span class="token keyword">import</span> Teacher<span class="token punctuation">,</span> Student
<span class="token keyword">from</span> apis<span class="token punctuation">.</span>test<span class="token punctuation">.</span>schemas<span class="token punctuation">.</span>teacher_student_schema <span class="token keyword">import</span> TeacherSchema<span class="token punctuation">,</span> StudentSchema
<span class="token keyword">from</span> public<span class="token punctuation">.</span>base_view <span class="token keyword">import</span> BaseView


<span class="token keyword">class</span> <span class="token class-name">TeacherView</span><span class="token punctuation">(</span>BaseView<span class="token punctuation">)</span><span class="token punctuation">:</span>
    url <span class="token operator">=</span> <span class="token string">&#39;/teacher&#39;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>TeacherView<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>table_orm <span class="token operator">=</span> Teacher
        self<span class="token punctuation">.</span>table_schema <span class="token operator">=</span> TeacherSchema


<span class="token keyword">class</span> <span class="token class-name">StudentView</span><span class="token punctuation">(</span>BaseView<span class="token punctuation">)</span><span class="token punctuation">:</span>
    url <span class="token operator">=</span> <span class="token string">&#39;/student&#39;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>StudentView<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>table_orm <span class="token operator">=</span> Student
        self<span class="token punctuation">.</span>table_schema <span class="token operator">=</span> StudentSchema
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),r={href:"https://y-aong.github.io/orderlines_blog/zh/posts/flask/flask_restful%E5%9F%BA%E7%B1%BB%E7%A4%BA%E4%BE%8B.html",target:"_blank",rel:"noopener noreferrer"};function d(k,m){const a=t("ExternalLinkIcon");return p(),o("div",null,[u,n("p",null,[s("这里使用到了一些自定义的基类请参考"),n("a",r,[s("flask_restful 基类"),c(a)])])])}const h=e(l,[["render",d],["__file","9、SQLAlchemy一对多关系.html.vue"]]);export{h as default};
