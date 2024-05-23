<template>
  <div class="video_play" style="text-align: center">
    <videoPlay
      ref="video"
      style="display: inline-block; width: 100%"
      v-bind="options"
      :movieUrl="movieUrl"
      :movieImgUrl="movieImgUrl"
      :onMovieTimeChange="onMovieTimeChange"
    />
    <div class="barrage-container"></div>
  </div>
  <div class="pop_up">
    <span class="pop_up_span"></span>
    <div class="send_wrap">
      <input
        v-model="data.inputValue"
        type="text"
        class="input"
        placeholder="发个友善的弹幕见证当下"
        @keydown.enter="sendMsg"
      />
      <div class="send_btn">
        <span class="send_btn_span" @click="sendMsg">发送</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { videoPlay } from "./VideoPlayer/index.ts";
import { getMovieInfo, addBarrage, getBarrage,addMovieViews } from "../../api/request.js";
import { Queue, Node } from "../../utils/queue"; //队列轮子
import syncControl from "../../utils/syncControl.js";

const options: {
  width: string;
  height: string;
  color: string;
  muted: boolean;
  webFullScreen: boolean;
  autoPlay: boolean;
  currentTime: number;
  loop: boolean;
  mirror: boolean;
  ligthOff: boolean;
  volume: number;
  control: boolean;
  title: string;
  type: string;
  controlBtns: string[];
} = reactive({
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
  controlBtns: [
    "audioTrack",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
});

const route = useRoute();

const movieId = ref(route.params.movieId || 0);
const movieTime = ref<number>(0);
const movieUrl = ref<string>("");
const movieImgUrl = ref<string>("");

const syncControls = new syncControl();

const barrageTipWidth: number = 50; //提示语的长度

let barrageBoxWrap: Element,
  barrageBox: Element,
  barrageWidth: number,
  barrageHeight: number;
let barrageQueue = new Queue();

const data: { inputValue: string } = reactive({
  inputValue: "",
});


let barrageColorArray: string[] = [
  "#0099CC",
  "#333333",
  "#009966",
  "#FFFF66",
  "#9933FF",
  "#FFFF99",
  "#CCCCFF",
  "#CC9933",
  "#FFFF66",
];


//保证顺序
function render(isSendMsg: boolean): void {
  if (barrageQueue.length > 0) {
    // console.log(barrageQueue.length );
    setTimeout(() => {
      let item: string = barrageQueue.front() as string;
      barrageQueue.pop();
      createBarrage(item, isSendMsg);
      render(isSendMsg);
    }, 2000);
  }
}


const onMovieTimeChange = async (curTime: number) => {
  syncControls.run(async () => {
    movieTime.value = curTime;
    console.log("movieTime.value", movieTime.value);
    const {barrageList} = await getBarrage({
      movieId: movieId.value,
      movieTime: movieTime.value,
    });
    console.log(barrageList);
    barrageList.forEach(function (item) {
      barrageQueue.push(item);
    });
    render(true);
  });
};

//发送
async function sendMsg() {
  let inputValue = data.inputValue;
  inputValue.replace(/\ +/g, "");

  if (inputValue.length <= 0) {
    alert("请输入");
    return false;
  }

  await addBarrage({
    content: inputValue,
    movieId: movieId.value,
    movieTime: movieTime.value,
  });
  ElMessage.success({
    message: "发送成功",
    type: "success",
  });

  //生成弹幕
  render(true);
  data.inputValue = "";
}

//创建弹幕
function createBarrage(msg: string, isSendMsg: boolean): void {
  let divNode: HTMLDivElement = document.createElement("div");
  let spanNode: HTMLSpanElement = document.createElement("span");

  divNode.innerHTML = msg;
  divNode.classList.add("barrage-item");
  barrageBox.appendChild(divNode);

  spanNode.innerHTML = "举报";
  spanNode.classList.add("barrage-tip");
  divNode.appendChild(spanNode);

  let barrageOffsetLeft: number = barrageWidth;
  barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft;
  let barrageOffsetTop: number = getRandom(10, barrageHeight - 10);
  let barrageColor: string =
    barrageColorArray[Math.floor(Math.random() * barrageColorArray.length)];

  //执行初始化滚动
  initBarrage.call(divNode, {
    left: barrageOffsetLeft,
    top: barrageOffsetTop,
    color: barrageColor,
  });
}

//初始化弹幕移动(速度，延迟)
function initBarrage(obj: { left: number; top: number; color: string }): void {
  //初始化
  obj.top = obj.top || 0;
  // obj.class = obj.color || '#fff';
  this.style.left = obj.left + "px";
  this.style.top = obj.top + "px";
  this.style.color = obj.color;

  //添加属性
  this.distance = 0;
  this.width = ~~window.getComputedStyle(this).width.replace("px", "");
  // this.offsetLeft = obj.left;
  this.timer = null;

  //弹幕子节点
  let barrageChileNode = this.children[0];
  barrageChileNode.style.left = (this.width - barrageTipWidth) / 2 + "px";

  //运动
  barrageAnimate(this);

  //停止
  this.onmouseenter = function () {
    barrageChileNode.style.display = "block";
    cancelAnimationFrame(this.timer);
  };

  this.onmouseleave = function () {
    barrageChileNode.style.display = "none";
    barrageAnimate(this);
  };

  //举报
  barrageChileNode.onclick = function () {
    alert("举报成功");
  };
}

//弹幕动画
function barrageAnimate(obj) {
  move(obj);

  if (Math.abs(obj.distance) < obj.width + obj.offsetLeft) {
    obj.timer = requestAnimationFrame(function () {
      barrageAnimate(obj);
    });
  } else {
    cancelAnimationFrame(obj.timer);
    //删除节点
    obj.parentNode.removeChild(obj);
  }
}

//移动
function move(obj) {
  obj.distance--;
  obj.style.transform = "translateX(" + obj.distance + "px)";
  obj.style.webkitTransform = "translateX(" + obj.distance + "px)";
}

//随机获取高度
function getRandom(start: number, end: number): number {
  return start + Math.random() * (end - start);
}


onMounted(async () => {
  await addMovieViews({ movieId: movieId.value });
  const data = await getMovieInfo({ movieId: movieId.value });
  movieUrl.value = data.movieUrl;
  movieImgUrl.value = data.imgUrl;

  barrageBoxWrap = document.querySelector(".video_play") as Element;
  barrageBox = document.querySelector(".barrage-container") as Element;
  // console.log(barrageBox);
  //容器的宽高度
  barrageWidth = ~~window
    .getComputedStyle(barrageBoxWrap as Element)
    ["width"].replace("px", "");
  barrageHeight = ~~window
    .getComputedStyle(barrageBoxWrap as Element)
    ["height"].replace("px", "");

  render(false);
});
</script>

<style scoped lang="less">
.video_play {
  position: relative;

  .barrage-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 4rem;
    cursor: default;
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

::v-deep .barrage-item {
  z-index: 99999999;
  position: absolute;
  top: 0;
  left: 100%;
  white-space: nowrap;
  cursor: pointer;
  color: #ffffff;

  .barrage-tip {
    display: none;
    position: absolute;
    top: -26px;
    padding: 7px 15px;
    line-height: 12px;
    font-size: 12px;
    color: #f20606;
    background-color: #ffffff;
    white-space: nowrap;
    border: 1px solid #dddddd;
    border-radius: 8px;
    -webkit-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    -webkit-transform-origin: 15px 100%;
    -ms-transform-origin: 15px 100%;
    transform-origin: 15px 100%;
    -webkit-animation: tipScale 0.4s;
    animation: tipScale 0.4s;
  }
}

.pop_up {
  //   margin-top: 2rem;
  width: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;

  .pop_up_span {
    font-size: 1.3rem;
    color: rgb(136, 136, 136);
    letter-spacing: 0.2rem;
  }

  .send_wrap {
    display: flex;

    .input {
      width: 30rem;
      height: 3.8rem;
      outline: none;
      border-radius: 0.5rem 0 0 0.5rem;
      padding: 0;
      padding-left: 1rem;
      background-color: rgba(194, 194, 194, 0.4);
    }

    .send_btn {
      height: 3.8rem;
      width: 6rem;
      text-align: center;
      color: #ffffff;
      font-size: 1.5rem;
      background-color: #00aeec;
      border-radius: 0 0.5rem 0.5rem 0;
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

