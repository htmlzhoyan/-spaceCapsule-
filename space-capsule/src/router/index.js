import Vue from 'vue';
import Router from 'vue-router';

  
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index',
          
        },
        {
            path: '/share',
            component: resolve => require(['../components/page/share.vue'], resolve),
            meta: { title: '分享' },
            name:"share"
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '主页' },
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../components/page/index.vue'], resolve),
                    meta: { title: '课堂监控' },
                    name:"index"
                }        
            ],
            // beforeEnter (to, from, next) {
            //     getCurrentSemesterApi().then(res => {
            //         if (res.code === 0) {   
            //           sessionStorage.setItem('spaceSemesterId', res.semesterId)
            //         }
            //         next()
            //     })    
            // }
        },
     
    ],
   

})
