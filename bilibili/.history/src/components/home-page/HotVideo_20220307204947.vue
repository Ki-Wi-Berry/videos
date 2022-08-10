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
      <template v-for="(item, index) in data.hot_video_img" :key="item">
        <a
          :style="
            'background-image: url(./src/assets/image/' +
            (index + 2) +
            '.jpg);background-size: contain;'
          "
          class="hot_video_right_content"
          href="#"
        >

          <p>{{ item }}</p>
        </a>
      </template>
    </div>
  </div>
</template>

<script setup name="HotVideo" >
const data = {
  //热点视频
  hot_video_img: [
    "金Bili辉煌的一天",
    "FPX VS LNG",
    "转世重生前没喝孟婆汤吧！",
    "林浩 | 李成阳 |这还是极挑抢金条那两？",
    "《封神之战》",
    "峡 谷 分 析 师",
  ],
};
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
    border-radius: .5rem;
    width: calc(39.7 * 1.3rem - .7rem);
    height: calc(17.5 * 1.3rem - .4rem);
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
    width: 56rem;
    height: calc(17.5 * 1.3rem - .4rem);
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .hot_video_right_content::before {
      content: '';
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 48px;
      background-image: url(../../assets/image/18.jpg);
      background-size: contain;
      background-repeat: repeat-x;
      border-radius: 0 0 2px 2px;
    }
    .hot_video_right_content {
      margin-left: 1rem;
      width: 17rem;
      height: 10rem;
      background-size: contain;
      display: flex;
      justify-content: start;
      align-items: flex-end;
      border-radius: .3rem;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 1.5rem;
        color: #FFFFFF;
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
  background-color: #FFFFFF;
  vertical-align: middle;
  cursor: pointer;
  transition: all .2s;
  opacity: 1;
}

::v-deep .el-carousel__indicator:hover button {
  border: 2px solid #FFFFFF;
  background-color: #00A1D6;
  transform: scale(1.3);
}

::v-deep .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  background-image: url(../../assets/image/17.jpg);
  border-width: 0;
  border-color: transparent;
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.8);
}






















</style>

