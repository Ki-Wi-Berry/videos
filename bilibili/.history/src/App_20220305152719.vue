<template>
  <div>
    <!-- <el-button :icon="Search"></el-button> -->
    <head-line></head-line>
  </div>
</template>

<script>
//导航栏组件
import HeadLine from "./components/home-page/HeadLine.vue";
import { Search } from "@element-plus/icons-vue";
export default {
  name: "MyApp",
  setup() {
    return {
      Search,
    };
  },
  data() {},
  components: {
    HeadLine,
  },
};
</script>

<style lang="less" scoped>
</style>