<template>
  <div class="render-container">
    <h3 v-if="status">{{ status }}</h3>
    <img :src="img" alt="" class="render">
  </div>
  <div class="download-btn">
    <el-button type="success" round v-if="img" @click="downloadImg">下载<i class="el-icon-download el-icon--right"></i>
    </el-button>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue";
import {getBlob} from "@/components/ajax";
import {Blob2DataUrl} from "@/components/blob";
import {ElNotification} from "element-plus";

export default {
  name: "Step3",
  props: ["template"],
  setup(props) {
    const state = reactive({
      status: "拉取预定义资源",
      template: props.template,
      img: "",
    });

    const startUp = async () => {
      const template = state.template;
      for (const key in template.layer) {
        const item = template.layer[key];
        if (item.type === "staticImage" || item.type === "userImage") {
          const image = new Image(item.width, item.height);
          if (!item.data) {
            try {
              const blob = await getBlob(item.url);
              item.data = await Blob2DataUrl(blob);
            } catch (e) {
              console.log(e);
              ElNotification.error({
                title: "错误",
                message: item.name + "资源加载失败",
              });
              console.log(e);
            }
          }
          image.src = item.data;
          item.raw = image;
        }
      }
      state.status = "生成图像";
      const canvas = document.createElement("canvas");
      canvas.setAttribute("width", template.width);
      canvas.setAttribute("height", template.height);
      const ctx = canvas.getContext("2d");
      for (const key in template.layer) {
        const item = template.layer[key];
        if (item.type === "staticImage" || item.type === "userImage") {
          ctx.drawImage(item.raw, item.x, item.y);
        }
      }
      state.status = "";
      state.img = canvas.toDataURL();
    };
    startUp();
    const downloadImg = () => {
      const save_link = document.createElement("a");
      save_link.href = state.img;
      save_link.download = "download.png";
      save_link.click();
    };
    return {
      downloadImg,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.render {
  max-width: 100%;
  max-height: 50%;
}

.render-container {
  max-height: 500px;
  overflow: auto;
}

.download-btn {
  padding: 20px;
}
</style>
