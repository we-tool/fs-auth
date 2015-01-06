var assert = require('assert')
var bufferEqual = require('buffer-equal')
var fa = require('../')

describe('fs-auth', function(){
  var originalStr = 'hello啊 world 你是大傻逼123 ahah'
  var originalBuf = new Buffer(originalStr)
  var pwd = 'n0gx'
  var encryptedBuf

  it('locks with pwd', function(){
    encryptedBuf = fa.lock(originalBuf, pwd)
    assert(!bufferEqual(encryptedBuf, originalBuf))
  })

  it('auths with pwd', function(){
    var _originalBuf = fa.auth(encryptedBuf, pwd)
    assert(bufferEqual(_originalBuf, originalBuf))
  })

  it('auths fail with incorrect pwd', function(){
    assert.throws(function(){
      fa.auth(encryptedBuf, 'bad')
    }, 'auth fail')
  })
})
