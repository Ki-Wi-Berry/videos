<template>
  <div class="pop_up">
    <span style="color: ;#00AEEC">已装填2000条弹幕</span>
    <div class="send_wrap">

      <input type="text" class="input" placeholder="发个友善的弹幕见证当下">
      <div class="send_btn">
        <span class="send_btn_span">发送</span>
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

  .send_wrap {
    display: flex;
    .input {
      width: 30rem;
      height: 3.8rem;
      outline: none;
      border-radius: .5rem 0 0 .5rem;
      padding: 0;
      padding-left: 1rem;
      background-color: rgba(194, 194, 194, .4);
    }

    .send_btn {
      height: 3.8rem;
      width: 6rem;
      text-align: center;
      color: #FFFFFF;
      font-size: 1.5rem;
      background-color: #00AEEC;
      border-radius: 0 .5rem .5rem 0;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>