<template>
  <div>
    <el-row>
      <ul id="menu">
        <li>集群名称：{{ eksData.name }}</li>
        <li>区域：{{ eksData.region }}</li>
        <li>创建时间：{{ eksData.create_date }}</li>
        <li>状态：{{ eksData.finalstatus }}</li>
      </ul>
    </el-row>

    <el-row style="min-height: 100px; margin-top: 50px;">
      <!-- <el-col :span="12" style="background-color: rebeccapurple">
        <el-form>
          <el-form-item label="VPC"></el-form-item>
          <el-form-item label="子网"></el-form-item>
          <el-form-item label="安全组"></el-form-item>
          <el-form-item label="弹性IP"></el-form-item>
        </el-form>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eksData: [],
      vpcData: []
    }
  },
  // created () {
  //   console.log(this.$route.params.id)
  // },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      let num = this.$route.params.id
      this.$axios({ method: 'get', url: '/api/service/eks', 
        params: {
          'id': num
        }
      }).then(res => {
        this.eksData = res.data.data
        this.vpcData = res.data.data['variable']
        console.log(res.data.data['variable'])
        console.log(this.eksData)
        console.log(this.vpcData)
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped lang="scss">
  // #menu{
    // padding-top: 10px;
  // }
  #menu li{
    /*去掉前面的圆点*/
    // text-decoration: none;  
    // list-style: none;
    // display: inline;
    // border: 1px solid #FFFFFF;
    padding: 10px 0;
  }
</style>