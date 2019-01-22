<template>
  <div v-show="load === 'start'" class="scroll-com-start">

    <div v-if="loadIcon" :class="{'scroll-com-load':!isGif}">
      <img :src="loadIcon"/>
    </div>
    <LoadIcon v-else-if="loadIcon !== false"/>

    <span class="scroll-com-load-text scroll-com-text">{{text}}</span>
  </div>
</template>

<script>
function propsHandle(value) {
  return {
    type: [String, Boolean],
    default: value || ''
  };
}
import LoadIcon from './loadIcon'
export default {
  components:{
    LoadIcon
  },
  props:{
    load: propsHandle('idle'),
    text: propsHandle(),
    loadIcon: propsHandle(),
  },
  computed:{
    isGif(){
      if(typeof this.loadIcon === 'string'){
        var reg =/.gif$/i;
        return reg.test(this.loadIcon)
      }
      return false
    }
  }
}
</script>

<style>
.scroll-com-start {
  line-height: 24px;
}


.scroll-com-load-text {
  margin-left: 5px;
}

.scroll-com-text {
  font-size: 14px;
}
</style>
