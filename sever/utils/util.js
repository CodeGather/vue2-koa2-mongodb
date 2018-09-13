const moment = require('moment');    
const path = require('path');  
const fs = require('fs');  
let defpath=path.join(__dirname,'../'); // 设置一个默认的起始根目录
/* 
 * 检查路径是否存在 如果不存在则创建路径并且返回一个完整路劲
 * @param {string} folderpath 文件路径 
 */  
const util = {
  checkDirExist: (folderpath)=>{  
    let dirDay = moment().format("YYYY/MM/DD/"); 
    let dirPath = folderpath + dirDay;
    let pathArr=dirPath.split('/');  
    let _path=defpath;  // 赋值默认路劲
    for(let i=0;i<pathArr.length;i++){  
      if(pathArr[i]){  
        _path +=`${pathArr[i]}/`; 
        if (!fs.existsSync(_path)) {  
          fs.mkdirSync(_path);  
        }  
      }  
    }
    return dirPath;
  }
} 
module.exports = util;  