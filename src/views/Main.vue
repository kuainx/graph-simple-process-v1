<template>
  <el-steps :active="currentStep" align-center>
    <el-step title="添加模板"></el-step>
    <el-step title="上传资源"></el-step>
    <el-step title="文件导出"></el-step>
  </el-steps>
  <div class="content">
    <Step1 v-if="currentStep===0" @next="step1N"></Step1>
    <Step2 v-if="currentStep===1" @next="step2N" :template="template"></Step2>
  </div>
  <el-button type="primary" round @click="nextStep">下一步</el-button>
</template>

<script>
import {reactive, toRefs} from "vue";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";

export default {
  name: "mainA",
  components: {
    Step1, Step2,
  },
  setup() {
    const state = reactive({
      currentStep: 0,
      template: null,
    });
    const nextStep = () => {
      state.currentStep++;
    };
    const step1N = (e) => {
      state.currentStep = 1;
      state.template = e;
    };
    const step2N = (e) => {
      state.currentStep = 2;
      state.template = e;
      console.log(e);
    };
    return {
      step1N,
      step2N,
      nextStep,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.content {
  margin: 20px;
  text-align: center;
}
</style>
