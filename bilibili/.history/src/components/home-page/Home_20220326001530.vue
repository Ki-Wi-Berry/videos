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
import {useStore} from "../../../store.js";
import {storeToRefs}  from 'pinia'
const Store=useStore();

const {top_navigation_bar_li_color} = storeToRefs(Store)

Store.top_navigation_bar_li_color="#F4F4F4";

</script>

<style lang="less" scoped>
.bilibili_home_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #F4F4F4;
  ::v-deep .HeadLine{
    background-image: url(../../assets/image/21.jpg);
    background-size: contain;
    // background-color: #9D9FA0;
    color: #F4F4F4 !important;
  }
}








</style>