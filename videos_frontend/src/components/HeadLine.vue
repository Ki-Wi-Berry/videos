<template>
  <nav class="top_navigation" 
  >
    <ul
      class="top_navigation_bar"
      :style="{ 'box-shadow': top_navigation_bar_shadow }"
    >
      <li
        class="top_navigation_bar_li"
        v-for="(item, index) in data.top_navigation_bar_left"
        :key="item"
      >
        <router-link
          :to="data.top_navigation_bar_href_left[index]"
          :style="'color:' + top_navigation_bar_li_color + ';'"
          >{{ item }}</router-link
        >
      </li>
      <!-- 搜索导航 -->
      <li class="top_navigation_bar_li">
        <div class="search_record_box" id="search_record_box_id">
          <!-- 搜索框 -->
          <div
            class="top_navigation_bar_input"
            :style="{
              'background-color': top_navigation_bar_search_background_color,
            }"
          >
            <input
              @blur="hide_browsing_history1"
              @focus="show_browsing_history1"
              v-model="data.inputValue"
              @keyup.enter="add"
              type="text"
              placeholder="海贼王"
              :style="{
                'background-color': top_navigation_bar_search_background_color,
              }"
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
      <!-- 登录模块 -->
      <li
        :class="{
          top_navigation_bar_li: true,
          top_navigation_bar_li_login: true,
        }"
        @mouseenter="show_login_box_animation"
        @mouseleave="hide_login_box_drop"
      >
        <div class="top_navigation_bar_login_box">
          <router-link
            :class="{
              top_navigation_bar_login: true,
              show_login_box_drop: data.login_box_animation == 1,
              hide_login_box_drop: data.login_box_animation == 0,
            }"
            :style="
              store.islogin
                ? {
                    'background-image': 'url(./src/assets/image/22.jpg)',
                    'z-index':'99999'
                  }
                : {
                    'background-color':
                      top_navigation_bar_login_background_color,
                  }
            "
          >
            <router-link
              :class="{
                router_link_login: true,
              }"
              to="/login"
              :style="
                store.islogin
                  ? { opacity: 0 }
                  : { color: top_navigation_bar_li_color }
              "
              >登录</router-link
            >
          </router-link>
          <div
            :class="{
              top_navigation_bar_login_drop: true,
              hide_login_box_drop_plus: !data.login_box_animation,
              show_login_box_drop_plus: data.login_box_animation,
            }"
            v-show="data.login_box_drop"
          >
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
                :key="item.text"
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
            <!-- 退出登录 -->
            <div
              @click="login_out"
              class="
                top_navigation_bar_unlogin top_navigation_bar_login_user_space
              "
            >
              <div class="top_navigation_bar_login_user_box">
                <el-icon class="avatar"><moon-night /></el-icon>
                <span>退出登录</span>
                <el-icon class="arrow"><arrow-right-bold /></el-icon>
              </div>
            </div>
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
          :style="'color:' + top_navigation_bar_li_color + ';'"
          >{{ item }}</router-link
        >
      </li>
      <li class="top_navigation_bar_li">
        <router-link to="/upload" class="contribute">
          <router-link to="/upload"> 投稿 </router-link>
        </router-link>
      </li>
    </ul>
    <slot></slot>
  </nav>
</template>

<script lang="ts"  setup>
import { reactive } from "vue";
import {
  Search,
  Close,
  Avatar,
  ArrowRightBold,
  MoonNight,
} from "@element-plus/icons-vue";
import { ElButton } from "element-plus";
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { useStore } from "../store";
const store = useStore();
// const {count} = storeToRefs(Store)

const props = defineProps({
  // 导航栏阴影
  top_navigation_bar_shadow: String,
  // 所有字体颜色
  top_navigation_bar_li_color: String,
  // 登录框背景颜色
  top_navigation_bar_login_background_color: String,
  // 搜索框背景颜色
  top_navigation_bar_search_background_color: String,
});

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
  top_navigation_bar_href_left: ["/home", "/", "/", "/", "/", "/", "/", "/"],
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
  login_box_drop: 0,
  login_box_animation: 2,
});
// 添加历史记录
const add = function ():void {
  data.home_top_navigation_list.push(data.inputValue);
};
// 删除历史记录
const remove = function (index: number):void  {
  // console.log("删除");
  // console.log(index);
  data.home_top_navigation_list.splice(index, 1);
};
// 清空历史记录
const clear = function ():void  {
  data.home_top_navigation_list = [];
};
// 显示历史记录
const show_browsing_history1 = function ():void  {
  data.browsing_history_show_or_not1 = 1;
};
// 隐藏历史记录
const hide_browsing_history1 = function ():void  {
  document.addEventListener("click", (e) => {
    var box = document.getElementById("search_record_box_id") as HTMLElement;
    if (!box.contains(e.target as Node | null)) {
      // console.log("在外");
      data.browsing_history_show_or_not1 = 0;
    }
  });
};

let show_drop_time, hide_drop_time, hide_drop_time_plus;

// 显示登录下拉菜单
const show_login_box_animation = async function ():Promise<void>  {
  if (store.islogin) {
    clearTimeout(hide_drop_time);
    clearTimeout(hide_drop_time_plus);
    show_drop_time = await setTimeout(() => {
      data.login_box_animation = 1;
      data.login_box_drop = 1;
    }, 200);
  }
};

// 隐藏登录下拉菜单
const hide_login_box_drop = async function ():Promise<void> {
  if (store.islogin) {
    clearTimeout(show_drop_time);
    hide_drop_time = await setTimeout(() => {
      data.login_box_animation = 0;
    }, 200);
    hide_drop_time_plus = await setTimeout(() => {
      data.login_box_drop = 0;
    }, 800);
  }
};

// 退出登录
const login_out = function ():void {
  console.log("退出登录");
  store.loginOut();
};
</script>

<style lang="less" scoped>
// 头部导航栏
.top_navigation {
  min-width: 128rem;
  max-width: 200rem;
  top: 0;
  width: 100%;
  // height: 14rem;
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
          top: .8rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50% !important;
          background-size: contain;
          display: flex;
          justify-content: center;
          align-items: center;
          .router_link_login {
            color: #00A1D6 !important;
          }
        }
        .top_navigation_bar_login_drop {
          opacity: 0;
          box-sizing: content-box;
          position: relative;
          top: 4rem;
          left: -12rem;
          z-index: 100;
          height: auto;
          width: 28rem;
          background-color: #FFFFFF;
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          align-items: start;
          border-radius: 1rem;
          box-shadow: 0 2px 4px #00000014 !important;
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
            margin-top: .5rem;
            width: 100%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            color: #000000;
            .color1 {
              color: #A7A9AB;
            }
          }
          .top_navigation_bar_login_status_box {
            border-top: #A7A9AB85 .1rem solid;
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
                color: #A7A9AB;
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
            // opacity: 1;
            color: #000000 !important;
            .top_navigation_bar_login_user_box {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 4rem;
              width: 85%;
              border-radius: .5rem;
              .avatar {
                height: 4rem;
                width: 4rem;
                transform: scale(1.5);
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: .5;
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
                opacity: .5;
              }
            }
            .top_navigation_bar_login_user_box:hover {
              background-color: #B1B1B191;
              span {
                color: #000000 !important;
                text-decoration: none;
              }
            }
          }
        }
      }
      .show_login_box_drop {
        animation: rightDownMove .2s forwards;
      }
      @keyframes rightDownMove {
        from {
        }
        to {
          transform: scale(2);
          // display: none !important;
        }
      }
      .hide_login_box_drop {
        animation: leftUpMove .6s forwards;
      }
      @keyframes leftUpMove {
        from {
          transform: scale(2);
        }
        to {
          transform: scale(1);
        }
      }
      .show_login_box_drop_plus {
        animation: show_login_drop .6s forwards;
      }
      @keyframes show_login_drop {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .hide_login_box_drop_plus {
        animation: hide_login_drop .6s forwards;
      }
      @keyframes hide_login_drop {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
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
        // border-radius: 0.5rem;
        .top_navigation_bar_input {
          display: flex;
          justify-content: space-between;
          background-color: #FFFFFF;
          padding-left: .5rem;
          margin-top: .5rem;
          border-radius: .5rem;
          input {
            font-size: 1.4rem;
            height: 4rem;
            width: 21rem;
            color: #A7A9AB;
            border-radius: .5rem;
          }
          input::-webkit-input-placeholder {
            color: #E7E7E7;
          }
          input:focus {
            color: #87888A;
            input::-webkit-input-placeholder {
              color: #87888A;
            }
          }
          .el-icon-search {
            border-radius: 0 .5rem .5rem 0;
            border: 0;
            height: 4rem;
            width: 5rem;
            background-color: #E7E7E7;
          }
        }
        // 浏览记录
        .browsing_history {
          z-index: 1;
          margin-top: .1rem;
          height: auto;
          width: 21rem;
          display: flex;
          flex-direction: column;
          justify-content: start;
          box-shadow: 0 2px 4px #00000014 !important;
          .browsing_history_li {
            background-color: #FFFFFF;
            width: 21rem;
            height: 4rem;
            color: #A7A9AB;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .el-icon-close {
              border-radius: 0;
              border: 0;
              height: 4rem;
              background-color: #FFFFFF;
            }
          }
          .browsing_history_li_title {
            font-size: 1.4rem;
            color: #000000;

            .browsing_history_clear {
              height: 4rem;
              width: 4rem;
              background-color: #FFFFFF;
              display: flex;
              justify-content: center;
              align-items: center;
              button:hover {
                color: #00A1D6;
              }
              .browsing_history_clear_button {
                background-color: #FFFFFF;
                border: 0;
                color: #A7A9AB;
                // justify-content: center;
                // align-content: center;
              }
            }
          }
        }
      }
      // 投稿
      .contribute {
        background-color: #FB7299;
        height: 70%;
        width: 9rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2rem;
        a {
          color: #F4F4F4 !important;
        }
      }
    }
  }
}


</style>

