<template>
  <div class="home">
    状态
    <Scroll 
      @downScroll="scroll"
      @upScroll="scroll"
      :length='nais.length'
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
      nais: [],
      emptyIcon: require('../assets/logo.png')
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

