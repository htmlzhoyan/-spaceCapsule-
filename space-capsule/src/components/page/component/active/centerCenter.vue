<template>
  <div class="leftCenter">
    <headerTop :title="'院系近七日课程运行数'"
               :position="'center'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>
      <div class="isType">
        <div id="questionBack"
             :style="{width: '100%', height: '311px'}"></div>

      </div>
    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { acurriculumRunNumApi } from "api";
export default {
  data () {
    return {
      itemList: [],
      itemAttr: {
        attr1: ['公共教学部','文学与传媒学院','机电工程学院','商学院','外国语学院','艺术学院','土木建筑工程学院'],
        attr2: [100,150,50,450,500,200,100]
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
       this.dyncmicLineSecond();
      // this.itemAttr.attr1 = []
      // this.itemAttr.attr2 = []
      // let params = {}
      // params.semesterId = sessionStorage.getItem('spaceSemesterId')
      // acurriculumRunNumApi(params).then(res => {

      //   if (res.code === 0) {
      //     res.data.forEach((res) => {
      //       if(res.name!=='教务处'){
      //         this.itemAttr.attr1.push(res.name)
      //         this.itemAttr.attr2.push(res.count)
      //       }
      //     })
      //   }
       

      // })


    },
    dyncmicLineSecond () {
      let interVal = null
      let domFirst = document.getElementById("questionBack");
      let myChartSecond = this.echarts.init(domFirst);
      var option = {
        // 标题
        color: ['#FFBA55'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '8%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.itemAttr.attr1,
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: '#fff',//左边线的颜色
              }
            },

            axisTick: {
              alignWithLabel: true,
            },
            axisLabel: {
              interval: 0,//横轴信息全部显示  
              rotate: 30,//度角倾斜显示
              textStyle: {
                color: '#fff',//坐标值得具体的颜色
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
                color: '#fff',//左边线的颜色
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff',//坐标值得具体的颜色

              }
            }
          }

        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '40%', // 柱子宽度
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
          }
        ]

      }

      myChartSecond.setOption(option);

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
      window.addEventListener('resize', () => {
        myChartSecond.resize()
      })

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
    padding: 10px 0;
  }
}
</style>