import { createRouter, createWebHistory } from 'vue-router'
import InteractiveMap from '@/views/InteractiveMap.vue'
import GeographicMap from '@/views/GeographicMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'InteractiveMap',
      component: InteractiveMap,
    },
    {
      path: '/geographic',
      name: 'GeographicMap',
      component: GeographicMap,
      props: route => ({ district: route.query.district }),
    },
  ]
})

export default router
