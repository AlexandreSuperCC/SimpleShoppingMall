<template>
<div class="recommend">
  <div class="recommend-item" v-for="item in items">
    <a :href="item.url">
      <img :src="item.imgurl">
      <p>{{getItemsName(item)}}</p>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "RecommendView",
  computed:{
    items(){
      return this.getItems();
    }
  },
  props:{
    itemsArr:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    getItems(){
      if(this.itemsArr == null) return [];
      return this.itemsArr.filter((currentValue,index)=>{
        return index<4;
      })
    },
    getItemsName(item){
      let itemArr = item.name.split(" ")
      return itemArr[0]+' '+itemArr[1];
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 10px;
  padding: 12px 12px;
  border-bottom: 8px solid #eee;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 3px;
}
</style>