<template>
<div id="home">
  <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
<!--  偷天换日-->
  <tab-control class="tab-control2" :items="['popular','latest','selective']"
               @changeType="changeTypeF" ref="tabControl2" v-show="showTabControl"/>
  <scroll class="content" ref="scroll"  @getPos2="hiddenPos"
          :probe-type="3" @getPos="getPosF" :pull-up-load="true" @pullingUp="loadMore">
    <swiper :itemsArr="items" ></swiper>
    <recommend-view :itemsArr="items"></recommend-view>
    <feature-view/>
    <!--  使用的子组件里面第一个不加双引号的变量都是原来子组件的-->
    <tab-control class="tab-control" :items="['popular','latest','selective']"
                 @changeType="changeTypeF" ref="tabControl"/>
    <goods-list :goodsList="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="toTop" v-show="isShow"></back-top>
</div>
</template>

<script>
import {getHomeCategory, getHomeGoods, getHomeMultidata} from "@/network/home";
import NavBar from "@/components/common/navbar/NavBar";
import Swiper from "@/components/common/swiper/Swiper";
import Scroll from "@/components/common/scroll/Scroll";

import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

export default {
  name: "Home",
  data(){
    return {
      items:null,
      cidArr:new Array(3),
      goods:{
        popular:{page:0,list:[]},
        latest:{page:0,list:[]},
        selective:{page:0,list:[]}
      },
      curType:'popular',
      isShow:false,
      showTabControl:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.curType].list
    }
  },
  components:{
    NavBar,
    Swiper,
    Scroll,

    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
  },
  created() {
    this.getHomeMultidata();
    this.getHomeCidFromCat();
  },
  activated() {
    this.$refs.scroll.goToTop(0,this.saveY,10);
    this.$refs.scroll.bscroll.refresh();
  },
  deactivated() {
    this.saveY=this.$refs.scroll.getScrollY();
  },
  methods:{
    /*
    事件监听相关方法
     */
    hiddenPos(pos){
      if(!this.$refs.tabControl) return;
      if(Math.abs(pos.y)>this.$refs.tabControl.$el.offsetTop){
        this.showTabControl=true;
      }else{
        this.showTabControl=false;
      }
    },
    reloadFinish(){
      this.$refs.scroll.finishPU();
    },
    loadMore(){
      this.getHomeGoods(this.curType);
    },
    getPosF(pos){
      this.isShow=Math.abs(pos.y)>1000;
    },
    toTop(){
      //监听一个组件的原生事件
      this.$refs.scroll.goToTop(0,0);
      // this.$refs.scroll.bscroll.scrollTo(0,0)
    },
    changeTypeF(index){
      switch (index) {
        case 0:
          this.curType='popular';
          break;
        case 1:
          this.curType='latest';
          break;
        case 2:
          this.curType='selective';
      }
      //这两行自己没想到 可以直接控制组件里数据！！！
      this.$refs.tabControl.curIndex=index;
      this.$refs.tabControl2.curIndex=index;
    },
    /*
    网络请求相关方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(data=>{
        this.items = data._embedded.electronicItemses;
      })
    },
    async getHomeCidFromCat(){
      await getHomeCategory().then((res)=>{//这里加上await可以解决先后顺序的问题！！！！
        let resArr = res._embedded.categoryElectronics;
        this.cidArr['popular']=resArr[0]._links.categoryElectronic.href.split('/')[6]
        this.cidArr['latest']=resArr[1]._links.categoryElectronic.href.split('/')[6]
        this.cidArr['selective']=resArr[2]._links.categoryElectronic.href.split('/')[6]

        // this.typeOut.push(Object.assign(resArr[0]._links.self.href.split('/')[6]));
        // this.typeOut.push(resArr[1]._links.self.href.split('/')[6]);
      })
       this.getHomeGoods('popular')
       this.getHomeGoods('latest')
       this.getHomeGoods('selective')
    },
    getHomeGoods(type){
      let page=this.goods[type].page;
      getHomeGoods(this.cidArr[type],page).then((res)=>{
        this.goods[type].list.push(...res.content);//注意这个语法... 展开语法(Spread syntax)
        this.goods[type].page+=1;
        this.reloadFinish();//可以第二次加载
      })
    }
  }
}
</script>

<style scoped>
/*注意这里直接使用最大的div即可，因为navbar固定了所以位置不算在div里面了*/
#home{
  padding-top: 44px;
  /*position: relative;*/
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  text-align: center;
  position: fixed;
  left:0;
  right:0;
  top:0;
  z-index: 9;
}
.content{
  /*overflow: hidden;*/
  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 90px;*/
  /*left: 0px;*/
  /*right: 0px;*/
  /*margin-bottom: 49px;*/
  /*height: calc(100% - 44px - 49px);*/
  /*height: 718px;*/
}
.tab-control{
  /*position: sticky;*/
  /*top: 44px;*/
  /*z-index: 9;*/
}
.tab-control2{
  position: relative;
  /*top: 44px;*/
  z-index: 9;
}
</style>