<template>
  <div class="leftCenter">
    <headerTop :title="'全校课堂活动情况'"
               :position="'center'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>
      <el-row :gutter="20"
              class="elRow">
        <el-col :span="17">
          <div id="collegeTeachers2"
               :style="{width: '100%', height: '284px'}"></div>
        </el-col>
        <el-col :span="7">
          <div class="rsouceRight">
            <p v-for="(item,index) in itemList"
               :key="index"><span class="text">{{item.name}}：</span><span class="text">{{item.value}}</span></p>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { queryActivityCountApi } from 'api'
import {
  teacherCurriculum
} from "api";
export default {
  data () {
    return {
      itemAttr: {
        attr1: [],
        attr2: []
      },
      itemList: [],
 
    }
  },
  components: {
    headerTop
  },
  mounted () {
    this.getGradeStuTotal()
  },
  methods: {
    getGradeStuTotal () {
      // teacherCurriculum().then(res => {

      //   if (res.code === 0) {
      //     this.itemAttr.attr1 = [];
      //     this.itemAttr.attr2 = [];
      //     this.itemAttr.attr3 = [];
      //     res.facultyTeacherCurriculumEntityList.forEach((item, index) => {
      //       this.itemAttr.attr1.push(item.facultyName);

      //       this.itemAttr.attr2.push(item.teacherNum);

      //       this.itemAttr.attr3.push(item.curriculumNum);

      //     })
      //   }

      let params = {}
      this.itemList = []
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      queryActivityCountApi(params).then((res) => {
        if (res.code == 0) {
          this.itemList = []
          let maxNum = 0
          this.itemAttr.attr1 = ['活动数'];
          this.itemList = [
            { name: '课前预习', value: res.entity.previewCount },
            { name: '投票问卷', value: res.entity.voteCount },
            { name: '随堂测试', value: res.entity.testCount },
            { name: '小组讨论', value: res.entity.discussionCount },
            { name: '头脑风暴', value: res.entity.brainstormingCount },
            { name: '课堂表现', value: res.entity.performanceCount },
            { name: '课后作业', value: res.entity.jobCount },
          ]

          this.itemAttr.attr2 = [res.entity.previewCount, res.entity.voteCount, res.entity.testCount, res.entity.discussionCount, res.entity.brainstormingCount, res.entity.performanceCount, res.entity.jobCount];

          maxNum = Math.max(...this.itemAttr.attr2);

          this.itemAttr.attr3 = [
            { name: '课前预习', max: maxNum },
            { name: '投票问卷', max: maxNum },
            { name: '随堂测试', max: maxNum },
            { name: '小组讨论', max: maxNum },
            { name: '头脑风暴', max: maxNum },
            { name: '课堂表现', max: maxNum },
            { name: '课后作业', max: maxNum },
          ]
          this.dyncmicLineSecond();
        }
      })



      // })

    },
    dyncmicLineSecond () {
      let interVal = null
      let domFirst = document.getElementById("collegeTeachers2");
      let myChartSecond = this.echarts.init(domFirst);
      console.log(window.innerWidth)
      let minRadius = 0
      if(window.innerWidth<1680){
        minRadius = 50
      }else{
        minRadius = 90
      }
      var option = {
        title: {
          text: ''
        },
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          grid: {

          },
          radius: minRadius,
          indicator: this.itemAttr.attr3,
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.4)',
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.4)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.4)'
            }
          }
        },
        series: [{
          name: '',
          type: 'radar',
          itemStyle: {
            color: '#FFBA55'
          },

          // areaStyle: {normal: {}},
          data: [
            {
              value: this.itemAttr.attr2,
              name: '活动数'
            },

          ]
        }]
      };
      myChartSecond.setOption(option);
      window.addEventListener('resize', () => {
        myChartSecond.resize()
      })
      domFirst.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      domFirst.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChartSecond.clear();
          myChartSecond.setOption(option);
        }, 3000)
      }, false)
      interVal = setInterval(() => {
        myChartSecond.clear();
        myChartSecond.setOption(option);
      }, 3000)
    },
  }
}
</script>

<style lang="scss" scoped>
.leftCenter {
  margin-top: 20px;
  .bottom {
    border: 1px solid #265fb9;
    border-top: 0;
    border-radius: 0px 0px 3px 3px;
    padding-top: 20px;
    position: relative;
  }
}
.rsouceRight {
  line-height: 2;
  span:nth-child(1) {
    font-size: 14px;
    color: #39e4ff;
    letter-spacing: 1px;
    margin-right: 10px;
  }
  span:nth-child(2) {
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1px;
  }
}
@media screen and (max-width: 1680px) {
  .rsouceRight {
    line-height: 2;
    span:nth-child(1) {
      font-size: 12px;

    }
    span:nth-child(2) {
      font-size: 12px;
    }
  }
}
</style>