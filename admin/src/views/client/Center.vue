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
                                <el-upload class="avatar-uploader"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                    :show-file-list="false" :auto-upload="false" :on-change="handleChange">
                                    <img v-if="userFrom.avatar" :src="uploadAvatar" class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>

                                </el-upload>
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
import { Plus } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';

const store = useStore()

const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000/' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')



const { uname, introduction, avatar } = store.state.userInfo
const userFromRef = ref()
const userFrom = reactive({
    uname,
    introduction,
    avatar,
    file:null
})
const userFromRules = reactive({
    uname: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    introduction: [
        { required: false, message: '请输入简介', trigger: 'blur' },
    ],
    avatar: [
        { required: false, message: '上传头像', trigger: 'blur' },
    ],
})

const uploadAvatar = computed(()=>
    userFrom.avatar.includes("blob")?userFrom.avatar:'http://localhost:3000/' + userFrom.avatar
)

//每次选择完图片的回调函数
const handleChange = (file) => {
    console.log(file.raw)

    userFrom.avatar = URL.createObjectURL(file.raw)
    userFrom.file = file.raw
}

//提交按钮
const submitForm = () => {
    userFromRef.value.validate((valid) => {
        if (valid) {
            console.log('submit',userFrom)
            //转换数据格式
            const params = new FormData()
            for(let i in userFrom){
                params.append(i,userFrom[i])
            }
            console.log(params)
            //post数据
            axios.post('http://localhost:3000/adminapi/user/upload',params,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res=>{
                console.log(res.data)

                if (res.data.ActionType==="OK") {
                    store.commit('changeUserInfo',res.data.data)
                    ElMessage.success('更新成功')
                }
            })
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

:deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

:deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
}
</style>