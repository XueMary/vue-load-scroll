<template>
  <div class="scroll-idle">
    <!-- load start -->
    <div v-show="load === 'idle'">
      <div v-if="startIcon" class="scroll-start-load">
        <img :src="startIcon"/>
      </div>
      
      <div v-else-if="startIcon !== false" class="scroll-content" :style="{background:bgColor}">
        <i class="iconfont icon-reload"></i>
      </div>
    </div>
    
    <!-- loading -->
    <div v-show="load === 'start'" class="scroll-start">
      <div v-if="loadIcon" class="scroll-load">
        <img :src="loadIcon"/>
      </div>
      <div v-else-if="loadIcon !== false" class="scroll-load">
        <i class="iconfont icon-29" :style="{color}"></i>
      </div>
      <span class="scroll-load-text scroll-text">{{text}}</span>
    </div>
    
    <!-- load end -->
    <p v-show="load === 'end'" class="scroll-text">{{endText}}</p>
  </div>
</template>

<script>
function propsHandle(value = '') {
  return {
    type: [String, Boolean],
    default: value
  };
}
export default {
  props: {
    load: propsHandle('idle'),
    text: propsHandle(),
    color: propsHandle('black'),
    bgColor: propsHandle("#42b983"),
    startIcon: propsHandle(),
    loadIcon: propsHandle(),
    endText: propsHandle()
  }
};
</script>

<style>
@import url("./font/iconfont.css");

.scroll-idle {
  text-align: center;
}

.scroll-content {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.scroll-content .icon-reload {
  font-size: 18px;
  color: white;
}

.scroll-start {
  line-height: 24px;
}

.scroll-load {
  display: inline-block;
  transform-origin: center center;
  -webkit-transform-origin: center center;
  animation: rotate 2s infinite linear;
  -webkit-animation: rotate 2s infinite linear;
}

.scroll-load i {
  font-size: 20px;
}
.scroll-load img,
.scroll-start-load img {
  width: 20px;
  height: 20px;
}

.scroll-load-text {
  margin-left: 5px;
}

.scroll-text {
  font-size: 14px;
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
