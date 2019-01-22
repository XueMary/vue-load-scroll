# vue-classic-scroll

Vue scroll component based on better-scroll


[中文文档](https://github.com/XueMary/vue-load-scroll/blob/master/README_zh-CN.md)



## usage mode

```
npm i vue-classic-scroll

import MyScroll from 'vue-classic-scroll'
import 'vue-classic-scroll/dist/MyScroll.css';

// Local or global registration
```


## example

```<template>
  <div class="home">
    <MyScroll 
      class="xue-hei"
      :length="nais.length"
      @downScroll="scroll"
    >
      <ul>
        <li v-for="item in nais" :key="item">{{item}}</li>
      </ul>
    </MyScroll>
  </div>
</template>

<script>
export default {
  data(){
    return{
      nais:[]
    }
  },
  methods:{
    scroll(end){
      setTimeout(()=>{
        end() // Called after the event ends
      },1000)
    }
  },
}
</script>
<style>
.xue-hei{
  height: 200px; // Height must be defined
}
</style>
```

## Common events and parameters

| event      |    type     | explain  |
| :--------  | :--------:  |  :------------ |
| downScroll |   function  | The drop-down triggers the event |
| upScroll   |   function  | Pull up trigger event |




| parameter  |    type        |  required  | explain  |
| :--------  | :------------: | :--------: |  :------------ |
| options    |   object       |    false   | initialization parameter.  Support for better-scroll all parameters and events  |
| class      |   object       |    true    | Height must be defined  |
| length     |   number       |    true    | Length of data          |
| loadText   |   string/array |    false   | The text at load time   |
| loadEndText  |   string/array |    false   | The text at the end of the load  |
| startIcon  |   string/array |    false   | Icon for drop-down  |
| loadIcon  |   string/array |    false   | Icon at load time  |
| emptyText |   string       |    false   | Text displayed without data  |
| emptyIcon |   string       |    false   | Icon displayed when no data is available  |




[better-scroll](https://github.com/XueMary/vue-load-scroll/blob/master/README_zh-CN.md)



