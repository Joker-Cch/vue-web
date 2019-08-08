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
export default {
  data () {
    // var validateName = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密钥名字'))
    //   } else {
    //     if (this.ruleForm.name !== '') {
    //       this.$refs.ruleForm.validateField('name')
    //     }
    //     callback()
    //   }
    // }
    // var validateID = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密钥ID'))
    //   } else {
    //     callback()
    //   }
    // }
    // var validateSec = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error('密钥不能为空'))
    //   }
    // }
    return {
      ruleForm: {
        name: '',
        aws_key: '',
        aws_secret: ''
        // allow_users: null
      }
      // rules: {
      //   name: [
      //     { validator: validateName, trigger: 'blur' }
      //   ],
      //   id: [
      //     { validator: validateID, trigger: 'blur' }
      //   ],
      //   secret: [
      //     { validator: validateSec, trigger: 'blur' }
      //   ]
      // }
    }
  },
  methods: {
    submitForm () {
      console.log(this.ruleForm)
      this.$axios({ method: 'post', url: '/api/secret', data: this.ruleForm }).then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          alert(res.data.data)
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
