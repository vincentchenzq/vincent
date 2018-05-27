// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from '@/store'

import '@/assets/font-awesome-4.7.0/css/font-awesome.css'
import '@/css/common.less'

require('./mock/index')//此部分引入的是我们所编写的mockjs文档

import utils from '@/common/utils/common.js'


Vue.config.productionTip = false;

Vue.use(ElementUI);

//调用后台接口将userId userName放在cookie里
store.dispatch("GET_DATA", "").then(data => {
    utils.setCookie("userId", data.userId);
    utils.setCookie("userName", data.userName);

});


/* eslint-disable no-new */
window.test = new Vue({
    router,
    store,
    components: {App},
    template: '<App/>'
}).$mount("#app");

//
store.dispatch('GET_PERMISSION', "").then(data => {
    store.menus = data;
});

store.dispatch('GET_MENU_LIST', "").then(data => {
    console.log(data);
});

