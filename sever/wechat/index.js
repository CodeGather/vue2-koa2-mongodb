'use strict'

const sha1 = require('sha1')
const convert = require('koa-convert');
const config = require('../wechat/config')
const Wechat = require('./wechat')
const getRawBody = require('raw-body')
const util = require('./libs/utils')

module.exports=function(){
  var wechat = new Wechat();
  return convert(function *(next) {
    var that = this;
    var token = config.wechat.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    var str = [token, timestamp, nonce].sort().join('');
    var sha = sha1(str);
    
    if(this.method==='GET'){
      if (sha === signature) {
        this.body = echostr + '';
      }else{
        this.body = 'Verification failure'
      }
    }else if(this.method==='POST'){
      if (sha !== signature) {
        this.body = 'Verification failure'
        return false;
      }
      
      var data = yield getRawBody(this.req,{
        length:this.req.length,
        limit: '1mb',
        encoding: this.req.charset
      })
  
      var content = yield util.parseXMLAsync(data);
      var message = util.formatMessage(content.xml);
      console.log(message)
//      if(message.MsgType === 'event'){
//        if(message.Event === 'subscribe'){
          var now = new Date().getTime();

          that.status = 200;
          that.type = 'application/xml';
          that.body = 
            `<xml>
              <ToUserName>
              <![CDATA[${message.FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
              <CreateTime>${now}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${message.Content}测试消息]]></Content>
            </xml>`;

          return;
//        }
//      }
    }
  });
}