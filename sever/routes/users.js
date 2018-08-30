const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = {text:'this is a users response!',start:1}
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response content'
})

module.exports = router
