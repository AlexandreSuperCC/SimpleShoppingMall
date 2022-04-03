<template>
<div class="goods-list-item" @click="goDetail">
  <div class="goods-img">
    <img :src="goodsListItem.imgurl" alt="ycao">
  </div>
  <div class="goods-info">
    <p class="name">{{goodsListItem.name}}</p>
    <p class="moq">{{goodsListItem.moq}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsListItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  methods:{
    goDetail(){
      this.$router.push('/detail/'+this.goodsListItem.name)
    }
  }
}
</script>

<style scoped>
.goods-list-item{
  width: 45%;
  font-size: 13px;
  text-align: center;
  margin-top: 10px;
}
.goods-img{
}
img{
  width: 100%;
}
.name {
  padding-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.moq {
  font-size: 11px;
  padding-top: 3px;
}
.goods-info{
}
</style>