<template>
    <div class="fromContainer">
        <h3>LOGIN</h3>
        <el-form
        ref="loginFormRef"
        style="
        max-width: 400px;
        height: 200px;
        position: relative;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        "
        :model="loginForm" status-icon :rules="loginrules"
        label-width="auto"
        class="demo-ruleForm"
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" type="test" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 400px" @click="submitForm()">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import { useRouter } from 'vue-router';

const loginForm = reactive({
    username:"",
    password:""
})//表单绑定的响应式对象

const loginFormRef = ref() // 表单引用的对象

const loginrules = reactive({//校验规则
    username:[
        {
            required:true,message:"请输入用户名",trigger:"blur"
        }
    ],
    password:[
        {
            required:true,message:"请输入密码",trigger:"blur"
        }
    ],
})

const router = useRouter()

//提交函数
const submitForm = () =>{
    loginFormRef.value.validate((valid)=>{
        console.log(valid)
        if (valid) {
            console.log(loginForm)
            localStorage.setItem('token',"REOP")

            router.push("/index")
        }
    })
}
</script>

<style lang="scss" scoped>
.fromContainer{
    width: 500px;
    height: 300px;
    position: fixed;
    left: 50%;
    top:50%;
    transform:translate(-50%,-50%);
    background-color:rgba($color:#000000, $alpha:0.5);
    color: white;
    text-align: center;
    padding: 20px;
}
:deep .el-form-item__label{
    color: white;
}

h3{
    font-size: 30px;
}
</style>