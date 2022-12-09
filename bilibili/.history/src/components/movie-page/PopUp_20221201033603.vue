<template>
    <div class="pop-up">
        <span>已装填2000条弹幕</span>
        <div class="send-wrap">

            <input type="text" class="input" placeholder="发个友善的弹幕见证当下">
            <span class="send-btn">发送</span>
        </div>
    </div>

</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.pop-up {
  //   margin-top: 2rem;
  width: 80rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;

  .send-wrap {
    .input {
      width: 30rem;
      height: 3rem;
      //   line-height: 3rem;
      outline: none;
      border-radius: .5rem 0 0 .5rem;
      padding: 0;
      padding-left: 1rem;
      background-color: rgba(194, 194, 194, .4);
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
  }
}


</style>