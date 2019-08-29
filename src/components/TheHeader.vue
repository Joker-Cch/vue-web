<template>
    <el-col class="header">
      <el-col :span="4" class="logo"><img src="../assets/logo.png" style="width: 60px"></el-col>
      <el-col :span="16" class="search"></el-col>
      <el-col :span="4" class="info">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link user-info">{{sysUserName}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-dropdown trigger="hover">
          <span class="el-dropdown-link region-info">{{sysRegion}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>新加坡</el-dropdown-item>
            <el-dropdown-item>东京</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </el-col>

    </el-col>
</template>

<script>
export default {
  name: 'TheHeader',
  data () {
    return {
      // sysRegion: '新加坡',
      sysUserName: 'admin',
      collapsed: false
    }
  },
  methods: {
    logout () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        localStorage.removeItem('Authorization')
        _this.$router.push('/login')
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  line-height: 60px;
  color:#fff;
  background-color: #232f3e;
  text-shadow: 0 1px 0 #000;
  margin-bottom: 20px;
  box-shadow:0 0 3px #000;
  overflow: hidden;
  .logo{
    height:60px;
    line-height: 60px;
    font-size: 18px;
    text-align: center;
  }
  .search{
    height: 60px;
  }
  .info {
    height: 60px;
    font-size: 12px;
    text-align: center;
    /*padding-right: 60px;*/
    .user-info {
      padding: 0 20px;
      cursor: pointer;
      color:#fff;
    }
    // .region-info {
    //   padding: 0 20px;
    //   cursor: pointer;
    //   color:#fff;
    // }
  }
}
</style>
