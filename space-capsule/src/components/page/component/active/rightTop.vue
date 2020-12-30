<template>
  <div class="isTitle">
    <div class="lefttop">

    </div>
    <div class="righttop">

    </div>
    <div class="leftbottom2">

    </div>
    <div class="rightbottom2">

    </div>
    <div class="first">
      <div class="left">
        <span>{{teacherStudentActivityObject.currentSize}}</span>
        <span>本周课堂活动数</span>
      </div>

      <div class="right">
        <span>{{teacherStudentActivityObject.lastSize}}</span>
        <span>上周课堂活动数</span>
      </div>
    </div>
    <div class="cont">
      课堂活动
    </div>
  </div>
</template>

<script>
import Bus from 'js/bus'
export default {
  data () {
    return {
      teacherStudentActivityObject:{
        currentSize:0,
        lastSize:0
      }
    }
  },
  mounted () {
    Bus.$on('teacherStudentActivity', msg => {
          console.log("--------------------",msg)
       this.filterMethod(msg.currentSize, 0)
      this.filterMethod(msg.lastSize, 1)
      setInterval(() => {
        this.teacherStudentActivityObject.currentSize = 0
        this.teacherStudentActivityObject.lastSize = 0
        this.filterMethod(msg.currentSize, 0)
        this.filterMethod(msg.lastSize, 1)

      }, 3000)
    })
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
              this.teacherStudentActivityObject.currentSize = start.join('')
            } else if (key === 1) {
              this.teacherStudentActivityObject.lastSize = start.join('')
            } 

          }, 100)
        }

      })

    },

  }
}
</script>


<style lang="scss" scoped>
.isTitle {
  height: 120px;
  border: 1px solid #39e4ff;
  position: relative;
  .first {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 50%;
      span:nth-child(1) {
        font-size: 34px;
        color: #ffff39;
      }
      span:nth-child(2) {
        color: #39e4ff;
        font-size: 20px;
        margin-top: 3px;
      }
    }
     .left{
      border-right: 1px solid #39e4ff;
    }
   
  }
  .cont {
    width: 152px;
    height: 36px;
    background: #001152;
    border: 1px solid #39e4ff;
    border-radius: 18px;
    position: absolute;
    left: 50%;
    margin-left: -76px;
    top: -18px;
    text-align: center;
    line-height: 36px;
  }

}
</style>