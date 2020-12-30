<template>
  <div class="leftCenter">
    <headerTop :title="'新联学院师生使用统计'"
               :position="'center'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div id="statisticalData"
           :style="{width: '100%', height: '333px'}"></div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import {
  teacherStudentUsageStatisticApi
} from "api";
export default {
  data () {
    return {
      itemAttr: {
        attr1: [],
        attr2: [],
        attr3: [],
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
      let params = {}
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      this.itemAttr.attr1 = [];
      this.itemAttr.attr2 = [];
      this.itemAttr.attr3 = [];
      // teacherStudentUsageStatisticApi(params).then(res => {
      //   if (res.code === 0) {

      //     let start = res.startWeeksInYear
      //     let attr1 = []
      //     let attr2 = []
      //     let studentWeek = 0
      //     let teacherWeek = 0
      //     let studentWeekMin = 0
      //     let teacherWeekMin = 0
      //     let maxWeekMin = 0
      //     let maxWeek = 0
      //     let attr = []
      //     if (res.studentList.length > 0) {
      //       studentWeek = res.studentList[res.studentList.length - 1].weeks
      //     }
      //     if (res.teacherList.length > 0) {
      //       teacherWeek = res.teacherList[res.teacherList.length - 1].weeks
      //     }
      //     if (studentWeek > teacherWeek) {
      //       maxWeek = studentWeek - start + 1
      //     } else {
      //       maxWeek = teacherWeek - start + 1
      //     }
      //     if (maxWeek < res.endWeeksInYear - start + 1) {
      //       maxWeek = res.endWeeksInYear - start + 1
      //     }
      //     if (maxWeek < 0) {
      //       maxWeek = 0
      //     }


      //     if (res.studentList.length > 0) {
      //       studentWeekMin = res.studentList[0].weeks
      //     }
      //     if (res.teacherList.length > 0) {
      //       teacherWeekMin = res.teacherList[0].weeks
      //     }
      //     if (studentWeekMin > teacherWeekMin) {
      //       if (teacherWeekMin === 0) {
      //         maxWeekMin = studentWeekMin - start + 1
      //       } else {
      //         maxWeekMin = teacherWeekMin - start + 1
      //       }

      //     } else {
      //       if (studentWeekMin === 0) {
      //         maxWeekMin = teacherWeekMin - start + 1
      //       } else {
      //         maxWeekMin = studentWeekMin - start + 1
      //       }
      //     }
      //     if (maxWeekMin < 0) {
      //       maxWeekMin = 0
      //     }
      //     for (var i = maxWeekMin; i < maxWeek + 1; i++) {
      //       attr.push(i)
      //     }
      //     this.itemAttr.attr1 = attr
      //     attr.forEach((resM) => {
      //       let isKai = true
      //       let isKai2 = true
      //       res.teacherList.forEach((res) => {
      //         if (resM === res.weeks - start + 1) {
      //           isKai = false
      //           this.itemAttr.attr2.push(res.count)
      //         }
      //       })
      //       if (isKai) {
      //         this.itemAttr.attr2.push(0)
      //       }

      //       res.studentList.forEach((res) => {
      //         if (resM === res.weeks - start + 1) {
      //           isKai2 = false
      //           this.itemAttr.attr3.push(res.count)
      //         }
      //       })
      //       if (isKai2) {
      //         this.itemAttr.attr3.push(0)
      //       }

      //     })
      //     // console.log('====+++===', this.itemAttr.attr2)
      //     //  console.log('====+++===', this.itemAttr.attr3)
      //     this.getResouceOf();
      //   }
      // })
      this.itemAttr.attr1 = [8, 9, 10, 11, 12, 13, 14, 15, 16,];
      this.itemAttr.attr2 = [800, 400, 456, 435, 422, 300, 500, 200, 110];
       this.itemAttr.attr3 = [500, 140, 146, 135, 522, 100, 150,100,600];

     this.getResouceOf();
    },
    getResouceOf () {
      let interVal = null
      let domFirst = document.getElementById("statisticalData");
      let myChartFirst = this.echarts.init(domFirst);
      let option = {

        legend: {
          data: ['教师人次', '学生人次'],
          textStyle: {
            color: '#fff'
          },
          x: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            let result = params[0].name + '周<br>'
            params.forEach((item) => {
              result += `${item.marker}${item.seriesName}: ${item.data}<br> `;
            })
            return result
          },
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            name: '周',
            nameTextStyle: {
              verticalAlign: 'top'
            },
            data: this.itemAttr.attr1,
            splitLine: { show: false },
            axisLabel: {
              interval: 0
            },
            axisLine: {
              lineStyle: {
                color: '#fff',//左边线的颜色
              }
            },
          }
        ],
        yAxis: [
          {
            name: '教师人次',
            type: 'value',
            splitLine: {
              show: true, lineStyle: {
                type: 'dashed'
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
          },
          {
            name: '学生人次',
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
                color: '#FFC000',//左边线的颜色
              }
            },
            axisLabel: {
              textStyle: {
                color: '#FFC000',//坐标值得具体的颜色

              }
            }
          }
        ],
        series: [
          {
            name: '教师人次',
            type: 'line',
            lineStyle: {
              color: "#00A1FF"
            },
            itemStyle: {
              normal: {
                color: '#00A1FF',
                lineStyle: {
                  color: '#00A1FF'
                }
              }
            },

            data: this.itemAttr.attr2
          },
          {
            name: '学生人次',
            type: 'line',
            yAxisIndex: 1,
            lineStyle: {
              color: "#FFC000"
            },
            itemStyle: {
              normal: {
                color: '#FFC000',
                lineStyle: {
                  color: '#FFC000'
                }
              }
            },
            data: this.itemAttr.attr3
          }
        ]
      };
      myChartFirst.setOption(option);
      window.addEventListener('resize', () => {
        myChartFirst.resize()
      })
      domFirst.addEventListener("mouseover", function () {
        clearInterval(interVal)
      }, false)

      domFirst.addEventListener("mouseout", function () {
        interVal = setInterval(() => {
          myChartFirst.clear();
          myChartFirst.setOption(option);
        }, 3000)
      }, false)

      interVal = setInterval(() => {
        myChartFirst.clear();
        myChartFirst.setOption(option);
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
    padding-top: 20px;
    position: relative;
  }
}
</style>
