<template>
  <div class="leftCenter">
    <headerTop :title="'作业平均分'"
               :position="'right'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div id="questionCenter"
           :style="{width: '100%', height: '304px'}">
      </div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { queryJobScoreDistributionApi } from 'api'
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
    this.getResouceOfApi()
  },
  methods: {
    getResouceOfApi () {
      let params = {}
      this.itemList = []
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      queryJobScoreDistributionApi(params).then((res) => {
        if (res.code === 0) {
          this.itemAttr.attr1 = ['0~20',
            '20~40',
            '40~60',
            '60~80',
            '80~100']
          this.itemAttr.attr2 = [
            { value: res.entity.twentyCount, name: '0~20' },
            { value: res.entity.fortyCount, name: '20~40' },
            { value: res.entity.sixtyCount, name: '40~60' },
            { value: res.entity.eightyCount, name: '60~80' },
            { value: res.entity.hundredCount, name: '80~100' }
          ]
          this.getResouceOf()
        }
      })


    },
    getResouceOf () {
      let interVal = null
      let domFirst = document.getElementById("questionCenter");
      let myChartFirst = this.echarts.init(domFirst, 'light');
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          data: this.itemAttr.attr1,
          right: 20,
          top: 20,
          bottom: 20,
          textStyle: { //图例文字的样式
            color: '#fff'
          },
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['36%', '50%'],
            data: this.itemAttr.attr2,
            label: {
              normal: {
                formatter: "{d}%",
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 2,
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
</style>