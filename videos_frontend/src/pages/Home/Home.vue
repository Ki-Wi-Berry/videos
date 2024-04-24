<template>
  <div class="videos_home_page">
    <!-- 导航栏 -->
    <head-line
    ></head-line>
    <!-- 分类 -->
    <content-classification></content-classification>
    <!-- 热点视频 -->
    <hot-video></hot-video>
    <!-- 推广 -->
    <advertising></advertising>
  </div>
</template>

<script lang="ts"  setup>
//导航栏
import {HeadLine} from "../../components";
// 分类
import {ContentClassification} from "./components";
// 热点视频
import {HotVideo} from "./components";
// 推广
import {Advertising} from "./components";
import { useStore } from "../../store";
import { storeToRefs } from "pinia";
const store = useStore();

// const {top_navigation_bar_height} = storeToRefs(store);

</script>

<style lang="less" scoped>
.videos_home_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #F4F4F4;
  ::v-deep .HeadLine::before {
    content: '';
    position: absolute;
    z-index: 0;
    background: linear-gradient(rgba(0, 0, 0, .4), transparent);
    top: 0;
    left: 0;
    width: 100%;
    height: 10rem;
    border-radius: 0 0 2px 2px;
  }
}

</style>