<template>
  <HeadLine
    :top_navigation_bar_login_background_color="'#ffffff'"
    top_navigation_bar_search_background_color="#ffffff !important"
    top_navigation_bar_shadow="0 2px 4px #00000014 !important"
  ></HeadLine>
  <Panel title="个人信息">
    <Display
      :toggleReadOnly="toggleReadOnly"
      :ruleForm="ruleForm"
      v-if="readOnly"
    />
    <Edit
      :userInfoChange="userInfoChange"
      :toggleReadOnly="toggleReadOnly"
      :ruleForm="ruleForm"
      v-else
    />
  </Panel>
  <Panel title="上传视频">
    <div class="video-box">
      <template v-for="item in movieLists" :key="item.id">
        <VideoCell :movieData="item" />
      </template>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import { HeadLine } from "../../components";
import Display from "./Display/Display.vue";
import Edit from "./Edit/Edit.vue";
import { VideoCell } from "../../components";
import { Panel } from "../../components";
import { onMounted, ref } from "vue";
import {
  getUserInfoDetail,
  changeUserInfoDetail,
  getUserMovies,
} from "../../api/request";
import type { RuleForm } from "./enum.ts";

const ruleForm = ref<RuleForm>({
  userName: "",
  userImgUrl: "",
  userAge: "",
  phoneNumber: "",
});

const movieLists = ref([]);

const readOnly = ref<boolean>(true);

const toggleReadOnly = (status: boolean) => {
  // console.log(status);
  readOnly.value = status;
};

const userInfoChange = (userInfo: RuleForm) => {
  // readOnly.value = status;
  console.log(userInfo);
  changeUserInfoDetail(userInfo);
};

onMounted(async () => {
  const userInfo = await getUserInfoDetail();
  console.log(userInfo);
  ruleForm.value = userInfo;
  const { movieList } = await getUserMovies();
  console.log(movieList);
  movieLists.value = movieList;
  // if (userInfo) {
  //   readOnly.value = true;
  // }
});
</script>

<style lang="less" scoped>
.video-box{
  display: flex;
  flex-wrap: wrap;
  gap:10px;
}
</style>
