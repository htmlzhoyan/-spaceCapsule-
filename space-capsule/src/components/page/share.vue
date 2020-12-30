<template>
  <div class="activity">

    <div>
      <div class="box1">
        <div class="boxTop">
          <span>
            预习反馈
          </span>
          <span v-if='formName.semester'>
            {{formName.semester}}&nbsp;第{{formName.classWeek}}学周
          &nbsp;周{{formName.day | MoneyFormat}}&nbsp;第{{formName.startSection}}-{{formName.endSection}}节
          </span>
        </div>

      </div>
      <div class="box2" :style="{height: scrollHight+'px'}">
        
        <div>
          <div class="feedBackTop">
            <p class="isTitle">预习资料</p>
            <p class="isbi2">
              <span v-for="(item,index) in itemList"                 
                    :key="index">{{item.name}}</span>
              <span style="color:#9da6af"
                    v-if="itemList.length===0">
                暂无资料
              </span>
            </p>

          </div>
          <div class="feedBackBottom">
            <p class="isTitle">预习结果</p>
            <div class="bottom">
              <div @click="itemTopClick(index)"
                   v-for="(item,index) in itemTop"
                   :class="{'active':itemTopIndex==index}"
                   :key="index">

                <span>{{item}}</span>
                <span v-if="index===0">({{objectStudents.readCount}})</span>
                <span v-if="index===1">({{objectStudents.unReadCount}})</span>
                <span v-if="index===2">({{objectStudents.noReadCount}})</span>

              </div>
            </div>
 
           
              <div class="list"
                   id="demo3">
                <div class="listItem"
                     v-for="(item,index) in readStudents"
                     :key="index">
                  <img v-if="!item.img"
                       src="../../assets/img/head.png" />
                  <img v-else
                       src="item.img">
                  <span class="isSpan1">{{item.name}}</span>
                  <span class="isSpan2">{{item.studentNum}}</span>
                  <span class="isSpan3">{{item.className}}</span>
                </div>
              </div>
          

          </div>
        </div>
        
       
      </div>

    </div>

  </div>
</template>
<script>

import { getPreviewStatistics2Api, getPreviewCountByTeacher, circularPitchInfo } from 'api'

export default {

  data () {
    return {
      scrollHight:0,
      itemTop: ['已完成', '未完成', '未预习'],
      itemTopIndex: 0,
      isHideS: true,
      readStudents: [],
      objectStudents: {},
      curriculumId: '',
      itemList: [],
      title: '',
      formName: {

      }

    }
  },
  filters: {

    MoneyFormat: function (money) {
      let tmpnewchar = ''
      switch (money) {
        case 1: tmpnewchar = '一'; break
        case 2: tmpnewchar = '二'; break
        case 3: tmpnewchar = '三'; break
        case 4: tmpnewchar = '四'; break
        case 5: tmpnewchar = '五'; break
        case 6: tmpnewchar = '六'; break
        case 7: tmpnewchar = '日'; break
      }
      return tmpnewchar
    }
  },
  mounted () {
    this.circularPitchId = this.$route.query.circularPitchId
    this.semesterId = this.$route.query.semesterId
    this.userId = this.$route.query.teacherId
    this.classIds = this.$route.query.classIds
    this.scrollHight = document.body.clientHeight - 120
    this.fromIp =  this.$route.query.fromIp
    this.getActivityDataList()
    this.getResourceDataList()
    this.getcircularPitchInfo()
  },

  methods: {
    onlineLook (item) {
     
    },
    itemTopClick (index) {
      this.isHideS = false
      this.$nextTick(() => {
        this.isHideS = true
      })
      this.itemTopIndex = index
      if (index === 0) {
        this.readStudents = this.objectStudents.readStudents
      } else if (index === 1) {
        this.readStudents = this.objectStudents.unReadStudents
      } else {
        this.readStudents = this.objectStudents.noReadStudents
      }
    },
    getcircularPitchInfo () {
      let params = {}
      params.id = this.circularPitchId
      circularPitchInfo(params,this.fromIp).then((res) => {
        if (res && res.code === 0) {
          this.formName = res.databaseCircularPitch
        }
      })
    },
    // 查询活动列表
    getActivityDataList () {
      let params = {}
      params.circularPitchId = this.circularPitchId
      params.semesterId = this.semesterId
      params.teacherId = this.userId
      getPreviewCountByTeacher(params,this.fromIp).then((res) => {
        if (res && res.code === 0) {
          this.itemList = res.resultList
        }
      })
    },
    // 查询资源列表
    getResourceDataList (index) {
      let params = {}
      params.circularPitchId = this.circularPitchId
      params.semesterId = this.semesterId
      params.teacherId = this.userId
      params.classIds = this.classIds
      getPreviewStatistics2Api(params,this.fromIp).then((res) => {
      
        if (res && res.code === 0) {
          this.objectStudents = res.resultMap
          this.readStudents = this.objectStudents.readStudents
          if (index) {
            this.itemTopClick(index)
          } else {
            this.itemTopClick(0)
          }

          // this.readStudents = obj.readStudents // 已完成预习
          // this.noReadCount = obj.noReadCount // 未预习人员
          // this.unReadCount = obj.unReadCount // 未完成预习人员
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>

.activity{
  overflow: hidden;
  background: #f9f9f9;
  height: 100vh;
}
.box1 {
  padding: 10px 16px 0px;
}
.boxTop {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 90px;
  background: rgba(60, 148, 237, 1);
  color: #fff;
  border-radius: 5px;

  span:nth-child(1) {
    font-size: 22px;
    font-weight: 400;
  }
  span:nth-child(2) {
    font-size: 14px;
    font-weight: 400;
    margin-top: 12px;
  }
}
.box2 {
  padding: 0 16px;
  overflow: auto;
}
p {
  margin: 0;
  padding: 0;
}
.feedBackTop {
  background: #fff;
  padding: 0 16px;
  color: #333;
  margin-bottom: 10px;
  margin-top: 10px;
  .isbi2 {
    color: #3c94ed !important;
    padding-bottom: 15px;
    span {
      margin-bottom: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      font-size: 14px;
    }
  }
  .isTitle {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    padding-top: 15px;
    padding-bottom: 15px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
}
.feedBackBottom {
  background: #fff;
  padding: 0 16px;
  color: #333;
  .isTitle {
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    padding-top: 15px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  .bottom {
    height: 50px;
    color: #9da6af;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }
  .active {
    color: #3c94ed;
  }
  .list {
    overflow: auto;
  }
  .listItem {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    img {
      width: 45px;
      height: 45px;
    }
    .isSpan1 {
      width: 20%;
      text-align: center;
    }
    .isSpan2 {
      width: 30%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      text-align: right;
      padding: 0 3px;
    }
    .isSpan3 {
      width: 40%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      text-align: right;
    }
  }
}
</style>
