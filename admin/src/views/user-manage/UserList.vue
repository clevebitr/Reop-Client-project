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
                        <el-popconfirm title="你确定要删除吗" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="编辑用户" width="500">
            <el-form :model="userFrom" label-width="auto" ref="userFromRef" :rules="userFromRules"
                class="demo-ruleFrom">
                <el-form-item label="用户名" prop="uname">
                    <el-input v-model="userFrom.uname" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userFrom.email" />
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input v-model="userFrom.upwd" type="password" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="userFrom.role" class="m-2" placeholder="Select">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="简介" prop="introduction">
                    <el-input v-model="userFrom.introduction" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios';
const dialogVisible = ref(false)
const tableData = ref([])

const userFromRef = ref()
let userFrom = reactive({
    id:'',
    uname: '',
    email: '',
    upwd: '',
    role: 2,//1管理，2编辑
    introduction: ''
})
const userFromRules = reactive({
    uname: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
    ],
    upwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ]
})

const options = [{
    label: '管理员',
    value: 1
}, {
    label: '编辑',
    value: 2
}]

onMounted(() => {
    getTableData()
})

//编辑确认回调
const handleEditConfirm = ()=>{
    userFromRef.value.validate(async (valid)=>{
        if (valid) {
            await axios.put(`http://localhost:3000/adminapi/user/list/${userFrom.id}`,userFrom).then(res=>{
                if (res.data.ActionType === "OK") {
                    getTableData()
                }
            })
        }
    })

    dialogVisible.value = false
}

const getTableData = async () => {
    const res = await axios.get("http://localhost:3000/adminapi/user/list")
    //console.log(res.data)
    tableData.value = res.data.data
}
//编辑回调
const handleEdit = async data => {
    const res = await axios.get(`http://localhost:3000/adminapi/user/list/${data.id}`)
    // console.log(res.data.data)
    Object.assign(userFrom,res.data.data)
    dialogVisible.value = true
}


const handleDelete = async data => {
    // console.log(data)
    await axios.delete(`http://localhost:3000/adminapi/user/list/${data.id}`)
    getTableData()
}
</script>

<style lang="scss">
.el-table {
    margin-top: 50px;
}
</style>