<template>
  <div class="bilibili_home_page">
    <head-line></head-line>
  </div>
</template>

<script>
//导航栏组件
import HeadLine from "./components/home-page/HeadLine.vue";


export default {
  name: "MyApp",
  components: {
    HeadLine,
  },
  
};
</script>

<style lang="less" scoped>
.bilibili_home_page {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 0;
  background-color: #F4F4F4;
}

</style>