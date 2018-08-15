import CryptoJS from 'crypto-js/crypto-js'
import JsEncrypt from 'jsencrypt/bin/jsencrypt'

/**
 * 3DES加密
 * @param {*} password 
 * @param {*} data 
 */
export function tripleDESEncrypt(password, data) {
  var encrypted = CryptoJS.TripleDES.encrypt(data, CryptoJS.enc.Utf8.parse(password), {
    iv: CryptoJS.enc.Utf8.parse('01234567'),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

/**
 * RSA公钥加密
 * @param {*} pupblicKey 
 * @param {*} data 
 */
export function rsaEncrypt(pupblicKey, data) {
  var jse = new JSEncrypt()
  jse.setPublicKey(pupblicKey);
  return jse.encrypt(data)
}

/**
 * 获取随机数
 * @param {*} length 
 */
export function getRandom(length) {
  return CryptoJS.lib.WordArray.random(length).toString();
}