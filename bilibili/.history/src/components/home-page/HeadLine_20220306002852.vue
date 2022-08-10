<template>
  <nav class="top_navigation">
    <ul class="top_navigation_bar">
      <li
        class="top_navigation_bar_li"
        v-for="item in data.top_navigation_bar_left"
        :key="item"
      >
        <a href="#">{{ item }}</a>
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
        class="top_navigation_bar_li"
        v-for="item in data.top_navigation_bar_right"
        :key="item"
      >
        <a href="#">{{ item }}</a>
      </li>
      <li class="top_navigation_bar_li">
        <div class="contribute">
          <a href="#"> 投稿 </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script name: "HeadLine" setup>
import { reactive } from "vue";
import { Search, Close } from "@element-plus/icons-vue";
import { ElButton } from "element-plus";


  
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
      browsing_history_show_or_not1: 0,
    });
    // 添加历史记录
    const add = function () {
      this.data.home_top_navigation_list.push(this.data.inputValue);
    };
    // 删除历史记录
    const remove = function (index) {
      // console.log("删除");
      // console.log(index);
      this.data.home_top_navigation_list.splice(index, 1);
    };
    // 清空历史记录
    const clear = function () {
      this.data.home_top_navigation_list = [];
    };
    // 显示历史记录
    const show_browsing_history1 = function () {
      this.data.browsing_history_show_or_not1 = 1;
    };
    // 隐藏历史记录
    const hide_browsing_history1 = function () {
      document.addEventListener("click", (e) => {
        var box = document.getElementById("search_record_box_id");
        if (!box.contains(e.target)) {
          // console.log("在外");
          this.data.browsing_history_show_or_not1 = 0;
        }
      });
    };


  },

</script>

<style lang="less" scoped>
// 头部导航栏
.top_navigation {
  width: 100%;
  background-color: #9D9FA0;
  height: 14rem;
  padding-top: 1rem;
  .top_navigation_bar {
    line-height: 4rem;
    display: flex;
    justify-content: space-between;
    .top_navigation_bar_li {
      line-height: 4rem;
      list-style: none;
      padding: 0 .7rem;
      a {
        color: #F4F4F4;
        text-decoration: none;
      }
      // 搜索记录模块
      .search_record_box {
        height: 4rem;
        width: 33.45rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top_navigation_bar_input {
          display: flex;
          justify-content: space-between;
          background-color: #FFFFFF;
          padding-left: .5rem;
          input {
            font-size: 1.7rem;
            width: 27rem;
            color: #A7A9AB;
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
            border-radius: 0;
            border: 0;
            height: 5rem;
            width: 5rem;
            background-color: #E7E7E7;
          }
        }
        // 浏览记录
        .browsing_history {
          z-index: 1;
          margin-top: .1rem;
          height: auto;
          width: 33.45rem;
          display: flex;
          flex-direction: column;
          justify-content: start;
          .browsing_history_li {
            background-color: #FFFFFF;
            width: 33.45rem;
            height: 4rem;
            color: #A7A9AB;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
        width: 8rem;
        text-align: center;
        color: #F4F4F4;
      }
    }
  }
}



</style>