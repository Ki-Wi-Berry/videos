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

    .send-btn {
      height: 38px;
      line-height: 38px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      background: #93d0ea;
      text-shadow: 1px 1px 1px #333;
      border-radius: 5px;
      margin: 0 20px 20px 0;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      padding: 5px 15px;
    }
</style>