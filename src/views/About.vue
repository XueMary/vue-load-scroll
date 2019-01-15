<template>
  <div class="home">
    上滑加载更多
    <Scroll 
      class="xue-hei"
      @upScroll="scroll"
    >
      <ul>
        <li v-for="item in nais" :key="item">{{item}}</li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../components/vue-scroll'
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
    get(){
      for(let i= 0; i<20;i++)
        {
          this.nais.push(i)
        }
    },
    scroll(end){
      setTimeout(()=>{
        let i = this.nais.length
        let n = i + 20
        for(i;i<n;i++)
        {
          this.nais.push(i)
        }
        end() // 事件完成后调用
      },1000)
    }
  },
  mounted(){
    this.get()
  }
  
}
</script>
<style>
.xue-hei{
  height: 150px;
}
</style>

