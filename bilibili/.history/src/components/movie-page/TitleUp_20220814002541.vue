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
        <span class="movie_title_data_span">&nbsp;176.0万&nbsp;&nbsp;</span>
        <el-icon><Postcard /></el-icon>
        <span class="movie_title_data_span">&nbsp;3341&nbsp;&nbsp;</span>
        <el-icon><Clock /></el-icon>
        <span class="movie_title_data_span">&nbsp;2021-02-05 20:29:29 </span>
      </div>
    </div>
    <!-- UP主 -->
    <div class="movie_up">
      <!-- 头像 -->
      <div class="movie_up_img_box">
        <img src="../../assets/image/23.jpg" alt="头像" class="movie_up_img" />
      </div>
      <!-- 右半部分 -->
      <div class="movie_up_right">
        <!-- 上部分 -->
        <div class="movie_up_right_top">
          <!-- name -->
          <span class="movie_up_right_top_span"
            >L先生努力做视频&nbsp;&nbsp;</span
          >
          <div class="movie_up_right_top_icon">
            <el-icon><Message /></el-icon>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";
import { ElIcon } from "element-plus";
import { VideoPlay, Postcard, Clock, Message } from "@element-plus/icons-vue";
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
    width: 65%;
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
  .movie_up {
    width: 35%;
    height: 100%;
    display: flex;
    .movie_up_img_box {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .movie_up_img {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
      }
    }
    .movie_up_right {
      margin-left: 1.5rem;
      width: 70%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .movie_up_right_top {
        height: 30%;
        display: flex;
        // justify-content: center;
        align-items: center;
        .movie_up_right_top_span {
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
        }
      }
    }
  }
}
</style>