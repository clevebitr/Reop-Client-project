<template>
    <el-aside :width="$store.state.isCollapsed?'64px':'200px'">
        <!-- collapse是否折叠 collapse-transition折叠动画 router根index跳转路径 default-active根据当前路径高亮-->
        <el-menu
        :collapse="$store.state.isCollapsed"
        :collapse-transition="false"
        :router="true"
        :default-active="route.fullPath"
        >

            <!-- 首页 -->
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>

            <!-- 个人中心 -->
            <el-menu-item index="/center">
                <el-icon><avatar /></el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <!-- 用户管理 -->
            <el-sub-menu index="/user-manage">
                <template #title>
                    <el-icon><user-filled /></el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item index="/user-manage/add">添加用户</el-menu-item>
                <el-menu-item index="/user-manage/list">用户列表</el-menu-item>
            </el-sub-menu>

            <!-- 新闻管理 -->
            <el-sub-menu index="/news-manage">
                <template #title>
                    <el-icon><message-box /></el-icon>
                    <span>新闻管理</span>
                </template>
                <el-menu-item index="/news-manage/add">创建新闻</el-menu-item>
                <el-menu-item index="/news-manage/list">新闻列表</el-menu-item>
            </el-sub-menu>

            <!-- 产品管理 -->
            <el-sub-menu index="/product-manage">
                <template #title>
                    <el-icon><reading /></el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item index="/product-manage/add">添加产品</el-menu-item>
                <el-menu-item index="/product-manage/list">产品列表</el-menu-item>
            </el-sub-menu>

        </el-menu>
    </el-aside>

</template>

<script setup>
 import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'//导入icon
 import { useRoute } from 'vue-router';//获取当前页面路径

 const route = useRoute()
</script>

<style lang="scss" scoped>
.el-aside {
    height: 100vh;

    .el-menu{
        height: 100vh;
    }
}
</style>