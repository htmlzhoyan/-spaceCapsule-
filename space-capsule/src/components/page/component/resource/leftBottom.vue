<template>
  <div class="leftCenter">
    <headerTop :title="'资源类型占比'"
               :position="'left'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div class="elRow">
        <div class="elCol">
          <div id="questionBank3"
               :style="{width: '100%', height: '340px'}">
          </div>
        </div>
        <div class="elCol2">
          <div class="rsouceRight">
            <p><span class="text">类型</span><span class="text">数量</span><span class="text">占比</span> </p>
            <p><span class="text">文本</span><span>{{object.doc}}</span><span>{{object.doc/total | filterF}}%</span></p>
            <p><span class="text">视频</span><span>{{object.redio}}</span><span>{{object.redio/total | filterF}}%</span></p>
            <p><span class="text">图片</span><span>{{object.pic}}</span><span>{{object.pic/total | filterF}}%</span></p>
            <p><span class="text">链接</span><span>{{object.link}}</span><span>{{object.link/total | filterF}}%</span></p>
            <p><span class="text">其他</span><span>{{object.other}}</span><span>{{object.other/total | filterF}}%</span></p>

          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { resourceTypeApi } from 'api'
export default {
  data () {
    return {
      itemAttr: {
        attr1: [],
        attr2: []
      },
      object: {},
      total: 0
    }
  },
  components: {
    headerTop
  },
  filters: {
    filterF: function (money) {
      return (money * 100).toFixed(0)
    }
  },
  mounted () {
    this.getResouceOfApi()
  },
  methods: {
    getResouceOfApi () {
      let params = {}
      // params.semesterId = sessionStorage.getItem('spaceSemesterId')
      resourceTypeApi(params).then(res => {
        if (res.code === 0) {
          this.object = res.data
          this.total = this.object.doc + this.object.redio + this.object.pic + this.object.link + this.object.other
          this.itemAttr.attr1 = ['文本', '视频', '图片', '链接', '其他']
          this.itemAttr.attr2 = [
            { value: res.data.doc, name: '文本' },
            { value: res.data.redio, name: '视频' },
            { value: res.data.pic, name: '图片' },
            { value: res.data.link, name: '链接' },
            { value: res.data.other, name: '其他' },
          ]
          this.getResouceOf()
        }

      })
    },
    getResouceOf () {
      let interVal = null
      let domFirst = document.getElementById("questionBank3");
      let myChartFirst = this.echarts.init(domFirst, 'light');
      let initChartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          data: this.itemAttr.attr1,
          left: 'center',
          bottom: 30,
          textStyle: { //图例文字的样式
            color: '#39E4FF'
          },
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '45%'],
            data: this.itemAttr.attr2,
            label: {
              normal: {
                formatter: "{c}",
              },
            },
            // labelLine: {
            //   normal: {
            //     show: true,
            //     length: 2,
            //     smooth: 2,
            //     emphasis: {
            //       show: false,
            //     }
            //   }
            // },
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
  padding-right: 17%;
  .text {
    color: #39e4ff;
  }
  span {
    display: inline-block;
    text-align: center;
    height: 35px;
    width: 50px;
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
    width: 60%;
  }
  .elCol2 {
    width: 40%;
  }
}
@media screen and (max-width: 1680px) {
  .rsouceRight {
    padding-right: 5%;
    span {
      font-size: 12px;
       width: 40px;
    }
  }
  .elRow {
    .elCol {
      width: 60%;
    }
    .elCol2 {
      width: 40%;
    }
  }
}
</style>