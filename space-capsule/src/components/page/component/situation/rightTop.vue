<template>
  <div class="leftCenter">
    <headerTop :title="'活动实施播报'"
               :position="'right'"></headerTop>
    <div class="bottom"
         id="rightToplist">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>

      <div class="marquee-wrap">
        <ul class="marquee-list"
            :class="{'animate-up': animateUp}">
          <li v-for="(item, index) in listData"
              :key="index">
            <span class="realpx">{{item.time}}</span> <span class="realpx">{{item.name}}</span> <span class="realpx">{{item.message}}</span>
          </li>
        </ul>
      </div>

    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import {
  getResourceRealTime
} from "api";
export default {
  data () {
    return {
      animateUp: false,
      timer: null,
      listData: [
        { time: "2020-02-01", name: "王晓厉", message: "提交了您希望再教育教学过程中使用能通过信息化产品实现那些功能作业" },
        { time: "2020-02-02", name: "李嘉欣", message: "发布课程表" },
        { time: "2020-02-03", name: "何暖", message: "发布教学视频" },
         { time: "2020-02-02", name: "李嘉欣", message: "发布课程表,教学视频,课堂签到,教学文档" },
        { time: "2020-02-15", name: "宋小英", message: "下载作业成绩" },
        { time: "2020-03-01", name: "王小美", message: "发起课堂签到" },
        { time: "2020-03-02", name: "张暖暖", message: "学生提交作业" },
        { time: "2020-03-03", name: "朱一横", message: "下载教学视频" },
        { time: "2020-03-04", name: "王珞丹", message: "上传教学视频" },
        { time: "2020-03-05", name: "赵梦阳", message: "提交了2019年我国经济工作的总体要求和主要任务。随堂测验活动" },
         { time: "2020-02-01", name: "王晓厉", message: "提交了您希望再教育教学过程中使用能通过信息化产品实现那些功能作业" },
        { time: "2020-02-02", name: "李嘉欣", message: "发布课程表,教学视频,课堂签到" },
        { time: "2020-02-03", name: "何暖", message: "发布教学视频" },
        { time: "2020-02-04", name: "谢燕", message: "发布教学文档" },
        { time: "2020-02-15", name: "宋小英", message: "下载作业成绩" },
        { time: "2020-03-01", name: "王小美", message: "发起课堂签到" },
        { time: "2020-02-02", name: "李嘉欣", message: "发布课程表,教学视频,课堂签到" },
        { time: "2020-03-03", name: "朱一横", message: "下载教学视频" },
        { time: "2020-03-04", name: "王珞丹", message: "上传教学视频" },
        { time: "2020-03-05", name: "赵梦阳", message: "提交了2019年我国经济工作的总体要求和主要任务。随堂测验活动" }
      ],


    }
  },
  components: {
    headerTop
  },
  mounted () {
    // this.getResourceRealTime();
    this.timer = setInterval(this.scrollAnimate, 1500);

    let domFirst = document.getElementById('rightToplist')

    domFirst.addEventListener("mouseover",  () => {
      clearInterval(this.timer)
    }, false)

    domFirst.addEventListener("mouseout", () => {
      this.timer = setInterval(this.scrollAnimate, 1500);
    }, false)

  },
  methods: {
    scrollAnimate () {
      this.animateUp = true
      setTimeout(() => {
        this.listData.push(this.listData[0]);
        this.listData.shift();
        this.animateUp = false
      }, 500)
    },
    // getResourceRealTime () {
    //   let params = {}
    //   params.semesterId = sessionStorage.getItem('spaceSemesterId')
    //   getResourceRealTime(params).then(res => {
    //     if (res.code === 0) {
    //       this.listData = [];
    //       res.list.forEach((item, index) => {
    //         let time = item.createTime.substr(0, 10);
    //         this.listData.push({ time: time, name: item.username, message: item.record })
    //       })
    //     }
    //   })
    // },
    destroyed () {
      clearInterval(this.timer)
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
.marquee-wrap {
  height: 474px;
  overflow: hidden;
  padding: 0px 20px 10px 48px;
}
.marquee-wrap .marquee-list li {
  width: 100%;
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  list-style: none;
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  color: #19cfff;
}
.animate-up {
  transition: all 0.5s ease-in-out;
  transform: translateY(-30px);
}
</style>