import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/Home')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./views/Auth')
  },
  {
    path: '/:id',
    name: 'donate',
    component: () => import('./views/Donate')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('./views/Test')
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router