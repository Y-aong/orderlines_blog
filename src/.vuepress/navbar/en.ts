import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "目录",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      // 代码风格
      {
        text: "代码风格",
        icon: "pen-to-square",
        prefix: "代码风格/",
        children: [],
      },
      {
        text: "模块设计",
        icon: "pen-to-square",
        prefix: "模块设计/",
        children: [],
      },
      // 算法笔记
      {
        text: "算法笔记",
        icon: "pen-to-square",
        prefix: "算法笔记/",
        children: [],
      },
      // 设计模式
      {
        text: "设计模式",
        icon: "pen-to-square",
        prefix: "设计模式/",
        children: [],
      },
      // 源码分析
      {
        text: "源码分析",
        icon: "pen-to-square",
        prefix: "源码分析/",
        children: []
         
      },
      // Devops
      {
        text: "Devops",
        icon: "pen-to-square",
        prefix: "Devops/",
        children: [],
      },
      // Kubernetes
      {
        text: "Kubernetes",
        icon: "pen-to-square",
        prefix: "Kubernetes/",
        children: [],
      },
      // Mysql
      {
        text: "Mysql",
        icon: "pen-to-square",
        prefix: "Mysql/",
        children: [],
      },
      // Redis
      {
        text: "Redis",
        icon: "pen-to-square",
        prefix: "Redis/",
        children: [],
      },
      // Vue学习
      {
        text: "VUE",
        icon: "pen-to-square",
        prefix: "VUE/",
        children: [],
      },
      // python
      {
        text: "python",
        icon: "pen-to-square",
        prefix: "python/",
        children: [],
      },
    ],
  },
]);
