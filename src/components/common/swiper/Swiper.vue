<template>
<div class="swiper" @mouseenter="enter" @mouseleave="leave">
  <div class="homePic" v-if="itemsArr!=null">
    <img :src="itemsArr[getIndex1()].imgurl" @click="goGoods1()" alt="">
    <img :src="itemsArr[getIndex2()].imgurl" @click="goGoods2()" alt="" @load="swiperPicLoad">
  </div>
  <div class="homeBtn">
    <input type="button" class="btn1" @click="picIndex1--"/>&nbsp;
    <input type="button" class="btn2" @click="picIndex1++"/>
  </div>
</div>
</template>

<script>
export default {
  name: "Swiper",
  props:{
    itemsArr:null
  },
  data(){
    return {
      picIndex1:0,
      picIndex2:1,
      timer:null,
      swiperPicLoadOnce:true
    }
  },
  computed:{

  },
  methods:{
    //最大图片加载完毕
    swiperPicLoad(){
      if(this.swiperPicLoadOnce){
        this.swiperPicLoadOnce=false;
        this.$emit('sPicLoad');
      }
    },
    getIndex1(){
      if(this.picIndex1>=this.itemsArr.length){
        this.picIndex1=0;
      }else if(this.picIndex1<0){
        this.picIndex1=this.itemsArr.length-1;
      }
      return this.picIndex1;
    },
    goGoods1(){
      window.open(this.itemsArr[this.picIndex1].url)
    },
    getIndex2(){
      let index = this.picIndex1+1;
      if(index>=this.itemsArr.length){
        this.picIndex2=0;
      }else if(index.picIndex1<0) {
        this.picIndex2=this.itemsArr.length-1;
      }else{
        this.picIndex2=index;
      }
      return this.picIndex2;
    },
    goGoods2(){
      window.open(this.itemsArr[this.picIndex2].url)
    },
    enter(){
      clearInterval(this.timer)
    },
    leave(){
      this.timer=setInterval(function (){
        this.picIndex1++;
      }.bind(this),3000)
    }
  },
  created() {
    this.timer = setInterval(()=>{
      this.picIndex1++;
    },3000)
  }
}
</script>

<style scoped>
.swiper {
  background-color: var(--color-tint);
}
.homePic{
  display: flex;
}
.homePic img{
  flex: 1;
  width: 50%;
  margin-top: 2px;
  vertical-align: middle;
  opacity: 0.8;
}
.homeBtn{
  text-align: center;
}
.homeBtn .btn1{
  background: url('~assets/img/swiper/before.svg');
  border-style: none;
  width: 16px;
  height: 16px;
  margin-top: 4px;
  opacity: 0.5;
}
.homeBtn .btn2{
  background: url('~assets/img/swiper/after.svg');
  border-style: none;
  width: 16px;
  height: 16px;
  margin-top: 4px;
  opacity: 0.5;
}
</style>