<template>
  <div class="pctopTemplate">
    <el-row :gutter="20">
      <el-col :span="8">
        <dataLeft></dataLeft>

      </el-col>
      <el-col :span="8">
        <dataCenter></dataCenter>
      </el-col>
      <el-col :span="8">
        <dataRight></dataRight>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import dataLeft from "./dataLeft.vue";
import dataCenter from "./dataCenter.vue";
import dataRight from "./dataRight.vue";

export default {
  name: 'pctopTemplate',
  data () {
    return {

    }
  },
  mounted () {

  },
  components: {
    dataLeft, dataCenter, dataRight
  },
}
</script>

<style lang="scss" scoped>
.pctopTemplate {
  padding: 20px 20px 0 20px;
}
</style>