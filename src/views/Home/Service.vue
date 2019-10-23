<template>
  <el-row>
    <!-- 服务表格 -->
    <el-col :md="10" :xl="9" :sm="24" :xs="24" :lg="10">
      <!-- 搜索栏 -->
      <el-col class="search">
        <span class="title">服务</span>
        <el-form :inline="true" :model="serviceSearch" style="display: inline;">
          <el-form-item style="padding-left: 10px;">
            <el-input v-model="serviceSearch.service" placeholder="请输入服务名称" style="width: auto; line-height: 65px;"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form>
      </el-col>
      <!-- 表格 -->
      <el-col>
        <!-- <el-table ref="multipleTable" :data="serviceData.slice((page-1)*limit, page*limit)" tooltip-effect="dark"
          @selection-change="handleSelectionChange"> -->
        <!-- <el-table ref="multipleTable" :data="serviceData" tooltip-effect="dark" :size="small"> -->
        <el-table size="medium" ref="multipleTable" :data="serviceData">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline>
                <span v-for="item in props.row.region" :key="item.region" :value="item.name">{{ item.name + " " }}</span> 
              </el-form>
            </template>
          </el-table-column>

          <el-table-column prop="name" label="服务名称" width="380px;"></el-table-column>
          <el-table-column prop="shortname" label="简称" width="100px;"></el-table-column>
          <!-- <el-table-column type="expand" label="区域">
            <template slot-scope="props">
              <el-form label-position="left" inline>
                <span v-for="item in props.row.region" :key="item.region" :value="item.name">{{ item.name + " " }}</span> 
              </el-form>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- 页码 -->
        <!-- <div style="text-align: center;margin-top: 30px; overflow: hidden; ">
          <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
        </div> -->
      </el-col>
    </el-col>

    <!-- 区域表格 -->
    <el-col :md="12" :xl="15" :sm="24" :xs="24" :lg="14">
      <span class="title">终端节点</span>
      <!-- <el-table ref="multipleTable" :data="regionData.slice((page-1)*limit,page*limit)" tooltip-effect="dark" 
      @selection-change="handleSelectionChange" v-for="item in regionData" :key="item.regionname" :value="item.endpoint"> -->
      <el-row>
        <el-col v-for="item in regionData" :key="item.index" :md="24" :sm="24" :lg="8">
          <!-- <div :body-style="{padding:'10px'}"> -->
          <div style="padding: 10px; color: dimgray;">
            <el-row>
              {{ item.region }}
            </el-row>
            <el-row>
              {{ item.regionname }}
            </el-row>
            <el-row>
              {{ item.endpoint }}
            </el-row>
          </div>
        </el-col>
      </el-row>
        <!-- <el-table-column prop="regionname" label="名称" width="220px;"></el-table-column>
        <el-table-column prop="region" label="区域" width="200px;"></el-table-column>
        <el-table-column prop="endpoint" label="终端节点"></el-table-column> -->
      <!-- </el-table> -->
    </el-col>

  </el-row>
</template>

<script>
import Vue from 'vue'
import { type } from 'os';
export default {
  data () {
    return {
      regionData: [],
      serviceData: [],
      type: 'owner',
      limit: 50,
      page: 1,
      serviceSearch: {
        'service': ''
      }
    }
  },
  mounted () {
    this.serviceList()
    this.regionList ()
  },
  methods: {

    // 查询列表
    onSearch() {
      this.$axios({ method: 'get', url: '/api/service/aws/regionmap', params: this.serviceSearch }).then(res => {
        this.total = res.data.data.length
        this.serviceData = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 服务列表
    serviceList () {
      this.$axios({ method: 'get', url: '/api/service/aws/regionmap', params: {} }).then(res => {
      // this.$axios.get('/api/service/aws/regionmap', { params: this.serviceSearch }).then(function (res) {
        // console.log(res)
        this.total = res.data.data.length
        // _this.total = res.data.data.length * 2
        this.serviceData = res.data.data
      })
    },

    // 区域列表
    regionList () {
      this.$axios({ method: 'get', url: '/api/service/aws/regioninfo', params: {} }).then(res => {
      // this.$axios.get('/api/service/aws/regionmap', { params: this.serviceSearch }).then(function (res) {
        // console.log(res)
        this.total = res.data.data.length
        // _this.total = res.data.data.length * 2
        this.regionData = res.data.data
        // console.log(this.regionData)
      })
    },


    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // },
    // current_change (page) {
    //   this.page = page;
    // },
    // mounted () {
    //     this.serviceData.forEach(item => {
    //     this.$set(this.state, item.name, '') // 父、  子、  子的赋值
    //     })
    // }
  }
}
</script>

<style scoped lang="scss">
.search {
  overflow: hidden; 
  white-space:nowrap; 
  height: 65px; 
  line-height: 65px;

}
.title{
  padding-left: 10px;
  height: 65px; 
  line-height: 65px;
  color: dimgray
}

  .demo-table-expand span {
    // text-align: center;
    display: inline-block;
    width: 195px;
    // width: auto;
    white-space: pre-wrap
    // word-wrap: break-word;
    // word-break: normal;
  }
</style>
