<template>
    <div>
        <el-page-header icon="" title="用户管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加用户 </span>
            </template>
        </el-page-header>

        <el-form :model="userFrom" label-width="auto" ref="userFromRef" :rules="userFromRules" class="demo-ruleFrom">
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
            <el-form-item label="头像" prop="avatar">
                <Upload :avatar="userFrom.avatar" @-r-e-o-p-change="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    添加用户
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter()
const userFromRef = ref()
const userFrom = reactive({
    uname: '',
    email: '',
    upwd: '',
    role: 2,//1管理，2编辑
    introduction: '',
    avatar: '',
    file: null
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
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ],
})
const options = [{
    label: '管理员',
    value: 1
}, {
    label: '编辑',
    value: 2
}]

//每次选择完图片的回调函数
const handleChange = (file) => {
    //console.log(file.raw)
    userFrom.avatar = URL.createObjectURL(file)
    userFrom.file = file
}
const submitForm = ()=>{
    userFromRef.value.validate(async (valid)=>{
        if (valid) {
            //提交数据
            // console.log(userFrom)
            await upload('http://localhost:3000/adminapi/user/add',userFrom)

            router.push("/user-manage/list")
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleFrom {
    margin-top: 50px;
}
</style>