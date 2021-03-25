import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '@/views/Main'
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/about',
    name: 'About',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
