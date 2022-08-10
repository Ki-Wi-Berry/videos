<template>
  <!-- 导航栏 -->
  <div class="login_in_page">
    <head-line class="login_in_headline">
      <div class="head_line_img_box">
        <img src="../../assets/image/20.jpg" alt="" class="head_line_img" />
      </div>
    </head-line>
    <div class="login_in_title">
      <span>登录</span>
    </div> 
    <login-form></login-form>
  </div>
  <demo></demo>
</template>

<script setup name="LoginIn">
//导航栏
import HeadLine from "../home-page/HeadLine.vue";
import LoginForm from "./LoginForm.vue";
import demo from "./demo.vue";
</script>

<style lang="less" scoped >
.login_in_page {
  padding-top: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  // height: 100rem;
  .login_in_headline {
    width: 100%;
    height: 14rem;
    .head_line_img_box {
      width: 100%;
      height: calc(11.5rem * 86 / 106);
      display: flex;
      justify-content: center;
      background-color: #00a0d8;
      .head_line_img {
        width: 80%;
        height: 11.5rem;
        
      }
    }
  }

  .login_in_title {
    width: 80%;
    height: 0.1rem;
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.1rem solid #40484b48;
    margin-bottom: 7rem;
    span {
      margin-top: 2rem;
      font-size: 3.8rem;
      height: 8rem;
      width: 10rem;
      display: flex;
      justify-content: center;
      background-color: #fff;
    }
  }
}
</style>

