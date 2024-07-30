/**
 * 批量引入路由
 */
import Home from '../views/home/Home.vue'
import Center from '@/views/client/Center.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import NewsAdd from '@/views/news-manage/NewsAdd.vue'
import NewsList from '@/views/news-manage/NewsList.vue'
import ProductAdd from '@/views/product-manage/ProductAdd.vue'
import ProductList from '@/views/product-manage/ProductList.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
    {
        path:"/index",
        component:Home
    },
    {
        path:"/center",
        component:Center
    },
    {
        path:"/user-manage/add",
        component:UserAdd,
        requireAdmin:true
    },
    {
        path:"/user-manage/list",
        component:UserList,
        requireAdmin:true
    },
    {
        path:"/news-manage/add",
        component:NewsAdd
    },
    {
        path:"/news-manage/list",
        component:NewsList
    },
    {
        path:"/product-manage/add",
        component:ProductAdd
    },
    {
        path:"/product-manage/list",
        component:ProductList
    },
    {
        path:"/",
        redirect:"/index"
    },
    {
        path:"/:pathMatch(.*)*",
        name:"Notfound",
        component:NotFound
    }
]

export default routes