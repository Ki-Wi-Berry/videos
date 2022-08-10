<template>
  <!-- 热点视频 -->
  <div class="hot_video">
    <div class="hot_video_left block">
      <el-carousel >
        <el-carousel-item
          v-for="(item, index) in 4"
          :key="item"
          :style="
            'background-image: url(./src/assets/image/' + (index + 13) + '.jpg);'
          "
        >
          <!-- <h3 class="small">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <a class="hot_video_left" href="#">
      <span>ʅ（´◔౪◔）ʃ谁叫你是小可爱呢？</span>
    </a> -->
    <!-- D:/bilibili/src/assets/image/1.jpg -->
    <div class="hot_video_right">
      <template v-for="(item, index) in data.hot_video_img" :key="item">
        <a
          :style="
            'background-image: url(./src/assets/image/' + (index + 2) + '.jpg);background-size: contain;'
          "
          class="hot_video_right_content"
          href="#"
        >
          <span>{{ item }}</span>
        </a>
      </template>
    </div>
  </div>
</template>

<script setup name="HotVideo">
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
      ::v-deep .el-carousel__indicators--horizontal {
        left: 70% !important;
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
    .hot_video_right_content {
      margin-left: 1rem;
      width: 17rem;
      height: 10rem;
      background-size: contain;
      display: flex;
      justify-content: start;
      align-items: flex-end;
      border-radius: .3rem;
      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: .1;
        overflow: hidden;
        font-size: 1.5rem;
      }
    }
  }
}
::v-deep .el-carousel__button {
  background-image: url(../../assets/image/17.jpg);
}

/deep/ .el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
  opacity: .5;
}  
/deep/ .el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #FFFFFF;
  border-radius: 50%;
  opacity: 1;
}















































</style>