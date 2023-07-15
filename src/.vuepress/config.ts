import {defineUserConfig} from "vuepress";
import theme from "./theme.js";


export default defineUserConfig({
  base: "/orderlines_blog/",

  locales: {
    "/zh/": {
      lang: "zh-CN",
      title: "ORDERLINES",
      description: "让流程井然有序",
    },
    "/": {
      lang: "en-US",
      title: "ORDERLINES",
      description: "Keep the process organized",
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
});
