<template>
  <!-- 导航栏 -->
  <div>
<head-line>
    <div class="head_line_img_box">
      <img src="../../assets/image/20.jpg" alt="" class="head_line_img" />
    </div>
  </head-line>
  <div class="login_in_title">
    <span>登录</span>
  </div>
  </div>
  
</template>

<script setup name="LoginIn">
//导航栏
import HeadLine from "../home-page/HeadLine.vue";
</script>

<style lang="less" scoped >
.head_line_img_box {
  width: 100%;
  height: calc(11.5rem * 86 / 106) ;
  display: flex;
  justify-content: center;
  background-color: #00a0d8;
  .head_line_img {
    width: 80%;
    height: 11.5rem;
    border-bottom:0.1rem solid #40484b78;
  }
}
.login_in_title{
  width: 80%;
  text-align: center;
  font-size: 3.8rem;
}




</style>

