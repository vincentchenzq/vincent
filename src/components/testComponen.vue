<template>
    <div>
        testComponen
        <el-input v-model="value"></el-input>
    </div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                value: this.name
            }
        },
        mounted() {
            console.log(this.$attrs.name);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url("../assets/bg-01.jpg") rgba(0, 0, 0, 0.5);

    }

    .content {
        width: 800px;
        margin: 0 auto;
        background: #fff;
        position: relative;
        top: 200px;
    }

    .demo-ruleForm {
        padding: 20px;
    }
</style>
