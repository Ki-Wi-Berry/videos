<template>
  <div class="videos_movie_page">
    <head-line :top_navigation_bar_login_background_color="'#ffffff'"
      top_navigation_bar_search_background_color="#ffffff !important"
      top_navigation_bar_shadow="0 2px 4px #00000014 !important"></head-line>
    <div class="movie_main_body">
      <title-up></title-up>
      <video-player></video-player>
    </div>
  </div>
</template>

<script lang="ts"  setup>
import {HeadLine} from "../../components";
import TitleUp from "./TitleUp.vue";
import VideoPlayer from "./VideoPlay.vue";
</script>

<style lang="less" scoped>
.videos_movie_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #ffffff;

  .movie_main_body {
    margin-top: 3rem;
    height: auto;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }
}
</style>