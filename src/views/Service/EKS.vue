<template>
  <el-form ref="form" :model="form" label-width="160px">
    <el-form-item label="集群名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="Kubernetes Version">
      <el-select v-model="form.region" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Role name">
      <el-select v-model="form.role" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="VPC">
      <el-select v-model="form.vpc" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Security groups">
      <el-select v-model="form.sg" placeholder="请选择">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
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
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          keyForm: {
            'service': 'Amazon Elastic Kubernetes Service (EKS)',
            'shortname': 'EKS',
          }
        }
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getList () {
        // 过滤搜索字段值为空的属性，然后对象合并，合并上页码。
        let _par = Object.assign(this.filterParams(this.keyFrom), {
          service: this.service,
          shortname: this.shortname,
        })
        let _this = this
        this.$axios.get('/api/service/aws/regionmap', {
          params: _par
        }).then(function (res) {
          console.log(res)
          _this.total = res.data.data.length
          // _this.total = res.data.data.length * 2
          _this.tableData = res.data.data
        })
      },
      filterParams (obj) {
        let _form = obj, _newPar = {}, testStr
        // 遍历对象
        for (let key in _form) {
          testStr = null
          // 如果属性的值不为空。
          // 注意，不要这样判断if (_form[key])。因为有些属性的值可能为0，到时候就会被过滤掉
          if (_form[key] !== null && _form[key] !== '') {
            // 把值添加进新对象里面
            _newPar[key] = _form[key].toString()
          }
        }
        // 返回对象
        return _newPar
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>>