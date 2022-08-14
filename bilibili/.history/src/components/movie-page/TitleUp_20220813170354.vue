<template>
  
  <!-- 标题以及UP主 -->
  <div class="movie_title_up">
    <!-- 标题 -->
    <div class="movie_title">
      <div>
        <span class="movie_title_name"> 你被骗了 </span>
      </div>
    </div>
    <!-- UP主 -->
    <div></div>
  </div>
</template>

<script setup>
import {useStore} from "../../../store";
import {storeToRefs}  from 'pinia'
const store=useStore();
const {top_navigation_bar_height} = storeToRefs(store);

store.top_navigation_bar_height="5rem";


</script>

<style lang="less" scoped>
</style>