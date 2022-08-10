<template>
  <!-- 推广 -->
  <div class="home_page_advertising">
    <div class="home_page_advertising_headline">
      <div class="home_page_advertising_headline_left">
        <div class="broad_heading_picture1"></div>
        <span class="advertising_promotion">推广</span>
        <div class="broad_heading_picture2"></div>
        <a href="#">
          <span>这样的御坂美琴，你见过么</span>
        </a>
        <div class="broad_heading_picture2"></div>
        <a href="#">
          <span>百万UP创作分享，你要不要吧！</span>
        </a>
      </div>
      <div class="home_page_advertising_headline_right">
        <a href="#">
          <span>观看列表</span>
        </a>
      </div>
    </div>
    <div class="home_page_advertising_video_all">
      <div class="home_page_advertising_video_left">
        <div
          class="home_page_advertising_video"
          v-for="(item, index) in home_page_advertising_video"
          :key="item"
        >
          <a href="#" class="home_page_advertising_video_a_top">
            <div
              class="home_page_advertising_video_"
              :style="'background-image: url(./icon/' + (index + 8) + '.jpg);'"
            ></div>
            <span>{{ item.up }}</span>
          </a>
          <a href="#" class="home_page_advertising_video_a_bottom">
            <span>{{ item.down }}</span>
          </a>
        </div>
      </div>
      <div class="home_page_advertising_video_right">
        <a href="#">
          <div class="home_page_advertising_video_right_content"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup name= "Advertising">

</script>
