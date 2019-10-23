<template>
  <div>
    <router-link to="/cloudformation/create"><el-button style="margin-bottom: 20px;">上传CloudFormation模版</el-button></router-link>

    <el-table :data="cfData">

      <el-table-column label="模版名称">
        <template slot-scope="scope">
          <router-link :to="'/cloudformation/info/' + scope.row.id "><span style="color: cornflowerblue">{{ scope.row.name }}</span></router-link>
        </template>
      </el-table-column>

      <el-table-column prop="service" label="服务"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <!-- <el-table-column prop="finalstatus" label="状态"> -->
        <!-- <el-progress :text-inside="true" :stroke-width="20" :percentage="60"></el-progress> -->
      <!-- </el-table-column> -->

    </el-table>

  </div>
</template>
<script>
export default {
  data () {
    return {
      cfData: [],
      // statusData: []
    }
  },
  created() {
      this.getList()
  },
  methods: {
    getList () {
      this.$axios({ method: 'get', url: '/api/module/aws', 
        params: {}
      }).then(res => {
        console.log(res)
        this.cfData = res.data.data
        console.log(res.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    // timer() {
    //   return setTimeout(()=>{
    //     this.getList()
    //   }, 20000)
    // },
  },
//   watch: {
//     tableData () {
//       this.timer()
//     }
//   },
//   destroyed() {
//     window.clearTimeout(this.timer)
//   }



  // mounted () {
  //   this.getList()
  // },
    // getStatus() {
    //   this.$axios({ method: 'get', url: '/api/service/eks/status', 
    //     params: {
    //       'user': '11'
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     this.statusData = res.data.data
    //     console.log(this.statusData)
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },

}
</script>

<style scoped lang="scss">
</style>