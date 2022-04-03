<template>
  <div class="tab-bar-item" @click="changeRoute">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
<!--    <div :class="{active:isActive}">-->
    <div :style="getActiveStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) != -1;
    },
    getActiveStyle(){
      return this.isActive?{color:this.activeColor}:{};//这里调用isActive的时候不能加（）
    }
  },
  methods:{
    changeRoute(){
      this.$router.replace(this.path);
    },

  },
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'blue'
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
/*.active {*/
/*  color: red;*/
/*}*/
</style>