<template>
    <div class="container">
        <div class="news-header" :style="{
            backgroundImage: `url(${newsbg})`
        }">

        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible = 'visible'
                content="this is content, this is content, this is content">
                <template #reference>
                    <el-input v-model="searchText"  style="width: 50%" size="large" placeholder="请输入新闻关键字" type="search"
                        :prefix-icon="Search" @input="visible=true" @blur="visible=false"/>
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :kry="data.id" class="search-item">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="暂无新闻" :image-size="50"/>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script setup>
import newsbg from '@/assets/newsbg.png'
import {Search} from '@element-plus/icons-vue'
import {ref ,onMounted,computed} from 'vue'
import axios from 'axios';

const searchText = ref("")
const visible = ref(false)
const newsList= ref([])

onMounted(async ()=>{
    var res = await axios.get("http://localhost:3000/webapi/news/list")
    console.log(res.data.data)
    newsList.value = res.data.data
})

const searchnewslist = computed(()=>searchText.value?newsList.value.filter(item=>item.title.includes(searchText.value)):[])

</script>

<style scoped lang="scss">
.container {
    position: relative;
}

.news-header {
    width: 100%;
    height: 450px;
    background-size: cover;
}

.search{
    position: absolute;
    top:300px;
    width: 100%;
    text-align: center;
    .el-input{
        width: 50%;
    }
}

.search-item{
    height: 50px;
    line-height: 20px;
    &:hover{
        background: whitesmoke;
        color: blue;
    }
}
</style>