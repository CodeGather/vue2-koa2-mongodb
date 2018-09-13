const router = require('koa-router')()
const user = require('../db/user')

router.prefix('/api/v1')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '您是否来错地方了呢！'
  })
})

router.post('/userSignUp', user.userSignUp).post('/userSignIn', user.userSignIn).post('/userSignOut', user.userSignOut)

// 微信授权

/*router.get('/wx', async (ctx, next) => {
  const result = wx.auth(ctx)
  if (result) {
    ctx.body = ctx.query.echostr
  } else {
    ctx.body = { code: -1, msg: "You aren't wechat server !"}
  }
})

router.post('/wx', (ctx, next) => {
  let msg, MsgType, result
  msg = ctx.req.body ? ctx.req.body.xml : ''

  if (!msg) {
    ctx.body = 'error request.'
    return;
  }
  
  MsgType = msg.MsgType[0]

  switch (MsgType) {
    case 'text':
      result = wx.message.text(msg, msg.Content)
      break;
    default: 
      result = 'success'
  }
  ctx.res.setHeader('Content-Type', 'application/xml')
  ctx.res.end(result)
})*/

module.exports = router
