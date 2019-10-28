<template>
  <div>
    <h2 style="padding-left: 100px; margin-bottom: 30px;">创建用户</h2>
    <el-form status-icon ref="ruleForm" label-width="100px" class="ruleForm" style="width: 500px;">
      <!--名称-->
      <el-form-item label="Name">
        <el-input type="text" v-model="username" autocomplete="off"></el-input>
      </el-form-item>
      <!--content-->
      <el-form-item label="Password">
        <el-input type="password" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <!--allow_user-->
      <el-form-item label="Role">
        <el-select v-model="role" placeholder="请选择">
          <el-option v-for="item in roleData" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否更新">
        <el-switch v-model="active" inactive-text="否" active-text="是" @change="onChange"></el-switch>
      </el-form-item>

      <!--提交-->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import JSEncrypt from 'jsencrypt/bin/jsencrypt'
export default {
  data () {
    return {
      username: '',
      password: '',
      role: '',
      active: false,
      roleData: [],

      // ruleForm: {

        updateUser: this.active
      // }
    }
  },
  methods: {
    submitForm () {
          console.log(this.username)
          console.log(this.password)
          console.log(this.role)
          console.log(this.active)
      this.$axios({ method: 'post', url: '/api/user', 
        data: {
          'username': this.username,
          'password': this.password,
          'role': this.role,
          'updateUser': this.active
        }}).then(res => {

          console.log(res)
          if (res.status === 200) {
            console.log(res.data)
            this.$router.push('/userList')
          } else {
            console.log(res.data)
          }
        }).catch(error => {
          console.log(error)
        })
    },
    // 密钥查询
    roleList () {
      this.$axios({ method: 'get', url: '/api/role',
        params: ""
      }).then(res => {
        this.roleData = res.data.data
        console.log(this.roleData)
      }).catch(error => {
        console.log(error)
      })
    },

    onChange () {
      this.active === true
    },
  },
  mounted () {
    this.roleList()
  },
}
</script>
