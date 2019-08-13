import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Service from '../views/Home/Service'
import Region from '../views/Home/Region'
import EKS from '../views/Service/EKS'
import Page4 from '../views/nav2/Page4'
import Page5 from '../views/nav2/Page5'
import keyList from '../views/Setting/keyList'
import keyUpload from '../views/Setting/keyUpload'
import sshList from '../views/Setting/sshList'
import sshUpload from '../views/Setting/sshUpload'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: '',
    component: Login,
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: 'AWS 资源',
    iconCls: 'el-icon-s-home',
    children: [
      { path: '/service', component: Service, name: '服务' },
      { path: '/eks/home', component: EKS, name: 'EKS', hidden: true},
      { path: '/region', component: Region, name: '区域' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '实例',
    iconCls: 'el-icon-cpu',
    children: [
      { path: '/page4', component: Page4, name: 'VPC' },
      { path: '/page5', component: Page5, name: '安全组' }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '设置',
    iconCls: 'el-icon-setting',
    children: [
      { path: '/keyList', component: keyList, name: '密钥对' },
      { path: '/keyUpload', component: keyUpload, name: '上传密钥对', hidden: true },
      { path: '/sshList', component: sshList, name: 'SSH Key' },
      { path: '/sshUpload', component: sshUpload, name: '上传SSH', hidden: true }
    ]
  },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '设置',
  //   iconCls: 'el-icon-setting'
  // },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }
]

const router = new Router({
  mode: 'history',
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('Authorization')
  }
  let token = localStorage.getItem('Authorization')
  if (!token && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
})

export default router
