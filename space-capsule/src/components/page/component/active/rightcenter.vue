<template>
  <div class="leftCenter">
    <headerTop :title="'各院系学年学生人数统计'"
               :position="'right'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>
      <div class="isType">
        <div id="rightCenter2"
             :style="{width: '100%', height: '698px'}"></div>

      </div>
    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { getPeriodStuTotal } from "api";
export default {
  data () {
    return {
      itemList: [
        '公共教学部', '艺术学院', '机电工程学院', '文学与传媒学院', '教育学院'
      ],
      itemAttr: {
        legendArr: [],
        facultyArr: []
      },
      series: []
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
      getPeriodStuTotal().then(res => {

        if (res.code === 0) {
          this.series = []
          if (res.code === 0) {
            // let colorList = [
            //   '#775B00', '#AB8400', '#FFB65E', '#FFDBB7', '#DFB321',
            //   '#FE8463'];
            this.itemAttr.legendArr = []
            this.itemAttr.facultyArr = []
            res.result.forEach((item) => {
              if (!this.itemAttr.legendArr.includes(parseInt(item.period) + '级')) {
                this.itemAttr.legendArr.push(parseInt(item.period) + '级')
              }

            })
            res.orderMap.forEach((item) => {
              if (item.name !== '公共教学部' && item.name !== '教务处') {
                this.itemAttr.facultyArr.unshift(item.name)
              }
            })
            console.log(this.itemAttr.legendArr)
            this.itemAttr.legendArr.push('累计使用人数')
            this.itemAttr.legendArr.forEach((item, index) => {

              if (item !== '累计使用人数') {
                let object = {}
                object.name = item
                object.type = "bar"
                object.stack = '总量'
                object.label = {
                  show: true,
                  position: 'insideRight'
                }
                object.itemStyle = {}
                // object.itemStyle['color'] = colorList[index]
                object.data = []
                this.itemAttr.facultyArr.forEach((resM) => {
                  object.data.push(0)
                })
                this.itemAttr.facultyArr.forEach((resM, index) => {
                  res.result.forEach((item2) => {
                    if (resM === item2.name && item === parseInt(item2.period) + '级') {
                      object.data.splice(index, 1, item2.result)
                    }
                  })
                })
                this.series.push(object)
              } else {
                let object = {}
                object.name = item
                object.type = "bar"
                object.label = {
                  show: true,
                  position: 'insideRight'
                }
                object.itemStyle = {}
                // object.itemStyle['color'] = colorList[index]
                object.data = []
                this.itemAttr.facultyArr.forEach((item3) => {
                  let isTrue = ''
                  res.loginList.forEach((item2) => {
                    if (item3 === item2.name) {
                      isTrue = item2.result
                    }
                  })
                  if (isTrue) {
                    object.data.push(isTrue)
                  } else {
                    object.data.push(0)
                  }
                })
                this.series.push(object)
              }
            })

          }
          this.dyncmicLineSecond()
        }

      })
      // this.itemAttr.facultyArr = ['公共教学部', '艺术学院', '机电工程学院', '文学与传媒学院', '教育学院', '外国语学院', '土木建筑工程学院', '商学院']
      // this.itemAttr.legendArr = ['2017级', '2018级', '2019级', '2020级', '累计使用人数']

      // this.itemAttr.legendArr.forEach((item, index) => {
      //   if (this.itemAttr.legendArr.length === index + 1) {
      //     let object = {}
      //     object.name = item
      //     object.type = "bar"
      //     object.label = {
      //       show: true,
      //       position: 'insideRight'
      //     }
      //     object.itemStyle = {}
      //     object.itemStyle['color'] = colorList[index]
      //     object.data = [400, 400, 400, 400, 400, 400, 800, 800]
      //     this.series.push(object)
      //   } else {
      //     let object = {}
      //     object.name = item
      //     object.type = "bar"
      //     object.stack = '总量'
      //     object.label = {
      //       show: true,
      //       position: 'insideRight'
      //     }
      //     object.itemStyle = {}
      //     object.itemStyle['color'] = colorList[index]
      //     object.data = [100, 100, 100, 100, 100, 100, 200, 200]
      //     this.series.push(object)
      //   }
      // })
      // console.log(this.series)
      // this.dyncmicLineSecond();
    },
    dyncmicLineSecond () {
      let interVal = null
      let domFirst = document.getElementById('rightCenter2');
      // this.autoHeight = 500;
      // domFirst.style.height = this.autoHeight + "px";
      let myChartSecond = this.echarts.init(domFirst, 'light');
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.itemAttr.legendArr,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',//左边线的颜色
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff',//坐标值得具体的颜色

            }
          }
        },
        yAxis: {
          type: 'category',
          data: this.itemAttr.facultyArr,
          axisLine: {
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
        series: this.series
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


      // myChartSecond.on('mouseover', function (params) {
      //   clearInterval(interVal)
      // });
      //  myChartSecond.on('mouseout', function (params) {
      //   interVal = setInterval(() => {
      //   myChartSecond.clear();
      //   myChartSecond.setOption(option);
      // }, 3000)
      // });
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
    position: relative;
    padding: 20px 0 10px;
  }
}
</style>