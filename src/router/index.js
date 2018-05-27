import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from '@/components/HelloWorld2'
import Login from '@/components/login'
import imageModify from '@/components/imageModify'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/canvas'
        },
        {
            path: '/HelloWorld',
            name: '路由1',
            component: HelloWorld
        },
        {
            path: '/hello',
            name: '路由2',
            component: HelloWorld2
        },
        {
            path: '/imageModify',
            name: '修改图片',
            component: imageModify
        },
        {
            path: '/login',
            name: '登录',
            component: Login
        },
        {
            path: '/canvas',
            name: '涂鸦',
            component: resolve => require(['@/components/doodle/canvas'], resolve)
        },
        {
            path: '/todoItem',
            name: '待办项',
            component: resolve => require(['@/components/todoItem'], resolve)
        },
    ]
})
