<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="">
      <component :is="Component" />
    </keep-alive>
  </router-view>
    <main-tab-bar/>
</template>
<script>
  import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
  export default {
    name: 'app',
    components:{
      MainTabBar,
    }
  }
</script>
<style>
@import "assets/css/base.css";
</style>
