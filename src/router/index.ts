import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

// TODO: do more dynamic routing so I dont have hunderds of view templates

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/audio-apps',
      name: 'audio',
      component: () => import('@/views/AudioView.vue'),
    },
    {
      path: '/creative-coding',
      name: 'creative',
      component: () => import('@/views/CreativeView.vue'),
    },
    {
      path: '/components',
      name: 'components',
      component: () => import('@/views/ComponentsView.vue'),
    },
    {
      path: '/animations',
      name: 'animations',
      component: () => import('@/views/AnimationView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
  ],
})

export default router
