<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage: `url(${newsbg})`
        }">
            <div class="news-hader-title">
                <h1>新闻中心</h1>
            </div>
        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible='visible'
                content="this is content, this is content, this is content">
                <template #reference>
                    <el-input v-model="searchText" style="width: 50%" size="large" placeholder="请输入新闻关键字" type="search"
                        :prefix-icon="Search" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data.id" class="search-item" @click="handleChangepage(data.id)">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50" />
                </div>
            </el-popover>
        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topNewsList" :key="item.id">
                    <el-card style="max-width: 480px" shadow="hover"  @click="handleChangepage(item.id)">
                        <template #header>{{ item.title }}</template>
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                        </div>
                        <template #footer>{{ whichTime(item.editTime) }}</template>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px;">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name] " :key="data.id" style="padding: 10px;">
                            <el-card style="max-width: 100%" shadow="hover"  @click="handleChangepage(data.id)">
                                <template #header>{{ data.title }}</template>
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                </div>
                                <template #footer>{{ whichTime(data.editTime) }}</template>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline style="max-width: 100%;">
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-backtop :visibility-height="250" />
    </div>
</template>

<script setup>
import newsbg from '@/assets/newsbg.png'
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue'
import "moment/dist/locale/zh-cn"//vite原因，使用esm模块本地化
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash'
import { useRouter } from 'vue-router';

moment.locale("zh-cn")
const searchText = ref("")
const visible = ref(false)
const newsList = ref([])

const whichTab = ref(1)

onMounted(async () => {
    var res = await axios.get("http://localhost:3000/webapi/news/list")
    console.log(res.data.data)
    newsList.value = res.data.data
})

const searchnewslist = computed(() => searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : [])

const topNewsList = computed(() => newsList.value.slice(0, 4))

const whichTime = time => {
    return moment(time).format("lll")
}

const tablist = [
    {
        label: "最新动态",
        name: 1
    },
    {
        label: "典型案例",
        name: 2
    },
    {
        label: "通知公告",
        name: 3
    }
]

const tabnews = computed(() => _.groupBy(newsList.value, item => item.category))

const router = useRouter()
const handleChangepage = (id)=>{
    router.push(`/news/${id}`)
}

</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 450px;
    background-size: cover;
    .news-hader-title{
        position: relative;
        font-size: 30px;
        color: white;
        top:150px;
        text-align: center;
    }
}

.search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%;
    }
}

.search-item {
    height: 50px;
    line-height: 20px;

    &:hover {
        background: whitesmoke;
        color: blue;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }
}

.tab-image {
    width: auto;
    height: 200px;
    background-size: cover;
}

:deep .el-card__footer {
    font-size: 13px;
    color: grey;
}
</style>