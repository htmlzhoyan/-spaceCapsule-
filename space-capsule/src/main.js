import App from "./App";
import router from "./router";
import "./assets/css/icon.css";
import { getCurrentSemesterApi } from "api";
import VueAwesomeSwiper from "vue-awesome-swiper";

// require styles
import "swiper/dist/css/swiper.css";

Vue.use(VueAwesomeSwiper);
// 引入Echarts
import Echarts from "echarts";
Vue.prototype.echarts = Echarts;
Vue.use(Echarts);

Vue.config.productionTip = false;

// import  'echarts/theme/essos.js'

import axios from "axios";
Vue.prototype.$axios = axios;


// router.beforeEach((to, from, next) => {
//   if(to.name==='index'){
//     getCurrentSemesterApi().then(res => {
//       if (res.code === 0) {
//         sessionStorage.setItem("spaceSemesterId", res.semesterId);
//       }
//       next();
//     });
//   }else{
//     next();
//   }
 
// });

//http请求拦截器
// axios.interceptors.request.use(
//   config => {
//     let token = Vue.cookie.get("token");
//     if (token != null) {
//       config.headers["token"] = token;
//       config.headers["userType"] = "teacher";
//     }
//     return config;
//   },
//   error => {
//     alert("您的网络走丢了，请重新操作");
//     return Promise.reject(error);
//   }
// );

// http响应拦截器
// axios.interceptors.response.use(
//   data => {
//     if (data.data.code == 2) {
//       router.push('/login');
//     }
//     return data;
//   },
//   error => {
//     console.info(error);
//     return Promise.reject(error);
//   }
// );

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
