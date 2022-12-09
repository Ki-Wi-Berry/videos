<template>
  <!-- <div style="height:150px; margin-top:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div> -->
  <div style="text-align: center">
    <videoPlay ref="video" style="display: inline-block; width: 100%" v-bind="options" />
    <div class="pop_up">
      <span class="pop_up_span">&nbsp;已装填2000条弹幕</span>
      <div class="send_wrap">

        <input type="text" class="input" placeholder="发个友善的弹幕见证当下">
        <div class="send_btn">
          <span class="send_btn_span">发送</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "./lib/index.js";
import Hls2 from "hls.js";


const options = reactive({
  width: "800px",
  height: "450px",
  color: "#409eff",
  muted: false, //静音
  webFullScreen: false,
  autoPlay: false, //自动播放
  currentTime: 0,
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  type: "m3u8",
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  // src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8", //视频源
  poster: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg", //封面
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
});

</script>

<style lang="less" scoped>
.pop_up {
  //   margin-top: 2rem;
  width: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  .pop_up_span{
    font-size: 1.3rem;
    color: rgb(136, 136, 136);
    letter-spacing:0.2rem
  }
  .send_wrap {
    display: flex;
    .input {
      width: 30rem;
      height: 3.8rem;
      outline: none;
      border-radius: .5rem 0 0 .5rem;
      padding: 0;
      padding-left: 1rem;
      background-color: rgba(194, 194, 194, .4);
    }

    .send_btn {
      height: 3.8rem;
      width: 6rem;
      text-align: center;
      color: #FFFFFF;
      font-size: 1.5rem;
      background-color: #00AEEC;
      border-radius: 0 .5rem .5rem 0;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>





