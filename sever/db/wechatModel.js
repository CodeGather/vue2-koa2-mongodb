const WXBizDataCrypt = require('../wechat/libs/WXBizDataCrypt');
const sha1 = require('sha1');

const url = require('url');
const { URLSearchParams } = require('url');

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const config = require('../wechat/config');
const db = require('./util');

const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = 'cookbook'

const wechatApi = {
  accessToken: config.prefixHost+'/sns/jscode2session?'
}


const api = {
    /**
     * 处理微信code返回openId
     * @param {context} ctx 
     */
    async getOpenId(ctx) {
      let api = url.parse(ctx.request.url).query
      let code = new URLSearchParams(api).get('code');
      let apiUrl = wechatApi.accessToken + 'appid=' + config.wechatSmall.appId +'&secret=' + config.wechatSmall.appSecret +'&js_code=' + code + '&grant_type=authorization_code ';
      let requestData = function(){
        return new Promise(function(resolve, reject){
          request({url: apiUrl,json: true}).then(function(response){
            resolve(response.body)
          })
        })
      };
      let reqData = await requestData();
      ctx.body = {
        status: 200,
        data: {
          rd_session: reqData.session_key
        }
      }
    },
    /**
     * 处理auth
     * @param {context} ctx 
     */
    async auth(ctx) {
      let bodyData = ctx.request.body
      let reqData = bodyData.result;
      let shaData = sha1(reqData.rawData+bodyData.rd_session);
      if(shaData===reqData.signature){
        let wxCrypt = new WXBizDataCrypt(config.wechatSmall.appId, bodyData.rd_session);
        let data = wxCrypt.decryptData(reqData.encryptedData , reqData.iv);
        let name = data.openId;
        let password = data.nickName;
        let results = await db.find({name})
        let nickName= data.nickName;
        let gender= data.gender;
        let country= data.country;
        let city= data.city;
        let province= data.province;
        let avatarUrl= data.avatarUrl;
        let unionId= data.unionId;
        let oauth = 0;
        let userToken = {
          name: name
        }
        let token = jwt.sign(userToken, secret, {expiresIn: '1h'})
        if (results.length > 0) {
          ctx.body = {
            status: 200,
            data: {
              token: token, //返回token
              oauth: results[0].oauth
            }
          }
        } else {
          results = await db.insert({name, password, nickName, gender, country, city, province, avatarUrl, unionId, oauth})
          if (results) {
            ctx.body = {
              status: 200,
              data: {
                token: token, //返回token
                oauth: results.oauth
              }
            }
          }
        }
      }
    },
     /**
     * 创建菜谱
     * @param {context} ctx 
     */
    async saveCase(ctx) {
      let bodyData = ctx.request.body
      let reqData = bodyData.result;
      console.log(bodyData)
      /*if(shaData===reqData.signature){
      let wxCrypt = new WXBizDataCrypt(config.wechatSmall.appId, bodyData.rd_session);
      let data = wxCrypt.decryptData(reqData.encryptedData , reqData.iv);
      let name = data.openId;
      let password = data.nickName;
      let results = await db.find({name})
      let nickName= data.nickName;
      let gender= data.gender;
      let country= data.country;
      let city= data.city;
      let province= data.province;
      let avatarUrl= data.avatarUrl;
      let unionId= data.unionId;
      let oauth = 0;
      ctx.body = '注册失败'
      if (results.length > 0) {
          ctx.body = '用户名已被注册'
      } else {
          results = await db.foodInsert({name, password, nickName, gender, country, city, province, avatarUrl, unionId, oauth})
          console.log(results)
          if (results) {
              ctx.body = '注册成功'
          }
      }
      let userToken = {
        name: name
      }
      let token = jwt.sign(userToken, secret, {expiresIn: '1h'})
      */
      ctx.body = {
        status: 200,
//          data: {
//            token: token, //返回token
//            oauth: results[0].oauth
//          }
      }
    },
    /**
     * 处理auth
     * @param {context} ctx 
     */
    async upLoadImg(ctx) {
      ctx.body = {
        status: 200,
        filename: ctx.req.file.path //返回文件名
      }
    },
    /**
     * 处理注册逻辑
     * @param {context} ctx 
     */
    async userSignUp(ctx) {
        const info = ctx.request.body
        const name = info.userName
        const password = info.password
        let results = await db.find({name})
        ctx.body = '注册失败'
        if (results.length > 0) {
            ctx.body = '用户名已被注册'
        } else {
            results = await db.insert({name, password})
            if (results) {
                ctx.body = '注册成功'
            }
        }
    },

    /**
     * 处理登录逻辑
     * @param {context} ctx
     */
    async userSignIn(ctx) {
        const info = ctx.request.body
        const name = info.userName
        const password = info.password
        let results = await db.find({name, password})
        console.log(name)
        console.log(password)
        ctx.body = '登录失败'
        if (results.length > 0) {
            ctx.body = {
              msg: '登录成功',
              msgCode: 200
            }
        } else {
            ctx.body = '用户或密码错误'
        }
    },
    /**
     * 处理登录逻辑
     * @param {context} ctx
     */
    async userSignOut(ctx) {
      const info = ctx.request.body
      const name = info.userName
      const password = info.password
      let results = await db.find({name})
      ctx.body = {
        msg: '退出失败',
        msgCode: 500
      }
      if (results.length > 0) {
          ctx.body = {
            msg: '退出成功',
            msgCode: 200
          }
      } else {
          results = await db.insert({name, password})
          if (results) {
              ctx.body = '注册成功'
          }
      }
    }
    
}

module.exports = api