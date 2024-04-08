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
      // 算法笔记
      {
        text: "算法笔记",
        icon: "pen-to-square",
        prefix: "算法笔记/",
        children: [
          {
            text: "经典问题",
            icon: "pen-to-square",
            prefix: "经典问题/",
            children: [],
          },
          {
            text: "算法技巧",
            icon: "pen-to-square",
            prefix: "算法技巧/",
            children: [],
          },
          {
            text: "数据结构",
            icon: "pen-to-square",
            prefix: "数据结构/",
            children: [],
          },
        ],
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
        children: [
          {
            text: "flask源码分析",
            icon: "pen-to-square",
            prefix: "redis/",
            children: [],
          },
          {
            text: "robotframework源码分析",
            icon: "pen-to-square",
            prefix: "mysql/",
            children: [],
          },
        ],
      },
      // 中间件
      {
        text: "中间件",
        icon: "pen-to-square",
        prefix: "中间件/",
        children: [
          {
            text: "redis",
            icon: "pen-to-square",
            prefix: "redis/",
            children: [],
          },
          {
            text: "mysql",
            icon: "pen-to-square",
            prefix: "mysql/",
            children: [],
          },
          // k8s
          {
            text: "k8s",
            icon: "pen-to-square",
            prefix: "k8s/",
            children: [],
          },
        ],
      },
      // python
      {
        text: "python",
        icon: "pen-to-square",
        prefix: "python/",
        children: [
          {
            text: "进阶用法",
            icon: "pen-to-square",
            prefix: "进阶用法/",
            children: [],
          },
          {
            text: "python框架",
            icon: "pen-to-square",
            prefix: "python框架/",
            children: [],
          },
          {
            text: "网络协议",
            icon: "pen-to-square",
            prefix: "网络协议/",
            children: [],
          },
          {
            text: "python其他",
            icon: "pen-to-square",
            prefix: "python其他/",
            children: [],
          },
        ],
      },
    ],
  },
]);
