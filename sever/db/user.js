const Promise = require('bluebird')
const db = require('./util')

const user = {
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

module.exports = user