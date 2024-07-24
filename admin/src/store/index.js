import { createStore } from 'vuex'

export default createStore({
    state:{
        isGetterRouter:false
    },
    gettrts:{
    },
    mutations:{
        changeGetterRouter(state,value){
            state.isGetterRouter = value
        }
    },
    actions:{
    },
    modules:{
    }
})