<template>

  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <Editor style="height: 500px; overflow-y: hidden;" :defaultConfig="editorConfig" @onCreated="handleCreated"
      @onChange="handleChanged" />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, defineEmits } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const emit = defineEmits(['event'])
const props = defineProps({
  content: String
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
onMounted(() => {
  console.log(props.content)
})
// 内容 HTML
//const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })

// 编辑器配置
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {}

}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 组件创建时
const handleCreated = (editor) => {
  //console.log(props.content)
  setTimeout(()=>{//等待后端发送数据收到后创建
    editor.setHtml(props.content)
  },200)
  editorRef.value = editor // 记录 editor 实例，重要！

}


//内容改变回调函数
const handleChanged = (editor) => {
  // console.log(editor.children[0])
  //子传父
  emit("event", editor.getHtml())

}

// 工具栏配置
const toolbarConfig = {
  // toolbarKeys: [
  //   // 一些常用的菜单 key
  //   'bold', // 加粗
  //   'italic', // 斜体
  //   'through', // 删除线
  //   'underline', // 下划线
  //   'bulletedList', // 无序列表
  //   'numberedList', // 有序列表
  //   'color', // 文字颜色
  //   'insertLink', // 插入链接
  //   'fontSize', // 字体大小
  //   'lineHeight', // 行高
  //   'uploadImage', // 上传图片
  //   'uploadVideo',//上传视频
  //   'delIndent', // 缩进
  //   'indent', // 增进
  //   'deleteImage',//删除图片
  //   'divider', // 分割线
  //   'insertTable', // 插入表格
  //   'justifyCenter', // 居中对齐
  //   'justifyJustify', // 两端对齐
  //   'justifyLeft', // 左对齐
  //   'justifyRight', // 右对齐
  //   'undo', // 撤销
  //   'redo', // 重做
  //   'clearStyle', // 清除格式
  //   'fullScreen' // 全屏
  // ]
}

</script>