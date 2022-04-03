<template>
<div class="wrapper" ref="wrapper">
<div class="content">
  <slot></slot>
</div>
</div>
</template>

<script>

import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data(){
   return {
     bscroll:null,
   }
  },
  props:{
    probeType:{
      type:Number,
      default:0//对象数组要是函数
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    goToTop(x,y,time=500){
      this.bscroll&& this.bscroll.scrollTo(x,y,time);
    },
    finishPU(){
      this.bscroll && this.bscroll.finishPullUp()
    },
    getScrollY(){
      return this.bscroll?this.bscroll.y:0;
    }
  },
  mounted() {
    const wrapper = this.$refs.wrapper
    this.bscroll = new BScroll(wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,

      //bscroll在一开始计算能滚动的长度，但是图片是异步请求的没被计算进去一开始
      observeDOM:true,
      observeImage:true,
      debounceTime:50
    })
    this.bscroll.on('scroll',(position)=>{
      this.$emit('getPos',position);
      this.$emit('getPos2',position);
    })
    if(this.probeType==2||this.probeType==3){
      this.bscroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 468px;
}
</style>