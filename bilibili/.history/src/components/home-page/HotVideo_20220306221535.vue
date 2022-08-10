<template>
  <!-- 热点视频 -->
  <div class="hot_video">
    <a class="hot_video_left" href="#">
      <span>ʅ（´◔౪◔）ʃ谁叫你是小可爱呢？</span>
    </a>
    <!-- D:/bilibili/src/assets/image/1.jpg -->
    <div class="hot_video_right">
      <template v-for="(item, index) in data.hot_video_img" :key="item">
        <a
          :style="
            'background-image: url(D:/bilibili/src/assets/image/' + (index + 2) + '.jpg);'
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
    width: calc(39.7 * 1.3rem);
    height: calc(17.5 * 1.3rem - .4rem);
    background-size: contain;
    background-image: url(../../assets/image/1.jpg);
    display: flex;
    justify-content: start;
    align-items: flex-end;
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







</style>