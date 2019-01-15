<template>
  <div class="home">
    <Scroll 
      class="xue-hei"
      @downScroll="scroll"
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
    scroll(resove){
      setTimeout(()=>{
        let i = this.nais[this.nais.length-1] + 1
        
        if(!i){
          i = 0
        }
        let n = i+100
        for(i; i<n;i++)
        {
          this.nais.push(i)
        }
        resove()
      },1000)
    }
  },
  
}
</script>
<style>
.xue-hei{
  height: 150px;
}
</style>

