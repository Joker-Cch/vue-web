<template>
  <div>
    <router-link to="/sshUpload"><el-button style="margin-bottom: 20px;">添加SSH</el-button></router-link>
    <el-table ref="multipleTable" :data="tableData.slice((page-1)*limit,page*limit)" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- <el-table-column prop="id" label="ID" width="120"></el-table-column> -->
      <el-table-column prop="name" label="名称" width="370"></el-table-column>
      <el-table-column prop="create_date" label="创建时间" width="250"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 30px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      total: 0,
      type: 'owner',
      limit: 10,
      page: 1,
      keyForm: {
        'type': null,
        'limit': null,
        'page': null
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let _this = this
      this.$axios.get('/api/secret/sshkey', {
        params: this.keyForm
      }).then(function (res) {
        console.log(res)
        _this.total = res.data.data.length
        // _this.total = res.data.data.length * 2
        _this.tableData = res.data.data
      })
    },
    // 选择器
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    current_change (page) {
      this.page = page;
    },
    
    // 编辑
    handleEdit (row, index) {
      row.show = !row.show
      Vue.set(this.tableData, index, row)
      // 修改后保存
    },
    // 单个删除
    handleDelete (index) {
      this.tableData.splice(index, 1)
    },
  }
}
</script>

<style scoped lang="scss">
</style>
