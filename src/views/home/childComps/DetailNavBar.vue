<template>
<div>
  <nav-bar>
    <template v-slot:left>
      <div class="back" @click="goBack"><img src="~assets/img/tabbar/back_android.svg"></div>
    </template>
    <template v-slot:center>
      <div class="all-titles">
      <div v-for="(title,index) in titles" class="title-name" @click="curIndex=index"
           :class="{active:index==curIndex}">{{title}}</div>
      </div>
    </template>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      curIndex:-1
    }
  },
  methods:{
    goBack(){
      this.$router.back();
    }
  }
}
</script>

<style scoped>
.all-titles{
  display: flex;
}
.title-name{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back{
  text-align: center;
  margin-top: 5px;
}
</style>