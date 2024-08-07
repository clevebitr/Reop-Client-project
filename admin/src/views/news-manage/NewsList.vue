<!-- 新闻列表 -->

<template>
    <div>
        <el-card>
            <el-page-header icon="" title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 新闻列表 </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" align="center" />
                <el-table-column prop="category" label="分类" align="center">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column prop="editTime" label="更新时间" align="center">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="avatar" label="是否发布" align="center">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button circle :icon="View" type="success" @click="handlePreview(scope.row)">
                        </el-button>
                        <el-button circle :icon="Edit" @click="handleEdit(scope.row)" >
                        </el-button>
                        <el-popconfirm title="你确定删除吗" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger">
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="预览新闻" width="40%" class="htmlcontent">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px;color: gray;">{{ formatTime.getTime(previewData.editTime) }}</div>

                <el-divider>
                    <el-icon ><star-filled  /></el-icon>
                </el-divider>

                <div v-html="previewData.content"></div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { Edit, View, Delete, StarFilled } from "@element-plus/icons-vue"
import { useRouter } from 'vue-router';

const router = useRouter()
const previewData = ref({})
const dialogVisible = ref(false)
const tableData = ref([])

onMounted(() => {
    getTableData()
})
//获取新闻数据
const getTableData = async () => {
    const res = await axios.get("http://localhost:3000/adminapi/news/list")
    //console.log(res.data)
    tableData.value = res.data.data
}

const categoryFormat = (category) => {
    const arr = ["最新动态", "典型案例", "通知公告"]
    return arr[category - 1]
}
//是否发布回调
const handleSwitchChange = async (item) => {
    console.log(item)
    await axios.put('http://localhost:3000/adminapi/news/publish', {
        id: item.id,
        isPublish: item.isPublish
    })

    await getTableData()//刷新新闻列表
}
//预览回调
const handlePreview = (data) => {
    //console.log(data)
    previewData.value = data
    dialogVisible.value = true
}

const handleDelete = async (data) => {
    // console.log(data.id)
    await axios.delete(`http://localhost:3000/adminapi/news/list/${data.id}`)
    await getTableData()
}

const handleEdit = (item)=>{
    router.push(`/news-manage/editnews/${item.id}`)
}
</script>

<style lang="scss" scoped>
::v-deep .htmlcontent {
    img {
        max-width: 100%;
    }
}
</style>