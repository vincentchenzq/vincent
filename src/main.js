// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from '@/store'

import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
import '@/css/common.css'

import utils from '@/common/utils/common.js'


Vue.config.productionTip = false;

Vue.use(ElementUI);

utils.setCookie("userId", "Vincent123");
utils.setCookie("userName", "Vincent");


/* eslint-disable no-new */
window.test = new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount("#app");

store.dispatch('getPermission', "").then(data => {
  store.menus = data;
});

var menuList = [
  {
    name:"用户信息管理",
    index:'1',
    className:"fa fa-user-md",
    children:[
      {
        path:"/HelloWorld",
        name:"选项1"
      },
      {
        path:"/hello",
        name:"选项2"
      },
      {
        path:'/imageModify',
        name:"图片修改"
      }
    ]
  },
  {
    name:"这真的是待办项",
    index:'2',
    className:"fa fa-bookmark",
    children:[
      {
        path:"/todoItem",
        name:"待办项"
      }

    ]
  }
];
setTimeout(function(){
  store.commit('SET_MENU_LIST', menuList)
},1000);
