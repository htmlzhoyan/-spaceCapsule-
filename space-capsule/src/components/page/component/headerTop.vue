<template>
  <div class="headerTop">
    {{title}}
    <span class="left" v-if="position==='left'||position==='center'"></span>
    <span class="right" v-if="position==='right'||position==='center'"></span>
  </div>
</template>

<script>

export default {
  props: ['title','position'],
  data () {
    return {

    }
  },

}
</script>


<style lang="scss" scoped>
.headerTop {
  height: 48px;
  border: 1px solid #265fb9;
  opacity: 1;
  border-radius: 3px 3px 0px 0px;
  background-size: 100% 100%;
  font-size: 18px;
  color: #39e4ff;
  text-align: center;
  line-height: 48px;
  letter-spacing: 1px;
  position: relative;
  .left{
    width: 80px;
    height: 20px;
    position: absolute;
    left: 0;
     background-image: url(~img/topleft.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
   .right{
      width: 80px;
    height: 20px;
    position: absolute;
    right: 0;
     background-image: url(~img/topright.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>