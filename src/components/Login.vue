<template>
  <el-form :model="loginForm" status-icon :rule="ruleForm" ref="loginForm" label-width="0px" label-position="left" class="login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item>
      <el-button type="primary" style="width: 100%;" @click="login('loginForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/* eslint-disable semi */
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'test1234'
      },
      ruleForm: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    ...mapMutations(['setToken']),
    login () {
      let _this = this;
      this.$axios({ method: 'post', url: '/api/user/login', data: _this.loginForm }).then(res => {
        if (res.status === 200) {
          console.log(res.data);
          var userToken = 'Bosi' + ' ' + res.data.data.token.toString()
          // 将用户token保存到vuex中
          _this.setToken({ Authorization: userToken });
          _this.$router.push('/service');
        } else {
          console.log(res.data);
          alert(res.data.msg)
          _this.$router.go(0)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
  }
</style>
