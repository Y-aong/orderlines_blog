import {defineUserConfig} from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/orderlines_blog/",

  locales: {
    "/": {
      lang: "en-US",
      title: "ORDERLINES",
      description: "Keep the process organized",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "ORDERLINES",
      description: "让流程井然有序",
    },
  },

  theme,
});
