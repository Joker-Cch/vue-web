<template>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect"
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
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <li v-if="!item.leaf" :index="index+''" style="position: relative;" :key="index">
              <div class="el-submenu__title" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="term in item.children" :key="term.path" v-if="term.menuShow" class="el-menu-item" :class="$route.path==term.path?'is-active':''"
                    @click="$router.push(term.path)">{{term.name}}</li>
              </ul>
            </li>
            <li v-else-if="item.leaf&&item.children&&item.children.length" class="el-menu-item el-submenu__title" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)" :key="index">
              <i :class="item.iconCls"></i>
            </li>
          </template>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
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
  aside {
    flex:0 0 300px;
    width: 300px;
    .el-submenu [class^=el-icon-] {
      font-size: 20px;
      padding: 0 20px;
      margin-right: 15px;
    }
    // .el-submenu .el-menu-item {
    //   margin-left: 36px;
    // }
    // .el-menu-item:focus, .el-menu-item:hover {
    //   background-color: !important;
    // }
    // .el-menu-item.is-active {
    // color: #409EFF;
    // }
    .el-menu-item{
      padding-left: 60px
    }
    .el-menu{
      height: 100%;
    }
    .collapsed{
      width:60px;
      .item{
        position: relative;
      }
      .submenu{
        position:absolute;
        top:0px;
        left:60px;
        z-index:99999;
        height:auto;
        display:none; 
      }
    }
  }
  .content-container {
    flex:1;
    overflow-y: scroll;
    padding: 16px 30px 20px;
    // box-shadow:0 0 3px #000;
    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
