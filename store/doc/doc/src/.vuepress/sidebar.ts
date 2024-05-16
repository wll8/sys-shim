import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "入门指南",
      collapsible: true,
      prefix: "docs/getting-started/",
      children: [
        {
          text: `简介`,
          link: `introduction`,
        },
        {
          text: `您的第一个应用`,
          link: `your-first-app`,
        },
        {
          text: `常见问答(FAQ)`,
          link: `faq`,
        },
      ],
    },
    {
      text: "原生 API",
      collapsible: true,
      prefix: "docs/api/",
      children: [
        {
          text: `概览`,
          collapsible: true,
          link: "overview",
        },
        {
          text: `fsys`,
          collapsible: true,
          prefix: "fsys/",
          children: `structure`,
        },
        {
          text: `sys`,
          collapsible: true,
          prefix: "sys/",
          children: `structure`,
        },
        {
          text: `win`,
          collapsible: true,
          prefix: "win/",
          children: `structure`,
        },
        {
          text: `inet`,
          collapsible: true,
          prefix: "inet/",
          children: `structure`,
        },
      ]
    },
    {
      text: "三方 API",
      collapsible: true,
      children: [
        {
          text: "neutralinojs",
          collapsible: true,
          prefix: "docs/neutralinojs/api/",
          children: `structure`,
        },
      ],
    },
    {
      text: "命令行",
      collapsible: true,
      children: [
        {
          text: "sys-shim",
          collapsible: true,
          link: `docs/cli/sys-shim`,
        },
        {
          text: "main.exe",
          collapsible: true,
          link: `docs/cli/main`,
        },
      ],
    },
  ],
});
