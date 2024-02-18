import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('@/views/home/index.vue'),
    },
  ],
  history: createWebHashHistory(),
})
