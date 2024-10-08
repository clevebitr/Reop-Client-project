import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Product from '../views/Product.vue'
import New from '@/views/New.vue'
import NProgress from 'nprogress'  
import 'nprogress/nprogress.css'  

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/news/:id',
    name: 'new',
    component: New
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//加载进度条
router.beforeEach((to,from,next)=>{
  NProgress.start();
  next()
})

router.afterEach((to,from)=>{
  NProgress.done();
})

export default router
