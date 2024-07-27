<template>
    <div>
        <el-card>
            <el-page-header icon="" title="用户管理">
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="uname" label="名称" />
                <el-table-column prop="email" label="邮箱" />
                <el-table-column prop="avatar" label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else><el-avatar :size="50"
                                :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" /></div>
                    </template>
                </el-table-column>
                <el-table-column prop="avatar" label="角色">
                    <template #default="scope">
                        <!-- {{ scope.row.role===1?"管理员":"编辑" }} -->

                        <el-tag v-if="scope.row.role === 1" type="danger">管理员</el-tag>
                        <el-tag v-else type="success">编辑</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-popconfirm title="你确定要删除吗"
                        confirm-button-text="确定"
                        cancel-button-text="取消" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger" >
                                    删除
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
const tableData = ref([])
onMounted(() => {
    getTableData()
})

const getTableData = async () => {
    const res = await axios.get("http://localhost:3000/adminapi/user/list")
    //console.log(res.data)
    tableData.value = res.data.data
}

const handleEdit = (data) => {
    console.log(data)
}

const handleDelete = (data) => {
    console.log(data)
}
</script>

<style lang="scss">
.el-table {
    margin-top: 50px;
}
</style>