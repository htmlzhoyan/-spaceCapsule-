<template>
  <div class="leftCenter">
    <headerTop :title="'活动类型占比'"
               :position="'left'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

     <div class="elRow">
        <div class="elCol">
          <div class="rsouceRight">
            <p><span class="text">类型</span><span class="text">占比</span> </p>
            <p><span class="text">投票问卷</span><span>{{this.total===0?0:(this.voteProportion/this.total* 100).toFixed(2) + '%'}}</span></p>
            <p><span class="text">随堂测试</span><span>{{this.total===0?0:(this.testProportion/this.total* 100).toFixed(2) + '%'}}</span></p>
            <p><span class="text">小组讨论</span><span>{{this.total===0?0:(this.discussProportion/this.total* 100).toFixed(2) + '%'}}</span></p>
            <p><span class="text">头脑风暴</span><span>{{this.total===0?0:(this.brainProportion/this.total* 100).toFixed(2) + '%'}}</span></p>
            <p><span class="text">课堂表现</span><span>{{this.total===0?0:(this.performanceProportion/this.total * 100).toFixed(2) + '%'}}</span></p>

          </div>
       </div>
         <div class="elCol2">
          <div id="questionBank2"
               :style="{width: '100%', height: '306px'}">
          </div>
       </div>

     </div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { activityLesson } from "api";
export default {
  data () {
    return {
      itemAttr: {
        attr1: [],
        attr2: []
      },
      voteProportion: 0,
      testProportion: 0,
      discussProportion: 0,
      brainProportion: 0,
      performanceProportion: 0,

      total: 0,
    }
  },
  components: {
    headerTop
  },
  mounted () {
    this.getResouceOfApi()
  },
  methods: {
    getResouceOfApi () {
      let params = {}
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      activityLesson(params).then((res) => {

        if (res.code == 0) {


          this.voteProportion = res.map.voteNum
          this.testProportion = res.map.testNum
          this.discussProportion = res.map.discussNum
          this.brainProportion = res.map.brainNum
          this.performanceProportion = res.map.performanceNum

          this.total = this.voteProportion + this.testProportion + this.discussProportion + this.brainProportion + this.performanceProportion

          this.itemAttr.attr1 = ['投票问卷', '随堂测试', '小组讨论', '头脑风暴', '课堂表现']
          this.itemAttr.attr2 = [
            { value: this.voteProportion, name: '投票问卷' },
            { value: this.testProportion, name: '随堂测试' },
            { value: this.discussProportion, name: '小组讨论' },
            { value: this.brainProportion, name: '头脑风暴' },
            { value: this.performanceProportion, name: '课堂表现' }
          ]
          this.getResouceOf()

        }
      })
      // let params = {}
      // resourceTrend(params).then((res) => {
      //   if (res.code == 0) {
      //     res.list.map((res) => {
      //       this.itemAttr.attr1.push(res.date)
      //       this.itemAttr.attr2.push(res.count)
      //    })
      //    console.log("========",this.itemAttr)
      //     this.getResouceOf()
      //   }
      // })


    },
    getResouceOf () {
      let interVal = null
      let domFirst = document.getElementById("questionBank2");
      let myChartFirst = this.echarts.init(domFirst, 'light');
      let minRadius = 0
      let minRadius2 = ''
      if (window.innerWidth < 1680) {
        minRadius = 0
        minRadius2 = '40%'
      } else {
        minRadius = 20
        minRadius2 = '50%'
      }
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          data: this.itemAttr.attr1,
          type: 'scroll',
          orient: 'vertical',
          right: minRadius,
          top: 20,
          bottom: 20,
          textStyle: { //图例文字的样式
            color: '#39E4FF'
          },
        },
        series: [
          {
            type: 'pie',
            radius: minRadius2,
            center: ['35%', '50%'],
            data: this.itemAttr.attr2,
            label: {
              normal: {
                formatter: "{d}%",
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 1,
                length2: 10,
                smooth: 0.5,
                emphasis: {
                  show: false,
                }
              }
            },
          }
        ]
      }
      myChartFirst.setOption(initChartPieOption);
      window.addEventListener('resize', () => {
        myChartFirst.resize()
      })
      domFirst.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      domFirst.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChartFirst.clear();
          myChartFirst.setOption(initChartPieOption);
        }, 3000)
      }, false)
      interVal = setInterval(() => {
        myChartFirst.clear();
        myChartFirst.setOption(initChartPieOption);
      }, 3000)
    }
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
    position: relative;
  }
}

.rsouceRight {
  text-align: right;
  .text {
    color: #39e4ff;
  }
  span {
    display: inline-block;
    text-align: center;
    height: 35px;
    width: 80px;
    margin-right: 2px;
    margin-bottom: 2px;
    line-height: 35px;
    background: rgba(255, 255, 255, 0.35);
    font-size: 14px;
  }
}
.elRow {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .elCol {
    width: 31%;
  }
  .elCol2 {
    width: 69%;
  }
}
@media screen and (max-width: 1680px) {
  .rsouceRight {
    padding-right: 5%;
    span {
      font-size: 12px;
      width: 65px;
    }
  }
  .elRow {
    .elCol {
      width: 40%;
    }
    .elCol2 {
      width: 60%;
    }
  }
}
</style>