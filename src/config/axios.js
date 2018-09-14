import axios from 'axios';
import store from '../store';
import router from '../router';

// 创建axios实例
var instance = axios.create({
  timeout: 5000, // 请求超过5秒即超时返回错误
  baseURL: 'http://topping.mydrn.cn/zhiying/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

// request拦截器
instance.interceptors.request.use(function(config) {
  // Do something before request is sent
  return config;
}, function(error) {
  // Do something with request error
  return Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response;
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
          });
          break;
        case 404:
          console.log('接口不存在！');
          break;
        default:
          return;
      }
    }
    return Promise.reject(error.response);
  }
);

export default {
  // 用户授权
  oauth(data) {
    return instance.get('/public/wechat/oauth2.do', data);
  },
  // 用户登录
  userSignIn(data) {
    return instance.post('/f/wechat/auth2Login.do', data);
  },
  // 查询学生接口
  findStudent(data) {
    return instance.post('/public/wechat/findStudentInfo.do', data);
  },
  // 获取用户
  bindStudent() {
    return instance.post('/public/wechat/bindStudent.do');
  },
  // 查询绑定学生
  findBindStudent(data) {
    return instance.post('/public/wechat/findBindStudent.do', data);
  },
  // 测试获取json
  findCurriculum(data) {
    return instance.post('/public/wechat/findStudyCurriculum.do', data);
  }
};
