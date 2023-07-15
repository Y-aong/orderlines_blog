import {navbar} from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      {
        text: "redis",
        icon: "pen-to-square",
        prefix: "mysql/",
        children: [
          {text: "苹果1", icon: "pen-to-square", link: "1"},
          {text: "苹果2", icon: "pen-to-square", link: "2"},
        ],
      },
      {
        text: "mysql",
        icon: "pen-to-square",
        prefix: "redis/",
        children: [
          {
            text: "香蕉 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "pen-to-square",
            link: "2",
          },
        ],
      },
    ],
  },
]);
