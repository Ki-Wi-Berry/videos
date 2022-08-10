<template>
  <div class="bilibili_home_page">
    <!-- 导航栏 -->
    <head-line></head-line>
    <!-- 分类 -->
    <content-classification></content-classification>
    <!-- 热点视频 -->
    <!-- <hot-video></hot-video> -->
    <!-- 推广 -->
    <advertising></advertising>
    <!-- <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="(item,index) in 4" :key="item" :style="
            'background-image: url(./src/assets/image/' + (index + 2) + '.jpg);'
          ">
        </el-carousel-item>
      </el-carousel>
    </div> -->
  </div>
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


.block {
  width: 100%;
}

.el-carousel__item {
  width: 100%;
  color: #475669;
  font-size: 14px;
  opacity: .75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99A9BF;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #D3DCE6;
}



</style>