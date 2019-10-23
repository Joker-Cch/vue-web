<template>
  <div>
    <el-row>
      <ul id="menu">
        <li>模版名称：{{ cfData.name }}</li>
        <li>服务：{{ cfData.service}}</li>
        <li>创建时间：{{ cfData.create_date }}</li>
        <li>文本内容：{{ content }}</li>
        <!-- <li>状态：{{ cfData.finalstatus }}</li> -->
      </ul>
    </el-row>

    <el-row style="min-height: 100px; margin-top: 50px;">
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cfData: [],
      content: ''
    //   vpcData: []
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
      this.$axios({ method: 'get', url: '/api/module/aws/content', 
        params: {
          'id': num
        }
      }).then(res => {
        this.cfData = res.data.data
        // this.vpcData = res.data.data['variable']
        // console.log(res.data.data['variable'])
        this.content = JSON.stringify(this.cfData['content'])
        console.log(this.cfData)
        // console.log(JSON.stringify(this.cfData['content']))
        console.log('1111')
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