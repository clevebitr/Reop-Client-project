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
        changeGetterRouter(state,value){
            state.isGetterRouter = value
        },
        //侧边栏
        changeCollapsed(state){
            state.isCollapsed = !state.isCollapsed
        },
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