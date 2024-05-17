import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/FixIng',
      name: 'FixIng',
      component: () => import('../views/FixIng.vue')
    },
    {
      path: '/FixRes',
      name: 'FixRes',
      component: () => import('../views/FixRes.vue')
    },
  ]
})

export default router
