import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state:{
        isGetterRouter:false,
        isCollapsed:false,
        userInfo:{}
    },
    gettrts:{
    },
    mutations:{
        //第一次访问路由时生成路由
        changeGetterRouter(state,value){
            state.isGetterRouter = value
        },
        //侧边栏
        changeCollapsed(state){
            state.isCollapsed = !state.isCollapsed
        },
        //用户信息
        changeUserInfo(state,value){
            state.userInfo = {
                ... state.userInfo,
                ... value
            }
        },
        clearUserInfo(state){
            state.userInfo = {}
        }
    },
    actions:{
    },
    modules:{
    },
    plugins: [createPersistedState({
        paths:["isCollapsed","userInfo"]
    })],
})