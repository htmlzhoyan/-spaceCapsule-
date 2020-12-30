<template>
  <div class="leftCenter">
    <headerTop :title="'院系教师人数及教学课程数'"
               :position="'right'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div id="collegeTeachers"
           :style="{width: '100%', height: '380px'}"></div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import {
  teacherCurriculum
} from "api";
export default {
  data () {
    return {
      itemAttr: {
        attr1: [],
        attr2: []
      }
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
      teacherCurriculum().then(res => {

        if (res.code === 0) {
          this.itemAttr.attr1 = [];
          this.itemAttr.attr2 = [];
          this.itemAttr.attr3 = [];
          res.facultyTeacherCurriculumEntityList.forEach((item, index) => {
            if (item.facultyName !== '教务处') {
              if (item.facultyName === '公共教学部') {
                this.itemAttr.attr1.push(item.facultyName);
                this.itemAttr.attr2.push(51);
                this.itemAttr.attr3.push(12);
              } else {
                this.itemAttr.attr1.push(item.facultyName);
                this.itemAttr.attr2.push(item.teacherNum);
                this.itemAttr.attr3.push(item.curriculumNum);
              }

            }


          })
        }


        this.dyncmicLineSecond();
      })
    },
    dyncmicLineSecond () {
      let interVal = null
      let domFirst = document.getElementById("collegeTeachers");
      let myChartSecond = this.echarts.init(domFirst);
      var option = {
        // 标题
        color: ['#6096E6', '#CACC89'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: { //图例文字的样式
            color: '#fff'
          },
          data: ['教师人数', '网络课程数']
        },
        xAxis: [
          {
            type: 'category',
            data: this.itemAttr.attr1,
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#19cfff',//左边线的颜色
              }
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,//横轴信息全部显示  
              textStyle: {
                color: '#19cfff',//坐标值得具体的颜色
                align: "center"
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true, lineStyle: {
                color: ['#265fb9'],
                width: 1,
                type: 'dashed',
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#19cfff',//左边线的颜色
              }
            },
            axisLabel: {
              textStyle: {
                color: '#19cfff',//坐标值得具体的颜色

              }
            }
          }

        ],
        series: [
          {
            name: '教师人数',
            type: 'bar',
            barWidth: '30%', // 柱子宽度
            data: this.itemAttr.attr2,
            itemStyle: {        // 上方显示数值
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 16
                  },

                }
              }
            }
          }, {
            name: '网络课程数',
            type: 'bar',
            barWidth: '30%', // 柱子宽度
            data: this.itemAttr.attr3,
            itemStyle: {        // 上方显示数值
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: { // 数值样式
                    color: '#fff',
                    fontSize: 16
                  },

                }
              }
            }
          }
        ]

      }
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
  margin-top: 14px;
  .bottom {
    border: 1px solid #265fb9;
    border-top: 0;
    border-radius: 0px 0px 3px 3px;
    padding-top: 20px;
    position: relative;
  }
}
</style>