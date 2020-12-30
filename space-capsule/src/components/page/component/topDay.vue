<template>
  <div class="header_bd">
    <div class="header_left">数据来源：<span class="color39E4FF">智慧教学大数据平台</span></div>
    <div class="topTime">

      <span id="intergratedDate">{{riqi}}</span>
      <span id="intergratedTime">{{shijian}}</span>
      <span id="intergratedWeek">星期{{week|filterWeek}}</span>

    </div>
    <div class="header_title">
      <span class="color39E4FF">
        {{title}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "topDay",
  data () {
    return {
      week: "",
      riqi: "",
      shijian: "",
    }
  },
  props: ['title'],
  mounted () {
    this.datetime()
    setInterval(() => {
      this.datetime();
    }, 1000);
  },
  filters: {
    filterWeek: function (val) {
      let tmpnewchar = ''
      switch (val) {
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
  methods: {
    fnW (str) {//判断时分秒是否小于10，如过小于10，在前面加0
      var num;
      if (str > 9) {
        num = str;
      }
      else {
        num = "0" + str;
      }
      return num;
    },
    datetime () {
      var dd = new Date;
      this.week = dd.getDay();
      this.riqi = dd.getFullYear() + "." + this.fnW(dd.getMonth() + 1) + "." + this.fnW(dd.getDate());
      this.shijian = this.fnW(dd.getHours()) + ":" + this.fnW(dd.getMinutes());
    },
  }
}
</script>

<style lang="scss" scoped>
.header_bd {
  background: url(../../../assets/img/header_bd.png) no-repeat center center;
  background-size: 100% 100%;
  width: 100%;
  height: 99px;
  position: relative;
  text-align: center;
  margin: 0 auto;
}
.header_left {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  line-height: 56px;
  letter-spacing: 1px;
  position: absolute;
  left: 15px;
}
.topTime {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  float: right;
  position: absolute;
  right: 15px;
  height: 56px;
  line-height: 56px;
  span:nth-child(2) {
    margin: 0 10px;
  }
}
.header_title {
  color: #e4e1ea;
  font-size: 30px;
  height: 100%;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.header_title span {
  display: inline-block;
  letter-spacing: 5px;
}
@media screen and (max-width: 1680px) {
  .header_left {
    font-size: 13px;
  }
  .topTime{
    font-size: 13px;
  }
  .header_title {
    font-size: 24px;
  }
}
</style>