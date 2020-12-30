<template>
  <div class="indeBanner" @mouseenter="mouseOver" @mouseleave="mouseLeave">

    <swiper class="index-banner"
            :options="swiperOption"
            ref="mySwiper">
      <swiper-slide>
          <topDay :title="'新联学院智慧教学整体概况'"></topDay>
        <situationData></situationData>
     

        <!-- <pctopTemplate style="height:500px"></pctopTemplate> -->
        <!-- <a :href="item.bannerLinkUrl" :class="'bannerslide'+item.id"> -->

        <div style="height:30px"></div>
        <!-- <pcbottomTemplate></pcbottomTemplate>
    <pvcenterTemplate></pvcenterTemplate> -->
        <!-- </a> -->
      </swiper-slide>
      <swiper-slide>
        <topDay :title="'新联学院智慧教学资源数据'"></topDay>
        <resourceData></resourceData>

        <!-- <pctopTemplate2 style="height:500px"></pctopTemplate2> -->
        <!-- <a :href="item.bannerLinkUrl" :class="'bannerslide'+item.id"> -->

        <div style="height:30px"></div>
        <!-- <pcbottomTemplate2></pcbottomTemplate2> -->
        <!-- <pvcenterTemplate2></pvcenterTemplate2> -->
        <!-- </a> -->
      </swiper-slide>
      <swiper-slide>
      
           <topDay :title="'新联学院智慧教学活跃数据'"></topDay>
        <activeData ref="activeDataRef"></activeData>
        <!-- <pctopTemplate3 style="height:500px"></pctopTemplate3> -->
        <!-- <a :href="item.bannerLinkUrl" :class="'bannerslide'+item.id"> -->

        <div style="height:30px"></div>
        <!-- <pcbottomTemplate></pcbottomTemplate>
    <pvcenterTemplate></pvcenterTemplate> -->
        <!-- </a> -->
      </swiper-slide>
      <div class="swiper-pagination"
           slot="pagination"></div>
    </swiper>

  </div>
</template>
<script>

import topDay from "./component/topDay.vue";
import activeData from './component/active/activeData'
import resourceData from './component/resource/resourceData'
import situationData from './component/situation/situationData'
// import pctopTemplate from "./component/pctopTemplate.vue";
// import pctopTemplate2 from "./component/pctopTemplate2.vue";
// import pctopTemplate3 from "./component/pctopTemplate3.vue";



export default {
  name: "index",
  data () {
    return {
      clientHeight: '',
      swiperOption: {
        /** notNextTick是一个组件自有属性，如果notNextTick设置为true，
        * 组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，
        * 假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        */
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置5000
        autoplay: {
          delay: 500000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        direction: 'horizontal',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        loop: false,
        // initialSlide :2,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        mousewheelControl: false,
        observeParents: true,
        //用户操作了swiper是否禁止自动播放
        autoplayDisableOnInteraction: false,

        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        //  onTransitionStart(swiper){
        //    console.log(swiper)
        //  },
        // more Swiper configs and callbacks...
        // ...
      },

    };
  },
  created () {
    console.log(document.body.clientHeight)
    this.clientHeight = document.body.clientHeight

    // sessionStorage.setItem("clientHeight", '400px')
  },
   computed: {
      mySwiper() {
        // mySwiper 是要绑定到标签中的ref属性
        return this.$refs.mySwiper.swiper
      },
    },
  methods: {
    mouseOver(){

      this.mySwiper.autoplay.stop()
    },
    mouseLeave(){
  
       this.mySwiper.autoplay.start()
    },
    getCurrentSemester () {

      getCurrentSemesterApi().then(res => {
        if (res.code === 0) {
          sessionStorage.setItem('spaceSemesterId', res.semesterId)
        }

      })
    },
    init () {
      this.timer = setInterval(() => {
        this.progressBar++;
        if (this.progressBar == 100) {
          clearInterval(this.timer);
        }
      }, 100);
    },
  },
  components: {
    activeData, resourceData, situationData,
    topDay
  },
  mounted () {
    this.init();


    // let params = {};
    // this.$cookie.set('token', 'ffbdba2b23c0149d106d1f8022eb9223')
    // meAge().then((res)=>{
    //   console.log(res)
    // })
  }
};
</script>
<style scoped>
.indeBanner {
  box-sizing: border-box;
}
</style>
<style>
.el-carousel {
  height: 100%;
}
.el-carousel__container {
  height: 100%;
}
.indeBanner .swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 0px;
}
.indeBanner .swiper-pagination-bullet {
  width: 14px;
  height: 14px;
}
.leftbottom {
  width: 45px;
  height: 45px;
  border-width: 0px 0px 3px 3px;
  border-style: solid;
  border-color: #fff;
  position: absolute;
  left: -2px;
  bottom: -2px;
  border-radius: 0px 0px 0px 6px;
}
.rightbottom {
  width: 45px;
  height: 45px;
  border-width: 0px 3px 3px 0px;
  border-style: solid;
  border-color: #fff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 0px 0px 6px 0px;
}
.lefttop {
  width: 20px;
  height: 20px;
  border-width: 3px 0px 0px 3px;
  border-style: solid;
  border-color: #39e4ff;
  position: absolute;
  left: -2px;
  top: -2px;
  border-radius: 3px 0px 0px 0px;
}
.righttop {
  width: 20px;
  height: 20px;
  border-width: 3px 3px 0px 0px;
  border-style: solid;
  border-color: #39e4ff;
  position: absolute;
  right: -2px;
  top: -2px;
  border-radius: 0px 3px 0px 0px;
}
.leftbottom2 {
  width: 20px;
  height: 20px;
  border-width: 0px 0px 3px 3px;
  border-style: solid;
  border-color: #39e4ff;
  position: absolute;
  left: -2px;
  bottom: -2px;
  border-radius: 0px 0px 0px 3px;
}
.rightbottom2 {
  width: 20px;
  height: 20px;
  border-width: 0px 3px 3px 0px;
  border-style: solid;
  border-color: #39e4ff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 0px 0px 3px 0px;
}

</style>




