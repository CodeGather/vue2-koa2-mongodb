const Promise = require('bluebird')
const DB = require('../models/user');

/**
 * 插入数据
 * @param {Object} options
 */
const insert = function(e, obj) {
  return new Promise((resolve, reject) => {
    const user = new DB[e](obj)
    user.save((err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

/**
 * 查询数据
 * @param {Object} options
 */
const find = function(e, options) {
  return new Promise((resolve, reject) => {
    DB[e].find(options ,(err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

/**
 * 查询分页数据
 * @param {Object} options
 */
const findPage = function(e, options, n) {
  return new Promise((resolve, reject) => {
    DB[e].find(options ,(err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    }).skip(n*10).limit((n+1)*10)
  })
}

/**
 * 更新数据
 * @param {Object} options
 */
const upData = function(e, field, options) {
  return new Promise((resolve, reject) => {
    DB[e].update(field, options, (err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

/**
 * 更新数据
 * @param {Object} options
 */
const removeData = function(e, options) {
  return new Promise((resolve, reject) => {
    DB[e].remove(options, (err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

module.exports = {
  insert,
  find,
  findPage,
  upData,
  removeData
}