<template>
    <div class="send-wrap">
        <span>三人正在观看，有2000条弹幕</span>
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
  border-radius: .5rem;
  padding: 0;
  padding-left: 1rem;
}

.send-btn {
  height: 3.8rem;
  line-height: 3.8rem;
  text-align: center;
  font-weight: bold;
  color: #FFFFFF;
  background: #93D0EA;
  text-shadow: .1rem .1rem .1rem #333333;
  border-radius: .5rem;
  margin: 0 2.0rem 2.0rem 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  padding: .5rem 1.5rem;
}


</style>