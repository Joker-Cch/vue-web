<template>
  <div>
    <div style="padding-bottom: 10px;"><span>计算机</span></div>
    <ul>
      <li><router-link to="/eks/home"><a>EKS</a></router-link></li>
    </ul>
    <!-- <a href="/eks/home"></a>
    <el-table ref="multipleTable" :data="tableData.slice((page-1)*limit,page*limit)" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column prop="name" label="服务名称" width="400"></el-table-column>
      <el-table-column prop="shortname" label="简称" width="200"></el-table-column>
      <ul>
        <li>
          <a class="" target="_self" 
          href="https://cn-northwest-1.console.amazonaws.cn/ec2/v2/home?region=cn-northwest-1" 
          data-service-id="ec2" title="云中的虚拟服务器" 
          data-reactid=".0.0.0.2.1.$collapsible-section-items.0.$category-column-0.$category-0.1.1.$0.0">
          <span class="service-name" 
          data-reactid=".0.0.0.2.1.$collapsible-section-items.0.$category-column-0.$category-0.1.1.$0.0.0">EC2</span>
          </a>
        </li>
      </ul>

      <el-table-column label="区域" width="300">
        <template slot-scope="scope">
            <el-select placeholder="请选择" @change="changeSelect(scope.row.name)" v-model="state[scope.row.name]">
                <el-option v-for="item in scope.row.region" :key="item.region" :value="item.name"></el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">创建</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change"></el-pagination>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue'
import { type } from 'os';
export default {
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      total: 0,
      type: 'owner',
      limit: 10,
      state: {},
      page: 1,
      keyForm: {
        'service': '',
        'shortname': '',
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
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
    // 选择器
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    current_change (page) {
      this.page = page;
    },
    mounted () {
        this.tableData.forEach(item => {
        this.$set(this.state, item.name, '') // 父、  子、  子的赋值
        })
    },
    changeSelect (name) {
        console.log(name, this.state[name])
    }

  }
}
</script>

<style scoped lang="scss">
</style>
