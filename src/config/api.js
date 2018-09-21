import axios from 'axios';

// 查询信息
export const findData = (data) => {
  return axios.get('/f/wechat/getUserInfo.do', data);
};

// 用户授权
export const oauth = (data) => {
  return axios.get('/public/wechat/oauth2.do', data);
};

// 用户登录
export const userSignIn = (data) => {
  return axios.post('/f/wechat/auth2Login.do', data);
};

// 用户退出
export const userSignOut = (data) => {
  return axios.post('/f/wechat/auth2Login.do', data);
};

// 查询学生接口 wechatId
export const findStudent = (data) => {
  return axios.post('/public/wechat/findStudentInfo.do', data);
};

// 绑定学生用户 openId，studentId
export const bindStudent = (data) => {
  return axios.post('/public/wechat/bindStudent.do', data);
};

// 查询绑定学生 studentId
export const findBindStudent = (data) => {
  return axios.post('/public/wechat/findbindStudent.do', data);
};

// 查询学生课程
export const findCurriculum = (data) => {
  return axios.post('/public/wechat/findStudyCurriculum.do', data);
};
