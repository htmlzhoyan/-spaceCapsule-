<template>
  <div class="leftCenter">
    <headerTop :title="'院系签到排行（近一月）'"
               :position="'left'"></headerTop>
    <div class="bottom"
         id="leftToplist">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>
      <div class="isType"
           v-for="(item,index) in itemList"
           :key="index">

        <div class="isContent">
          <span v-if="index===0"
                class="spanClass first"></span>
          <span v-else-if="index===1"
                class="spanClass second"></span>
          <span v-else-if="index===2"
                class="spanClass third"></span>
          <span v-else
                class="spanClass">{{index+1}}</span>
          <span class="content2">{{item}}</span>
        </div>
        <div class="isProgress">
          <el-progress v-show="isHide"
                       :percentage="contentPer[index]"
                       :color="customColor"
                       :stroke-width="10"></el-progress>
          <el-progress v-show="!isHide"
                       :percentage="0"
                       :color="customColor"
                       :stroke-width="10"></el-progress>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { todayLiveCheckin } from "api";
export default {
  data () {
    return {
      itemList: [],
      contentPer: [],
      contentPerNew: [],
      contentPerOlder: [],
      isHide: true,
      customColor: '#39E4FF'
    }
  },
  mounted () {
    let domFirst = document.getElementById('leftToplist')
    let timer = null
    domFirst.addEventListener("mouseover", () => {
      clearInterval(timer)
    }, false)

    domFirst.addEventListener("mouseout", () => {
      timer = setInterval(() => {
        this.isHide = false
        this.contentPer = this.contentPerNew
        setTimeout(() => {
          this.isHide = true
          setTimeout(() => {
            this.contentPer = this.contentPerOlder
          }, 20)
        }, 20)

      }, 3000)
    }, false)

    this.getResouceOfApi()
    timer = setInterval(() => {
      this.isHide = false
      this.contentPer = this.contentPerNew
      setTimeout(() => {
        this.isHide = true
        setTimeout(() => {
          this.contentPer = this.contentPerOlder
        }, 20)
      }, 20)

    }, 3000)
  },
  methods: {
    getResouceOfApi () {
      let params = {}
      this.itemList = []
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      todayLiveCheckin(params).then((res) => {
        if (res.code == 0) {
          res.map.facultyCheckinMonthAttendance.forEach((resM) => {
            this.itemList.push(resM.name)
            this.contentPer.push((resM.attendance * 100).toFixed(1))
            this.contentPerNew.push(0)
            this.contentPerOlder.push((resM.attendance * 100).toFixed(1))
          })
        }
      })
    },
  },
  components: {
    headerTop
  },
}
</script>

<style lang="scss" scoped>
.leftCenter {
  .bottom {
    border: 1px solid #265fb9;
    border-top: 0;
    border-radius: 0px 0px 3px 3px;
    padding: 10px 19px 45px;
    position: relative;
    height: 504px;
    box-sizing: border-box;
    .isType {
      height: 55px;
      border-bottom: 1px dashed #25448d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 10px;
      .spanClass {
        width: 30px;
        height: 30px;
        display: inline-block;
        background-image: url(~img/no4.png);
        background-size: 100% 100%;
        color: #fff;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
      }

      .first {
        background-image: url(~img/no1.png);
        background-size: 100% 100%;
      }

      .second {
        background-image: url(~img/no2.png);
        background-size: 100% 100%;
      }

      .third {
        background-image: url(~img/no3.png);
        background-size: 100% 100%;
      }
      .isContent {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .content2 {
          color: #ffffff;
          font-size: 16px;
          margin-left: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 130px;
        }
      }
      .isProgress {
        flex: 1;
        /deep/ .el-progress__text {
          color: #fff;
          font-size: 14px !important;
        }
      }
    }
  }
}
</style>