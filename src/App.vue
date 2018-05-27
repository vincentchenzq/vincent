<template>
    <div id="app">
        <MyHeader/>
        <LeftMenu @click-item="clickMenu"></LeftMenu>
        <MainLayout></MainLayout>
    </div>
</template>

<script>
    import LeftMenu from "@/mainlayout/leftMenu"
    import MyHeader from '@/mainlayout/myHeader'
    import MainLayout from '@/mainlayout/mainLayout'

    export default {
        name: 'App',
        components: {
            LeftMenu,
            MyHeader,
            MainLayout
        },
        methods: {
            clickMenu(item) {
                this.$router.push(item.path)
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 1200px;
        margin: 0 auto 0;
    }
</style>
