<template>
  <nav class="top_navigation">
    <ul
      class="top_navigation_bar"
      :style="{ 'box-shadow': '0 2px 4px #00000014 !important' }"
    >
      <li
        class="top_navigation_bar_li"
        v-for="(item, index) in data.topNavigationBarLeft"
        :key="item"
      >
        <router-link :to="data.topNavigationBarHrefLeft[index]">{{
          item
        }}</router-link>
      </li>
      <!-- 搜索导航 -->
      <li class="top_navigation_bar_li">
        <div class="search_record_box" id="search_record_box_id">
          <!-- 搜索框 -->
          <div
            class="top_navigation_bar_input"
            :style="{
              'background-color': '#ffffff',
            }"
          >
            <input
              @blur="hide_browsing_history1"
              @focus="show_browsing_history1"
              v-model="data.inputValue"
              @keyup.enter="searchMovie "
              type="text"
              placeholder="请输入"
              :style="{
                'background-color': '#ffffff',
              }"
            />
            <el-button :icon="Search" class="el-icon-search"></el-button>
          </div>
          <!-- 浏览记录-->
          <!-- <div
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
          </div> -->
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
            v-if="store.isLogin"
            to="/mine"
            :class="{
              top_navigation_bar_login: true,
              show_login_box_drop: data.login_box_animation == 1,
              hide_login_box_drop: data.login_box_animation == 0,
            }"
            :style="{
              'background-image': `url(${
                headerUserInfo?.userImgUrl || defaultUserImgUrl
              })`,
            }"
          >
          </router-link>
          <router-link
            v-else
            :class="{
              router_link_login: true,
            }"
            to="/login"
            >登录</router-link
          >

          <!-- 登录下拉框 -->
          <div
            :class="{
              top_navigation_bar_login_drop: true,
              hide_login_box_drop_plus: !data.login_box_animation,
              show_login_box_drop_plus: data.login_box_animation,
            }"
            v-show="data.login_box_drop"
          >
            <div class="top_navigation_bar_login_username">
              <span>{{ headerUserInfo?.userName }}</span>
            </div>
            <div class="top_navigation_bar_login_status_box">
              <div
                class="top_navigation_bar_login_status"
                v-for="item in followFanList"
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
            <router-link to="/mine" class="top_navigation_bar_login_user_space">
              <div class="top_navigation_bar_login_user_box">
                <el-icon class="avatar"><avatar /></el-icon>
                <span>个人中心</span>
                <el-icon class="arrow"><arrow-right-bold /></el-icon>
              </div>
            </router-link>
            <!-- 退出登录 -->
            <div
              @click="login_out"
              class="top_navigation_bar_unlogin top_navigation_bar_login_user_space"
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
        v-for="(item, index) in data.topNavigationBarRight "
        :key="item"
      >
        <router-link :to="data.topNavigationBarHrefRight [index]">{{
          item
        }}</router-link>
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

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
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
import { getHeaderUserInfo } from "../api/request";
const store = useStore();
import { defaultUserImgUrl } from "../const/const";
// const {count} = storeToRefs(Store)

const router = useRouter();

const props = defineProps({
  // 导航栏阴影
  top_navigation_bar_shadow: String,
  // 搜索框背景颜色
  top_navigation_bar_search_background_color: String,
});

const data = reactive({
  //头部导航栏
  inputValue: "",
  home_top_navigation_list: ["海贼王", "元龙", "狐妖小红娘"],
  topNavigationBarLeft: [
    "首页",
    "首页",
    "首页",
    "首页",
    "首页",
    "首页",
    "首页",
    "首页",
  ],
  topNavigationBarRight : ["首页", "首页", "首页", "首页", "首页", "首页"],
  topNavigationBarHrefLeft: ["/", "/", "/", "/", "/", "/", "/", "/"],
  topNavigationBarHrefRight : ["/", "/", "/", "/", "/", "/"],
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
  ],
  login_box_drop: 0,
  login_box_animation: 2,
});

const followFanList = computed(() => {
  return [
    // {
    //   nums: headerUserInfo.value?.followNumber || 0,
    //   text: "关注",
    // },
    // {
    //   nums: headerUserInfo.value?.fanNumber || 0,
    //   text: "粉丝",
    // },
  ];
});

interface HeaderUserInfo {
  userId: string;
  userName: string;
  userImgUrl: string;
  followNumber: number;
  fanNumber: number;
}

const headerUserInfo = ref<HeaderUserInfo>();

onMounted(async () => {
  headerUserInfo.value = await getHeaderUserInfo();
});

// 跳转到搜索页面
const searchMovie  = function (): void {
  // data.home_top_navigation_list.push(data.inputValue);
  router.push({
    name: "search",
    query: {
      content: data.inputValue,
    },
  });
};
// 删除历史记录
const remove = function (index: number): void {
  // console.log("删除");
  // console.log(index);
  data.home_top_navigation_list.splice(index, 1);
};
// 清空历史记录
const clear = function (): void {
  data.home_top_navigation_list = [];
};
// 显示历史记录
const show_browsing_history1 = function (): void {
  data.browsing_history_show_or_not1 = 1;
};
// 隐藏历史记录
const hide_browsing_history1 = function (): void {
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
const show_login_box_animation = async function (): Promise<void> {
  if (store.isLogin) {
    clearTimeout(hide_drop_time);
    clearTimeout(hide_drop_time_plus);
    show_drop_time = await setTimeout(() => {
      data.login_box_animation = 1;
      data.login_box_drop = 1;
    }, 200);
  }
};

// 隐藏登录下拉菜单
const hide_login_box_drop = async function (): Promise<void> {
  if (store.isLogin) {
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
const login_out = function (): void {
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
  background-color: #ffffff;
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
          z-index: 1000;
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
        }
        .router_link_login {
          margin-top: 0.8rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50% !important;
          background-color: #cfd0d0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #00a1d6 !important;
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
          background-color: #ffffff;
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
            // opacity: 1;
            color: #000000 !important;
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
      .show_login_box_drop {
        animation: rightDownMove 0.2s forwards;
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
        animation: leftUpMove 0.6s forwards;
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
        animation: show_login_drop 0.6s forwards;
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
        animation: hide_login_drop 0.6s forwards;
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
          background-color: #ffffff;
          padding-left: 0.5rem;
          margin-top: 0.5rem;
          border: #a7a9ab4c 1px solid;
          border-radius: 0.5rem;
          input {
            font-size: 1.4rem;
            height: 4rem;
            width: 21rem;
            color: #a7a9ab;
            border-radius: 0.5rem;
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
            border-radius: 0 0.5rem 0.5rem 0;
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
          box-shadow: 0 2px 4px #00000014 !important;
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
        background-color: #409eff;
        height: 70%;
        width: 9rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 2rem;
        a {
          color: #ffffff !important;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
