<template>
    <div>
        <el-page-header icon="" title="新闻管理">
            <template #content>
                <span class="text-large font-600 mr-3"> 添加新闻 </span>
            </template>
        </el-page-header>

        <el-form :model="newsFrom" label-width="auto" ref="newsFromRef" :rules="newsFromRules" class="demo-ruleFrom">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsFrom.title" />
            </el-form-item>
            <el-form-item label="类别" prop="category">
                <el-select v-model="newsFrom.category" class="m-2" placeholder="Select">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsFrom.cover" @-r-e-o-p-change="coverhandleChange" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <editor @event="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">
                    创建新闻
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import editor from '@/components/editor/Editor.vue'
import Upload from '@/components/upload/Upload.vue';
import upload from '@/util/upload';
import { useRouter } from 'vue-router';
const router = useRouter()
const newsFromRef = ref()
const newsFrom = reactive({
    title: '',
    content: '',
    category: 1,//1最新动态 2典型案例 3通知公告,
    cover: '',
    file: null,
    isPublish: 0//0不发布 1发布
})
const newsFromRules = reactive({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' },
    ]
})

const options = [
    {
        label: "最新动态",
        value: 1
    },
    {
        label: "典型案例",
        value: 2
    },
    {
        label: "通知公告",
        value: 3
    }
]

const coverhandleChange = file => {
    newsFrom.cover = URL.createObjectURL(file)
    newsFrom.file = file
}

const handleChange = (data) => {
    if (data === '<p><br></p>') {
        newsFrom.content = ''
        return
    } else {
        newsFrom.content = data
        //console.log(newsFrom.content)
    }

}

const submitForm = () => {
    newsFromRef.value.validate(async (valid) => {
        if (valid) {
            //提交数据
            //console.log(newsFrom)
            await upload('http://localhost:3000/adminapi/news/add',newsFrom)
            router.push("/news-manage/list")
            // router.push("/user-manage/list")
        }
    })
}
</script>

<style lang="scss" scoped>
.demo-ruleFrom {
    margin-top: 50px;
}
</style>