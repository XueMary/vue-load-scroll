<template>
  <div class="idle">
    <slot name="idle" v-if="load === 'idle'">
      <div v-if="startIcon">
        <img src="startIcon"/>
      </div>
      
      <div v-else class="idle-content" :style="{background:color}">
        <i class="iconfont icon-reload"></i>
      </div>
    </slot>
    
    <slot name="load"  v-if="load === 'start'">
      <div v-if="loadIcon" class="load">
        <img src="loadIcon"/>
      </div>
      <div v-else class="load">
        <i class="iconfont icon-loading1"></i>
      </div>
    </slot>
    
    <p v-if="load === 'end'">{{text}}</p>
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
  }
}
</script>

<style>
@import url("./font/iconfont.css");

.idle{
  text-align: center;
}

.idle-content {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
}

.load {
  animation: rotate 1s infinite linear;
  -webkit-animation: rotate 1s infinite linear;
}

.icon-reload {
  font-size: 18px;
  color: white;
}
.icon-loading1 {
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
