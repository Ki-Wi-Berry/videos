<template>
  <head-line></head-line>
  <Panel title="视频搜索结果">
    <div class="video-box">
      <template v-for="item in movieLists" :key="item.id">
        <VideoCell :movieData="item" />
      </template>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { VideoCell, Panel, HeadLine } from "../../components";
import { getSearchMovieList } from "../../api/request";

const route = useRoute();

const movieLists = ref([]);

onMounted(async () => {
  // console.log(route?.query?.content)
  const { movieList } = await getSearchMovieList({
    searchContent: route?.query?.content || "",
  });
  //   console.log(movieList);
  movieLists.value = movieList;
  // if (userInfo) {
  //   readOnly.value = true;
  // }
});
</script>

<style lang="less" scoped>
.video-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
