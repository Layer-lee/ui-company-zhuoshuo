import { createRouter, createWebHistory } from 'vue-router'

// 页面路由
import HomePage from '../views/HomePage.vue'
import ProjectList from '../views/ProjectList.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/about-detail',
    name: 'AboutDetail',
    component: () => import('@/views/AboutDetail.vue'),
  },
  {
    path: '/projects',
    name: 'ProjectList',
    component: ProjectList,
  },
  {
    path: '/project/:id',
    name: 'ProjectDetail',
    component: () => import('@/views/ProjectDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        offset: { y: -80 }, // 根据header高度调整
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from, next) => {
  if (from.meta.saveScrollPosition) {
    sessionStorage.setItem(`${from.path}-scroll`, window.scrollY)
  }
  next()
})

// 恢复滚动位置
router.afterEach((to, from) => {
  if (to.meta.restoreScrollPosition) {
    const scrollY = Number(sessionStorage.getItem(`${to.path}-scroll`)) || 0
    setTimeout(() => {
      window.scrollTo({
        top: scrollY,
        behavior: 'auto',
      })
    }, 100)
  }
})

export default router
