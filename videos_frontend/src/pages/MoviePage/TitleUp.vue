<template>
  <!-- 标题以及UP主 -->
  <div class="movie_title_up">
    <!-- 标题 -->
    <div class="movie_title">
      <div class="movie_title_name">
        <span class="movie_title_name_span"> {{headerInfo?.movieName}} </span>
      </div>
      <div class="movie_title_data">
        <el-icon><VideoPlay /></el-icon>
        <span class="movie_title_data_span">&nbsp;{{ headerInfo?.viewNumber }}&nbsp;&nbsp;</span>
        <el-icon><Postcard /></el-icon>
        <span class="movie_title_data_span">&nbsp;{{ headerInfo?.barrageNumber }}&nbsp;&nbsp;</span>
        <el-icon><Clock /></el-icon>
        <span class="movie_title_data_span">&nbsp;{{ updateTimes }} </span>
      </div>
    </div>
    <!-- UP主 -->
    <div class="movie_up">
      <!-- 头像 -->
      <div class="movie_up_img_box">
        <img :src="headerInfo?.userImgUrl||defaultUserImgUrl" alt="头像" class="movie_up_img" />
      </div>
      <!-- 右半部分 -->
      <div class="movie_up_right">
        <!-- 上部分 -->
        <div class="movie_up_right_top">
          <!-- name -->
          <span class="movie_up_right_top_span"
            >{{headerInfo?.userName}}&nbsp;&nbsp;</span
          >
        </div>
        <div class="movie_up_right_mid">
          {{headerInfo?.description || '该作者很懒，还没有简介'}}
        </div>
        <!-- <div class="movie_up_right_bottom">
          <el-button type="primary" class="movie_up_right_bottom_button">
            + &nbsp;关注&nbsp;{{ headerInfo?.fanNumber }}
          </el-button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "../../store";
import { storeToRefs } from "pinia";
import { ElIcon,dayjs } from "element-plus";
import { VideoPlay, Postcard, Clock, Message } from "@element-plus/icons-vue";
import { getMoviePageHeaderInfo } from "../../api/request";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {defaultUserImgUrl} from '../../const/const'

const store = useStore();
const route = useRoute();

interface HeaderInfo {
  movieName: string;
  updateTime: string;
  viewNumber: number;
  userName: string;
  description?: string;
  fanNumber: number;
  userImgUrl: string;
  barrageNumber:number
}

const movieId = ref(route.params.movieId || 0);

const headerInfo = ref<HeaderInfo>();
const updateTimes = computed(() =>(dayjs(headerInfo.value?.updateTime).format('YYYY-MM-DD HH:mm:ss')))




onMounted(async () => {
  headerInfo.value = await getMoviePageHeaderInfo({movieId:movieId.value});
});
</script>

<style lang="less" scoped>
.movie_title_up {
  height: 8rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .movie_title {
    width: 67%;
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
    width: 33%;
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
        margin-top: 10px;
        // height: 30%;
        width: 100%;
        display: flex;
        // justify-content: center;
        align-items: center;
        .movie_up_right_top_span {
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
        }
        .movie_up_right_top_icon {
          color: rgb(73, 73, 73);
          display: flex;
          width: 40%;
          height: 100%;
          align-items: center;
          .movie_up_right_top_icon_span {
            font-size: 1.3rem;
            letter-spacing: 0.1rem;
          }
        }
      }
      .movie_up_right_mid {
        height: 20%;
        width: 100%;
        color: rgb(169, 169, 169);
        font-size: 1.1rem;
      }
      .movie_up_right_bottom {
        height: 50%;
        width: 100%;
        display: flex;
        // justify-content: center;
        align-items: center;
        .movie_up_right_bottom_button {
          width: 80%;
          height: 80%;
        }
      }
    }
  }
}
</style>
