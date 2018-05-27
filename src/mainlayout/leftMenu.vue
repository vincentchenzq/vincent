<style>
    .left-menu {
        width: 200px;
        position: absolute;
        top: 40px;
        border-right: 1px solid #ddd;
    }

    .left-menu .el-menu {
        border: none;
    }
</style>

<template>
    <div class="left-menu">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#7f8c8d"
            active-text-color="#42b983">
            <template v-for="item in menuList">
                <el-submenu :index="item.index">
                    <template slot="title">
                        <i :class="item.className"></i>
                        <span>{{ item.name }}</span>
                    </template>
                    <template v-for="it in item.children">
                        <el-menu-item :index="it.path" @click="clickItem(it)">{{ it.name }}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: 'LeftMenu',
        props: {},
        data() {
            return {}
        },
        methods: {
            clickItem(item) {
                this.$emit("click-item", item);
            }
        },
        computed: {
            menuList() {
                return this.$store.state.menu.list;
            }
        },
        mounted() {
            resize()
        }
    }

    window.onresize = function () {
        resize();
    }

    function resize() {
        document.querySelector(".left-menu").style.height = window.innerHeight - 40 + 'px';
    }
</script>
