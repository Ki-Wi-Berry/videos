<template>
  <head-line></head-line>
  <Panel :title='`包含 ${searchContent} 的视频资源`'>
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

const searchContent = ref(route?.query?.content || "");

onMounted(async () => {
  // console.log(route?.query?.content)
  const { movieList } = await getSearchMovieList({
    searchContent: searchContent.value
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
