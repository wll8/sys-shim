import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'

export default createRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/home/:data',
      component: Home,
    },
  ],
  history: createWebHashHistory(),
})
