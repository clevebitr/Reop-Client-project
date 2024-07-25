<template>
    <div>
        <div class="fromContainer">
            <h3>LOGIN</h3>
            <el-form ref="loginFormRef" style="
            max-width: 400px;
            height: 200px;
            position: relative;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            " :model="loginForm" status-icon :rules="loginrules" label-width="auto" class="demo-ruleForm">
                <el-form-item label="用户名/邮箱" prop="email">
                    <el-input v-model="loginForm.email" type="test" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="upwd">
                    <el-input v-model="loginForm.upwd" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 400px" @click="submitForm()">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import {useStore} from 'vuex';

const store = useStore()

const loginForm = reactive({
    email: "",
    upwd: ""
})//表单绑定的响应式对象

const loginFormRef = ref() // 表单引用的对象

const loginrules = reactive({//校验规则
    email: [
        {
            required: true, message: "请输入用户名", trigger: "blur"
        }
    ],
    upwd: [
        {
            required: true, message: "请输入密码", trigger: "blur"
        }
    ],
})

const router = useRouter()

//提交函数
const submitForm = () => {
    loginFormRef.value.validate((valid) => {
        // console.log(valid)
        if (valid) {
            axios.post('http://localhost:3000/adminapi/user/login',loginForm).then(res=>{
                console.log(res.data)
                if (res.data.ActionType === "OK") {
                    store.commit("changeUserInfo",res.data.data)
                    router.push("/index")
                }else{
                    ElMessage.error('用户名或密码错误')
                }
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.fromContainer {
    width: 420px;
    height: 280px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: white;
    text-align: center;
    padding: 20px;
    border-radius: 5px;
}

:deep .el-form-item__label {
    color: white;
}

h3 {
    font-size: 30px;
}
</style>