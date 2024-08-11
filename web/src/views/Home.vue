<template>
    <div class="container">
        <div class="block text-center">
            <el-carousel height="calc(100vh - 60px)" motion-blur>
                <el-carousel-item :key="1">
                   <div :style="{backgroundImage:`url('${png1}')`}"></div>
                </el-carousel-item>
                <el-carousel-item :key="2">
                   <div :style="{backgroundImage:`url(${png2})`}"></div>
                </el-carousel-item>
            </el-carousel>
            <div class="title">Welcome</div>
        </div>
    </div>
</template>

<script setup>
import png1 from '@/assets/home1.png'
import png2 from '@/assets/home2.png'
console.log(png1)
</script>

<style scoped lan="scss">
.el-carousel div{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.container{
    position: relative;
}
.title{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color:white ;
    text-align: center;
}
</style>