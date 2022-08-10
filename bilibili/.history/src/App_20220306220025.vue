<template>
  <div class="bilibili_home_page">
    <head-line></head-line> 
    <content-classification></content-classification>
  </div>
</template>

<script setup name= "MyApp">
//导航栏
import HeadLine from "./components/home-page/HeadLine.vue";
// 分类
import ContentClassification from "./components/home-page/ContentClassification.vue";
// 热点视频
import HotVideo from "./components/home-page/HotVideo.vue";

import { ElIcon, ElButton } from "element-plus";
import { ArrowDown, Search,Edit } from "@element-plus/icons-vue";

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