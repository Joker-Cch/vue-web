<template>
  <el-row :gutter="50">
    <el-col :xs="12" :sm="14" :md="12" :lg="12" :xl="12">
      <span>集群</span>
      <!-- <el-form ref="eksForm" :model="eksForm" label-width="160px">   -->
      <el-form label-width="160px">

        <el-form-item label="集群名称">
          <el-input v-model="name"></el-input>
        </el-form-item>

        <el-form-item label="区域">
          <el-select v-model="region" placeholder="请选择" @change="selectRegion(region)">
            <el-option v-for="item in eksData" :key="item.region" :value="item.region" :label="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="AKSK">
          <el-select v-model="aksk" placeholder="请选择" @change="selectAKSK(aksk)">
            <el-option v-for="item in keyData" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="VPC">
          <el-switch v-model="active" inactive-text="创建" active-text="现有" @change="onChange"></el-switch>

          <el-row v-if="isVpc" style="padding-top:20px;">
            <el-select v-model="vpc" placeholder="请选择" @change="subList()">
              <el-option v-for="item in vpcData" :key="item.id" :value="item.id" :label="item.tags" style="width: 300px;">
                <span style="float: left">{{ item.tags }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cidrblock }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row v-if="isSub" style="padding-top:20px;">
            <span>子网</span>
            <el-checkbox-group v-model="subnet">
              <el-checkbox v-for="item in subData" :key="item.id" :value="item.tags" :label="item.tags"></el-checkbox>
            </el-checkbox-group>
          </el-row>

          <el-row v-if="isGroup" style="padding-top:20px;">
            <span>安全组</span>
            <el-select v-model="group" placeholder="请选择">
              <el-option v-for="item in groupData" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-row>

        </el-form-item>

        <el-row>
          <el-col v-show="active">
            <span>节点组</span>
            <el-form label-width="160px">

              <el-form-item label="节点名称">
                <el-input v-model="groupName"></el-input>
              </el-form-item>

              <el-form-item label="镜像">
                <!-- <el-select v-model="ami" placeholder="请选择" @change="selectAmi(ami)"> -->
                <el-select v-model="ami" placeholder="请选择">
                  <el-option v-for="item in amiData" :key="item.ami" :value="item.ami" :label="item.os" style="width: 400px;">
                    <span style="float: left">{{ item.os }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tags }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="实例类型">
                <el-input v-model="type"></el-input>
                <!-- <el-select v-model="type" placeholder="请选择" @change="selectType(type)">
                  <el-option v-for="item in keyData" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select> -->
              </el-form-item>

              <el-form-item label="节点组子网">
                <el-checkbox-group v-model="sub">
                  <el-checkbox v-for="item in gSubData" :key="item.id" :value="item.tags" :label="item.tags"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="SSH">
                <!-- <el-select v-model="ssh" placeholder="请选择" @change="selectSsh(ssh)"> -->
                <el-select v-model="ssh" placeholder="请选择" @change="selectSsh(ssh)">
                  <el-option v-for="item in sshData" :key="item.index" :value="item.name"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="实例最小值">
                <el-input-number v-model="minNum" :min="1" :max="10"></el-input-number>
              </el-form-item>

              <el-form-item label="实例最大值">
                <el-input-number v-model="maxNum" :min="1" :max="10"></el-input-number>
              </el-form-item>

              <el-form-item label="卷大小">
                <el-input v-model="size"></el-input>
              </el-form-item>

            </el-form>
          </el-col>
        </el-row>

        <el-form-item  style="padding-top:15px;">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>

      </el-form>
    </el-col>



  </el-row>


</template>

<script>
// import { mapState } from 'vuex';
  export default {
    data() {
      return {
        isVpc: false,
        isSub: false,
        isGroup: false,
        active: false,
        // 表单一
        status: '',
        region: '',
        aksk: '',
        name: '',

        vpc: '',
        group: '',
        ami: '',
        subnet: [],
        eksData: [],
        keyData: [],
        // sshData: [],
        vpcData: [],
        subData: [],
        groupData: [],
        // 表单二
        groupName: '',
        ami: '',
        type: 't2.micro',
        sub: [],
        gSubData: [],
        ssh: '',
        sshData: [],
        amiData: [],
        minNum: '1',
        maxNum: '1',
        size: ''


      }
    },
    mounted () {
      this.regionList()
      this.akskList()
      // this.amiList()
    },
    methods: {
      selectRegion(val) {
        if (!this.active) {
        } else {
          this.active = false
          this.isVpc = false
          this.isSub = false
          this.isGroup = false
          this.vpc = ""
        }
      },
      selectAKSK(val) {
        if (!this.active) {
        } else {
          this.active = false
          this.isVpc = false
          this.isSub = false
          this.isGroup = false
          this.vpc = ""
        }
      },
      // selectSsh(val) {
      //   if (!this.active) {
      //   } else {
      //     this.active = false
      //     this.isVpc = false
      //     this.isSub = false
      //     this.isGroup = false
      //     this.vpc = ""
      //   }
      // },
      // VPC查询
      onChange () {
        if ( this.region == "" ) {
          this.active = false,
          alert("请选择有效区域！")
          return
        } else if ( this.aksk == "" ) {
          this.active = false,
          alert("请选择有效密钥！")
          return
        } else {
          this.isVpc = !this.isVpc
          // vpc
          this.$axios({ method: 'post', url: '/api/service/aws', 
            data: {
              'type': 'vpc',
              'region': this.region,
              'secret': this.aksk,
              'filter': {}
            }
          }).then(res => {
            this.vpcData = res.data.data
            console.log(this.vpcData)
          }).catch(error => {
            console.log(error)
          })
          // 镜像查询
          this.$axios({ method: 'get', url: '/api/service/aws/ami', 
            params: { 'region': this.region }
          }).then(res => {
            this.amiData = res.data.data
            console.log(this.amiData)
          }).catch(error => {
            console.log(error)
          })
        }
      },
      // 子网查询
      subList () {
        this.isSub = !this.isSub
        this.isGroup = !this.isGroup
        this.$axios({ method: 'post', url: '/api/service/aws', 
          data: {
            'type': 'subnet',
            'region': this.region,
            'secret': this.aksk,
            'filter': { 'vpc': this.vpc }
          }
        }).then(res => {
          this.subData = res.data.data
          console.log(this.subData)
        }).catch(error => {
          console.log(error)
        })
        // 节点子网组查询
        this.$axios({ method: 'post', url: '/api/service/aws', 
        data: {
          'type': 'subnet',
          'region': this.region,
          'secret': this.aksk,
          'filter': { 'vpc': this.vpc }
        }
        }).then(res => {
          this.gSubData = res.data.data
          console.log(this.gSubData)
        }).catch(error => {
          console.log(error)
        }),
        // SSh
        this.$axios({ method: 'get', url: '/api/secret/sshkey',
          params: {
            'type': null,
            'limit': null,
            'page': null
          }
        }).then(res => {
          this.sshData = res.data.data
          console.log(this.sshData)
        }).catch(error => {
          console.log(error)
        })
        // group
        this.$axios({ method: 'post', url: '/api/service/aws', 
          data: {
            'type': 'securitygroup',
            'region': this.region,
            'secret': this.aksk,
            'filter': { 'vpc': this.vpc }
          }
        }).then(res => {
          this.groupData = res.data.data
          console.log(this.groupData)
        }).catch(error => {
          console.log(error)
        })
      },
      // 区域查询
      regionList () {
        this.$axios({ method: 'get', url: '/api/service/aws/regionmap', params: { "service": "eks" } }).then(res => {
          this.eksData = res.data.data[0].region
        }).catch(error => {
          console.log(error)
        })
      },
      // 密钥查询
      akskList () {
        this.$axios({ method: 'get', url: '/api/secret',
          params: {
            'type': null,
            'limit': null,
            'page': null
          }
        }).then(res => {
          this.keyData = res.data.data
          console.log(this.keyData)
        }).catch(error => {
          console.log(error)
        })
      },


      // EKS请求
      onSubmit() {
        if (!this.active) {
          // this.isSub = !this.isSub
          // this.isGroup = !this.isGroup
          console.log(this.active)
          this.$axios({ method: 'post', url: '/api/service/eks', 
            data: {
              'name': this.name,
              'region': this.region,
              'aksk': this.aksk,
              'vpc': { 
                'status': 'auto'
              },
            }
          }).then(res => {
            console.log(res)
            alert(res.data.data.name)
            // this.subData = res.data.data
          }).catch(error => {
            console.log(error)
          })
        } else {
          // this.isSub = !this.isSub
          // this.isGroup = !this.isGroup
          this.$axios({ method: 'post', url: '/api/service/eks', 
            data: {
              'name': this.name,
              'region': this.region,
              'aksk': this.aksk,
              'vpc': { 
                'status': 'exist',
                'subnet': this.subnet,
                'securitygroup': this.group,
              },
              'nodegroups': {
                'groupsname': {
                  'nodeimage': this.ami,
                  'instance': 't2.micro',
                  'subnet': this.sub,
                  'sshkeyname': this.ssh,
                  'instancemix': 2,
                  'instancemax': 2,
                  'valumnsize': 20
                }
              }
            }
          }).then(res => {
            console.log(res)
            alert(res.data.data.name)
            // this.subData = res.data.data
          }).catch(error => {
            console.log(error)
          })
        }
        console.log('Submit!')
      }
    }
  }
</script>
<style lang="scss" scoped>
.body {
  padding: 5px 25px;
}
.el-form-item__label {
    text-align: left;
}


</style>>