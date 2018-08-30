const router = require('koa-router')()


router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/admin', async (ctx, next) => {
  ctx.type = 'utf-8';
  await ctx.render('login', {
    title: '欢迎登录'
  })
})

module.exports = router
