<template>
  <el-row>
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
        </el-form-item>

        <el-form-item v-show="isVpc">
          <el-row>
            <el-select v-model="vpc" placeholder="请选择" @change="subList()">
              <el-option v-for="item in vpcData" :key="item.id" :value="item.id" :label="item.tags" style="width: 300px;">
                <span style="float: left">{{ item.tags }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cidrblock }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row v-if="isSub" style="padding-top:20px;">
            <span>子网</span>
            <!-- <el-checkbox-group v-model="subnet">
              <el-checkbox v-for="item in subData" :key="item.id" :value="item.tags" :label="item.id"></el-checkbox>
            </el-checkbox-group> -->
            <el-select v-model="subnet" multiple>
              <el-option v-for="item in subData" :key="item.id" :value="item.id" :label="item.tags"></el-option>
            </el-select>
          </el-row>

          <el-row v-if="isGroup" style="padding-top:20px;">
            <span>安全组</span>
            <el-select v-model="group" placeholder="请选择">
              <el-option v-for="item in groupData" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
          </el-row>

          <el-row style="padding-top:20px;">
          <!-- <el-row v-if="isVersion" style="padding-top:20px;"> -->
            <span>镜像版本</span>
            <el-select v-model="version" placeholder="请选择">
              <el-option v-for="item in verList" :key="item.value" :value="item.value" :label="item.value"></el-option>
            </el-select>
          </el-row>

          <el-row style="padding-top:20px;">
            <el-button type="primary" @click="onAdd">添加节点组</el-button>
          </el-row>

        </el-form-item>
      </el-form>
        
      <el-form v-show="isAdd">
        <el-form-item label="节点名称">
          <el-input v-model="groupName"></el-input>
        </el-form-item>

        <!-- <el-form-item label="镜像版本">
          <el-select v-model="ami" placeholder="请选择">
            <el-option v-for="item in amiData" :key="item.ami" :value="item.ami" :label="item.os" style="width: 400px;">
              <span style="float: left">{{ item.os }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.tags }}</span>
            </el-option>
          </el-select>
        </el-form-item> -->

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
          <el-select v-model="type" placeholder="请选择">
            <el-option v-for="item in typeData" :key="item.id" :value="item.instancetype" :label="item.instancetype"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="节点组子网">
          <!-- <el-checkbox-group v-model="sub">
            <el-checkbox v-for="item in gSubData" :key="item.id" :value="item.tags" :label="item.tags"></el-checkbox>
          </el-checkbox-group> -->
            <el-select v-model="sub" multiple>
              <el-option v-for="item in gSubData" :key="item.id" :value="item.id" :label="item.tags"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="SSH">
          <!-- <el-select v-model="ssh" placeholder="请选择" @change="selectSsh(ssh)"> -->
          <el-select v-model="ssh" placeholder="请选择">
            <el-option v-for="item in sshData" :key="item.index" :value="item.name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实例最小值">
          <el-input-number v-model="mixNum" :min="1" :max="10"></el-input-number>
        </el-form-item>

        <el-form-item label="实例最大值">
          <el-input-number v-model="maxNum" :min="1" :max="10"></el-input-number>
        </el-form-item>

        <el-form-item label="卷大小">
          <el-input-number v-model="size" :min="20" :max="100" controls-position="right"></el-input-number>&nbsp;&nbsp;&nbsp;GB
        </el-form-item>

      </el-form>

      <el-form>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>



    </el-col>
  </el-row>


</template>

<script>
// import { truncate } from 'fs';
// import { mapState } from 'vuex';
  export default {
    data() {
      return {
        isVpc: false,
        isSub: false,
        isGroup: false,
        active: false,
        isAdd: false,
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
        version: '1.11',
        verList: [
          {
            'id': 1,
            'value': '1.11' 
          },
          {
            'id': 2,
            'value': '1.12'
          },
          {
            'id': 3,
            'value': '1.13' 
          }
        ],
        // sshData: [],
        vpcData: [],
        subData: [],
        groupData: [],
        // 表单二
        groupName: '',
        ami: '',
        type: 't2.micro',
        typeData: [],
        sub: [],
        gSubData: [],
        ssh: '',
        sshData: [],
        amiData: [],
        mixNum: '1',
        maxNum: '1',
        size: '20'
      }
    },
    mounted () {
      this.regionList()
      this.akskList()
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
          params: {}
        }).then(res => {
          this.keyData = res.data.data
          console.log(this.keyData)
        }).catch(error => {
          console.log(error)
        })
      },

      onAdd() {
        this.isAdd = true
        console.log("isADD")
        // 镜像查询
        this.$axios({ method: 'get', url: '/api/service/aws/ami', 
          params: {
            'region': this.region,
            'tags': this.version + '%cpu'
          }
        }).then(res => {
          this.amiData = res.data.data
          console.log(this.amiData)
        }).catch(error => {
          console.log(error)
        })
        // 实例类型
        this.$axios({ method: 'get', url: '/api/service/aws/instancetype', 
          params: {}
        }).then(res => {
          this.typeData = res.data.data
          console.log(this.typeData)
        }).catch(error => {
          console.log(error)
        })
        console.log("add")
      },

      // EKS请求
      onSubmit() {
        if (!this.active) {
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
            alert(res['statusText'])
            this.$axios({ method: 'post', url: '/api/tasks/eks',
              data: {
                'eks': res['data']['data']
              }
            }).then(res => {
              console.log(res['data'])
            })
            this.$router.push('/eks/home')
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log(this.sub)
          console.log('子网')
          console.log(this.subnet)
          this.$axios({ method: 'post', url: '/api/service/eks', 
            data: {
              'name': this.name,
              'region': this.region,
              'aksk': this.aksk,
              'vpc': { 
                'status': 'exist',
                'id': this.vpc,
                'subnet': this.subnet,
                'securitygroup': this.group,
              },
              'nodegroups': {
                'groupsname': {
                  'nodeimage': this.ami,
                  'instance': this.type,
                  'subnet': this.sub,
                  'sshkeyname': this.ssh,
                  'instancemix': this.mixNum,
                  'instancemax': this.maxNum,
                  'valumnsize': this.size
                }
              }
            }
          }).then(res => {
            alert(res['statusText'])
            console.log(res)
            console.log(res['data']['data'])
            this.$axios({ method: 'post', url: '/api/tasks/eks',
              data: {
                'eks': res['data']['data']
              }
            }).then(res => {
            })
            this.$router.push('/eks/home')
            console.log("end post eks")
          }).catch(error => {
            console.log(error)
          })
        }
      },
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