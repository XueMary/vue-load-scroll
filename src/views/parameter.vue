<template>
  <div class="home">
    参数更改
    <Scroll 
      class="xue-hei"
      :length="nais.length"
      @downScroll="downScroll"
      loadEndText='加载完成'
      iconBgColor="black"
      loadText="正在加载......"
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
      img: require('../assets/logo.png')
    }
  },
  methods:{
    downScroll(end){
      this.nais.length = 0
      setTimeout(()=>{
        for(let i= 0; i<100;i++)
        {
          this.nais.push(i)
        }
        end() // 事件完成后调用
      },1000)
    },
    upScroll(end){
      setTimeout(()=>{
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