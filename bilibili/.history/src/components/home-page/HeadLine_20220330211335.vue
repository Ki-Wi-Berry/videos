<template>
  <nav class="top_navigation">
    <ul class="top_navigation_bar">
      <li
        class="top_navigation_bar_li"
        v-for="(item, index) in data.top_navigation_bar_left"
        :key="item"
      >
        <router-link
          :to="data.top_navigation_bar_herf_left[index]"
          :style="'color:' + store.top_navigation_bar_li_color + ';'"
          >{{ item }}</router-link
        >
      </li>
      <li class="top_navigation_bar_li">
        <div class="search_record_box" id="search_record_box_id">
          <!-- 搜索框 -->
          <div class="top_navigation_bar_input">
            <input
              @blur="hide_browsing_history1"
              @focus="show_browsing_history1"
              v-model="data.inputValue"
              @keyup.enter="add"
              type="text"
              placeholder="海贼王"
            />
            <el-button :icon="Search" class="el-icon-search"></el-button>
          </div>
          <!-- 浏览记录-->
          <div
            class="browsing_history"
            v-show="data.browsing_history_show_or_not1"
          >
            <ul>
              <li class="browsing_history_li browsing_history_li_title">
                <label><strong>&emsp;搜索历史</strong></label>
                <div class="browsing_history_clear">
                  <button class="browsing_history_clear_button" @click="clear">
                    清空
                  </button>
                </div>
              </li>
              <li
                v-for="(item, index) in data.home_top_navigation_list"
                class="browsing_history_li"
                :key="item"
              >
                <label>&emsp;{{ index + 1 }}&emsp;{{ item }}</label>
                <el-button
                  :icon="Close"
                  class="el-icon-close"
                  @click.stop="remove(index)"
                ></el-button>
              </li>
            </ul>
          </div>
        </div>
      </li>
      <li
        class="top_navigation_bar_li top_navigation_bar_li_login"
        @animationend="top_navigation_bar_login_drop"
        @mouseleave="hidden_login_box_drop"
      >
        <div class="top_navigation_bar_login_box"  >
          <router-link
            :to="store.islogin ? '/' : '/login'"
            class="top_navigation_bar_login"
            :style="
              store.islogin
                ? {
                    'background-image': 'url(./src/assets/image/22.jpg)',
                  }
                : {
                    'background-color':
                      store.top_navigation_bar_login_background_color,
                  }
            "
          >
            <router-link
              class="router_link_login"
              :to="store.islogin ? '/' : '/login'"
              :style="
                store.islogin
                  ? { opacity: 0 }
                  : { color: store.top_navigation_bar_li_color }
              "
              >登录</router-link
            >
          </router-link>
          <div class="top_navigation_bar_login_drop" v-if="data.login_box_drop&&store.islogin">
            <div class="top_navigation_bar_login_username">
              <span>Kiwi_猕猴桃</span>
            </div>
            <div class="top_navigation_bar_login_coin">
              <span class="color1">硬币:</span
              ><span class="color2">&nbsp;207&nbsp;&nbsp;</span>
              <span class="color1">B币:</span
              ><span class="color2">&nbsp;0</span>
            </div>
            <div class="top_navigation_bar_login_status_box">
              <div
                class="top_navigation_bar_login_status"
                v-for="item in data.top_navigation_bar_login_status"
                :key="item"
              >
                <span class="top_navigation_bar_login_nums">{{
                  item.nums
                }}</span>
                <span class="top_navigation_bar_login_text">{{
                  item.text
                }}</span>
              </div>
            </div>
            <router-link to="/" class="top_navigation_bar_login_user_space">
              <div class="top_navigation_bar_login_user_box">
                <el-icon class="avatar"><avatar /></el-icon>
                <span>个人中心</span>
                <el-icon class="arrow"><arrow-right-bold /></el-icon>
              </div>
            </router-link>
            <router-link
              to="/"
              class="
                top_navigation_bar_unlogin top_navigation_bar_login_user_space
              "
            >
              <div class="top_navigation_bar_login_user_box">
                <el-icon class="avatar"><moon-night /></el-icon>
                <span>退出登录</span>
                <el-icon class="arrow"><arrow-right-bold /></el-icon>
              </div>
            </router-link>
          </div>
        </div>
      </li>
      <li
        class="top_navigation_bar_li"
        v-for="(item, index) in data.top_navigation_bar_right"
        :key="item"
      >
        <router-link
          :to="data.top_navigation_bar_herf_right[index]"
          :style="'color:' + store.top_navigation_bar_li_color + ';'"
          >{{ item }}</router-link
        >
      </li>
      <li class="top_navigation_bar_li">
        <router-link to="/" class="contribute">
          <router-link to="/"> 投稿 </router-link>
        </router-link>
      </li>
    </ul>
    <slot></slot>
  </nav>
</template>

<script name= "HeadLine" setup>
import { reactive } from "vue";
import {
  Search,
  Close,
  Avatar,
  ArrowRightBold,
  MoonNight,
} from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import { useStore } from "../../../store.js";
import { storeToRefs } from "pinia";

const store = useStore();

// const {
//   top_navigation_bar_li_color,
//   top_navigation_bar_login_background_color,
//   islogin,
// } = storeToRefs(store);

const data = reactive({
  //头部导航栏
  inputValue: "",
  home_top_navigation_list: ["海贼王", "元龙", "狐妖小红娘"],
  top_navigation_bar_left: [
    "主站",
    "番剧",
    "游戏中心",
    "直播",
    "会员购",
    "漫画",
    "赛事",
    "下载APP",
  ],
  top_navigation_bar_right: [
    "大会员",
    "消息",
    "动态",
    "收藏",
    "历史",
    "创作中心",
  ],
  top_navigation_bar_herf_left: ["/", "/", "/", "/", "/", "/", "/", "/"],
  top_navigation_bar_herf_right: ["/", "/news", "/news", "/news", "/news", "/"],
  browsing_history_show_or_not1: 0,
  top_navigation_bar_login_status: [
    {
      nums: "135",
      text: "关注",
    },
    {
      nums: "5",
      text: "粉丝",
    },
    {
      nums: "0",
      text: "动态",
    },
  ],
  login_box_drop:0,
});
// 添加历史记录
const add = function () {
  data.home_top_navigation_list.push(data.inputValue);
};
// 删除历史记录
const remove = function (index) {
  // console.log("删除");
  // console.log(index);
  data.home_top_navigation_list.splice(index, 1);
};
// 清空历史记录
const clear = function () {
  data.home_top_navigation_list = [];
};
// 显示历史记录
const show_browsing_history1 = function () {
  data.browsing_history_show_or_not1 = 1;
};
// 隐藏历史记录
const hide_browsing_history1 = function () {
  document.addEventListener("click", (e) => {
    var box = document.getElementById("search_record_box_id");
    if (!box.contains(e.target)) {
      // console.log("在外");
      data.browsing_history_show_or_not1 = 0;
    }
  });
};

// 显示登录下拉菜单
const top_navigation_bar_login_drop=function(){
  console.log("123");
  data.login_box_drop=1;
}

// 隐藏登录下拉菜单
const hidden_login_box_drop=function(){
  console.log("321");
  data.login_box_drop=0;
}

</script>

<style lang="less" scoped>
// 头部导航栏
.top_navigation {
  min-width: 128rem;
  max-width: 200rem;
  top: 0;
  width: 100%;
  height: 14rem;
  .top_navigation_bar {
    padding-left: 2rem;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top_navigation_bar_li_login {
      width: 3.5rem;
    }
    .top_navigation_bar_li {
      position: relative;
      font-size: 1.4rem;
      height: 5rem;
      display: flex;
      align-items: center;
      // 登录下拉菜单
      .top_navigation_bar_login_box {
        position: absolute;
        transform-origin: top;
        height: 5rem;
        width: 3.5rem;
        .top_navigation_bar_login {
          
          z-index: 10;
          position: absolute;
          transform-origin: top;
          top: 0.8rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50% !important;
          background-size: contain;
          display: flex;
          justify-content: center;
          align-items: center;
          .router_link_login {
            color: #00a1d6 !important;
          }
        }
        .top_navigation_bar_login_drop {
          box-sizing: content-box;
          position: relative;
          top: 4rem;
          left: -12rem;
          z-index: 1;
          height: auto;
          width: 28rem;
          background-color: #fff;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: start;
          border-radius: 1rem;
          .top_navigation_bar_login_username {
            margin-top: 5rem;
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.7rem;
            color: #000000;
          }
          .top_navigation_bar_login_coin {
            margin-top: 0.5rem;
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            color: #000000;
            .color1 {
              color: #a7a9ab;
            }
          }
          .top_navigation_bar_login_status_box {
            border-top: #a7a9ab85 0.1rem solid;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            height: 4rem;
            width: 100%;
            display: flex;
            justify-content: space-around;
            // align-items: center;
            font-size: 1.2rem;
            color: #000000;
            .top_navigation_bar_login_status {
              height: 100%;
              width: 25%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              .top_navigation_bar_login_nums {
                font-size: 1.7rem;
              }
              .top_navigation_bar_login_text {
                color: #a7a9ab;
              }
            }
          }
          .top_navigation_bar_unlogin {
            margin-top: 0 !important;
          }
          .top_navigation_bar_login_user_space {
            margin-top: 2rem;
            margin-bottom: 1rem;
            height: 4rem;
            width: 100%;
            display: flex;
            justify-content: center;

            .top_navigation_bar_login_user_box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 4rem;
              width: 85%;
              border-radius: 0.5rem;
              .avatar {
                height: 4rem;
                width: 4rem;
                transform: scale(1.5);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0.5;
              }
              span {
                height: 4rem;
                width: 65%;
                display: flex;
                align-items: center;
                // font-size: 1.5rem;
              }
              .arrow {
                height: 4rem;
                width: 4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0.5;
              }
            }
            .top_navigation_bar_login_user_box:hover {
              background-color: #b1b1b191;
              span {
                color: #000000 !important;
                text-decoration: none;
              }
            }
          }
        }
      }
      .top_navigation_bar_login_box:hover {
        .top_navigation_bar_login {
          animation: rightDownMove 0.2s forwards;
        }
        @keyframes rightDownMove {
          from {
          }
          to {
            transform: scale(2);
            
          }
        }
      }

      a {
        // z-index: 100;
        color: #000000;
        text-decoration: none;
      }

      // 搜索记录模块
      .search_record_box {
        height: 5rem;
        width: 21rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top_navigation_bar_input {
          display: flex;
          justify-content: space-between;
          background-color: #ffffff;
          padding-left: 0.5rem;
          margin-top: 0.5rem;
          input {
            font-size: 1.4rem;
            height: 4rem;
            width: 21rem;
            color: #a7a9ab;
          }
          input::-webkit-input-placeholder {
            color: #e7e7e7;
          }
          input:focus {
            color: #87888a;
            input::-webkit-input-placeholder {
              color: #87888a;
            }
          }
          .el-icon-search {
            border-radius: 0;
            border: 0;
            height: 4rem;
            width: 5rem;
            background-color: #e7e7e7;
          }
        }
        // 浏览记录
        .browsing_history {
          z-index: 1;
          margin-top: 0.1rem;
          height: auto;
          width: 21rem;
          display: flex;
          flex-direction: column;
          justify-content: start;
          .browsing_history_li {
            background-color: #ffffff;
            width: 21rem;
            height: 4rem;
            color: #a7a9ab;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .el-icon-close {
              border-radius: 0;
              border: 0;
              height: 4rem;
              background-color: #ffffff;
            }
          }
          .browsing_history_li_title {
            font-size: 1.4rem;
            color: #000000;

            .browsing_history_clear {
              height: 4rem;
              width: 4rem;
              background-color: #ffffff;
              display: flex;
              justify-content: center;
              align-items: center;
              button:hover {
                color: #00a1d6;
              }
              .browsing_history_clear_button {
                background-color: #ffffff;
                border: 0;
                color: #a7a9ab;
                // justify-content: center;
                // align-content: center;
              }
            }
          }
        }
      }
      // 投稿
      .contribute {
        background-color: #fb7299;
        height: 70%;
        width: 9rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2rem;
        a {
          color: #f4f4f4 !important;
        }
      }
    }
  }
}
</style>

