<template>
  <div>
    <h2 style="padding-left: 100px; margin-bottom: 30px;">上传SSH</h2>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm" style="width: 500px;">
      <!--名称-->
      <el-form-item label="Name" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!--content-->
      <el-form-item label="Content" prop="content">
        <el-input type="text" v-model="ruleForm.content" autocomplete="off"></el-input>
      </el-form-item>
      <!--allow_user-->
      <el-form-item label="User" prop="user">
        <el-select v-model="ruleForm.user"></el-select>
      </el-form-item>
      <!--提交-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
        content: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        content: [
          { validator: validateContent, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$axios({ method: 'post', url: '/api/secret/sshkey', data: formName }).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          this.$router.push('/sshUpload')
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
