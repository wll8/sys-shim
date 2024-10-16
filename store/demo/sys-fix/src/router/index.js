import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ScanIng',
      name: 'ScanIng',
      component: () => import('../views/ScanIng.vue')
    },
    {
      path: '/ScanRes',
      name: 'ScanRes',
      component: () => import('../views/ScanRes.vue')
    },
    {
      path: '/FixIng',
      name: 'FixIng',
      component: () => import('../views/FixIng.vue')
    },
    {
      path: '/DoFix',
      name: 'DoFix',
      component: () => import('../views/DoFix.vue')
    },
  ]
})

export default router
