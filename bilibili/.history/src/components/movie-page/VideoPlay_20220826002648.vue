<template>
  <!-- <video width="320" height="240" controls>
    <source src="../../assets/videos/01.mp4" type="video/mp4" />
  </video> -->
  <div>
    <videoPlay class="123" v-bind="options" />
  </div>
  <button type="button" class="div1"></button>
</template>

<script setup >
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import { reactive } from "vue";

const options = reactive({
  width: "800px", //播放器高度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  src: "http://vjs.zencdn.net/v/oceans.mp4", //视频源
  poster: "", //封面
});
const onPlay = (ev) => {
  console.log("播放");
};
const onPause = (ev) => {
  console.log(ev, "暂停");
};

const onTimeupdate = (ev) => {
  console.log(ev, "时间更新");
};
const onCanplay = (ev) => {
  console.log(ev, "可以播放");
};

// var icon_play = document.getElementsByClassName("x123");
// icon_play.onclick = iconplay;

// function iconplay () {
//   console.log(123);
// };

let div2 = document.getElementsByClassName("div1");
div2.onclik = fun;
function fun() {
  alert("123");
}
</script>

<style lang="less" scoped>
.div1 {
  height: 10rem;
  width: 10rem;
}










</style>

