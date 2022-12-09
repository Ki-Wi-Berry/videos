<template>
    <div class="send-wrap">
        <input type="text" class="input" placeholder="弹幕发送">
        <span class="send-btn">发送</span>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.send-wrap {
    margin-top: 2rem;
}
.input {
      width: 30rem;
      height: 3rem;
      line-height: 3rem;
      outline: none;
      border-radius: 0.5rem;
      padding: 0;
      padding-left: 1rem;
    }
</style>