<template>
  <div>
    <slot name="idle" v-if="load === 'idle'">
      <div class="idle-content" :style="{background:iconColor}">
        <i class="iconfont icon-reload"></i>
      </div>
    </slot>
    
    <slot name="load"  v-if="load === 'start'">
      <div class="load">
        <i class="iconfont icon-loading1"></i>
      </div>
    </slot>
    
    <p v-if="load === 'end'">{{loadText}}</p>
  </div>
</template>

<script>
export default {
  props:{
    load:{
      type: String,
      default: 'idle'
    },
    loadText:{
      type: String,
      default: ''
    },
    iconColor:{
      type: String,
      default: '#42b983'
    },
  }
}
</script>

<style>
@import url("./font/iconfont.css");

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
