var crypto = require('crypto')
var byteSize = 256
var pwdHashSize_0 = 32
var msgAuthFail = 'auth fail'
var _slice = Array.prototype.slice

exports.lock = function lock(buf, pwd){
  buf = new Buffer(buf)
  var pwdHashBuf_1 = new Buffer(hash_1(pwd))
  var bufLen = buf.length
  var pwdHashBufLen_1 = pwdHashBuf_1.length

  for (var i = 0, j; i < bufLen; i++) {
    j = i % pwdHashBufLen_1
    buf[i] = (buf[i] + pwdHashBuf_1[j]) % byteSize
  }

  var pwdHashBuf = new Buffer(hash_0(pwd))
  return Buffer.concat([pwdHashBuf, buf])
}

exports.auth = function auth(buf, pwd){
  var pwdHashBuf_0 = new Buffer(hash_0(pwd))
  var auth = true
  for (var i = 0; i < pwdHashSize_0; i++) {
    if (buf[i] !== pwdHashBuf_0[i]) {
      auth = false
      break
    }
  }
  if (!auth) throw new Error(msgAuthFail)

  buf = new Buffer(_slice.call(buf, pwdHashSize_0))
  var pwdHashBuf_1 = new Buffer(hash_1(pwd))
  var bufLen = buf.length
  var pwdBufLen_1 = pwdHashBuf_1.length
  for (var i = 0, j; i < bufLen; i++) {
    j = i % pwdBufLen_1
    buf[i] = buf[i]+byteSize - pwdHashBuf_1[j]
  }
  return buf
}


function hash_0(str){
  return md5(sha1(str))
}
function hash_1(str){
  return sha1(md5(str))
}
function sha1(str){
  return crypto.createHash('sha1').update(str).digest('hex')
}
function md5(str){
  return crypto.createHash('md5').update(str).digest('hex')
}
