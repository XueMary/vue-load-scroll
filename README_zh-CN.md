# vue-classic-scroll

基于 better-scroll 的 Vue 滚动组件


## 使用方法

```
npm i vue-classic-scroll

import Scroll from 'vue-classic-scroll'
import 'vue-classic-scroll/dist/index.css';

// Local or global registration
```


## 示例

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

## 常用事件和参数

| event      |    type     | explain  |
| :--------  | :--------:  |  :------------ |
| downScroll |   function  | 下拉加载事件 |
| upScroll   |   function  | 上拉加载事件 |




| parameter  |    type        |  required  | explain  |
| :--------  | :------------: | :--------: |  :------------ |
| options    |   object       |    false   | 初始化参数，支持所有better-scroll事件和参数  |
| class      |   object       |    true    | 高度必填  |
| length     |   number       |    true    | 数据长度       |
| loadText   |   string/array |    false   | 加载时的文字   |
| loadEndText  |   string/array |    false   | 加载结束后的提示文字  |
| startIcon  |   string/array |    false   | 下拉时的图标  |
| loadIcon  |   string/array |    false   | 加载时的图标  |
| emptyText |   string       |    false   | 无数据时的页面显示文字  |
| emptyIcon |   string       |    false   | 无数据时页面显示的图片  |




[better-scroll](https://github.com/XueMary/vue-load-scroll/blob/master/README_zh-CN.md)



