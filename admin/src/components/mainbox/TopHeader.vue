<template>
    <el-header>
        <div class="left">
            <el-icon size="23" @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left: 10px;">管理系统</span>
        </div>
        <div class="right">
            <span>欢迎 {{store.state.userInfo.uname }} 回来</span>
            <el-dropdown>
                <span style="margin-left: 10px;">
                    <el-icon :size="25" color="white"><User /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>

</template>

<script setup>
import { Menu,User } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()

const handleCollapsed = () => {
    store.commit('changeCollapsed')
}

const handleCenter = ()=>{
    router.push("/center")
}

const handleLogout = ()=>{
    localStorage.removeItem('token')
    store.commit("clearUserInfo")
    router.push("/login")
}
</script>

<style lang="scss">
.el-header{
    background-color:#2b3a4c;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,.right{
    display: flex;
}

.left{
    i{
        margin:auto;
        cursor:Pointer;
    }
}

.right{
    .el-dropdown{
        margin:auto;
    }
}
</style>