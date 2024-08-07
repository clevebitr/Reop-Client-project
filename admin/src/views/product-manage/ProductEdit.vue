<template>
    <div>
        <el-page-header @back="handleBack" title="产品管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header>

        <el-form :model="productFrom" label-width="auto" ref="productFromRef" :rules="productFromRules" class="demo-ruleFrom">
            <el-form-item label="标题" prop="title">
                <el-input v-model="productFrom.title" />
            </el-form-item>
            <el-form-item label="产品概要" prop="summary">
                <el-input v-model="productFrom.summary" type="textarea" />
            </el-form-item>
            <el-form-item label="产品简介" prop="introduction">
                <el-input v-model="productFrom.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="productFrom.cover" @-r-e-o-p-change="coverhandleChange" />
            </el-form-item>
            <el-form-item label="编辑新闻">
                <el-button type="primary" @click="submitForm()">
                    更新
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
const router = useRouter()
const route = useRoute()
const productFromRef = ref()
let productFrom = reactive({
    title: '',
    cover: '',
    summary:'',
    introduction:'',
    file: null
})
const productFromRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    summary: [
        { required: true, message: '请输入概要', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ]
})

const coverhandleChange = file => {
    productFrom.cover = URL.createObjectURL(file)
    productFrom.file = file
}

const submitForm = () => {
    productFromRef.value.validate(async (valid) => {
        if (valid) {
            //提交数据
            console.log(productFrom)
            await upload('http://localhost:3000/adminapi/product/list', productFrom)
            //router.push("/news-manage/list")
            // router.push("/user-manage/list")
            router.back()
        }
    })
}

const handleBack = () => {
    router.back()
}

onMounted(async () => {
    console.log(route.params.id)
    const id = route.params.id
    const res = await axios.get(`http://localhost:3000/adminapi/product/list/${id}`)
    console.log(res.data.data)
    Object.assign(productFrom,res.data.data)
})
</script>

<style lang="scss" scoped>
.demo-ruleFrom {
    margin-top: 50px;
}
</style>