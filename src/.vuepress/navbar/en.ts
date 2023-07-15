import {navbar} from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
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
      {
        text: "python闭包",
        icon: "pen-to-square",
        prefix: "python闭包/",
        children: [],
      },
      {
        text: "python迭代器和生成器",
        icon: "pen-to-square",
        prefix: "python迭代器和生成器/",
        children: [],
      },
      {
        text: "python多线程和协程",
        icon: "pen-to-square",
        prefix: "python多线程和协程/",
        children: [],
      },
      {
        text: "python其他",
        icon: "pen-to-square",
        prefix: "python其他/",
        children: [],
      },
      {
        text: "python设计模式",
        icon: "pen-to-square",
        prefix: "python设计模式/",
        children: [],
      },
      {
        text: "python设计模式",
        icon: "pen-to-square",
        prefix: "python设计模式/",
        children: [],
      },
      {
        text: "网络协议",
        icon: "pen-to-square",
        prefix: "网络协议/",
        children: [],
      }
    ]
  },
]);
