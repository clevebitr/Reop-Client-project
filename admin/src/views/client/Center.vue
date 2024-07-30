<template>
    <div>
        <el-page-header icon="" title="管理系统">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>
        <div>
            <el-row :gutter="20" class="el-row">
                <el-col :span="8">
                    <el-card class="box-card">
                        <el-avatar :size="100" :src="avatarUrl" />
                        <h3>{{ store.state.userInfo.uname }}</h3>
                        <h5>{{ store.state.userInfo.role == 1 ? '管理员' : '编辑' }}</h5>
                    </el-card>
                </el-col>
                <el-col :span="16">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span>个人信息</span>
                            </div>
                        </template>

                        <el-form :model="userFrom" label-width="auto" ref="userFromRef" :rules="userFromRules"
                            class="demo-ruleFrom">
                            <el-form-item label="用户名" prop="uname">
                                <el-input v-model="userFrom.uname" />
                            </el-form-item>
                            <el-form-item label="简介" prop="introduction">
                                <el-input v-model="userFrom.introduction" type="textarea" />
                            </el-form-item>
                            <el-form-item label="头像" prop="avatar">
                                <Upload :avatar="userFrom.avatar" @-r-e-o-p-change="handleChange" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="submitForm()">
                            提交
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>

import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import upload from '@/util/upload';
import Upload from '@/components/upload/Upload.vue';

const store = useStore()

const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000/' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const { uname, introduction, avatar } = store.state.userInfo
const userFromRef = ref()
const userFrom = reactive({
    uname,
    introduction,
    avatar,
    file: null
})
const userFromRules = reactive({
    uname: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '上传头像', trigger: 'blur' },
    ],
})


const handleChange = (file) => {
    //console.log(file.raw)
    userFrom.avatar = URL.createObjectURL(file)
    userFrom.file = file
}


//提交按钮
const submitForm = () => {
    userFromRef.value.validate(async (valid) => {
        if (valid) {
            // console.log('submit', userFrom)
            //转换数据格式
            const res = await upload('http://localhost:3000/adminapi/user/upload', userFrom)
            //console.log(res)
            if (res.ActionType === "OK") {
                store.commit('changeUserInfo', res.data)
                ElMessage.success('更新成功')
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}


</style>