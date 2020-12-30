<template>
  <div class="leftCenter">
    <headerTop :title="'活跃院系TOP5'"
               :position="'left'"></headerTop>
    <div class="bottom">
      <div class="leftbottom">

      </div>
      <div class="rightbottom">

      </div>
      <div class="isType"
           v-for="(item,index) in itemList"
           :key="index">
        <span v-if="index===0"
              class="first"></span>
        <span v-else-if="index===1"
              class="second"></span>
        <span v-else-if="index===2"
              class="third"></span>
        <span v-else>{{index+1}}</span>
        <div>
          {{item.facultyName}}
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import headerTop from "../headerTop.vue";
import { toplistApi } from 'api'
export default {
  data () {
    return {
      itemList: []
    }
  },
  components: {
    headerTop
  },
  created () {
    this.getResouceOfApi()
  },
  methods: {
    getResouceOfApi () {
      this.itemList = []
      let params = {}
      params.semesterId = sessionStorage.getItem('spaceSemesterId')
      toplistApi(params).then((res) => {
        if (res.code == 0) {
          res.page.list.forEach((resM,index) => {
            if (index < 5) {
              this.itemList.push(resM)
            }
          })
        }
      })
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
    padding: 13px 19px 48px;
    position: relative;

    .isType {
      height: 53px;
      border-bottom: 1px dashed #25448d;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      span {
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
      div {
        color: #ffffff;
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
}
</style>