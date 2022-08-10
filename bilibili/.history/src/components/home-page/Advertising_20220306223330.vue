<template>
  <!-- 推广 -->
  <div class="home_page_advertising">
    <div class="home_page_advertising_headline">
      <div class="home_page_advertising_headline_left">
        <div class="broad_heading_picture1"></div>
        <span class="advertising_promotion">推广</span>
        <div class="broad_heading_picture2"></div>
        <a href="#">
          <span>这样的御坂美琴，你见过么</span>
        </a>
        <div class="broad_heading_picture2"></div>
        <a href="#">
          <span>百万UP创作分享，你要不要吧！</span>
        </a>
      </div>
      <div class="home_page_advertising_headline_right">
        <a href="#">
          <span>观看列表</span>
        </a>
      </div>
    </div>
    <div class="home_page_advertising_video_all">
      <div class="home_page_advertising_video_left">
        <div
          class="home_page_advertising_video"
          v-for="(item, index) in data.home_page_advertising_video"
          :key="item"
        >
          <a href="#" class="home_page_advertising_video_a_top">
            <div
              class="home_page_advertising_video_"
              :style="'background-image: url(./src/assets/image/' + (index + 8) + '.jpg);'"
            ></div>
            <span>{{ item.up }}</span>
          </a>
          <a href="#" class="home_page_advertising_video_a_bottom">
            <span>{{ item.down }}</span>
          </a>
        </div>
      </div>
      <div class="home_page_advertising_video_right">
        <a href="#">
          <div class="home_page_advertising_video_right_content"></div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup name= "Advertising">
const data = {
  //推广
  home_page_advertising_video: [
    {
      up: "来霍格沃茨学习魔法",
      down: "哈利波特魔法觉醒",
    },
    {
      up: "【一看你就饿】辣油浇肉呲溜一嗦，每根粉都好吃到飙泪！",
      down: "哔哩哔哩纪录片",
    },
    {
      up: "每天建模一小时，【接单】赚外块！",
      down: "建模大师",
    },
    {
      up: "《我退休的妈妈用她离谱的声线唱古风歌》",
      down: "拯救世界的狗子",
    },
  ],
};
</script>

<style lang="less" scoped>
// 推广
.home_page_advertising {
  margin-top: 4rem;
  .home_page_advertising_headline {
    width: 105rem;
    display: flex;
    flex-direction: row;
    .home_page_advertising_headline_left {
      width: 70rem;
      display: flex;
      flex-direction: row;
      // justify-content: start;
      align-items: center;
      .broad_heading_picture1 {
        height: 2.5rem;
        width: 2.5rem;
        background-color: #9D9FA0;
      }
      .advertising_promotion {
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 2rem;
      }
      .broad_heading_picture2 {
        margin-left: 1rem;
        margin-right: 1rem;
        height: 1.5rem;
        width: 1.5rem;
        background-color: #9D9FA0;
      }
      span {
        font-size: 1.3rem;
      }
    }
    .home_page_advertising_headline_right {
      width: 35rem;
      display: flex;
      justify-content: end;
      a {
        width: 25rem;
        border: .1rem solid #87888A;
        background-color: #8D8D8D2D;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 1.2rem;
          color: #000000;
        }
      }
      a:hover {
        span {
          color: #00A1D6;
        }
      }
    }
  }
  .home_page_advertising_video_all {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    height: 20rem;
    width: 105rem;
    .home_page_advertising_video_left {
      width: 70rem;
      display: flex;
      justify-content: space-between;
      .home_page_advertising_video {
        width: 15rem;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        a {
          margin-top: 1rem;
          margin-bottom: 1rem;
          span {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 1.4rem;
            color: #000000;
          }
          .home_page_advertising_video_ {
            width: 17rem;
            height: 10rem;
            background-size: contain;
          }
        }
        a:hover {
          span {
            color: #00A1D6;
          }
        }
        .home_page_advertising_video_a_bottom {
          span {
            color: #A7A9AB;
            font-size: 1.2rem;
          }
        }
      }
    }
    .home_page_advertising_video_right {
      width: 30rem;
      height: 15rem;
      a {
        .home_page_advertising_video_right_content {
          width: 30rem;
          height: 17.5rem;
          background-size: contain;
          background-image: url(./icon/12.jpg);
        }
      }
    }
  }
}



</style>