import type { ElectrobunConfig } from "electrobun";

export default {
  app: {
    name: "scoutset",
    identifier: "com.scoutset.app",
    version: "0.0.1",
  },
  build: {
    bun: {
      entrypoint: "src/bun/index.ts",
    },
    views: {
      mainview: {
        entrypoint: "src/mainview/dist/assets/index.js",
      },
    },
    copy: {
      "src/mainview/dist/index.html": "views/mainview/index.html",
      "src/mainview/dist/assets/": "views/mainview/assets/",
    },
    mac: {
      bundleCEF: false,
    },
  },
} satisfies ElectrobunConfig;
