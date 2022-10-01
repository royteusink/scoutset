import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/style.css';
// import './samples/node-api'

import App from '@/App.vue';
import Explorer from '@/screens/Explorer.vue';
import Settings from '@/screens/Settings.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Explorer },
    { path: '/settings', component: Settings },
  ],
});

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  });
