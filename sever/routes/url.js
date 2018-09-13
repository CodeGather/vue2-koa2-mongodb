/**
 * 小程序配置文件
 * 配置连接域名相关信息
 */
var host = "https://cookbook.ki5k.com"

var api = {
  // 用code换取openId
  openIdUrl: `${host}/api/v1/getOpenId`,

  // 授权免登用户登录
  authLogin: `${host}/api/v1/auth`,

  // 获取用户信息
  doOneData: `${host}/api/v1/getUserInfo`,

  // 获取服务类型接口
  getAllService: `${host}/api/v1/getAllService`,

  // 获取服务类型三级
  getServiceByType: `${host}/api/v1/getServiceByType`,

  // 搜索服务类型
  getServiceByName: `${host}/api/v1/getServiceByName`,

  // 获取地址列表
  doAddress: `${host}/api/v1/getAddress`,

  // 设置默认地址
  doDefault: `${host}/api/v1/saveDefault`,

  // 获取banner列表
  getBanner: `${host}/api/v1/getBanner`,

  // 获取默认地址
  getDefault: `${host}/api/v1/getDefault`,

  // 获取开通城市
  getPassCity: `${host}/api/v1/getPassCity`,

  // 获取上门以及其他费用
  getDoorPrice: `${host}/api/v1/getDoorPrice`,

  // 删除地址
  delAddress: `${host}/api/v1/delAddress`,

  // 保存地址
  saveAddress: `${host}/api/v1/saveAddress`,

  // 编辑地址
  doOneAddress: `${host}/api/v1/getAddressDetail`,

  // 提交留言
  saveAdvice: `${host}/api/v1/saveAdvice`,

  // 新建订单
  saveCase: `${host}/api/v1/saveCase`,

  // 新建企业订单
  saveCaseByKey: `${host}/api/v1/saveCaseByKey`,

  // 搜索企业
  getSourceByKey: `${host}/api/v1/getSourceByKey`,

  // 获取订单列表
  getMyCaseList: `${host}/api/v1/getMyCaseList`,

  // 获取订单详情
  getCaseDetail: `${host}/api/v1/getCaseDetail`,

  // 获取施工图信息
  getCaseImage: `${host}/api/v1/getCaseImage`,

  // 提交评价信息
  doEvaluate: `${host}/api/v1/doEvaluate`,

  // 附近接单师傅信息
  getMaybeIngCase: `${host}/api/v1/getMaybeIngCase`,

  // 获取订单日志
  getCaseLog: `${host}/api/v1/getCaseLog`,

  // 获取支付参数
  weChatPay: `${host}/api/v1/weChatPay`,

  // 支付成功回调
  payStatus: `${host}/api/v1/payStatus`,

  // 取消订单
  doCancelCase: `${host}/api/v1/doCancelCase`,

  // 评价数据填充
  doEvaluationData: `${host}/h5/case/doEvaluationData`,

  // 上传文件接口
  uploadFileUrl: `${host}/api/v1/uploadImg`,

};
module.exports = api