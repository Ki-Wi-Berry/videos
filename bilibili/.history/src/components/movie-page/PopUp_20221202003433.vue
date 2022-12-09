<template>
  <div class="pop_up">
    <span>已装填2000条弹幕</span>
    <div class="send-wrap">

      <input type="text" class="input" placeholder="发个友善的弹幕见证当下">
      <div class="send-btn">
        <span class="send-btn">发送</span>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.pop_up {
  //   margin-top: 2rem;
  width: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;

  .send-wrap {
    .input {
      width: 30rem;
      height: 3.8rem;
      outline: none;
      border-radius: .5rem 0 0 .5rem;
      padding: 0;
      padding-left: 1rem;
      background-color: rgba(194, 194, 194, .4);
    }

    .send-btn {
      height: 3.8rem;
      width: 6rem;
      text-align: center;
      color: #FFFFFF;
      background-color: #93D0EA;
      text-shadow: .1rem .1rem .1rem #333333;
      border-radius: 0 .5rem .5rem 0;
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
  }
}
</style>