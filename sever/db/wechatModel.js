const WXBizDataCrypt = require('../wechat/libs/WXBizDataCrypt');
const sha1 = require('sha1');

const url = require('url');
const { URLSearchParams } = require('url');

const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const config = require('../wechat/config');
const db = require('./util');
const mongoose = require('mongoose');

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
        let results = await db.find('use', {openId: data.openId});
		    data.createTime = new Date().getTime();
        data.oauth = 0;
        let userToken = {
          name: data.openId
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
          results = await db.insert('use', data)
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
      }else{
        ctx.body = {
          status: 201,
          msg: '登录失败！',
        }
      }
    },
     /**
     * 创建菜谱
     * @param {context} ctx 
     */
    async saveCase(ctx) {
      let bodyData = ctx.request.body
      let results = await db.find('food', {cookName: bodyData.cookName});
      let times = new Date().getTime();
      bodyData.createTime = times;
      bodyData.uploadTime =  times;
      if (results.length > 0) {
		  ctx.body = {
			status: 200,
			msg: '已存在相同菜谱',
			data: {
			  id: results[0]._id
			}
		  }
      } else {
		  results = await db.insert('food', bodyData)
          if (results) {
			  ctx.body = {
				status: 200,
				msg: '恭喜您，添加成功',
				data: {
				  id: results._id
				}
			  }
          } else {
			  ctx.body = {
				status: 200,
				msg: '系统错误'
			  }
		  }
      }
    },
     /**
     * 创建分类
     * @param {context} ctx 
     */
    async saveSorts(ctx) {
      let bodyData = ctx.request.body;
      let times = new Date().getTime();
      if(bodyData.hasOwnProperty('isEdit')){
        bodyData.uploadTime =  times;
        var results = await db.upData('sorts', {'_id':mongoose.Types.ObjectId(bodyData._id)}, {$set: bodyData});
        if(results){
          ctx.body = {
            status: 200,
            msg: '修改成功'
          }
        } else {
          ctx.body = {
            status: 201,
            msg: '修改失败'
          }
        }
      } else {
        if(!bodyData.iswitch){
          if(bodyData.hasOwnProperty('_id')){
            var results = await db.find('sorts', {'_id':mongoose.Types.ObjectId(bodyData._id)});
            var children = {
              sortName: bodyData.sortName,
              createTime: times,
              sortDesc: bodyData.sortDesc
            }
            results = await db.upData('sorts', {'_id':mongoose.Types.ObjectId(bodyData._id)}, {$push:{'children':children}});
            ctx.body = {
              status: 200,
              msg: '新增成功'
            }
          }else{
            ctx.body = {
              status: 201,
              msg: '请新增顶级分类'
            }
          }
        }else{
          results = await db.insert('sorts', bodyData); 
          ctx.body = {
            status: 200,
            msg: '新增成功'
          }
        }
      }
    },
     /**
     * 查询分类
     * @param {context} ctx 
     */
    async getSorts(ctx) {
      let bodyData = ctx.request.body
      let results = await db.find('sorts');
      ctx.body = {
        status: 200,
        msg: '操作成功',
        data: results
      }
    },
     /**
     * 删除分类
     * @param {context} ctx 
     */
    async delSorts(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.find('sorts', {'_id':mongoose.Types.ObjectId(bodyData._id)});
      if(results.length>0){
        results = await db.removeData('sorts', {'_id':mongoose.Types.ObjectId(bodyData._id)});
        ctx.body = {
          status: 200,
          msg: '删除成功'
        } 
      }else{ 
	    ctx.body = {
		  status: 201,
		  msg: '删除失败'
	    }
      }
    },
     /**
     * 创建口味
     * @param {context} ctx 
     */
    async saveFlavor(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.find('flavor', {'_id':mongoose.Types.ObjectId(bodyData._id)});
      let times = new Date().getTime();
      if(results.length>0){
        let obj = {
          uploadTime: times,
          flavorName: bodyData.flavorName
        };
        results = await db.upData('flavor', {'_id':mongoose.Types.ObjectId(bodyData._id)}, {$set: obj});
        ctx.body = {
          status: 200,
          msg: '修改成功'
        } 
      }else{ 
        results = await db.find('flavor', {flavorName: bodyData.flavorName});
        if(results.length>0){
          ctx.body = {
            status: 200,
            msg: '已存在'
          }
        } else {
            bodyData.createTime= times,
          results = await db.insert('flavor', bodyData); 
          ctx.body = {
            status: 200,
            msg: '新增成功'
          }
        }
      }
    },
     /**
     * 查询口味
     * @param {context} ctx 
     */
    async getFlavor(ctx) {
      let bodyData = ctx.request.body
      let results = await db.find('flavor');
      ctx.body = {
        status: 200,
        msg: '操作成功',
        data: results
      }
    },
     /**
     * 删除口味
     * @param {context} ctx 
     */
    async delFlavor(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.find('flavor', {'_id':mongoose.Types.ObjectId(bodyData._id)});
      if(results.length>0){
        results = await db.removeData('flavor', {'_id':mongoose.Types.ObjectId(bodyData._id)});
        ctx.body = {
          status: 200,
          msg: '删除成功'
        } 
      }else{ 
	    ctx.body = {
		  status: 201,
		  msg: '删除失败'
	    }
      }
    },
     /**
     * 获取banners
     * @param {context} ctx 
     */
    async getBroad(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.find('food', bodyData);
      if (results.length > 0) {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: results
        }
      } else {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: []
        }
      }
    },
     /**
     * 获取菜谱列表
     * @param {context} ctx 
     */
    async getMyCookList(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.findPage('food', {}, bodyData.pageIndex);
      if (results.length > 0) {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: results
        }
      } else {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: []
        }
      }
    },
     /**
     * 获取菜谱详情
     * @param {context} ctx 
     */
    async getDetail(ctx) {
      let bodyData = ctx.request.body;
      let results = await db.find('food', {'_id':mongoose.Types.ObjectId(bodyData._id)});
      if (results.length > 0) {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: results
        }
      } else {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: []
        }
      }
    },
     /**
     * 搜索菜谱并保持分页
     * @param {context} ctx 
     */
    async searchFood(ctx) {
      let bodyData = ctx.request.body;
      let reg = new RegExp( `${bodyData.key}.*`);
      let results = await db.findPage('food', {'cookName':{$regex:reg}}, bodyData.pageIndex);
      if (results.length > 0) {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: results
        }
      } else {
        ctx.body = {
          status: 200,
          msg: '获取成功',
          data: []
        }
      }
    },
    /**
     * 处理auth
     * @param {context} ctx 
     */
    async upLoadImg(ctx) {
	    let headers = ctx.req.headers;
      ctx.body = {
        status: 200,
        filename: headers['x-forwarded-proto'] +'://'+ headers['host'] +'/'+ ctx.req.file.path //返回文件名
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