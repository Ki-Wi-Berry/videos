<template>
  <!-- <div style="height:150px; margin-top:100px">
    <d-slider v-model="options.volume"></d-slider>
  </div> -->
  <div class="video_play" style="text-align: center">
    <videoPlay ref="video" style="display: inline-block; width: 100%" v-bind="options" />
    <div class="barrage-container">
    </div>
  </div>
  <div class="pop_up">
    <span class="pop_up_span">&nbsp;已装填2000条弹幕</span>
    <div class="send_wrap">
      <input v-model="data.inputValue" type="text" class="input" placeholder="发个友善的弹幕见证当下">
      <div class="send_btn">
        <span class="send_btn_span" @click="sendMsg" @keydown="sendMsg1">发送</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from "vue";
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

const data = reactive({
  inputValue: "",
});



let barrageArray = [
  {
    url: '用户头像',
    text: '秋天爱美丽',
    level: 10
  },
  {
    url: '用户头像',
    text: '今天很开心啊',
    level: 10
  },
  {
    url: '用户头像',
    text: 'winter has come',
    level: 10
  },
  {
    url: '',
    text: '土耳其现在形势',
    level: 10
  },
  {
    url: '',
    text: '没事早点回家吃饭啊',
    level: 10
  },
  {
    url: '',
    text: '这主角真实醉了，不会回啊',
    level: 10
  },
  {
    url: '',
    text: '背景音乐真好听啊',
    level: 10
  },
  {
    url: '',
    text: '背景音乐是***',
    level: 10
  },
  {
    url: '',
    text: '经费在燃烧啊',
    level: 10
  },
  {
    url: '',
    text: '国产良心剧',
    level: 10
  },
];
let barrageColorArray = [
  '#0099CC', '#333333', '#009966', '#FFFF66', '#9933FF', '#FFFF99', '#CCCCFF', '#CC9933', '#FFFF66'
];
let barrageTipWidth = 50; //提示语的长度

let barrageBoxWrap, barrageBox, barrageWidth, barrageHeight;

onMounted(() => {
  barrageBoxWrap = document.querySelector('.video_play') as Element;
  barrageBox = document.querySelector('.barrage-container') as Element;
  console.log(barrageBox);
  //容器的宽高度
  barrageWidth = ~~window.getComputedStyle(barrageBoxWrap as Element)["width"].replace('px', '');
  barrageHeight = ~~window.getComputedStyle(barrageBoxWrap as Element)["height"].replace('px', '');

  barrageArray.forEach(function (item, index) {
    createBarrage(item.text, false);
  });
})



//发送
function sendMsg() {
  let inputValue = data.inputValue;
  inputValue.replace(/\ +/g, "");

  if (inputValue.length <= 0) {
    alert('请输入');
    return false;
  }

  //生成弹幕
  createBarrage(inputValue, true);
  data.inputValue = '';
}


//创建弹幕
function createBarrage(msg, isSendMsg) {
  let divNode = document.createElement('div');
  let spanNode = document.createElement('span');

  divNode.innerHTML = msg;
  divNode.classList.add('barrage-item');
  barrageBox.appendChild(divNode);

  spanNode.innerHTML = '举报';
  spanNode.classList.add('barrage-tip');
  divNode.appendChild(spanNode);

  let barrageOffsetLeft = getRandom(barrageWidth, barrageWidth * 2);
  barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft
  let barrageOffsetTop = getRandom(10, barrageHeight - 10);
  let barrageColor = barrageColorArray[Math.floor(Math.random() * (barrageColorArray.length))];

  //执行初始化滚动
  initBarrage.call(divNode, {
    left: barrageOffsetLeft,
    top: barrageOffsetTop,
    color: barrageColor
  });
}

//初始化弹幕移动(速度，延迟)
function initBarrage(obj) {
  //初始化
  obj.top = obj.top || 0;
  obj.class = obj.color || '#fff';
  this.style.left = obj.left + 'px';
  this.style.top = obj.top + 'px';
  this.style.color = obj.color;

  //添加属性
  this.distance = 0;
  this.width = ~~window.getComputedStyle(this).width.replace('px', '');
  // this.offsetLeft = obj.left;
  this.timer = null;

  //弹幕子节点
  let barrageChileNode = this.children[0];
  barrageChileNode.style.left = (this.width - barrageTipWidth) / 2 + 'px';

  //运动
  barrageAnimate(this);

  //停止
  this.onmouseenter = function () {
    barrageChileNode.style.display = 'block';
    cancelAnimationFrame(this.timer);
  };

  this.onmouseleave = function () {
    barrageChileNode.style.display = 'none';
    barrageAnimate(this);
  };

  //举报
  barrageChileNode.onclick = function () {
    alert('举报成功');
  }
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
  obj.style.transform = 'translateX(' + obj.distance + 'px)';
  obj.style.webkitTransform = 'translateX(' + obj.distance + 'px)';
}

//随机获取高度
function getRandom(start, end) {
  return start + (Math.random() * (end - start));
}


/*******初始化事件**********/
//系统数据



//回车
function sendMsg1(e) {
  e = e || window.event;
  if (e.keyCode == 13) {
    sendMsg();
  }
}



//兼容写法
// (function () {
//   let lastTime = 0;
//   let vendors = ['webkit', 'moz'];
//   for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
//     window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
//     window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
//       window[vendors[x] + 'CancelRequestAnimationFrame'];
//   }

//   if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame = function (callback, element) {
//       let currTime = new Date().getTime();
//       let timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
//       let id = window.setTimeout(function () {
//         callback(currTime + timeToCall);
//       }, timeToCall);
//       lastTime = currTime + timeToCall;
//       return id;
//     };
//   }
//   if (!window.cancelAnimationFrame) {
//     window.cancelAnimationFrame = function (id) {
//       clearTimeout(id);
//     };
//   }
// })();


</script>

<style lang="less" >
.video_play {
  position: relative;

  .barrage-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 4rem;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }
}

.barrage-item {
  z-index: 99999999;
  position: absolute;
  top: 0;
  left: 100%;
  white-space: nowrap;
  cursor: pointer;
  color: #FFFFFF;

  .barrage-tip {
    display: none;
    position: absolute;
    top: -26px;
    padding: 7px 15px;
    line-height: 12px;
    font-size: 12px;
    color: #F20606;
    background-color: #FFFFFF;
    white-space: nowrap;
    border: 1px solid #DDDDDD;
    border-radius: 8px;
    -webkit-box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
    -webkit-transform-origin: 15px 100%;
    -ms-transform-origin: 15px 100%;
    transform-origin: 15px 100%;
    -webkit-animation: tipScale .4s;
    animation: tipScale .4s;
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
    letter-spacing: .2rem;
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





