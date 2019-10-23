<template>
  <el-form ref="form" :model="form" label-width="80px">

    <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="类型">
      <el-select v-model="form.service" placeholder="请选择类型">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="分类">
      <el-input v-model="form.moduleclass"></el-input>
    </el-form-item>

    <el-form-item label="内容">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        putData: [],
        form: {
          name: '',
          service: '',
          moduleclass: '',
          desc: ''
        }
      }
    },
    methods: {
      getList () {
        this.$axios({ method: 'post', url: '/api/module/aws', 
          data: {
            'name': this.name,
            'service': this.service,
            'moduleclass': this.moduleclass,
            'content': this.desc
          }
        }).then(res => {
          console.log(res)
          this.putData = res.data.data
          console.log(res.data.data)
        }).catch(error => {
          console.log(error)
        })
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>>