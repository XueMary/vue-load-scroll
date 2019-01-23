<template>
  <div class="scroll-com-idle">
    <!-- load start -->
    <div v-show="load === 'idle' && type !== 'footer'">
      <div v-if="startIcon" class="scroll-com-start-load">
        <img :src="startIcon"/>
      </div>
      
      <div v-else-if="startIcon !== false" class="scroll-com-content">
        <i class="iconfont icon-reload"></i>
      </div>
    </div>
    
    <!-- loading -->
    <Loading
      :load="load"
      :text="text"
      :color="color"
      :loadIcon="loadIcon"
    />
    
    <!-- load end -->
    <p v-show="load === 'end'" class="scroll-com-text">{{endText}}</p>
  </div>
</template>

<script>
function propsHandle(value,type) {
  return {
    type: type || [String, Boolean],
    default: value || ''
  };
}

import Loading from './loading'
export default {
  components:{
    Loading
  },
  props: {
    load: propsHandle('idle'),
    text: propsHandle(),
    color: propsHandle('black'),
    startIcon: propsHandle(),
    loadIcon: propsHandle(),
    endText: propsHandle(),
    type: propsHandle(null, String),
  }
};
</script>

<style>
@import url("./font/iconfont.css");

.scroll-com-idle {
  text-align: center;
}

.scroll-com-content {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  background: black;
}

.scroll-com-content .icon-reload {
  font-size: 18px;
  color: white;
}

.scroll-com-text {
  font-size: 14px;
}


</style>
