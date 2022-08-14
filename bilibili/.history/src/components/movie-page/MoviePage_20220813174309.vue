<template>
  <div class="bilibili_movie_page">
    <head-line
      :top_navigation_bar_li_color="'#000000'"
      :top_navigation_bar_login_background_color="'#dcdfe0'"
    ></head-line>
    <div class="movie_main_body">
      <title-up></title-up>
    </div>
  </div>
</template>

<script setup>
import HeadLine from "../home-page/HeadLine.vue";
import TitleUp from "./TitleUp.vue";
</script>

<style lang="less" scoped>
.bilibili_movie_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #f4f4f4;
  .movie_main_body {
    margin-top: 3rem;
    height: auto;
    width: 85%;
  }
}
</style>