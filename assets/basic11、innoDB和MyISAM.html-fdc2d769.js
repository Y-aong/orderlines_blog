import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as e,e as t}from"./app-2d0f66e1.js";const n={},r=t('<h1 id="_11、innodb和myisam" tabindex="-1"><a class="header-anchor" href="#_11、innodb和myisam" aria-hidden="true">#</a> 11、innoDB和MyISAM</h1><h3 id="一、区别" tabindex="-1"><a class="header-anchor" href="#一、区别" aria-hidden="true">#</a> 一、区别</h3><p>InnoDB和MyISAM是使用MySQL时最常用的两种引擎类型，我们重点来看下两者区别。</p><ul><li><p>事务和外键<br> InnoDB支持事务和外键，具有安全性和完整性，适合大量insert或update操作<br> MyISAM不支持事务和外键，它提供高速存储和检索，适合大量的select查询操作</p></li><li><p>锁机制<br> InnoDB支持行级锁，锁定指定记录。基于索引来加锁实现。<br> MyISAM支持表级锁，锁定整张表。</p></li><li><p>索引结构<br> InnoDB使用聚集索引（聚簇索引），索引和记录在一起存储，既缓存索引，也缓存记录。<br> MyISAM使用非聚集索引（非聚簇索引），索引和记录分开。</p></li><li><p>并发处理能力<br> MyISAM使用表锁，会导致写操作并发率低，读之间并不阻塞，读写阻塞。<br> InnoDB读写阻塞可以与隔离级别有关，可以采用多版本并发控制（MVCC）来支持高并发</p></li><li><p>存储文件<br> InnoDB表对应两个文件，一个.frm表结构文件，一个.ibd数据文件。InnoDB表最大支持64TB；<br> MyISAM表对应三个文件，一个.frm表结构文件，一个MYD表数据文件，一个.MYI索引文件。从MySQL5.0开始默认限制是256TB。</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/789d8c3ad02743b69ce4123954791b03.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure></li></ul><h3 id="二、myisam-适用场景" tabindex="-1"><a class="header-anchor" href="#二、myisam-适用场景" aria-hidden="true">#</a> 二、MyISAM 适用场景</h3><ul><li><p>不需要事务支持（不支持）</p></li><li><p>并发相对较低（锁定机制问题）</p></li><li><p>数据修改相对较少，以读为主</p></li><li><p>数据一致性要求不高</p></li></ul><h3 id="三、innodb-适用场景" tabindex="-1"><a class="header-anchor" href="#三、innodb-适用场景" aria-hidden="true">#</a> 三、InnoDB 适用场景</h3><ul><li><p>需要事务支持（具有较好的事务特性）</p></li><li><p>行级锁定对高并发有很好的适应能力</p></li><li><p>数据更新较为频繁的场景</p></li><li><p>数据一致性要求较高</p></li><li><p>硬件设备内存较大，可以利用InnoDB较好的缓存能力来提高内存利用率，减少磁盘IO</p></li></ul><h3 id="四、两种引擎该如何选择" tabindex="-1"><a class="header-anchor" href="#四、两种引擎该如何选择" aria-hidden="true">#</a> 四、两种引擎该如何选择？</h3><ul><li>是否需要事务？有，InnoDB</li><li>是否存在并发修改？有，InnoDB</li><li>是否追求快速查询，且数据修改少？是，MyISAM</li><li>在绝大多数情况下，推荐使用InnoDB</li></ul><p>扩展资料：各个存储引擎特性对比</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/2abdf9facc0a46af8b62223bcce85639.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h3 id="五、innodb的三大特征" tabindex="-1"><a class="header-anchor" href="#五、innodb的三大特征" aria-hidden="true">#</a> 五、innoDB的三大特征</h3><p>自适应Hash索引（Adatptive Hash Index，内部简称AHI）是InnoDB的三大特性之一，还有两个是 Buffer Pool简称BP、双写缓冲区（Doublewrite Buffer）。</p><h4 id="_1、自适应索引" tabindex="-1"><a class="header-anchor" href="#_1、自适应索引" aria-hidden="true">#</a> 1、自适应索引</h4><h5 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h5><p>1、自适应即我们不需要自己处理，当InnoDB引擎根据查询统计发现某一查询满足hash索引的数据结构特点，就会给其建立一个hash索引；</p><p>2、hash索引底层的数据结构是散列表（Hash表），其数据特点就是比较适合在内存中使用，自适应Hash索引存在于InnoDB架构中的缓存中（不存在于磁盘架构中），见下面的InnoDB架构图。</p><p>3、自适应hash索引只适合搜索等值的查询，如select * from table where index_col=&#39;xxx&#39;，而对于其他查找类型，如范围查找，是不能使用的；</p><h5 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h5><ul><li>**适合等值查询。**有哈希冲突的情况下,等值查询访问哈希索引的数据非常快.(如果发生Hash冲突,存储引擎必须遍历链表中的所有行指针,逐行进行比较,直到找到所有符合条件的行).</li></ul><h5 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h5><ul><li>不支持排序和范围列查找 <ul><li>不是按照索引值进行存储的，无法用于排序和范围</li></ul></li><li>会出现hash冲突 <ul><li>如果发生Hash冲突,存储引擎必须遍历链表中的所有行指针,逐行进行比较,直到找到所有符合条件的行</li></ul></li></ul><h4 id="_2、buffer-pool" tabindex="-1"><a class="header-anchor" href="#_2、buffer-pool" aria-hidden="true">#</a> 2、buffer pool</h4><h5 id="定义-1" tabindex="-1"><a class="header-anchor" href="#定义-1" aria-hidden="true">#</a> 定义</h5><p>Buffer Pool：缓冲池，简称BP。其作用是用来缓存表数据与索引数据，减少磁盘IO操作，提升效率。</p><p>Buffer Pool由<strong>缓存数据页(Page)</strong> 和 对缓存数据页进行描述的<strong>控制块</strong> 组成, 控制块中存储着对应缓存页的所属的 表空间、数据页的编号、以及对应缓存页在Buffer Pool中的地址等信息.</p><p>Buffer Pool默认大小是128M, 以Page页为单位，Page页默认大小16K，而控制块的大小约为数据页的5%，大 概是800字节。</p><h5 id="如何判断一个页是否在bufferpool中缓存" tabindex="-1"><a class="header-anchor" href="#如何判断一个页是否在bufferpool中缓存" aria-hidden="true">#</a> <strong>如何判断一个页是否在BufferPool中缓存 ?</strong></h5><p>MySQl中有一个哈希表数据结构，它使用表空间号+数据页号，作为一个key，然后缓冲页对应的控制块作为value。</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/79f20665ae0845d08adfbca28d78392c.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><ul><li><strong>当需要访问某个页的数据时，先从哈希表中根据表空间号+页号看看是否存在对应的缓冲页。</strong></li><li><strong>如果有，则直接使用；如果没有，就从free链表中选出一个空闲的缓冲页，然后把磁盘中对应的页加载到该缓冲页的位置</strong></li></ul><h5 id="_3、缓存双写" tabindex="-1"><a class="header-anchor" href="#_3、缓存双写" aria-hidden="true">#</a> 3、缓存双写</h5><p>为了解决写失效问题，InnoDB实现了double write buffer Files, 它位于系统表空间，是一个存储区域。</p><p>在BufferPool的page页刷新到磁盘真正的位置前，会先将数据存在Doublewrite 缓冲区。这样在宕机重启时，如果出现数据页损坏，那么在应用redo log之前，需要通过该页的副本来还原该页，然后再进行redo log重做，double write实现了InnoDB引擎数据页的可靠性.</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672133064003/a31680a18f104e0da3f3cb6c1aa71866.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><ul><li><p><strong>step1</strong>：当进行缓冲池中的脏页刷新到磁盘的操作时,并不会直接写磁盘,每次脏页刷新必须要先写double write .</p></li><li><p><strong>step2</strong>：通过memcpy函数将脏页复制到内存中的double write buffer .</p></li><li><p><strong>step3</strong>: double write buffer再分两次、每次1MB, 顺序写入共享表空间的物理磁盘上, <strong>第一次写</strong>.</p></li><li><p><strong>step4</strong>: 在完成double write页的写入后，再将double wirite buffer中的页写入各个表的<strong>独立表空间</strong>文件中(数据文件 .ibd), <strong>第二次写</strong>。</p></li></ul><h3 id="六、innodb存储引擎支持四种行格式" tabindex="-1"><a class="header-anchor" href="#六、innodb存储引擎支持四种行格式" aria-hidden="true">#</a> 六、InnoDB存储引擎支持四种行格式</h3><ul><li><p>Redundant</p></li><li><p>Compact Compact ：设计目标是高效地存储数据，一个页中存放的行数据越多，其性能就越高。Compact行记录由两部分组成: 记录放入额外信息 和 记录的真实数据.</p></li><li><p>Dynamic</p></li><li><p>Compressed .</p></li></ul><p>InnoDB存储引擎支持四种行格式：Redundant、Compact、Dynamic 和 Compressed .</p><p>查询MySQL使用的行格式,默认为: dynamic</p><h3 id="七、compact-行记录格式" tabindex="-1"><a class="header-anchor" href="#七、compact-行记录格式" aria-hidden="true">#</a> 七、COMPACT 行记录格式</h3><p>Compact 设计目标是高效地存储数据，一个页中存放的行数据越多，其性能就越高。</p><p>Compact行记录由两部分组成: 记录放入额外信息 和 记录的真实数据.</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/55418f9593df402995e37c1b1a0bb05e.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><h5 id="记录额外信息部分" tabindex="-1"><a class="header-anchor" href="#记录额外信息部分" aria-hidden="true">#</a> <strong>记录额外信息部分</strong></h5><p>服务器为了描述一条记录而添加了一些额外信息(元数据信息)，这些额外信息分为3类，分别是: 变长字段长度列表、NULL值列表和记录头信息.</p><ul><li><p><strong>变长字段长度列表</strong></p><p>MySQL支持一些变长的数据类型，比如VARCHAR(M)、VARBINARY(M)、各种TEXT类型，各种BLOB类型，这些变长的数据类型占用的存储空间分为两部分：</p><ol><li>真正的数据内容</li><li>占用的字节数</li></ol><p>变长字段的长度是不固定的，所以在存储数据的时候要把这些数据占用的字节数也存起来，读取数据的时候才能根据这个长度列表去读取对应长度的数据。</p><p>在 <code>Compact</code>行格式中，把所有变长类型的列的长度都存放在记录的开头部位形成一个列表，按照列的顺序逆序存放,这个列表就是 <strong>变长字段长度列表</strong>。</p></li><li><p><strong>NULL值列表</strong></p><p>表中的某些列可能会存储NULL值，如果把这些NULL值都放到记录的真实数据中会比较浪费空间，所以Compact行格式把这些值为NULL的列存储到NULL值列表中。( 如果表中所有列都不允许为 NULL，就不存在NULL值列表 )</p></li><li><h5 id="记录头信息" tabindex="-1"><a class="header-anchor" href="#记录头信息" aria-hidden="true">#</a> <strong>记录头信息</strong></h5><p>记录头信息是由固定的5个字节组成，5个字节也就是40个二进制位，不同的位代表不同的意思，这些头信息会在后面的一些功能中看到。</p><table><thead><tr><th>名称</th><th>大小(单位:bit)</th><th>描述</th></tr></thead><tbody><tr><td>预留位1</td><td>1</td><td>没有使用</td></tr><tr><td>预留位2</td><td>1</td><td>没有使用</td></tr><tr><td>delete_mask</td><td>1</td><td>标记该记录是否被删除</td></tr><tr><td>min_rec_mask</td><td>1</td><td>标记该记录是否是本层B+树的非叶子节点中的最小记录</td></tr><tr><td>n_owned</td><td>4</td><td>表示当前分组中管理的记录数</td></tr><tr><td>heap_no</td><td>13</td><td>表示当前记录在记录堆中的位置信息</td></tr><tr><td>record_type</td><td>3</td><td>表示当前记录的类型:<br>0 表示普通记录,<br>1 表示B+树非叶子节点记录,<br>2 表示最小记录,3表示最大记录</td></tr><tr><td>next_record</td><td>16</td><td>表示下一条记录的相对位置</td></tr></tbody></table></li></ul><ol><li><p>delete_mask</p><p>这个属性标记着当前记录是否被删除，占用1个二进制位，值为0 的时候代表记录并没有被删除，为1 的时候代表记录被删除掉了</p></li><li><p>min_rec_mask</p><p>B+树的每层非叶子节点中的最小记录都会添加该标记。</p></li><li><p>n_owned</p><p>代表每个分组里，所拥有的记录的数量，一般是分组里主键最大值才有的。</p></li><li><p>heap_no</p><p>在数据页的User Records中插入的记录是一条一条紧凑的排列的，这种紧凑排列的结构又被称为堆。为了便于管理这个堆，把记录在堆中的相对位置给定一个编号——heap_no。所以heap_no这个属性表示当前记录在本页中的位置。</p></li><li><p>record_type</p><p>这个属性表示当前记录的类型，一共有4种类型的记录， 0 表示普通用户记录， 1 表示B+树非叶节点记录， 2 表示最小记录， 3 表示最大记录。</p></li><li><p>next_record</p><p>表示从当前记录的真实数据到下一条记录的真实数据的地址偏移量，可以理解为指向下一条记录地址的指针。值为正数说明下一条记录在当前记录后面，为负数说明下一条记录在当前记录的前面。</p></li></ol><h5 id="记录真实数据部分" tabindex="-1"><a class="header-anchor" href="#记录真实数据部分" aria-hidden="true">#</a> <strong>记录真实数据部分</strong></h5><p>记录的真实数据除了插入的那些列的数据，MySQL会为每个记录默认的添加一些列（也称为隐藏列），具体的列如下：</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1607287731925286912/4b5476f2251b45939db29cfb4a7198cc.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><table><thead><tr><th>列名</th><th>是否必须</th><th>占用空间</th><th>描述</th></tr></thead><tbody><tr><td>row_id</td><td>否</td><td>6字节</td><td>行ID,唯一标识一条记录</td></tr><tr><td>transaction_id</td><td>是</td><td>6字节</td><td>事务ID</td></tr><tr><td>roll_pointer</td><td>是</td><td>7字节</td><td>回滚指针</td></tr></tbody></table><p>生成隐藏主键列的方式有:</p><ol><li>服务器会在内存中维护一个全局变量，每当向某个包含隐藏的row_id列的表中插入一条记录时，就会把该变量的值当作新记录的row_id列的值，并且把该变量自增1。</li><li>每当这个变量的值为256的倍数时，就会将该变量的值刷新到系统表空间的页号为7的页面中一个Max Row ID的属性处。</li><li>当系统启动时，会将页中的Max Row ID属性加载到内存中，并将该值加上256之后赋值给全局变量，因为在上次关机时该全局变量的值可能大于页中Max Row ID属性值。</li></ol><h4 id="什么是行溢出" tabindex="-1"><a class="header-anchor" href="#什么是行溢出" aria-hidden="true">#</a> 什么是行溢出 ?</h4><p>MySQL中是以页为基本单位,进行磁盘与内存之间的数据交互的,我们知道一个页的大小是16KB,16KB = 16384字节.而一个varchar(m) 类型列最多可以存储65532个字节,一些大的数据类型比如TEXT可以存储更多.</p><p>如果一个表中存在这样的大字段,那么一个页就无法存储一条完整的记录.这时就会发生行溢出,多出的数据就会存储在另外的溢出页中.</p><p>总结: 如果某些字段信息过长，无法存储在B树节点中，这时候会被单独分配空间，此时被称为溢出页，该字段被称为页外列。</p><h4 id="compact中的行溢出机制" tabindex="-1"><a class="header-anchor" href="#compact中的行溢出机制" aria-hidden="true">#</a> Compact中的行溢出机制</h4><p>InnoDB 规定一页至少存储两条记录(B+树特点)，如果页中只能存放下一条记录，InnoDB存储引擎会自动将行数据存放到溢出页中.<br> 当发生行溢出时，数据页只保存了前768字节的前缀数据，接着是20个字节的偏移量，指向行溢出页.</p><figure><img src="https://fynotefile.oss-cn-zhangjiakou.aliyuncs.com/fynote/fyfile/16657/1672133064003/0dcc99e8c9ac4b4e92d2fc2cefef9398.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>',62),d=[r];function o(l,p){return i(),e("div",null,d)}const c=a(n,[["render",o],["__file","basic11、innoDB和MyISAM.html.vue"]]);export{c as default};
