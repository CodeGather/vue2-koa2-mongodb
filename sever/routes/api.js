const util = require('../utils/util');
const router = require('koa-router')();
const wx = require('../db/wechatModel');
const multer = require('koa-multer');//加载koa-multer模块

//文件上传配置
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, util.checkDirExist('public/upload/'))
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });

router.prefix('/api/v1')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '您是否来错地方了呢！'
  })
})

router.get('/getOpenId', wx.getOpenId)
      .post('/auth', wx.auth)
      .post('/saveCase', wx.saveCase)
      .post('/saveSorts', wx.saveSorts)     
      .post('/getSorts', wx.getSorts) 
      .post('/delSorts', wx.delSorts) 
      .post('/saveFlavor', wx.saveFlavor)
      .post('/getFlavor', wx.getFlavor)   
      .post('/delFlavor', wx.delFlavor)    
      .post('/getMyCookList', wx.getMyCookList)
      .post('/getBroad', wx.getBroad)
      .post('/getDetail', wx.getDetail)
      .post('/searchFood', wx.searchFood)
      .post('/uploadImg', upload.single('file'), wx.upLoadImg)
      .post('/userSignIn', wx.userSignIn)
      .post('/userSignUp', wx.userSignUp)

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
