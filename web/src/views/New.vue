<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">
                    {{ whichTime(currentNews.editTime) }}
                </div>
                <el-divider />
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card style="max-width: 480px">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px;font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in currentTopNews" :key="item.id" class="text item" style="padding: 10px;"
                    @click="handleChange(item.id)">
                    <span>{{ item.title }}</span>
                    <div class="time">
                        <time>{{ whichTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-backtop :visibility-height="200" />
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import "moment/dist/locale/zh-cn"//vite原因，使用esm模块本地化
import moment from 'moment';
moment.locale("zh-cn")

const router = useRouter()
const route = useRoute()
const currentNews = ref({})
const currentTopNews = ref({})

watchEffect(async () => {
    //console.log(route.params.id)
    const res1 = await axios.get(`http://localhost:3000/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`http://localhost:3000/webapi/news/toplist?limit=4`)
    // console.log(res2.data.data)
    currentNews.value = res1.data.data
    currentTopNews.value = res2.data.data
})

const whichTime = time => {
    return moment(time).format("lll")
}

const handleChange = (id) => {
    router.push(`/news/${id}`)
}

</script>

<style lang="scss">
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>