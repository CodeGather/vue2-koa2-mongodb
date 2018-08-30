const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const compress = require('koa-compress');
const koaStatic = require('koa-static');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const app = new Koa();

const db = require('./db/db');
const { port, dbUrl } = require('./db/config');

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const auth = require('./wechat/index')

// 连接数据库
db.connect(dbUrl, {useNewUrlParser:true})

const options = {threshold:2048};
app.use(compress(options));

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname+ '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  if(ctx.response.status !== 200){
    let message = ''
    switch(ctx.response.status){
      case 404:
        message = 'Request interface does not exist'
        break;
      default:
    }
    ctx.body = {
      msgCode: ctx.response.status,
      msg: message
    }
  }
//    console.log(ctx)
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//app.use(auth())
//app.use(auth.post())

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
