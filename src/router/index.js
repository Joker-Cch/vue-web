import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Service from '../views/Home/Service'
// import Region from '../views/Home/Region'
import eksHome from '../views/Service/EKS/eksHome'
import eksCreate from '../views/Service/EKS/eksCreate'
import eksInfo from '../views/Service/EKS/eksInfo'
import modelHome from '../views/Service/CloudFormation/modelHome'
import modelCreate from '../views/Service/CloudFormation/modelCreate'
import modelInfo from '../views/Service/CloudFormation/modelInfo'
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
    name: '服务',
    iconCls: 'el-icon-star-on',
    children: [
      { path: '/eks/home', component: eksHome, name: 'EKS' },
      { path: '/eks/create', component: eksCreate, name: '创建EKS', hidden: true },
      { path: '/eks/info/:id', component: eksInfo, name: 'Info', hidden: true },
      { path: '/cloudformation/home', component: modelHome, name: 'CloudFormation' },
      { path: '/cloudformation/create', component: modelCreate, name: '上传CloudFormation模版', hidden: true },
      { path: '/cloudformation/info/:id', component: modelInfo, name: 'Info', hidden: true },
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'AWS 资源',
    iconCls: 'el-icon-s-home',
    children: [
      { path: '/service', component: Service, name: '服务' },
      // { path: '/region', component: Region, name: '区域' }
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
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     localStorage.removeItem('Authorization')
//   }
//   let token = localStorage.getItem('Authorization')
//   if (!token && to.path !== '/login') {
//     next({path: '/login'})
//   } else {
//     next()
//   }
// })

export default router
