const mongoose = require('mongoose')
// 会员信息字段
const userSchema = new mongoose.Schema({
  openId: String,
  password: String,
  avatarUrl: String,
  nickName: String,
  gender: Number,
  country: String,
  city: String,
  province: String,
  avatarUrl: String,
  unionId: String,
  createTime: Date,
  oauth: Number
})
// 菜谱列表字段
const foodSchema = new mongoose.Schema({
  cookName: String,
  cookDesc: String,
  iswitch: Boolean,
  isrefre: Boolean,
  imgs: Array,
  sorts: Number,
  flavor: Number,
  createTime: Date,
  uploadTime: Date
})
// 分类字段
const sortSchema = new mongoose.Schema({
  sorts: String,
  sortName: String,
  sortDesc: String,
  children: Array,
  createTime: Date,
  uploadTime: Date
})
// 口味列表字段
const flavorSchema = new mongoose.Schema({
  flavorName: String,
  createTime: Date,
  uploadTime: Date
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
  oauth: mongoose.model('oauth', oauthSchema),
  food: mongoose.model('food_datas', foodSchema),
  sorts: mongoose.model('sort_datas', sortSchema),
  datum: mongoose.model('datum_datas', datumSchema),
  flavor: mongoose.model('flavor_datas', flavorSchema)
}
