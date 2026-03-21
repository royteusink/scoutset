import type { ElectrobunConfig } from 'electrobun';

const bundleCEF = false; // Bundle Chromium Embedded Framework instead of using system WebView

export default {
  app: {
    name: 'scoutset',
    identifier: 'com.scoutset.app',
    version: '0.0.1',
  },
  build: {
    bun: {
      entrypoint: 'src/bun/index.ts',
    },
    views: {
      mainview: {
        entrypoint: 'src/mainview/dist/assets/index.js',
      },
    },
    copy: {
      'src/mainview/dist/index.html': 'views/mainview/index.html',
      'src/mainview/dist/assets/': 'views/mainview/assets/',
    },
    mac: {
      bundleCEF, // Bundle CEF (Chromium Embedded Framework) instead of using system WebView
      defaultRenderer: bundleCEF ? 'cef' : 'native', // Default renderer for webviews when not explicitly specified
    },
  },
} satisfies ElectrobunConfig;
