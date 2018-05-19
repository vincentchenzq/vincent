<style>
  .header{
    height:40px;
    border-bottom:1px solid #ddd;
    box-sizing: border-box;
  }
</style>

<template>
  <div class="header clearfix">
      <div class="left">
        <img src="@/assets/logo.png" width="40" height="40">
      </div>
      <div class="right">
        <ul class="clearfix h40">
          <li class="left h40 lh40 mr20">
            欢迎您，{{ userName }}
            <i class="fa fa-user-circle pointer"></i>
          </li>

          <li class="left h40 lh40 mr20">
            <i class="fa fa-envelope-o fa-fw pointer"></i>
          </li>

          <li class="left h40 lh40 mr20">
            <i class="fa fa-sign-out pointer" @click="logout"></i>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import utils from '@/common/utils/common.js'

  export default {
    data() {
      return {
        userName: ""
      }
    },
    methods: {
      logout() {
        this.$confirm('是否退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        })
//          .catch(() => {
//          this.$message({
//            type: 'info',
//            message: '已取消删除'
//          });
//        })
      }
    },
    mounted(){
      this.userName = utils.getCookie("userName");
    }
  }
</script>
