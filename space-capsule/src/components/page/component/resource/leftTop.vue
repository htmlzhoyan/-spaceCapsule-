<template>
  <div class="isTitle">

    <div class="first">
      <div class="left">
        <span>{{obj.total}}</span>
        <span>全校资源数</span>
        <div class="lefttop">

        </div>
        <div class="righttop">

        </div>
        <div class="leftbottom2">

        </div>
        <div class="rightbottom2">

        </div>
      </div>
      <div class="centet">
        <span>{{obj.picSize}}</span>
        <span>图片</span>
        <div class="leftcenter">

        </div>
        <div class="rightcenter">

        </div>
      </div>
      <div class="centet">
        <span>{{obj.textSize}}</span>
        <span>文本</span>
        <div class="leftcenter">

        </div>
        <div class="rightcenter">

        </div>

      </div>
      <div class="centet">
        <span>{{obj.smallClassSize}}</span>
        <span>视频</span>
        <div class="leftcenter">

        </div>
        <div class="rightcenter">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {
  classClassResourceStatisticApi
} from "api";
export default {
  data () {
    return {
      obj: {
        total: 0,
        picSize: 0,
        textSize: 0,
        smallClassSize: 0,
        timer: null
      }
    }
  },
  mounted () {
    this.getGradeStuTotal()
  },
  filters: {

  },
  methods: {

    filterMethod (ele, key) {
      let attr = (ele + '').split('')
      let start = []
      attr.forEach((res, index) => {
        start.push(0)
      })
      attr.forEach((res, index) => {
        let step = 1
        let current = 0
        if (res != 0) {
          let t = setInterval(() => {

            start[index] += step
            if (start[index] == res) {
              clearInterval(t)
              t = null
            }

            if (key === 0) {
              this.obj.total = start.join('')
            } else if (key === 1) {
              this.obj.picSize = start.join('')
            } else if (key === 2) {
              this.obj.textSize = start.join('')
            } else if (key === 3) {
              this.obj.smallClassSize = start.join('')
            }

          }, 100)
        }
      })

    },

    getGradeStuTotal () {
      let params = {}
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      classClassResourceStatisticApi(params).then(res => {
        if (res.code === 0) {
          // this.obj.total = res.total
          // this.total = res.total
          // this.obj.picSize = res.picSize
          // this.obj.textSize = res.textSize
          // this.obj.smallClassSize = res.smallClassSize
          this.filterMethod(res.total, 0)
          this.filterMethod(res.picSize, 1)
          this.filterMethod(res.textSize, 2)
          this.filterMethod(res.smallClassSize, 3)
          setInterval(() => {
            this.obj.total = 0
            this.obj.picSize = 0
            this.obj.textSize = 0
            this.obj.smallClassSize = 0
            this.filterMethod(res.total, 0)
            this.filterMethod(res.picSize, 1)
            this.filterMethod(res.textSize, 2)
            this.filterMethod(res.smallClassSize, 3)
          }, 3000)

        }
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.isTitle {
  height: 120px;
  position: relative;
  .first {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    .centet {
      height: 90px;
      width: 20%;
      display: flex;
      margin-left: 20px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;
      border: 1px solid #6bd1ff;
      width: 20%;
      .leftcenter {
        width: 3px;
        height: 30px;
        position: absolute;
        background: #ffff39;
        left: -2px;
        top: 29px;
      }
      .rightcenter {
        width: 3px;
        height: 30px;
        position: absolute;
        background: #ffff39;
        right: -2px;
        top: 29px;
      }
      span:nth-child(1) {
        font-size: 32px;
        color: #ffff39;
      }
      span:nth-child(2) {
        color: #39e4ff;
        font-size: 16px;
        margin-top: 3px;
      }
    }
    .left {
      width: 30%;
      height: 120px;
      border: 1px solid #6bd1ff;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 3px;
      span:nth-child(1) {
        font-size: 42px;
        color: #ffff39;
      }
      span:nth-child(2) {
        color: #39e4ff;
        font-size: 20px;
        margin-top: 3px;
      }
    }
    .centet {
      border-left: 1px solid #39e4ff;
      border-right: 1px solid #39e4ff;
      border-radius: 3px;
    }
  }
}
</style>