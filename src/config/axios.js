import axios from 'axios'
import store from '../store'
import router from '../router'

// 创建axios实例
var instance = axios.create({
  timeout: 5000, // 请求超过5秒即超时返回错误
  baseURL: 'http://127.0.0.1:8081',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// request拦截器
instance.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => { // 默认除了2XX之外的都是错误的，就会走这里
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout'); // 可能是token过期，清除它
          router.replace({ // 跳转到登录页面
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
          break
        case 404:
          console.log('接口不存在！')
          break
        default:
          return
      }
    }
    return Promise.reject(error.response)
  }
)

export default {
  // 用户注册
  userRegister(data) {
    return instance.post('/api/v1/register', data)
  },
  // 用户登录
  userSignIn(data) {
    return instance.post('/api/v1/userSignIn', data)
  },
  // 退出登录
  userSignOut(data) {
    return instance.post('/api/v1/userSignOut', data)
  },
  // 获取用户
  getUser() {
    return instance.get('/api/v1/getUser')
  },
  // 删除用户
  delUser(data) {
    return instance.post('/api/v1/delUser', data)
  },
  // 测试获取json
  getJson(data) {
    return instance.post('/api/v1/json', data)
  }
}
