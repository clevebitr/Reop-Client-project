<!-- 新闻列表 -->

<template>
    <div>
        <el-card>
            <el-page-header icon="" title="产品管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 产品列表 </span>
                </template>
            </el-page-header>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" align="center" />
                <el-table-column prop="summary" label="产品概述" align="center" />
                <el-table-column prop="introduction" label="产品简介" align="center" />
                <el-table-column prop="editTime" label="更新时间" align="center">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template #default="scope">
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import formatTime from '@/util/formatTime';
import { Edit, Delete } from "@element-plus/icons-vue"
import { useRouter } from 'vue-router';

const router = useRouter()
const tableData = ref([])

onMounted(() => {
    getTableData()
})
//获取新闻数据
const getTableData = async () => {
    const res = await axios.get("http://localhost:3000/adminapi/product/list")
    //console.log(res.data)
    tableData.value = res.data.data
}

const handleDelete = async (data) => {
    // console.log(data.id)
    await axios.delete(`http://localhost:3000/adminapi/product/list/${data.id}`)
    await getTableData()
}

const handleEdit = (item)=>{
    router.push(`/product-manage/editproduct/${item.id}`)
}
</script>

<style lang="scss" scoped>
::v-deep .htmlcontent {
    img {
        max-width: 100%;
    }
}
</style>