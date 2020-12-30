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
        <span>{{teacherStudentActivityObject.teacherSize}}</span>
        <span>教师总数</span>
      </div>
      <div class="centet">
        <span>{{teacherStudentActivityObject.currentTeacherSize}}</span>
        <span>本周在线</span>
      </div>
      <div class="right">
        <span>{{teacherStudentActivityObject.beforeTeacherSize}}</span>
        <span>上周在线</span>
      </div>
    </div>
    <div class="cont">
      教师统计
    </div>
  </div>
</template>

<script>
import Bus from 'js/bus'
export default {
  data () {
    return {
      teacherStudentActivityObject: {
        teacherSize: 0,
        currentTeacherSize: 0,
        beforeTeacherSize: 0
      }
    }
  },
  mounted () {
    Bus.$on('teacherStudentActivity', msg => {


      this.filterMethod(msg.teacherSize, 0)
      this.filterMethod(msg.currentTeacherSize, 1)
      this.filterMethod(msg.beforeTeacherSize, 2)

      setInterval(() => {
        this.teacherStudentActivityObject.teacherSize = 0
        this.teacherStudentActivityObject.currentTeacherSize = 0
        this.teacherStudentActivityObject.beforeTeacherSize = 0

        this.filterMethod(msg.teacherSize, 0)
        this.filterMethod(msg.currentTeacherSize, 1)
        this.filterMethod(msg.beforeTeacherSize, 2)
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
              this.teacherStudentActivityObject.teacherSize = start.join('')
            } else if (key === 1) {
              this.teacherStudentActivityObject.currentTeacherSize = start.join('')
            } else if (key === 2) {
              this.teacherStudentActivityObject.beforeTeacherSize = start.join('')
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
      width: 30%;
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
    .centet {
      border-left: 1px solid #39e4ff;
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