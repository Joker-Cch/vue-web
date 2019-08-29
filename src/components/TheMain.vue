<template>
    <el-col :span="24" class="main">
      <el-col :span="4" :class="collapsed?'menu-collapsed':'menu-expanded'" class="aside">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertica" @open="handleOpen" @close="handleClose" @select="handleSelect"
                unique-opened router v-show="!collapsed">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf" :key="index">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
          </template>
        </el-menu>

        <ul v-show="collapsed" class="el-menu collapsed" ref="menuCollapsed" >
          <template v-for="(item,index) in $router.options.routes">
            <li v-if="!item.leaf" :index="index+''" style="position: relative;" :key="index">
              <div class="el-submenu__title" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li class="el-menu-item" v-for="term in item.children" :key="term.path" :class="$route.path==term.path?'is-active':''"
                    @click="$router.push(term.path)">{{term.name}}</li>
              </ul> 
            </li>
            <li v-else-if="item.leaf&&item.children&&item.children.length" class="el-menu-item el-submenu__title" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)" :key="index">
              <i :class="item.iconCls"></i>
            </li>
          </template>
        </ul>
      </el-col>
      
      <el-col class="section" :span="20" >
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>

    </el-col>
</template>

<script>
export default {
  name: 'TheMain',
  data () {
    return {
      collapsed: false
    }
  },
  mounted () {
    // 初始化
    // document.getElementsByClassName('el-menu-item')[0].style.paddingLeft = 0
  },
  methods: {
    handleOpen () {
    },
    handleClose () {
    },
    handleSelect (a, b) {
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  position: absolute;
  top: 80px;
  bottom: 0px;
  padding-bottom: 50px;
  overflow: hidden;
  .aside {
    height: 100%;
    .el-menu-vertica{
      height: 100%;
    }
    .el-submenu [class^=el-icon-] {
      font-size: 20px;
      margin-right: 15px;
    }
  }
  .section {
    flex:1;
    overflow-y: scroll;
    padding: 5px 25px;
    // -webkit-box-shadow: #666 0px 0px 10px;
    // -moz-box-shadow: #666 0px 0px 10px;
    // box-shadow: #666 0px 0px 10px;
    // background: #EEFF99;

  }
}
</style>
