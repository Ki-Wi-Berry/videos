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
    border-radius: 5px;
    padding: 0;
    padding-left: 1rem;
}

.send-btn {
    height: 3.8rem;
    line-height: 3.8rem;
    text-align: center;
    font-weight: bold;
    color: #fff;
    background: #93d0ea;
    text-shadow: 0.1rem 0.1rem 0.1rem #333;
    border-radius: 0.5rem;
    margin: 0 2.0rem 2.0rem 0;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    padding: 0.5rem 1.5rem;
}
</style>