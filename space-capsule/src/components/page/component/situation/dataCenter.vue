<template>
  <div>
    <centerTop></centerTop>
    <centerCenter></centerCenter>
    <centerBottom></centerBottom>
  </div>
</template>

<script>
import centerTop from "./centerTop.vue";
import centerCenter from "./centerCenter.vue";
import centerBottom from "./centerBottom.vue";
export default {
  data(){
    return{

    }
  },
  components: {
    centerTop,centerCenter,centerBottom
  },
}
</script>

<style>

</style>