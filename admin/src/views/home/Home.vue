<!-- home模块 -->

<template>
  <el-page-header icon="" title="管理系统">
    <template #content>
      <span class="text-large font-600 mr-3"> 首页 </span>
    </template>
  </el-page-header>
  <el-card>
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 100px;">欢迎回来,{{store.state.userInfo.uname}}。{{welcomeText}}</h3>
        </el-col>
      </el-row>
  </el-card>

  <el-card>
    <template #header>
      <div class="card-header">
        <span>产品</span>
      </div>
    </template>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script setup>
import { useStore } from 'vuex';
import {computed} from 'vue'

const store = useStore();
console.log(store.state)//当前存储的store数据

//用户头像
const avatarUrl = computed(()=>store.state.userInfo.avatar?'http://localhost:3000/' + store.state.userInfo.avatar:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const welcomeText = computed(()=>new Date().getHours<12?'开心每一天':'你可能有点累了，喝杯咖啡提提神吧')//上午，下午显示不同的问候语
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>