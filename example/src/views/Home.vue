<template>
  <div class="home">
    下拉加载
    <Scroll 
      class="xue-hei"
      :length="nais.length"
      @downScroll="scroll"
    >
      <ul>
        <li v-for="item in nais" :key="item">{{item}}</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../components/vue-scroll/index'
export default {
  name: 'home',
  components:{
    Scroll
  },
  data(){
    return{
      nais: []
    }
  },
  methods:{
    scroll(end){
      this.nais.length = 0
      setTimeout(()=>{
        for(let i= 0; i<100;i++)
        {
          this.nais.push(i)
        }
        end() // 事件完成后调用
      },1000)
    }
  },
  
}
</script>
<style>
.xue-hei{
  height: 500px;
}
</style>

