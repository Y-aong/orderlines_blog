import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o,c as d,a,b as e,d as l,e as r}from"./app-2d0f66e1.js";const h={},s=r('<h1 id="_12、聚簇索引和非聚簇索引" tabindex="-1"><a class="header-anchor" href="#_12、聚簇索引和非聚簇索引" aria-hidden="true">#</a> 12、聚簇索引和非聚簇索引</h1><h3 id="一、答题思路" tabindex="-1"><a class="header-anchor" href="#一、答题思路" aria-hidden="true">#</a> 一、答题思路</h3><ul><li><p>分别解释聚簇索引和非聚簇索引</p></li><li><p>聚簇索引的特点（优点）和使用场景</p></li><li><p>聚簇索引的缺点</p></li><li><p>使用案例</p></li></ul><h3 id="二、聚簇索引" tabindex="-1"><a class="header-anchor" href="#二、聚簇索引" aria-hidden="true">#</a> 二、聚簇索引</h3>',4),c={href:"https://cloud.tencent.com/product/cdcs?from=20065&from_column=20065",target:"_blank",rel:"noopener noreferrer"},p=r('<p>辅助索引：叶子节点存储的是聚簇索引的主键值，寻找数据需要先找到主键值在找到数据</p><p>误区：<strong>主键自动设为聚簇索引</strong></p><p><strong>聚簇索引默认是主键</strong>，如果表中没有定义主键，InnoDB 会选择一个<strong>唯一的非空索引</strong>代替。如果没有这样的索引，InnoDB 会<strong>隐式定义一个主键</strong>来作为聚簇索引。</p><p><strong>如果你已经设置了主键为聚簇索引，必须先删除主键，然后添加我们想要的聚簇索引，最后恢复设置主键即可</strong>。</p><p>结合图例</p><figure><img src="https://ask.qcloudimg.com/http-save/yehe-2823867/2q05hsflfa.jpeg" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><h3 id="三、非聚簇索引" tabindex="-1"><a class="header-anchor" href="#三、非聚簇索引" aria-hidden="true">#</a> 三、非聚簇索引</h3><p>MyISAM 使用的是非聚簇索引。MyISAM 将数据和索引分开存储，表数据存储在独立的地方，这两颗 B+树的叶子节点都使用一个地址指向真正的表数据。他的主键索引和辅助索引是相互独立的，可以通过辅助键来获取数据，不需要访问主键的索引树</p><h3 id="四、聚簇索引的优点" tabindex="-1"><a class="header-anchor" href="#四、聚簇索引的优点" aria-hidden="true">#</a> 四、聚簇索引的优点</h3><ul><li><p>行数据和索引放在一起，使用聚簇索引的时候一次性可以将数据取出，减少了 io 次数，查询会更加快</p></li><li><p>适合排序，聚簇索引不适合</p></li><li><p>范围性数据聚簇索引会更加适合</p></li></ul><h3 id="五、聚簇索引的缺点" tabindex="-1"><a class="header-anchor" href="#五、聚簇索引的缺点" aria-hidden="true">#</a> 五、聚簇索引的缺点</h3><ul><li><p>维护聚簇索引的成本比较昂贵，在插入新行时或者主键被更新时。新的记录可能会插入到记录的中间，需要强制移动之前的记录</p></li><li><p>如果主键比较大的话，那辅助索引将会变的更大</p></li><li><p>使用 uuid 等随机数作为主键索引，可能数据比较稀疏，可能造成查询比较慢</p></li></ul><h3 id="六、使用场景" tabindex="-1"><a class="header-anchor" href="#六、使用场景" aria-hidden="true">#</a> 六、使用场景</h3><p>在设计工作流流程中存在一个自增长的主键 id 还有一个随机数的流程 id</p>',14);function _(u,f){const i=t("ExternalLinkIcon");return o(),d("div",null,[s,a("p",null,[e("聚簇索引：将"),a("a",c,[e("数据存储"),l(i)]),e("与索引放到了一块，找到索引也就找到了数据，一般在 innodb 存储引擎中。也是由于聚簇索引将数据和索引放在一起，因此一个表中只有一个聚簇索引。")]),p])}const x=n(h,[["render",_],["__file","interview1、聚簇索引和非聚簇索引.html.vue"]]);export{x as default};
