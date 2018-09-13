'use strict'

const sha1 = require('sha1')
const Promise = require('bluebird')
const request = Promise.promisify(require('request'))

const config = require('../wechat/config')

const api = {
  accessToken: config.prefixHost+'/cgi-bin/token?grant_type=client_credential'
}


function Wechat(){
  let that = this;
  this.appId = config.wechat.appId;
  this.appSecret = config.wechat.appSecret;
  this.getAccessToken = config.getAccessToken;
  this.saveAccessToken = config.saveAccessToken;

  this.getAccessToken().then(function(data){
    try{
      data = JSON.parse(data)
    }catch(e){
      return that.updataAccessToken();
    }

    if(that.isValidAccessToken(data)){
      return data;
    } else {
      that.updataAccessToken();
    }
  }).then(function(data){
    if(data){
      that.access_token = data.access_token;
      that.expires_in = data.expires_in;

      that.saveAccessToken(data);
    }
  })
}

Wechat.prototype.isValidAccessToken = function(data){
  if(!data || !data.access_token || !data.expires_in){
    return 
  }
  var access_token = data.access_token;
  var expires_in = data.expires_in;
  var now = new Date().getTime();

  if( now < expires_in ){
    return true;
  }else{
    return false
  }
}

Wechat.prototype.updataAccessToken = function(){
  var appId = this.appId;
  var appSecret = this.appSecret;
  var url = api.accessToken + '&appid=' + appId +'&secret=' + appSecret;

  return new Promise(function(resolve, reject){
    request({url: url,json: true}).then(function(response){
      var data = response.body;
      var now = new Date().getTime();
      var expires_in = now + (data.expires_in-20)*1000;
      data.expires_in = expires_in;

      resolve(data)
    })
  })
}

module.exports = Wechat