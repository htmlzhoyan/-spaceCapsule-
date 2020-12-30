<template>
  <div class="centerTop">
    <div class="center">

      <div id="centerEchart"
           :style="{width: '100%', height: '100px'}">
      </div>
      <div class="contentLeft">
        周签到班级数
      </div>
    </div>
    <div class="left">
      <div id="leftEchart"
           :style="{width: '100%', height: '100px'}">
      </div>
      <div class="contentLeft">
        周签到总人次
      </div>
    </div>

    <!-- <div class="AccondBottom">
      <p>累计投入：{{accruingAmounts}}</p>
      <p>剩余额度：{{showValue2}}</p>
    </div> -->

    <div class="right">
      <div id="rightEchart"
           :style="{width: '100%', height: '100px'}">
      </div>
      <div class="contentLeft">
        全校整体签到率
      </div>
    </div>

  </div>
</template>

<script>
import {
  handelCheckinApi
} from "api";
export default {
  data () {
    return {
      itemAttr: {
        attr2: []
      },
      itemAttr2: {
        attr2: []
      },
      itemAttr3: {
        attr2: []
      }
    }
  },
  mounted () {
    this.handelCheckin()
  },
  methods: {
    handelCheckin () {
      let params = {}
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      handelCheckinApi(params).then(res => {
        if (res.code === 0) {
          this.itemAttr.attr2 = [
            { value: res.checkinStudent, name: '签到总人次' },
            { value: res.totalStudent - res.checkinStudent, name: '未签到人次' }
          ]

          this.itemAttr2.attr2 = [
            { value: res.classClass, name: '周签到班级数' }
          ]
          this.itemAttr3.attr2 = [
            { value: res.checkinStudent, name: '签到人次率' },
            { value: res.totalStudent - res.checkinStudent, name: '未签到人次率' }
          ]
          this.drawLine1()
          this.drawLine2()
          this.drawLine3()

        }
      })

    },
    drawLine1 () {
      let interVal = null
      let dom = document.getElementById('leftEchart')
      let myChart = this.echarts.init(dom);
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}人次"
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          startAngle: 270, //起始角度
          radius: ['95%', '70%'],
          center: ['50%', '50%'],
          color: ['#BBFF94', '#5D7F4A'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: { //  饼图图形上的文本标签
            normal: { // normal 是图形在默认状态下的样式
              show: true,
              position: 'center',
              color: '#fff',
              fontSize: 16,
              formatter: function (params) { // 默认显示第一个数据
                if (params.dataIndex === 0) {
                  return params.value
                } else {
                  return ''
                }
              }
            }
          },

          data: this.itemAttr.attr2,
          labelLine: {
            show: false
          },
        }]
      }
      myChart.setOption(initChartPieOption)

      window.addEventListener('resize', () => {
        myChart.resize()
      })
      dom.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      dom.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChart.clear();
          myChart.setOption(initChartPieOption);
        }, 3000)
      }, false)

      interVal = setInterval(() => {
        myChart.clear();
        myChart.setOption(initChartPieOption);
      }, 3000)

    },
    drawLine2 () {
      let interVal = null
      console.log("============", this.itemAttr);
      let dom = document.getElementById('centerEchart')
      let myChart = this.echarts.init(dom);
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c}个"
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          startAngle: 270, //起始角度
          radius: ['95%', '70%'],
          center: ['50%', '50%'],
          color: ['#FF6600'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: { //  饼图图形上的文本标签
            normal: { // normal 是图形在默认状态下的样式
              show: true,
              position: 'center',
              color: '#fff',
              fontSize: 16,
              formatter: function (params) { // 默认显示第一个数据
                if (params.dataIndex === 0) {
                  return params.value
                } else {
                  return ''
                }
              }
            }
          },

          data: this.itemAttr2.attr2,
          labelLine: {
            show: false
          },
        }]
      }
      myChart.setOption(initChartPieOption)

      window.addEventListener('resize', () => {
        myChart.resize()
      })
      dom.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      dom.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChart.clear();
          myChart.setOption(initChartPieOption);
        }, 3000)
      }, false)
      interVal = setInterval(() => {
        myChart.clear();
        myChart.setOption(initChartPieOption);
      }, 3000)

    },
    drawLine3 () {
      let interVal = null
      console.log("============", this.itemAttr);
      let dom = document.getElementById('rightEchart')
      let myChart = this.echarts.init(dom);
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {d}%"
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          startAngle: 270, //起始角度
          radius: ['95%', '70%'],
          center: ['50%', '50%'],
          color: ['#188EEE', '#0C4777'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: { //  饼图图形上的文本标签
            normal: { // normal 是图形在默认状态下的样式
              show: true,
              position: 'center',
              color: '#fff',
              fontSize: 16,
              formatter: function (params) { // 默认显示第一个数据
                if (params.dataIndex === 0) {
                  return params.percent + '%'
                } else {
                  return ''
                }
              }
            }
          },

          data: this.itemAttr3.attr2,
          labelLine: {
            show: false
          },
        }]
      }
      myChart.setOption(initChartPieOption)
      dom.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      dom.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChart.clear();
          myChart.setOption(initChartPieOption);
        }, 3000)
      }, false)
      interVal = setInterval(() => {
        myChart.clear();
        myChart.setOption(initChartPieOption);
      }, 3000)

      window.addEventListener('resize', () => {
        myChart.resize()
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.centerTop {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.left {
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .contentLeft {
    font-size: 16px;
    color: #39e4ff;
    margin-top: 10px;
  }
}
.center {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .contentLeft {
    font-size: 16px;
    color: #39e4ff;
    margin-top: 10px;
  }
}
.right {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .contentLeft {
    font-size: 16px;
    color: #39e4ff;
    margin-top: 10px;
  }
}
</style>