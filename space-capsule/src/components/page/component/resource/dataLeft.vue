<template>
  <div>
    <leftTop></leftTop>
    <leftCenter></leftCenter>
    <leftBottom></leftBottom>
  </div>
</template>

<script>
import leftTop from "./leftTop.vue";
import leftCenter from "./leftCenter.vue";
import leftBottom from "./leftBottom.vue";
export default {
  data(){
    return{

    }
  },
  components: {
    leftTop,leftCenter,leftBottom
  },
}
</script>

<style>

</style>