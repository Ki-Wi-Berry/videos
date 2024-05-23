<template>
  <!-- 导航栏 -->
  <HeadLine/>
  <div class="login_in_page">
    <div class="login_in_title">
      <span>登录</span>
    </div>
    <login-form></login-form>
  </div>
  <!-- <demo></demo> -->
</template>

<script setup name="LoginIn">
//导航栏
import {HeadLine} from "../../components";
import LoginForm from "./LoginForm.vue";
import { useStore } from "../../store";
import { storeToRefs } from "pinia";
const store = useStore();


</script>

<style lang="less" scoped >
.login_in_page {
  padding-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      background-color: #00A0D8;
      .head_line_img {
        width: 80%;
        height: 11.5rem;
      }
    }
  }

  .login_in_title {
    width: 80%;
    height: .1rem;
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: .1rem solid #40484B48;
    margin-bottom: 7rem;
    span {
      margin-top: 2rem;
      font-size: 3.8rem;
      height: 8rem;
      width: 10rem;
      display: flex;
      justify-content: center;
      background-color: #FFFFFF;
    }
  }
}

</style>

