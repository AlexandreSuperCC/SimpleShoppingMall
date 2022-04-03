<template>
<div>
  <detail-nav-bar></detail-nav-bar>
  details
  <p>{{itemName}}</p>
</div>
</template>

<script>
import DetailNavBar from "@/views/home/childComps/DetailNavBar";

export default {
  name: "Detail",
  data(){
    return {
      itemName:null
    }
  },
  components:{
    DetailNavBar
  },
  activated() {
    this.itemName=this.$route.params.name
  }
}
</script>

<style scoped>

</style>