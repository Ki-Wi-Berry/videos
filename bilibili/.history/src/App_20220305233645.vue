<template>
  <!-- <div class="bilibili_home_page">
    <head-line></head-line> 
    <content-classification></content-classification>
  </div> -->
  <el-button :icon="ArrowDown" class="el-icon--right"> </el-button>
  <el-icon class="el-icon--right">
    <arrow-down />
  </el-icon>
  <el-icon :size="size" :color="color">
      <edit></edit>
    </el-icon>
</template>

<script>
//导航栏
import HeadLine from "./components/home-page/HeadLine.vue";
// 分类
import ContentClassification from "./components/home-page/ContentClassification.vue";
import { ElIcon, ElButton } from "element-plus";
import { ArrowDown, Search } from "@element-plus/icons-vue";

export default {
  name: "MyApp",
  components: {
    HeadLine,
    ContentClassification,
    ElIcon,
    ElButton,
  },
  setup() {
    return {
      ArrowDown,
      Search,
      ElIcon,
    };
  },
};
</script>

<style lang="less" scoped>
.bilibili_home_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #F4F4F4;
}

</style>