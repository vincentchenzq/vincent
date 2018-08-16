<style>
    .main-layout {
        margin-left: 200px;
    }

    .mainHeaderItem {
        float: left;
        border: 1px solid #ddd;
        border-bottom: none;
        padding: 8px;
        border-radius: 7px 7px 0 0;
        margin-right: 2px;
    }

    .mainHeaderItem > .fa-times {
        /*width:0;*/
        opacity: 0;
        transition: all linear .3s;
        cursor: pointer;
    }

    .mainHeaderItem:hover > .fa-times {
        /*width:100%;*/
        opacity: 1;
    }

    .clearfix:after {
        content: '';
        display: block;
        clear: both;
    }
</style>

<template>
    <div class="main-layout">
        <div class="mt20 mb20 " style="border-bottom:1px solid #ddd;padding-bottom: 20px;padding-left:20px;">
            <ul class="mainHeader clearfix">
                <li class="mainHeaderItem" v-for="item in tabs">
                    <span>{{ item.name }}</span>
                    <i class="fa fa-times" @click="closeTab(item)"></i>
                </li>
            </ul>
        </div>
        <div class="main mt20 mb20 ml20">
            <transition
                name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight"
            >
                <router-view/>
            </transition>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentTab: {},
                tabs: []
            }
        },
        methods: {
            closeTab(item) {
                console.log(item);
            }

        },
        watch: {},
        mounted() {

        }
    }
</script>
