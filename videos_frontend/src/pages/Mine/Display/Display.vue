<template>
  <div class="form-display">
    <div class="form-item-button">
      <ElButton size="large" type="primary" @click="toggleReadOnly(false)">修改</ElButton>
    </div>
    <div class="form-item">手机号：{{ ruleForm.phoneNumber }}</div>
    <div class="form-item">用户昵称：{{ ruleForm.userName }}</div>
    <div class="form-item">简介：{{ ruleForm?.description || "-" }}</div>
    <div class="form-item">年龄：{{ ruleForm?.userAge || "-" }}</div>
    <div class="form-item">
      头像：
      <img
        class="user-img"
        :src="ruleForm.userImgUrl || defaultUserImgUrl"
        alt="头像加载失败"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import type { RuleForm } from "../enum.ts";
import { ElButton } from "element-plus";
import { defaultUserImgUrl } from "../../../const/const";

const props = defineProps({
  ruleForm: Object as PropType<RuleForm>,
  toggleReadOnly: Function as PropType<(status: boolean) => void>,
});
</script>

<style lang="less" scoped>
.form-display {
  position: relative;
}
.form-item-button {
  position: absolute;
  top: -75px;
  right: 70px;
}
.form-item {
  margin-bottom: 20px;
  color: #606266;
}
.user-img {
  height: 100px;
}
</style>
