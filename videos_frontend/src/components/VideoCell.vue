<template>
  <div class="video_area">
    <div class="video_box">
      <a
        :style="`background-image: url(${movieData?.imgUrl});`"
        class="video_content"
        href="#"
      >
        <div class="video_info">
          <p class="video_info_title">{{ movieData?.movieName }}</p>
          <p class="video_info_up">作者：{{ movieData?.author }}</p>
          <p class="video_info_num">{{ movieData?.viewNumber }}播放</p>
        </div>
      </a>
    </div>
    <div class="video_watch"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  movieData: Object,
});
</script>

<style lang="less" scoped>
.video_area::before {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 17rem;
  height: 4.8rem;
  background-image: url(../assets/image/18.jpg);
  background-size: contain;
  background-repeat: repeat-x;
  border-radius: 0 0 2px 2px;
}

.video_area {
  margin-left: 1rem;
  width: 17rem;
  height: 9.7rem;
  position: relative;
  .video_box::before {
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
  .video_box {
    position: relative;
    overflow: hidden;
    .video_content {
      width: 17rem;
      height: 9.7rem;
      background-size: contain;
      display: flex;
      justify-content: center;
      //   align-items: flex-end;
      .video_info {
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
        .video_info_up {
          font-size: 1.2rem;
        }
        .video_info_num {
          font-size: 1.2rem;
        }
      }
    }
  }
  .video_watch {
    position: absolute;
    z-index: 10;
    right: 0.8rem;
    bottom: 0.8rem;
    width: 2.8rem;
    height: 2.8rem;
    cursor: pointer;
    background-image: url(../assets/image/19.jpg);
    background-size: contain;
    opacity: 0;
    transition: opacity 0.2s;
  }
}
.video_area:hover {
  .video_info {
    top: 0 !important;
  }
  .video_box::before {
    opacity: 1 !important;
  }
  .video_info_title {
    height: 3.6rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2 !important;
    overflow: hidden;
  }
  .video_watch {
    opacity: 1;
    transition-delay: 0.2s;
  }
}
</style>
