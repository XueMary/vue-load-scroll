<template>
  <div class="scroll-com-load">
    <i class="iconfont icon-29"></i>
  </div>
</template>

<style>
@import url("./font/iconfont.css");

.scroll-com-load {
  display: inline-block;
  transform-origin: center center;
  -webkit-transform-origin: center center;
  animation: rotate 2s infinite linear;
  -webkit-animation: rotate 2s infinite linear;
}

.scroll-com-load i {
  font-size: 20px;
}

.scroll-com-load img,
.scroll-com-start-load img {
  width: 20px;
  height: 20px;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes rotate /* Safari 和 Chrome */ {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
