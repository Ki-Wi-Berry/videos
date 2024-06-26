<template>
  <div
    ref="refPlayerWrap"
    id="refPlayerWrap"
    class="d-player-wrap"
    @mousemove="mouseMovewWarp"
    :class="{
      'web-full-screen': state.webFullScreen,
      'is-lightoff': state.lightOff,
      'd-player-wrap-hover':
        state.playBtnState == 'play' || state.isVideoHovering,
    }"
  >
    <div class="d-player-video" id="dPlayerVideo">
      <video
        ref="refdVideo"
        class="d-player-video-main"
        id="dPlayerVideoMain"
        :controls="false"
        :class="{ 'video-mirror': state.mirror }"
        :webkit-playsinline="props.playsinline"
        :playsinline="props.playsinline"
        v-bind="videoEvents"
        :volume="state.volume"
        :muted="state.muted"
        :loop="state.loop"
        :preload="preload"
        width="100%"
        height="100%"
        :src="props.movieUrl"
        :poster="props.movieImgUrl"
      >
        您的浏览器不支持Video标签。
      </video>
    </div>
    <!-- 缓冲动画 -->
    <!-- <d-waitingloading text="正在缓冲..." v-show="state.waitingLoading" /> -->

    <transition name="d-fade-in">
      <div class="d-player-lightoff" v-show="state.lightOff"></div>
    </transition>

    <!-- 状态栏-->
    <div class="d-player-state" @click="togglePlay">
      <transition name="d-scale-out">
        <!-- 播放按钮 -->
        <div class="d-play-btn" v-show="state.playBtnState == 'play'">
          <d-icon icon="icon-play" :size="40"></d-icon>
        </div>
      </transition>
      <!-- 操作信息通知 -->
    </div>
    <input
      type="input"
      readonly
      ref="refInput"
      @dblclick="toggleFullScreenHandle"
      @keyup.f="toggleFullScreenHandle"
      @keyup.esc="state.webFullScreen = false"
      @click="togglePlay"
      @keydown.space="togglePlay"
      @keyup="keypress"
      @keydown.arrow-left="keydownLeft"
      @keydown.arrow-up.arrow-down="volumeKeydown"
      @keydown="keypress"
      class="d-player-input"
      maxlength="0"
    />
    <!-- 预加载动画 -->
    <d-loading :loadType="state.loadStateType" />
    <div class="d-player-control" ref="refPlayerControl">
      <div class="d-control-progress">
        <d-slider
          class="d-progress-bar"
          @onMousemove="onProgressMove"
          @change="progressBarChange"
          :disabled="!state.speed"
          :hoverText="state.progressCursorTime"
          v-model="state.playProgress"
          :preload="state.preloadBar"
          :Thumbnails="state.Thumbnails"
          :totalTimeNumber="state.totalTimeNumber"
        >
        </d-slider>
      </div>

      <div class="d-control-tool" @click="inputFocusHandle">
        <div class="d-tool-bar">
          <div class="d-tool-item" @click="togglePlay">
            <d-icon size="24" :icon="`icon-${state.playBtnState}`"></d-icon>
          </div>
          <div
            class="d-tool-item d-tool-time audioTrack-btn"
            v-if="props.controlBtns.includes('audioTrack')"
          >
            <span>{{ state.currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ state.totalTime }}</span>
          </div>
        </div>
        <div class="d-tool-bar">
          <!-- 清晰度 -->
          <div
            class="d-tool-item quality-btn"
            v-if="
              state.qualityLevels.length &&
              props.controlBtns.includes('quality')
            "
          >
            {{
              state.qualityLevels.length &&
              (state.qualityLevels[state.currentLevel] || {}).height
            }}P
            <div class="d-tool-item-main">
              <ul class="speed-main" style="text-align: center">
                <li
                  :class="{ 'speed-active': state.currentLevel == index }"
                  @click="qualityLevelsHandle(row, index)"
                  v-for="(row, index) of state.qualityLevels"
                  :key="row"
                >
                  {{ row.height }}P
                </li>
              </ul>
            </div>
          </div>
          <!-- 倍速播放 -->
          <div
            class="d-tool-item speedRate-btn"
            v-if="props.controlBtns.includes('speedRate')"
          >
            {{ state.speedActive == "1.0" ? "倍速" : state.speedActive + "x" }}
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li
                  :class="{ 'speed-active': state.speedActive == row }"
                  @click="playbackRate(row)"
                  v-for="row of state.speedRate"
                  :key="row"
                >
                  {{ row }}x
                </li>
              </ul>
            </div>
          </div>
          <!-- 音量 -->
          <div
            class="d-tool-item volume-btn"
            v-if="props.controlBtns.includes('volume')"
          >
            <div class="d-tool-item-main volume-box" style="width: 52px">
              <div class="volume-main" :class="{ 'is-muted': state.muted }">
                <span class="volume-text-size"
                  >{{ state.muted ? 0 : ~~(state.volume * 100) }}%</span
                >
                <!-- @change 如果修改音量则取消静音 -->
                <d-slider
                  @change="state.muted = false"
                  :hover="false"
                  size="5px"
                  :vertical="true"
                  v-model="state.volume"
                ></d-slider>
              </div>
            </div>
            <span @click="mutedHandler" style="display: flex">
              <d-icon
                size="20"
                :icon="`icon-volume-${
                  state.volume == 0 || state.muted
                    ? 'mute'
                    : state.volume > 0.5
                    ? 'up'
                    : 'down'
                }`"
              ></d-icon>
            </span>
          </div>
          <!-- 设置 -->
          <div
            class="d-tool-item setting-btn"
            v-if="props.controlBtns.includes('setting')"
          >
            <d-icon size="20" class="rotateHover" icon="icon-settings"></d-icon>
            <div class="d-tool-item-main">
              <ul class="speed-main">
                <li>
                  镜像画面
                  <d-switch @change="mirrorChange" v-model="state.mirror" />
                </li>
                <li>
                  循环播放
                  <d-switch @change="loopChange" v-model="state.loop" />
                </li>
                <li>
                  关灯模式
                  <d-switch @change="lightOffChange" v-model="state.lightOff" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 画中画 -->
          <div
            class="d-tool-item pip-btn"
            v-if="props.controlBtns.includes('pip')"
            @click="requestPictureInPictureHandle"
          >
            <d-icon size="20" icon="icon-pip"></d-icon>
            <div class="d-tool-item-main">画中画</div>
          </div>
          <!-- 网页全屏 -->
          <div
            class="d-tool-item pip-btn"
            v-if="props.controlBtns.includes('pageFullScreen')"
            @click="state.webFullScreen = !state.webFullScreen"
          >
            <d-icon size="20" icon="icon-web-screen"></d-icon>
            <div class="d-tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div
            class="d-tool-item fullScreen-btn"
            v-if="props.controlBtns.includes('fullScreen')"
            @click="toggleFullScreenHandle"
          >
            <div class="d-tool-item-main">全屏</div>
            <d-icon size="20" icon="icon-screen"></d-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="Vvideo_f">
    <video
      id="Vvideo"
      ref="Vvideo"
      src=""
      controls="true"
      preload="auto"
      crossOrigin="anonymous"
      width="400"
      height="200"
      v-show="false"
    >
      您的浏览器不支持 video 标签。
    </video>
  </div>

</template>

<script lang="ts">
export default {
  name: "vue3VideoPlay",
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
import {
  reactive,
  ref,
  Ref,
  onMounted,
  useAttrs,
  watch,
  nextTick,
  defineProps,
PropType,
} from "vue";
import { debounce } from "throttle-debounce";
import Hls2 from "hls.js";
import DIcon from "../components/Icon.vue";
import DSwitch from "../components/Switch.vue"; //switch
import DLoading from "../components/Loading.vue"; //loading
import DSlider from "../components/Slider.vue"; // slider
import {
  hexToRgba,
  timeFormat,
  requestPictureInPicture,
  toggleFullScreen,
  isMobile,
  firstUpperCase,
} from "../utils/util";
import { Queue } from "../../../../utils/queue"; //队列轮子
import { videoEmits, videoProps } from "./plugins/index";
const props = defineProps({
  movieUrl: String,
  movieImgUrl: String,
  onMovieTimeChange: Function as PropType<(curTime: number) => void>,
  ...videoProps,
}); //props
const emits = defineEmits([
  ...videoEmits,
  "mirrorChange",
  "loopChange",
  "lightOffChange",
]); //emits

const refPlayerWrap: Ref<HTMLElement | null> = ref(null); //wrap
const refdVideo: Ref<HTMLElement | null> = ref(null); // 视频播放器
const Vvideo: Ref<HTMLElement | null> = ref(null); // 视频播放器
const refPlayerControl: Ref<HTMLElement | null> = ref(null); //播放器控制器
const refInput: Ref<HTMLElement | null> = ref(null); //快捷键操作
const curTime: Ref<number> = ref(-1);
const state = reactive({
  Vvideo: null,
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.muted,
  playBtnState: props.autoPlay ? "pause" : "play", // 播放按钮状态
  loadStateType: "loadstart", // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
  fullScreen: false,
  handleType: "", //当前操作类型
  //当前播放时间
  currentTime: "00:00:00",
  // 当前缓冲进度
  preloadBar: 0,
  //总时长(字符串)
  totalTime: "00:00:00",
  isVideoHovering: true,
  speedActive: "1.0", //倍速
  playProgress: 0, //播放进度
  totalTimeNumber: 0, //总时长
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorTime: "00:00:00", //进度条光标时间
  qualityLevels: [], 
  currentLevel: 0, 
  Thumbnails: [], //缩略图
});
const compose =
  (...args): void =>
  (value) =>
    args.reverse().reduce((acc, fn) => fn(acc), value);
// 收集video事件
const videoEvents = videoEmits.reduce(
  (events: Record<string, (...args: any[]) => void>, emit: string) => {
    let name = `on${firstUpperCase(emit)}`;
    events[name] = (ev) => {
      state.loadStateType = emit;
      emits(emit, ev);
    };

    return events;
  },
  {}
);
// 可以播放
videoEvents["onCanplay"] = compose(videoEvents["onCanplay"], () => {
  if (state.playBtnState != "play") {
    //如果是自动播放 则显示暂停按钮
    state.dVideo.play();
  }
  if (state.autoPlay) {
    //如果是自动播放 则显示暂停按钮
    state.dVideo.play();
    state.playBtnState = "pause";
  }
});
// 播放结束// 合并函数
videoEvents["onEnded"] = compose(videoEvents["onEnded"], () => {
  state.playBtnState = "replay"; //此时的控制按钮应该显示重新播放
});

// 资源长度改变
videoEvents["onDurationchange"] = (ev) => {
  emits("durationchange", ev);
  if (props.currentTime != 0) {
    state.dVideo.currentTime = props.currentTime;
  }

  //更新当前时长的所有状态
  videoEvents.onTimeupdate(ev);
};

// 缓冲下载中
videoEvents["onProgress"] = (ev) => {
  // console.log("缓冲中...");
  emits("progress", ev);
  let duration = ev.target.duration; // 媒体总长
  let length = ev.target.buffered;
  let end = ev.target.buffered.length && ev.target.buffered.end(length - 1);
  state.preloadBar = end / duration; //缓冲比例
};

// 当前播放进度
videoEvents["onTimeupdate"] = (ev) => {
  emits("timeupdate", ev);
  let duration = ev.duration || ev.target.duration || 0; // 媒体总长
  let currentTime = ev.currentTime || ev.target.currentTime; // 当前媒体播放长度
  console.log('currentTime',Math.floor(currentTime))
  if(currentTime&&curTime.value !== Math.floor(currentTime)){
    curTime.value = Math.floor(currentTime)
    console.log('curTime',curTime.value,'currentTime',currentTime)
    props.onMovieTimeChange?.(curTime.value)
  }
  state.playProgress = currentTime / duration; //播放进度比例
  state.currentTime = timeFormat(currentTime);
  state.totalTime = timeFormat(duration);
  state.totalTimeNumber = duration;
};
// error
videoEvents["onError"] = compose(videoEvents["onError"], () => {
  state.playBtnState = "replay"; //此时的控制按钮应该显示重新播放
});

// 获取用户自定义事件
let attrs = useAttrs();
for (let emit in attrs) {
  videoEvents[emit] = attrs[emit];
}

// 把颜色格式化为rgb格式
const hexToRgbaColor = hexToRgba(state.color);
// 清空当前操作类型
const clearHandleType = debounce(500, true, () => {
  state.handleType = "";
});
// 音量 +++ --
const volumeKeydown = (ev) => {
  ev.preventDefault();
  if (ev.code == "ArrowUp") {
    state.volume = state.volume + 0.1 > 1 ? 1 : state.volume + 0.1;
  } else {
    state.volume = state.volume - 0.1 < 0 ? 0 : state.volume - 0.1;
  }
  state.muted = false;
  state.handleType = "volume"; //操作类型  音量
  clearHandleType(); //清空 操作类型
};
const keydownLeft = (ev) => {
  if (!props.speed) return; // 如果不支持快进快退s
  state.dVideo.currentTime =
    state.dVideo.currentTime < 10 ? 0.1 : state.dVideo.currentTime - 10;
  videoEvents.onTimeupdate(state.dVideo);
  playHandle();
};
const keypress = (ev) => {
  ev.preventDefault();
  let pressType = ev.type;
  if (ev.key == "ArrowRight") {
    playHandle();
    if (pressType == "keyup") {
      clearTimeout(state.longPressTimeout);
      // 如果不支持快进快退 如果关闭快进快退必须在没有长按倍速播放的情况下
      if (!props.speed && !state.longPressTimeout) return;
      if (state.isMultiplesPlay) {
        //如果倍速播放中
        state.dVideo.playbackRate = state.speedActive;
        state.isMultiplesPlay = false;
      } else {
        // 进度加10s
        state.dVideo.currentTime = state.dVideo.currentTime + 10;
        videoEvents.onTimeupdate(state.dVideo);
      }
      // 如果长按5倍速播放
    } else if (pressType == "keydown") {
      if (!props.speed) return; // 如果不支持快进快退 也不能支持长按倍速播放
      if (state.isMultiplesPlay) {
        clearTimeout(state.longPressTimeout);
      }
      state.longPressTimeout = setTimeout(() => {
        state.isMultiplesPlay = true;
        state.dVideo.playbackRate = 5;
        state.handleType = "playbackRate"; //操作类型 倍速播放
        clearHandleType(); //清空 操作类型
      }, 500);
    }
  }
};
// 聚焦到播放器
const inputFocusHandle = () => {
  if (isMobile) return;
  refInput.value.focus();
};
// 播放方法
const playHandle = () => {
  state.loadStateType = "play";
  state.dVideo.play().catch(() => {
    setTimeout(() => {
      state.playBtnState = "replay";
      state.loadStateType = "error";
    }, 500);
  });
  state.playBtnState = "pause";
  // 播放后清空状态
  // state.loadStateType = ''
};
// 暂停
const pauseHandle = () => {
  // state.loadStateType = 'pause' // 暂停状态
  state.dVideo.pause();
  state.playBtnState = "play"; // 暂停后要显示播放按钮
};

// 播放暂停
const togglePlay = (ev) => {
  if (ev) ev.preventDefault();
  if (state.playBtnState == "play" || state.playBtnState == "replay") {
    // 点击播放按钮 或 重新播放按钮 后
    playHandle();
  } else if (state.playBtnState == "pause") {
    // 点击暂停按钮后...
    pauseHandle();
  }
};

// 静音事件
const mutedHandler = () => {
  state.muted = !state.muted;
  // 如果之前音量调整为0 取消静音时会把音量设置为5
  if (state.volume == 0) {
    state.volume = 0.05;
  }
};

//进度条事件
const progressBarChange = (ev: Event, val) => {
  let duration = state.dVideo.duration || state.dVideo.target.duration; // 媒体总长
  state.dVideo.currentTime = duration * val;
  if (state.playBtnState == "play") {
    state.dVideo.play();
    state.playBtnState = "pause";
  }
};
// 进度条移动
const onProgressMove = (ev, val) => {
  state.progressCursorTime = timeFormat(state.dVideo.duration * val);
};

const setFrontEndPreload = async () => {
  state.Vvideo?.removeEventListener("canplay", setFrontEndPreload);
  // console.log(1);
  for (let i = 0; i <= state.Vvideo.duration; i += 3) {
    // setTimeout(() => {
    // console.log(i);
    let canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    state.Vvideo.currentTime = i;
    await new Promise(function (rsv) {
      const event = function () {
        context?.drawImage(state.Vvideo, 0, 0, 300, 150);
        canvas.toBlob(function (blob) {
          state.Thumbnails.push(URL.createObjectURL(blob as Blob));
        }, "image/jpeg");
        state.Vvideo?.removeEventListener("canplay", event);
        rsv(null);
      };
      state.Vvideo?.addEventListener("canplay", event);
    });
    // }, i*100);
  }
  let video: HTMLElement = document.getElementById("Vvideo") as HTMLElement;
  let video_f: HTMLElement = document.getElementById("Vvideo_f") as HTMLElement;
  video_f.removeChild(video);
};

// 预处理预览图
const preloadVideoThumbs = () => {
  state.Vvideo?.addEventListener("canplay", setFrontEndPreload);
};

// debounce(1000,true,preloadVideoThumbs);

// 隐藏控制器
const hideControl = debounce(2500, true, () => {
  state.isVideoHovering = false;
});

const mouseMovewWarp = (ev) => {
  state.isVideoHovering = true;
  hideControl();
};

let Hls;

// 播放速度
const qualityLevelsHandle = (row, index) => {
  Hls.currentLevel = index;
  state.currentLevel = index;
};
// 播放速度
const playbackRate = (row) => {
  state.speedActive = row;
  state.dVideo.playbackRate = row;
};
//镜像画面事件
const mirrorChange = (val) => {
  // console.log(val)
  emits("mirrorChange", val, state.dVideo);
};
// 是否循环事件
const loopChange = (val) => {
  // console.log(val)
  emits("loopChange", val, state.dVideo);
};
// 关灯事件
const lightOffChange = (val) => {
  // console.log(val)
  emits("lightOffChange", val, state.dVideo);
};

const requestPictureInPictureHandle = () => {
  requestPictureInPicture(state.dVideo);
};
// 全屏按钮
const toggleFullScreenHandle = () => {
  state.fullScreen = toggleFullScreen(refPlayerWrap.value);
};

const init = (): void => {
  if (
    state.dVideo.canPlayType(props.type) ||
    state.dVideo.canPlayType("application/vnd.apple.mpegurl")
  ) {
    state.muted = props.autoPlay;
    // state.dVideo.load();
  }
  // // 使用hls解码
  else if (Hls2.isSupported()) {
    Hls = new Hls2({ fragLoadingTimeOut: 2000 });
    const Hls3 = new Hls2({ fragLoadingTimeOut: 2000 });
    Hls.detachMedia();
    Hls3.detachMedia();
    Hls.attachMedia(state.dVideo);
    Hls3.attachMedia(state.Vvideo);
    Hls.on(Hls2.Events.MEDIA_ATTACHED, () => {
      console.log("props.movieUrl", props.movieUrl);
      Hls.loadSource(props.movieUrl);
      Hls.on("hlsManifestParsed", (ev, data) => {
        // console.log(data)
        state.currentLevel = data.level;
        state.qualityLevels = data.levels || [];
        // state.dVideo.load();
      });
    });

    Hls3.on(Hls2.Events.MEDIA_ATTACHED, () => {
      Hls3.loadSource(props.movieUrl);
    });

    Hls.on("hlsLevelSwitching", (ev, data) => {
      // state.dVideo.load();
    });
    Hls.on("hlsLevelSwitched", (ev, data) => {
      state.currentLevel = data.level;
    });
  }
};

let barrageArray: {
  url: string;
  text: string;
  level: number;
}[] = [
  
];
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
const barrageTipWidth: number = 50; //提示语的长度

let barrageBoxWrap: Element,
  barrageBox: Element,
  barrageWidth: number,
  barrageHeight: number;
let que = new Queue();
let renderTimer: NodeJS.Timeout | null;

//保证顺序
function render(isSendMsg: boolean): void {
  if (que.length > 0) {
    // console.log(que.length );
    setTimeout(() => {
      let item: string = que.front() as string;
      que.pop();
      createBarrage(item, isSendMsg);
      render(isSendMsg);
    }, 2000);
  }
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
  // barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft;
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

watch(
  () => props.movieUrl,
  () => {
    //nextTick DOM更新后调用
    nextTick(() => {
      // 初始化
      init();
      preloadVideoThumbs();

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

      barrageArray.forEach(function (item) {
        que.push(item.text); //放进队列
      });
      render(false);
    });
  },
  { immediate: true }
);
onMounted(() => {
  state.dVideo = refdVideo;
  state.Vvideo = Vvideo;
  inputFocusHandle();
});
defineExpose({
  play: playHandle, //播放
  pause: pauseHandle, //暂停
  togglePlay, //暂停或播放
});
</script>

<style lang="less" scoped>
@import "../style/reset.less";
@import "../style/transition.less";
@import "../style/animate.less";
@import "../style/base.less";
@import "../style/vPlayer.less";


.d-player-wrap {
  --primary-color: v-bind(hexToRgbaColor);
  width: v-bind(width);
  height: v-bind(height);
}

.img {
  width: 18rem;
  height: 12rem;
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
