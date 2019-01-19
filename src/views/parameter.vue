<template>
  <div class="home">
    参数更改
    <Scroll 
      class="xue-hei"
      @upScroll="upScroll"
      @downScroll="downScroll"
      :iconColor="['red','blue']"
      :iconBgColor="['black', 'red']"
      loadText="努力加载中"
      loadEndText="加载完成"
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
    downScroll(end){
      this.nais.length = 0
      setTimeout(()=>{
        for(let i= 0; i<100;i++)
        {
          this.nais.push(i)
        }
        end && end() // 事件完成后调用
      },1000)
    },
    upScroll(end){
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
    this.downScroll()
  }
  
}
</script>
<style>
.xue-hei{
  height: 150px;
}
</style>