import {navbar} from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "Apple",
        icon: "pen-to-square",
        prefix: "mysql/",
        children: [
          {text: "Apple1", icon: "pen-to-square", link: "1"},
          {text: "Apple2", icon: "pen-to-square", link: "2"},
        ],
      },
      {
        text: "Banana",
        icon: "pen-to-square",
        prefix: "redis/",
        children: [
          {
            text: "Banana 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "Banana 2",
            icon: "pen-to-square",
            link: "2",
          },
        ],
      },
    ],
  },
]);
