import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import ConfigRoutes from '@/router/config'
import store from '@/store/index'

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path:"/mainbox",
    name:"mainbox",
    component:MainBox
  }
]

const router = createRouter({
  history:createWebHistory(),
  routes
})



//跳转之前
router.beforeEach((to,from,next)=>{
  if (to.name == "login") {
    next()
  }else{
    //未授权重定向到login
    if (!localStorage.getItem("token")) {
      next({
        path:"/login"
      })
    }else{
      //放行
      if (!store.state.isGetterRouter) {//是否第一次创建路由
        ConfigRouter()
        next({
          path:to.fullPath
        })
      }else{
        next()
      }
    }
  }
})

const ConfigRouter = () =>{
  //动态路由
  ConfigRoutes.forEach(item=>{
    router.addRoute('mainbox',item)
  })

  //更改状态
  store.commit("changeGetterRouter",true)
}


export default router
