<template>
  <!-- 分类 -->
  <div class="content_classification">
    <!-- 大类 -->
    <div class="broad_heading">
      <ul class="broad_heading_ul">
        <li v-for="item in data.broad_heading_ul_li" :key="item">
          <a href="#">
            <div class="broad_heading_picture"></div>
            <span>{{ item }}</span>
          </a>
        </li>
      </ul>
    </div>
    <span class="the_divider_1"></span>
    <!-- 细分类 -->
    <div class="content_classification_subdivision">
      <ul>
        <li v-for="item in data.content_subdivision_list_up" :key="item">
          <a href="#">
            <el-dropdown class="content_subdivision_item" placement="top-start">
              <div class="el-dropdown-link">
                <span class="content_subdivision_item_span">
                  {{ item }}
                </span>
                <div class="content_subdivision_num">
                  <em class="content_subdivision_num_color"> 999+ </em>
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="content_subdivision_dropdown_menu">
                  <el-dropdown-item
                    v-for="item1 in data.content_subdivision_list_float"
                    :key="item1"
                  >
                    {{ item1 }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </a>
        </li>
        <li v-for="item in data.content_subdivision_list_down" :key="item">
          <a href="#">
            <el-dropdown class="content_subdivision_item">
              <div class="el-dropdown-link">
                <span class="content_subdivision_item_span">
                  {{ item }}
                </span>
                <div class="content_subdivision_num">
                  <em class="content_subdivision_num_color"> 999+ </em>
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="content_subdivision_dropdown_menu">
                  <el-dropdown-item
                    v-for="item1 in data.content_subdivision_list_float"
                    :key="item1"
                  >
                    {{ item1 }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </a>
        </li>
        <li class="special">
          <el-dropdown
            class="content_subdivision_item"
          >
            <div class="el-dropdown-link">
              <div class="content_subdivision_item_span">
                <span class="content_subdivision_item_span_more"> 更多 </span>
              </div>
              <div class="content_subdivision_num">
                <el-icon class="el-icon-arrow-down el-icon--right"><arrow-down /></el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu class="content_subdivision_dropdown_menu">
                <el-dropdown-item
                  v-for="item1 in data.content_subdivision_list_float"
                  :key="item1"
                >
                  {{ item1 }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
    <span class="the_divider_2"></span>
    <!-- 功能分类 -->
    <div class="content_functional_classification">
      <ul>
        <li v-for="item in data.content_functional_classification" :key="item">
          <a href="#">
            <div class="broad_heading_picture"></div>
            <span>{{ item }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup name="ContentClassification">
import { reactive } from "vue";
import { ElDropdown,ElDropdownMenu, ElDropdownItem } from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";

const data = reactive({
  //分类
  //大类
  broad_heading_ul_li: ["首页", "动态", "热门", "频道"],
  //细分
  content_subdivision_list_up: [
    "动画",
    "音乐",
    "舞蹈",
    "知识",
    "生活",
    "时尚",
    "娱乐",
    "放映厅",
  ],
  content_subdivision_list_down: [
    "番剧",
    "国创",
    "游戏",
    "科技",
    "鬼畜",
    "咨讯",
    "影视",
  ],
  content_subdivision_list_float: [
    "搞笑",
    "家具房产",
    "手工",
    "绘画",
    "日常",
    "短片",
    "预告",
  ],
  // 功能分类
  content_functional_classification: [
    "专栏",
    "活动",
    "小黑屋",
    "直播",
    "课堂",
    "新歌热榜",
  ],
});
// const handleCommand = (command: string | number | object) => {
//   ElMessage(`click on item ${command}`);
// };
</script>

<style lang="less" scoped>
// 分类模块
.content_classification {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  // 大类
  .broad_heading {
    .broad_heading_ul {
      display: flex;
      flex-direction: row;
      justify-content: start;
      li {
        padding: 0 1rem;
        a {
          font-weight: lighter;
          font-size: 1.6rem;
          color: #000000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          .broad_heading_picture {
            height: 4rem;
            width: 4rem;
            background-color: #9D9FA0;
          }
        }
        a:hover {
          span {
            color: #00A1D6;
          }
        }
      }
    }
  }
  // 分割线
  .the_divider_1 {
    height: 4rem;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: .6rem;
    border: .1rem solid #E7E7E7;
  }
  .the_divider_2 {
    height: 4rem;
    margin-top: 1rem;
    margin-right: .6rem;
    border: .1rem solid #E7E7E7;
  }
  // 细分
  .content_classification_subdivision {
    width: 55rem;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      li {
        height: 3.3rem;
        // width: 65rem;
        a {
          height: 3rem;
          display: flex;
          flex-direction: row;
          justify-content: start;
          color: #000000;
          .content_subdivision_item {
            display: flex;
            justify-content: start;
            align-items: center;
            height: 3rem;
            .el-dropdown-link {
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: center;
              height: 3rem;
              color: #000000;
              .content_subdivision_item_span {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                // padding-right: 3rem;
                padding-left: .5rem;
                font-size: 1.4rem;
              }

              .content_subdivision_num {
                height: 3rem;
                display: flex;
                justify-content: start;
                align-items: center;
                text-align: center;
                font-size: 1.2rem;
                // transform: scale(.65);
                .content_subdivision_num_color {
                  background-color: #73C9E5;
                  color: #FFFFFF;
                  border-radius: .2rem;
                  transform: scale(.8);
                }
              }
            }

            .el-dropdown-link:hover {
              .content_subdivision_num {
                color: #00A1D6;
              }
            }
          }
        }
      }
      .special {
        .el-dropdown-link {
          height: 3rem;
          display: flex;
          flex-direction: row;
          justify-content: start;
          align-items: center;
          color: #000000;
          .content_subdivision_item_span {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.4rem;
            padding-right: .3rem;
            padding-left: .8rem;
            .content_subdivision_item_span_more:hover {
              cursor: default;
            }
          }
        }
        .el-dropdown-link:hover {
          .content_subdivision_num {
            color: #00A1D6;
          }
        }
      }
      li:hover {
        span {
          color: #00A1D6;
        }
      }
    }
  }
  // 功能分类
  .content_functional_classification {
    width: 26rem;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: start;
      flex-wrap: wrap;
      li {
        height: 3rem;
        // width: 72rem;
        a {
          color: #000000;
          display: flex;
          .broad_heading_picture {
            // margin: 5rem;
            margin-top: .5rem;
            height: 2rem;
            margin-right: 1rem;
            margin-left: 1rem;
            width: 2rem;
            background-color: #9D9FA0;
          }
          span {
            height: 3rem;
            font-size: 1.3rem;
            // padding-right: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        a:hover {
          span {
            color: #00A1D6;
          }
        }
      }
    }
  }
}

// elmentUI
.content_subdivision_dropdown_menu {
  height: 13.0rem;
  width: 13.3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: #FFFFFF;
  .el-dropdown-menu__item {
    // background-color: #FFFFFF;
    font-size: 1.2rem;
    line-height: 3.0rem;
    // height: 20rem;
    // width: 48rem;
    margin: 0;
    padding-left: 1.0rem;
    border: 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .el-dropdown-menu__item:hover {
    background-color: #FFFFFF;
    // height: 20rem;
  }
}






</style>
