<template>
  
</template>

<script setup name= "MyApp">
//导航栏
import HeadLine from "./components/home-page/HeadLine.vue";
// 分类
import ContentClassification from "./components/home-page/ContentClassification.vue";
// 热点视频
import HotVideo from "./components/home-page/HotVideo.vue";
// 推广
import Advertising from "./components/home-page/Advertising.vue";
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