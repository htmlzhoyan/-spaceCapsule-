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
import { teacherStudentActivityApi } from 'api'
import Bus from 'js/bus'
export default {
  name: 'pctopTemplate',
  data () {
    return {

    }
  },
  created () {
    this.getResouceOfApi()
   
  },
  mounted () {
    
  },
  methods: {
    getResouceOfApi () {
      let params = {}
      this.itemList = []
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      teacherStudentActivityApi(params).then((res) => {
        if (res.code == 0) {
             Bus.$emit('teacherStudentActivity', res.data)
        }
      })
    }
  },
  components: {
    dataLeft, dataCenter, dataRight
  },
}
</script>

<style lang="scss" scoped>
.pctopTemplate {
  padding: 30px 20px 0 20px;
}
</style>