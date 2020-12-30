<template>
  <div class="leftCenter">
    <headerTop :title="'学院资源占比'"
               :position="'left'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div id="questionBank"
           :style="{width: '100%', height: '338px'}">
      </div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { facultyResource } from "api";
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
      this.itemAttr.attr1 = [];
      this.itemAttr.attr2 = [];
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      facultyResource(params).then((res) => {
        if (res.code === 0) {
          res.list.forEach((item, index) => {
            this.itemAttr.attr1.push(item.facultyName);
            this.itemAttr.attr2.push({
              value: item.count, name: item.facultyName
            });
          })
          this.getResouceOf()
        }
      })


    },
    getResouceOf () {
      let domFirst = document.getElementById("questionBank");
      let myChartFirst = this.echarts.init(domFirst, 'light');
      let interVal = null
       let minRadius = 0
        let minRadius2 = ''
      if(window.innerWidth<1680){
        minRadius = 0
        minRadius2 = '40%'
      }else{
        minRadius = 40
          minRadius2 = '50%'
      }
      let initChartPieOption = {
        // backgroundColor:'transparent',
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          data: this.itemAttr.attr1,
          right: minRadius,
          top: 80,
          bottom: 20,
          textStyle: { //图例文字的样式
            color: '#fff'
          },
        },
        series: [
          {
            type: 'pie',
            radius: minRadius2,
            center: ['36%', '50%'],
            data: this.itemAttr.attr2,
            label: {
              normal: {
                formatter: "{c}",
              },
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