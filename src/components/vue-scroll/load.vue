<template>
  <div class="scroll-idle">
    <div v-show="load === 'idle'">
      <div v-if="startIcon">
        <img src="startIcon"/>
      </div>
      
      <div v-else class="scroll-content" :style="{background:bgColor}">
        <i class="iconfont icon-reload"></i>
      </div>
    </div>
    
    <div v-show="load === 'start'" class="scroll-start">
      <div v-if="loadIcon" class="scroll-load">
        <img src="loadIcon"/>
      </div>
      <div v-else class="scroll-load">
        <i class="iconfont icon-loading1" :style="{color}"></i>
      </div>
      {{text}}
    </div>
    
    <p v-show="load === 'end'">{{endText}}</p>
  </div>
</template>

<script>
export default {
  props:{
    load:{
      type: String,
      default: 'idle'
    },
    text:{
      type: String,
      default: ''
    },
    color:{
      type: String,
      default: 'black'
    },
    bgColor:{
      type: String,
      default: '#42b983'
    },
    startIcon:{
      type: String,
      default: ''
    },
    loadIcon:{
      type: String,
      default: ''
    },
    endText:{
      type: String,
      default: ''
    },
  }
}
</script>

<style>
@import url("./font/iconfont.css");

.scroll-idle{
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

.scroll-load {
  display: inline-block;
  animation: rotate 1s infinite linear;
  -webkit-animation: rotate 1s infinite linear;
}

.scroll-load .icon-loading1 {
  font-size: 24px;
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
