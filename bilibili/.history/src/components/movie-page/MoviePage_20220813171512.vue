<template>
  <div class="bilibili_movie_page">
    <head-line
      :top_navigation_bar_login_background_color="'#ffffff'"
      top_navigation_bar_search_background_color="#e7e7e7 !important"
      top_navigation_bar_shadow="0 2px 4px #00000014 !important"
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
  .movie_main_body {
    height: auto;
    width: 70%;
  }
}
</style>