const Promise = require('bluebird')
const User = require('../models/user').use;
const food = require('../models/user').food;
const classify = require('../models/user').classify;
const datum = require('../models/user').datum;
const flavor = require('../models/user').flavor;
const oauth = require('../models/user').oauth;

/**
 * 插入数据
 * @param {Object} options
 */
const insert = function(obj) {
  return new Promise((resolve, reject) => {
    const user = new User(obj)
    user.save((err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

/**
 * 菜谱数据新增
 * @param {Object} options
 */
const foodInsert = function(obj) {
  return new Promise((resolve, reject) => {
    const foods = new food(obj)
    foods.save((err, res) => {
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
const find = function(options) {
  return new Promise((resolve, reject) => {
    User.find(options ,(err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

/**
 * 数据
 * @param {Object} options
 */
const upData = function(options) {
  return new Promise((resolve, reject) => {
    User.find(options ,(err, res) => {
      if (err)
        reject(err)
      else
        resolve(res)
    })
  })
}

module.exports = {
  insert,
  foodInsert,
  find,
  upData
}