// 微信配置文件
const path = require('path')
const util = require('./libs/utils')
const wechat_file = path.join(__dirname, 'wechat.txt')

module.exports = {
  wechat: {
    token: 'wolongangroot',
    appId: 'wxe3d7990bab2439eb',
    appSecret: '0f5e220b7465a92345635b6016d22fd4',
    encodingAESKey: '7leoh14eCgezhFU8PwnGvo6lYiPqQTK59n93iwI2e0l'
  },
  prefix: 'https://api.weixin.qq.com/cgi-bin/token',
  getAccessToken: function(){
    return util.readFileAsync(wechat_file)
  },
  saveAccessToken:function(data){
    data = JSON.stringify(data)
    return util.writeFileAsync(wechat_file, data)
  }
}