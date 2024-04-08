import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

import theme from "./theme.js";


export default defineUserConfig({
  base: "/orderlines_blog/",
  locales: {
    "/": {
      lang: "en-US",
      title: "ORDERLINES",
      description: "个人博客",
    },

  },
  theme,
  // 加载网络图片
  head: [
    [
      "meta",
      {
        name: "referrer",
        content: "no-referrer"
      }
    ],
  ],
  plugins: [
    searchProPlugin({
      customFields: [
        {
          getter: (page: any) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
          },
        },
        {
          getter: (page: any) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
          },
        },
      ],
    }),
  ],
});
