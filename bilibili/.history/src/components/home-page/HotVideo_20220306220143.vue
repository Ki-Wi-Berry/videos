<template>
  <!-- 热点视频 -->
  <div class="hot_video">
    <a class="hot_video_left" href="#">
      <span>ʅ（´◔౪◔）ʃ谁叫你是小可爱呢？</span>
    </a>
    <div class="hot_video_right">
      <template v-for="(item, index) in hot_video_img" :key="item">
        <a
          :style="'background-image: url(./com/' + (index + 2) + '.jpg);'"
          class="hot_video_right_content"
          href="#"
        >
          <span>{{ item }}</span>
        </a>
      </template>
    </div>
  </div>
</template>