var fa = require('../')

var txt = 'hello啊 world 你是大傻逼123 ahah'
var buf = new Buffer(txt)
console.log(buf.length, ' - ', buf)

var outBuf = fa.lock(buf, 'n0gx')
console.log(outBuf.length, ' - ', outBuf)

buf = fa.auth(outBuf, 'n0gx')
console.log(buf.length, ' - ', buf.toString())
console.log(fa.auth(outBuf, '123'))
