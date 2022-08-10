<template>
  <div class="bilibili_home_page">
    <!-- 导航栏 -->
    <head-line class="HeadLine"></head-line>
    <!-- 分类 -->
    <content-classification></content-classification>
    <!-- 热点视频 -->
    <hot-video></hot-video>
    <!-- 推广 -->
    <advertising></advertising>
  </div>
</template>

<script setup name= "MyHome">
//导航栏
import HeadLine from "./HeadLine.vue";
// 分类
import ContentClassification from "./ContentClassification.vue";
// 热点视频
import HotVideo from "./HotVideo.vue";
// 推广
import Advertising from "./Advertising.vue";
import { useStore } from "../../../store.js";
import { storeToRefs } from "pinia";
const store = useStore();

const {
  top_navigation_bar_li_color,
  top_navigation_bar_login_background_color,
} = storeToRefs(store);


store.top_navigation_bar_li_color = "#ffffff";
store.top_navigation_bar_login_background_color = "#ffffff";
</script>

<style lang="less" scoped>
.bilibili_home_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #f4f4f4;
  ::v-deep .HeadLine {
    background-image: url(../../assets/image/21.jpg);
    background-size: contain;
    color: #f4f4f4 !important;
  }
  ::v-deep .HeadLine::before {
    content: "";
    position: absolute;
    z-index: 0;
    background: linear-gradient(rgba(0,0,0,.4),transparent);
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-radius: 0 0 2px 2px;
  }
}
</style>