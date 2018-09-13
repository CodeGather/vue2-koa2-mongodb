const mongoose = require('mongoose')

// 会员信息字段
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatarUrl: String,
  nickName: String,
  gender: Number,
  country: String,
  city: String,
  province: String,
  avatarUrl: String,
  unionId: String,
  oauth: Number
})
// 菜谱列表字段
const foodSchema = new mongoose.Schema({
  cookName: String,
  cookDesc: String,
  iswitch: Boolean,
  slider: Number,
  imgs: Array
  classify: Number,
  flavor: Number
})
// 分类字段
const classifySchema = new mongoose.Schema({
  name: String,
  password: String,
  avatarUrl: String,
  nickName: String,
  gender: Number,
  country: String,
  city: String,
  province: String,
  avatarUrl: String,
  unionId: String,
  oauth: Number
})
// 口味列表字段
const flavorSchema = new mongoose.Schema({
  name: String
})
// 食材列表字段
const datumSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatarUrl: String,
  nickName: String,
  gender: Number,
  country: String,
  city: String,
  province: String,
  avatarUrl: String,
  unionId: String,
  oauth: Number
})
// 管理员列表字段
const oauthSchema = new mongoose.Schema({
  name: String,
  password: String,
  avatarUrl: String,
  nickName: String,
  gender: Number,
  country: String,
  city: String,
  province: String,
  avatarUrl: String,
  unionId: String,
  oauth: Number
})

module.exports = {
  use: mongoose.model('user', userSchema),
  food: mongoose.model('foodData', foodSchema),
  classify: mongoose.model('classifyData', classifySchema),
  datum: mongoose.model('datumData', datumSchema),
  flavor: mongoose.model('flavorData', flavorSchema),
  oauth: mongoose.model('oauth', oauthSchema)
}