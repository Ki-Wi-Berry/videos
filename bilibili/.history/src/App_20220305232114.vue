<template>
  <div class="bilibili_home_page">
    <!-- <head-line></head-line> -->
    <!-- <content-classification></content-classification> -->
  </div>
  <template>
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
</template>
</template>

<script>
//导航栏
import HeadLine from "./components/home-page/HeadLine.vue";
// 分类
import ContentClassification from "./components/home-page/ContentClassification.vue";

import { ArrowDown } from '@element-plus/icons-vue'
import { ElDropdownMenu,ElDropdownItem } from "element-plus";

export default {
  name: "MyApp",
  components: {
    HeadLine,
    ContentClassification,
    ElDropdownMenu,
    ElDropdownItem,
  },
  setup(){
    return{
      ArrowDown
    }
  }
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