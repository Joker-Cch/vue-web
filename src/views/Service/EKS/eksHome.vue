<template>
  <div>
    <router-link to="/eks/create"><el-button style="margin-bottom: 20px;">创建EKS集群</el-button></router-link>

    <el-table :data="tableData">

      <el-table-column label="集群名称">
        <template slot-scope="scope">
          <router-link :to="'/eks/info/' + scope.row.id "><span style="color: cornflowerblue">{{ scope.row.name }}</span></router-link>
        </template>
      </el-table-column>

      <el-table-column prop="region" label="区域"></el-table-column>
      <el-table-column prop="aksk" label="创建者"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <el-table-column label="状态">
        {{ statusData['finalstatus'] }}
      </el-table-column>
      
    </el-table>

  </div>
</template>
<script>
import Vue from 'vue'
import { clearTimeout } from 'timers';
export default {
  data () {
    return {
      tableData: [],
      statusData: []
    }
  },
  created() {
      this.getList()
      this.getStatus()
  },
  methods: {
    getList () {
      this.$axios({ method: 'get', url: '/api/service/eks', 
        params: {}
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data
        console.log(res.data.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getStatus () {
      this.$axios({ method: 'get', url: '/api/service/eks/status', 
        params: {}
      }).then(res => {
        console.log(res)
        this.statusData = res.data.data
        console.log(this.statusData)
      }).catch(error => {
        console.log(error)
      })
    },
    timer() {
      return setTimeout(()=>{
        // this.getList()
        this.getStatus()
      }, 20000)
    },
  },
  watch: {
    tableData () {
      this.timer()
    }
  },
  destroyed() {
    window.clearTimeout(this.timer)
  }



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