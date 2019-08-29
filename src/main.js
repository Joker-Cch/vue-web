// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index.css'
import axios from 'axios'
import Qs from 'qs'
// import JsEncrypt from 'jsencrypt'
import JSEncrypt from 'jsencrypt/bin/jsencrypt'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = Qs

axios.defaults.timeout = 15000 // 超时时间
axios.defaults.retry = 3 // 请求次数
axios.defaults.retryDelay = 1000 // 请求间隙
axios.defaults.baseURL = '/'
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Authorization')
    if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器 ,拦截401状态（token过期），重新登录
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('Authorization')
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
