<template>
<div class="goods-list">
  <goods-list-item class="goods-list-item" v-for="item in goodsList" :goodsListItem="item"></goods-list-item>
</div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  props:{
    goodsList:{
      type:Array,
      default(){
        return {}
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 64px;
}
.goods-list-item {
}
</style>