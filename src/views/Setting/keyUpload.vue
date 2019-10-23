<template>
  <div>
    <h2 style="padding-left: 100px; margin-bottom: 30px;">上传密钥对</h2>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="ruleForm" style="width: 500px;">
      <!--名称-->
      <el-form-item label="Name" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!--aws_key-->
      <el-form-item label="AWS_Key" prop="AWS_Key">
        <el-input type="text" v-model="ruleForm.aws_key" autocomplete="off"></el-input>
      </el-form-item>
      <!--aws_secret-->
      <el-form-item label="AWS_Secret" prop="AWS_Secret">
        <el-input type="text" v-model="ruleForm.aws_secret" autocomplete="off"></el-input>
      </el-form-item>
      <!--allow_user-->
      <el-form-item label="Allow_Users" prop="Allow_Users">
        <el-select v-model="ruleForm.allow_users"></el-select>
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
      ruleForm: {
        name: '',
        aws_key: '',
        aws_secret: '',
        // allow_users: null
      }
    }
  },
  methods: {
    submitForm () {
      let encryptor = new JSEncrypt()
      let publicKey = "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgA3wlPzKk0FNr4zqYeNKfEYOJH+thJB5W8KKeoU2nI8VU4uLOQ30o2XM3SfjCed8IrxqmheNzgFfWLkAB7AQrK+mEfq4ZDhAht1RbvVyo5Dze+B3liFkI2EHu6yd1muQEccMhDy4HKG44ijEX4z7IkIFQbsYoKdWCWoegYi+/tvhKbHDkYLP9lXFlbv5AZOWVKBGhS56uYdpe9QDHkdNEz1iEUvvW0fWYNSwSaGD++QzrUrFQgZvQSElcySrpXKZ4DdwbAMPt4c7PvRRsykA3BEj5jyDkYmKgApU3DETzXbzzdJJ8vfIG0JMtkg6r7/Z0pg3rE/36FtlJ+qLkuCp1QIDAQAB-----END PUBLIC KEY-----"
      encryptor.setPublicKey(publicKey)
      this.ruleForm.aws_key = encryptor.encrypt(this.ruleForm.aws_key)
      this.ruleForm.aws_secret = encryptor.encrypt(this.ruleForm.aws_secret)
      // console.log(this.ruleForm.aws_key)
      // console.log(this.ruleForm.aws_secret)
      // console.log(this.ruleForm)
      this.$axios({ method: 'post', url: '/api/secret', data: this.ruleForm }).then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          this.$router.push('/keyList')
        } else {
          console.log(res.data)
          alert(res.data.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
