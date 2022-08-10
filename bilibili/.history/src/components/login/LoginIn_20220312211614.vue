<template>
  <!-- 导航栏 -->
  <head-line>
    <div class="head_line_img_box">
      <img src="../../assets/image/20.jpg" alt="" class="head_line_img" />
    </div>
  </head-line>
</template>

<script setup name="LoginIn">
//导航栏
import HeadLine from "../home-page/HeadLine.vue";
</script>

<style lang="less" scoped >
.head_line_img_box {
  width: 100%;
  height: 13rem;
  display: flex;
  justify-content: center;
  .head_line_img {
    width: 80%;
    height: 13rem;
  }
}





</style>

