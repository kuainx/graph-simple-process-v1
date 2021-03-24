<template>
  <el-upload :auto-upload="false" drag :multiple="false" action=""
             accept=".template" :show-file-list="false" :onChange="onFileSelected">
    <i class="el-icon-set-up"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击选择文件</em></div>
    <template #tip>
      <div class="el-upload__tip">
        请导入模板文件（.template）
      </div>
    </template>
  </el-upload>
  <el-dialog title="提示" v-model="dialogVisible" width="30%">
    <div>确认选择该模板吗？</div>
    <img class="thumb" :src="thumb" alt="">
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmTemplate">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import {reactive, toRefs} from "vue";
import { ElNotification } from 'element-plus';
export default {
  name: "Step1",
  emits: ["next"],
  setup: function (props, {emit}) {
    let tempObj = null;
    const state = reactive({
      dialogVisible: false,
      thumb: "",
    });
    const onFileSelected = (file) => {
      if (!/\.template$/i.test(file.name)) {
        ElNotification.error({
          title: "错误",
          message: "选择的不是.template文件",
        });
      } else {
        const reader = new FileReader();
        reader.readAsText(file.raw);
        reader.onload = () => {
          tempObj = JSON.parse(reader.result);
          if (tempObj.thumb && tempObj.layer) {
            state.thumb = tempObj.thumb;
            state.dialogVisible = true;
          } else {
            ElNotification.error({
              title: "错误",
              message: "该template文件已损坏",
            });
          }
        };
      }
    };
    const confirmTemplate = () => {
      emit("next", tempObj);
      state.dialogVisible = false;
    };
    return {
      onFileSelected,
      confirmTemplate,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.el-icon-set-up {
  font-size: 67px;
  color: #C0C4CC;
  margin: 40px 0 16px;
  line-height: 50px;
}

.thumb {
  max-width: 100%;
  max-height: 200px;
}
</style>
