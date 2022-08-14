<template>
  <!-- 标题以及UP主 -->
  <div class="movie_title_up">
    <!-- 标题 -->
    <div class="movie_title">
      <div class="movie_title_name">
        <span class="movie_title_name_span"> 你被骗了 </span>
      </div>
      <div class="movie_title_data">
        <el-icon><VideoPlay /></el-icon>
        <span class="movie_title_data_span">&nbsp;176.0万</span>
        <el-icon><VideoPlay /></el-icon>
        <span class="movie_title_data_span">&nbsp;176.0万</span>
      </div>
    </div>
    <!-- UP主 -->
    <div></div>
  </div>
</template>

<script setup>
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";
import { ElIcon } from "element-plus";
import { VideoPlay } from "@element-plus/icons-vue";
const store = useStore();
const { top_navigation_bar_height } = storeToRefs(store);

store.top_navigation_bar_height = "5rem";
</script>

<style lang="less" scoped>
.movie_title_up {
  height: 8rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .movie_title {
    width: 70%;
    height: 8rem;
    .movie_title_name {
      width: 100%;
      height: 50%;
      .movie_title_name_span {
        font-size: larger;
        letter-spacing: 0.2rem;
      }
    }
    .movie_title_data {
      opacity: 0.5;
      height: 30%;
      display: flex;

      .movie_title_data_span {
        font-size: small;
      }
    }
  }
}
</style>