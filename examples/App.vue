<template>
  <div id="app">
    <Scroll class="xue" :length="0">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </Scroll>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Scroll from '../lib/index.umd.js'
// import Scroll from '../packs/vue-scroll/index.js'
export default {
  name: 'app',
  components: {
    HelloWorld,
    Scroll
  }
}
</script>

<style>
@import url('../lib/index.css');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.xue{
  height: 300px;
}
</style>
