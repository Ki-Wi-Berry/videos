<template>
  <!-- 热点视频 -->
  <div class="hot_video">
    <a class="hot_video_left" href="#">
      <span>ʅ（´◔౪◔）ʃ谁叫你是小可爱呢？</span>
    </a>
    <div class="hot_video_right">
      <template v-for="(item, index) in data.hot_video_img" :key="item">
        <a
          :style="
            'background-image: url(./components/image/' + (index + 2) + '.jpg);'
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



</style>