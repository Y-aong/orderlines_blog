const t=JSON.parse('{"key":"v-733a551b","path":"/posts/%E7%AE%97%E6%B3%95%E7%AC%94%E8%AE%B0/%E7%AE%97%E6%B3%95%E6%8A%80%E5%B7%A7/%E5%8F%8C%E6%8C%87%E9%92%88/%E4%BA%8C%E5%88%86%E6%90%9C%E7%B4%A2/1%E3%80%81%E4%BA%8C%E5%88%86%E6%90%9C%E7%B4%A2%E4%B8%AA%E4%BA%BA%E6%80%BB%E7%BB%93.html","title":"1、二分搜索个人总结","lang":"en-US","frontmatter":{"icon":"pen-to-square","date":"2024-04-17T00:00:00.000Z","category":["算法笔记","左右指针"],"tag":["双指针"],"star":true,"description":"1、二分搜索个人总结 一、二分查找定义 二分查找的基本思想是很简单的可能很多小学生都可以思考出来，但是实际去 写又会遇到很多问题。因为里面有很多细节需要注意。一不小心就会写失败。 二分查找的基本算法思想为：通过确定目标元素所在的区间范围，反复将查找范围减半，直到找到元素或找不到该元素为止。 二、二分查找的算法步骤 初始化：首先，确定要查找的有序数据集合。可以是一个数组或列表，确保其中的元素按照升序或者降序排列。 确定查找范围：将整个有序数组集合的查找范围确定为整个数组范围区间，即左边界 left 和右边界 right。 计算中间元素：根据 mid=⌊(left+right)/2⌋ 计算出中间元素下标位置 mid。 比较中间元素：将目标元素target 与中间元素 nums[mid]进行比较： target == nums[mid]找到目标索引 target &lt; nums[mid]目标位置在[left, mid-1], right=mid-1 target &gt; nums[mid]目标位置在[mid+1, right],left=mid+1","head":[["meta",{"property":"og:url","content":"https://y-aong.github.io/orderlines_blog/orderlines_blog/posts/%E7%AE%97%E6%B3%95%E7%AC%94%E8%AE%B0/%E7%AE%97%E6%B3%95%E6%8A%80%E5%B7%A7/%E5%8F%8C%E6%8C%87%E9%92%88/%E4%BA%8C%E5%88%86%E6%90%9C%E7%B4%A2/1%E3%80%81%E4%BA%8C%E5%88%86%E6%90%9C%E7%B4%A2%E4%B8%AA%E4%BA%BA%E6%80%BB%E7%BB%93.html"}],["meta",{"property":"og:site_name","content":"ORDERLINES"}],["meta",{"property":"og:title","content":"1、二分搜索个人总结"}],["meta",{"property":"og:description","content":"1、二分搜索个人总结 一、二分查找定义 二分查找的基本思想是很简单的可能很多小学生都可以思考出来，但是实际去 写又会遇到很多问题。因为里面有很多细节需要注意。一不小心就会写失败。 二分查找的基本算法思想为：通过确定目标元素所在的区间范围，反复将查找范围减半，直到找到元素或找不到该元素为止。 二、二分查找的算法步骤 初始化：首先，确定要查找的有序数据集合。可以是一个数组或列表，确保其中的元素按照升序或者降序排列。 确定查找范围：将整个有序数组集合的查找范围确定为整个数组范围区间，即左边界 left 和右边界 right。 计算中间元素：根据 mid=⌊(left+right)/2⌋ 计算出中间元素下标位置 mid。 比较中间元素：将目标元素target 与中间元素 nums[mid]进行比较： target == nums[mid]找到目标索引 target &lt; nums[mid]目标位置在[left, mid-1], right=mid-1 target &gt; nums[mid]目标位置在[mid+1, right],left=mid+1"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-03-17T09:50:53.000Z"}],["meta",{"property":"article:author","content":"Y-aong"}],["meta",{"property":"article:tag","content":"双指针"}],["meta",{"property":"article:published_time","content":"2024-04-17T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-17T09:50:53.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"1、二分搜索个人总结\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-17T00:00:00.000Z\\",\\"dateModified\\":\\"2025-03-17T09:50:53.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Y-aong\\",\\"url\\":\\"https://github.com/Y-aong\\"}]}"]]},"headers":[{"level":3,"title":"一、二分查找定义","slug":"一、二分查找定义","link":"#一、二分查找定义","children":[]},{"level":3,"title":"二、二分查找的算法步骤","slug":"二、二分查找的算法步骤","link":"#二、二分查找的算法步骤","children":[]},{"level":3,"title":"三、二分查找中的注意点","slug":"三、二分查找中的注意点","link":"#三、二分查找中的注意点","children":[]},{"level":3,"title":"三、经典例题","slug":"三、经典例题","link":"#三、经典例题","children":[]}],"git":{"createdTime":1742205053000,"updatedTime":1742205053000,"contributors":[{"name":"Y-aong","email":"1627469727@qq.com","commits":1}]},"readingTime":{"minutes":8.74,"words":2622},"filePathRelative":"posts/算法笔记/算法技巧/双指针/二分搜索/1、二分搜索个人总结.md","localizedDate":"April 17, 2024","excerpt":"<h1> 1、二分搜索个人总结</h1>\\n<h3> 一、二分查找定义</h3>\\n<p>二分查找的基本思想是很简单的可能很多小学生都可以思考出来，但是实际去 写又会遇到很多问题。因为里面有很多细节需要注意。一不小心就会写失败。</p>\\n<p>二分查找的基本算法思想为：通过确定目标元素所在的区间范围，反复将查找范围减半，直到找到元素或找不到该元素为止。</p>\\n<h3> 二、二分查找的算法步骤</h3>\\n<ol>\\n<li><strong>初始化</strong>：首先，确定要查找的有序数据集合。可以是一个数组或列表，确保其中的元素按照升序或者降序排列。</li>\\n<li><strong>确定查找范围</strong>：将整个有序数组集合的查找范围确定为整个数组范围区间，即左边界 left 和右边界 right。</li>\\n<li><strong>计算中间元素</strong>：根据 mid=⌊(left+right)/2⌋ 计算出中间元素下标位置 <strong>mid</strong>。</li>\\n<li><strong>比较中间元素</strong>：将目标元素target 与中间元素 nums[mid]进行比较：\\n<ul>\\n<li><code>target == nums[mid]</code>找到目标索引</li>\\n<li><code>target &lt; nums[mid]</code>目标位置在[left, mid-1], right=mid-1</li>\\n<li><code>target &gt; nums[mid]</code>目标位置在[mid+1, right],left=mid+1</li>\\n</ul>\\n</li>\\n</ol>","autoDesc":true}');export{t as data};
