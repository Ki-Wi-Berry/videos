<template>
  <!-- 热点视频 -->
  <div class="hot_video">
    <div class="hot_video_left block">
      <el-carousel trigger="click">
        <el-carousel-item
          v-for="(item, index) in 4"
          :key="item"
          :style="
            'background-image: url(./src/assets/image/' +
            (index + 13) +
            '.jpg);'
          "
        >
          <!-- <h3 class="small">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hot_video_right">
      <template v-for="item in HotVideoList" :key="item.id">
        <VideoCell :movieData="item" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted,ref } from "vue";
import { VideoCell } from "../../../components";
import {getHomeMovieList} from '../../../api/request'

const HotVideoList = ref([]);

const data = {
  //热点视频
  hot_video_img: [
    {
      movieName: "金Bili辉煌的一天",
      author: "up: ****",
      viewNumber: 123 + "播放",
      imgUrl: "./src/assets/image/3.jpg",
      id: 1,
    },
    {
      movieName: "FPX VS LNG",
      author: "up: ****",
      viewNumber: 123 + "播放",
      imgUrl: "./src/assets/image/3.jpg",
      id: 2,
    },
    {
      movieName: "转世重生前没喝孟婆汤吧！",
      author: "up: ****",
      viewNumber: 123 + "播放",
      imgUrl: "./src/assets/image/3.jpg",
      id: 3,
    },
    {
      movieName: "林浩 | 李成阳 |这还是极挑抢金条那两？",
      author: "up: ****",
      viewNumber: 123,
      imgUrl: "./src/assets/image/3.jpg",
      id: 4,
    },
    {
      movieName: "《封神之战》",
      author: "up: ****",
      viewNumber: 123,
      imgUrl: "./src/assets/image/3.jpg",
      id: 5,
    },
    {
      movieName: "峡 谷 分 析 师",
      author: "up: ****",
      viewNumber: 123,
      imgUrl: "./src/assets/image/3.jpg",
      id: 6,
    },
  ],
};

onMounted(async () => {
  const { movieList } = await getHomeMovieList()
  HotVideoList.value = movieList
})
</script>

<style lang="less" scoped>
// 热点视频
.hot_video {
  margin-top: 4rem;
  // margin-left: 12.0rem;
  // margin-right: 10.0rem;
  display: flex;
  span {
    color: #000000;
  }
  .hot_video_left {
    border-radius: 0.5rem;
    width: calc(39.7 * 1.3rem - 0.7rem);
    height: calc(17.5 * 1.3rem - 0.4rem);
    background-size: contain;
    display: flex;
    justify-content: start;
    align-items: flex-end;
    .el-carousel {
      width: 100%;
      height: 100%;
      //   ::v-deep :not(.el-carousel__indicators--horizontal) {
      //     left: 50%;
      //   }
      ::v-deep .el-carousel__indicators--horizontal {
        left: 75%;
        // right: 0 !important;
        transform: translateX(0) !important;
      }
      ::v-deep .el-carousel__container {
        width: 100%;
        height: 100%;
      }
      .el-carousel__item {
        width: 100%;
        height: 100%;
        background-size: contain;
        display: flex;
        justify-content: start;
        align-items: flex-end;
      }
    }
  }

  .hot_video_right {
    position: relative;
    width: 56rem;
    height: calc(17.5 * 1.3rem - 0.4rem);
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .hot_video_right_area::before {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 17rem;
      height: 4.8rem;
      background-image: url(../../../assets/image/18.jpg);
      background-size: contain;
      background-repeat: repeat-x;
      border-radius: 0 0 2px 2px;
    }

    .hot_video_right_area {
      margin-left: 1rem;
      width: 17rem;
      height: 9.7rem;
      position: relative;
      .hot_video_right_box::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #000000b0;
        opacity: 0;
        transition: opacity 0.2s;
      }
      .hot_video_right_box {
        position: relative;
        overflow: hidden;
        .hot_video_right_content {
          width: 17rem;
          height: 9.7rem;
          background-size: contain;
          display: flex;
          justify-content: center;
          //   align-items: flex-end;
          .hot_video_right_info {
            box-sizing: border-box;
            padding: 8px 10px 10px;
            position: absolute;
            z-index: 2;
            width: 100%;
            top: 64px;
            left: 0;
            transition: top 0.2s;
            p {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              font-size: 1.4rem;
              color: #ffffff;
              margin-bottom: 0.6rem;
            }
            .hot_video_right_info_up {
              font-size: 1.2rem;
            }
            .hot_video_right_info_num {
              font-size: 1.2rem;
            }
          }
        }
      }
      .hot_video_right_watch {
        position: absolute;
        z-index: 10;
        right: 0.8rem;
        bottom: 0.8rem;
        width: 2.8rem;
        height: 2.8rem;
        cursor: pointer;
        background-image: url(../../../assets/image/19.jpg);
        background-size: contain;
        opacity: 0;
        transition: opacity 0.2s;
      }
    }
    .hot_video_right_area:hover {
      .hot_video_right_info {
        top: 0 !important;
      }
      .hot_video_right_box::before {
        opacity: 1 !important;
      }
      .hot_video_right_info_title {
        height: 3.6rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2 !important;
        overflow: hidden;
      }
      .hot_video_right_watch {
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
  }
}

::v-deep .el-carousel__indicator--horizontal .el-carousel__button {
  display: inline-block;
  margin-left: 10px;
  width: 10px;
  height: 10px;
  border: 2px solid transparent;
  border-radius: 50%;
  background-color: #ffffff;
  vertical-align: middle;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 1;
}

::v-deep .el-carousel__indicator:hover button {
  border: 2px solid #ffffff;
  background-color: #00a1d6;
  transform: scale(1.3);
}

::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  background-image: url(../../../assets/image/17.jpg);
  border-width: 0;
  border-color: transparent;
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.8);
}
</style>
