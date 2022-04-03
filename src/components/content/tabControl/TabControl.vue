<template>
<div class="tab-control">
<div class="tab-control-item" v-for="(item,index) in items" :class="{selected:isSelected(index)}" @click="itemClick(index)"><span>{{item}}</span></div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return {
      selected:false,
      curIndex:0
    }
  },
  props:{
    items:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  methods:{
    isSelected(index){
      if(this.curIndex===index){
        return true;
      }else{
        return false;
      }
    },
    itemClick(index){
      this.curIndex=index
      this.$emit('changeType',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 13px;
  line-height: 15px;
  height: 15px;
}
.tab-control-item{
  flex: 1;
}
.selected{
  color:var(--color-high-text);
}
.selected span{
  padding: 4px;
  border-bottom: 3px solid var(--color-tint);
}

</style>