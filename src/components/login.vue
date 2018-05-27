<template>
    <div class="login">
        <div class="content">

            <testComponen name="vincent" v-model="userDTO.name"></testComponen>
            <!--<el-form :model="userDTO" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">-->
            <!--<el-form-item label="姓名"  prop="name">-->
            <!--<el-input v-model.number="userDTO.name"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="密码"  prop="password">-->
            <!--<el-input type="password" v-model="userDTO.password"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="submitForm('userForm')">提交</el-button>-->
            <!--<el-button @click="resetForm('userForm')">重置</el-button>-->
            <!--</el-form-item>-->
            <!--</el-form>-->
        </div>
    </div>
</template>

<script>
    import testComponen from '@/components/testComponen'

    import loginApi from '../common/api/loginApi'


    export default {
        components: {
            testComponen
        },
        data() {
            return {
                userDTO: {
                    name: '',
                    password: '',
                },
                rules: {
                    name: [
                        {required: true, message: '姓名不能为空'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        loginApi.login("http://localhost:8888/user/login.do?userId=chenzhiqiang0427&password=123").then(response => {
                            console.log(response);
                        });


                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
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
