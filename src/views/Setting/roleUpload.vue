<template>
  <div>
    <h2 style="padding-left: 100px; margin-bottom: 30px;">创建角色</h2>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="ruleForm" style="width: 500px;">
      <!--名称-->
      <el-form-item label="Name" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!--content-->
      <el-form-item label="Policy" prop="policy">
        <el-input type="text" v-model="ruleForm.policy" autocomplete="off"></el-input>
      </el-form-item>
      <!--allow_user-->
      <el-form-item label="User" prop="user">
        <el-select v-model="ruleForm.user"></el-select>
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
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入SSH名字'))
      } else {
        if (this.ruleForm.name !== '') {
          this.$refs.ruleForm.validateField('name')
        }
        callback()
      }
    }
    var validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入SSH密文！'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        // policy: '',
        // user: ''
      }
    }
  },
  methods: {
    submitForm () {
      // let encryptor = new JSEncrypt()
      // let publicKey = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgA3wlPzKk0FNr4zqYeNKfEYOJH+thJB5W8KKeoU2nI8VU4uLOQ30o2XM3SfjCed8IrxqmheNzgFfWLkAB7AQrK+mEfq4ZDhAht1RbvVyo5Dze+B3liFkI2EHu6yd1muQEccMhDy4HKG44ijEX4z7IkIFQbsYoKdWCWoegYi+/tvhKbHDkYLP9lXFlbv5AZOWVKBGhS56uYdpe9QDHkdNEz1iEUvvW0fWYNSwSaGD++QzrUrFQgZvQSElcySrpXKZ4DdwbAMPt4c7PvRRsykA3BEj5jyDkYmKgApU3DETzXbzzdJJ8vfIG0JMtkg6r7/Z0pg3rE/36FtlJ+qLkuCp1QIDAQAB-----END PUBLIC KEY-----"
      // encryptor.setPublicKey(publicKey)
      // let rsaPassWord = encryptor.encrypt('djwnvpicnvpa')
      // console.log(rsaPassWord) 

      this.$axios({ method: 'post', url: '/api/role', data: this.ruleForm }).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          this.$router.push('/roleList')
        } else {
          console.log(res.data)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
