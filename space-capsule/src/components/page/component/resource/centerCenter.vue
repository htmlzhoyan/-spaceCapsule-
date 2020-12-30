<template>
  <div class="leftCenter">
    <headerTop :title="'学校资源发布情况(近一月)'"
               :position="'right'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div id="releaseResources"
           :style="{width: '100%', height: '385px'}"></div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import {
  resourceTrend
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
      resourceTrend().then(res => {
        let params = {}
        params.semesterId = sessionStorage.getItem('spaceSemesterId')
        resourceTrend(params).then((res) => {
          if (res.code == 0) {
            res.list.map((res) => {
              this.itemAttr.attr1.push(res.date)
              this.itemAttr.attr2.push(res.count)
            })
            console.log("========", this.itemAttr)
            this.getResouceOf()
          }
        })



      })
      // this.itemAttr.attr1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];

      // this.itemAttr.attr2 = [800, 400, 456, 435, 422, 300, 500, 200, 110, 150, 100, 200, 500, 400, 455];

      this.getResouceOf();
    },
    getResouceOf () {
      let interVal = null
      let domFirst = document.getElementById("releaseResources");
      let myChartFirst = this.echarts.init(domFirst);
      let initChartPieOption = {
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#3CE1ED'
            }
          }
        },
        grid: {
          x: "10%",//x 偏移量
          y: "10%", // y 偏移量
          width: "80%", // 宽度
          height: "80%"// 高度
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.itemAttr.attr1,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#19cfff' // 左边线的颜色
            }
          }
        },
        yAxis: {
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
            lineStyle: {
              color: '#9a9fa6' // 左边线的颜色
            }
          }
        },
        series: [{
          data: this.itemAttr.attr2,
          type: 'line',
          smooth:true,
          lineStyle: {
            color: "#00A1FF"
          },
          areaStyle: {
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
        }]
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
    padding-top: 20px;
    position: relative;
  }
}
</style>