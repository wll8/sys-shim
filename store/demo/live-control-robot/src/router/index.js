import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: `/`,
      component: () => import(`@/views/page0/index.vue`),
    },
    {
      path: `/page1`,
      component: () => import(`@/views/page1/index.vue`),
    },
    {
      path: `/page2`,
      component: () => import(`@/views/page2/index.vue`),
    },
    {
      path: `/page3`,
      component: () => import(`@/views/page3/index.vue`),
    },
    {
      path: `/page4`,
      component: () => import(`@/views/page4/index.vue`),
    },
  ],
})

export default router
