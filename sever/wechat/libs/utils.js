'use strict'

const Promise = require('bluebird')
const xml2js = require('xml2js')
const fs = require('fs')

function formatMessage(result){
  var message = {};
  if(typeof result === 'object'){
    var keys = Object.keys(result);
    for(let i=0;i<keys.length;i++){
      var item = result[keys[i]];
      var key = keys[i];

      if(!(item instanceof Array) || item.length === 0){
        continue
      }
      
      if(item.length === 1){
        var val = item[0];

        if(typeof val === 'object'){
          message[key] = formatMessage(val);
        }else{
          message[key] = (val || '').trim();
        }
      }else{
        message[key] = [];
        for(let m=0;m<item.length;m++){
          message[key].push(formatMessage(item[m]))
        }
      }
    }
  }

  return message;
}

exports.parseXMLAsync = function(xml){
  return new Promise(function(resolve, reject){
    xml2js.parseString(xml,{trim: true}, function(err,content){
      if(err) reject(err)
      else resolve(content)
    })
  })
}

exports.readFileAsync = function(fpath,ecoding){
  return new Promise(function(resolve, reject){
    fs.readFile(fpath,ecoding, function(err,content){
      if(err) reject(err)
      else resolve(content)
    })
  })
}

exports.writeFileAsync = function(fpath,content){
  return new Promise(function(resolve, reject){
    fs.writeFile(fpath,content, function(err){
      if(err) reject(err)
      else resolve()
    })
  })
}


exports.formatMessage = formatMessage;