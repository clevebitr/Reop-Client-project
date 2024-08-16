<template>
    <div>
        <!-- <p class="text-center demonstration">normal vertical layout</p> -->
        <el-carousel height="calc(100vh - 60px)" direction="vertical" :autoplay="false" v-if="looplist.length" motion-blur="true">
            <el-carousel-item v-for="item in looplist" :key="item.id">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>{{item.title}}</span>
                            </div>
                        </template>
                        <p >{{ item.summary }}</p>
                        <p class="introduction">{{ item.introduction }}</p>
                        <template #footer>更多信息，请访问：<br>
                            http://123123.com
                        </template>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>
        <el-empty description="暂无产品" v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios';

const looplist = ref([])


onMounted(async () => {
    const res = await axios.get("http://localhost:3000/webapi/product/list")
    // console.log(res.data.data[0].title)
    looplist.value = res.data.data
})

</script>

<style scoped lang="scss">
.item {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card{
    width: 30%;
    height: 100%;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
    .introduction{
        margin-top: 20px;
    }
}
</style>