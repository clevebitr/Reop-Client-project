<template>
    <div class="navbar">
        <el-menu 
        :default-active="route.fullPath" 
        class="el-menu-demo" 
        mode="horizontal" 
        :router="true">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/news">新闻</el-menu-item>
            <el-menu-item index="/product">产品与服务</el-menu-item>
            <el-menu-item index="" @click="handleClick">登录</el-menu-item>
            <el-menu-item index="3" disabled>XXX网站</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute()

const handleClick = () =>{
    window.location = 'http://localhost:5173/login/'
}
</script>

<style lang="scss" scoped>
.navbar{
    position: sticky;
    top:0px;
    z-index: 10;
}
</style>