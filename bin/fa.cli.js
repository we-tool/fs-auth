#!/usr/bin/env node
var prompt = require('prompt')
var glob = require('glob')
var async = require('async')
var fs = require('fs')
var fa = require('../')
var act = process.argv[2]
var match = process.argv[3]

prompt.start({
  message: ' ',
  delimiter: ' '
})

if (['lock', 'auth'].indexOf(act) === -1) {
  console.warn('invalid action')
  return
}
if (!match) {
  console.warn('match required')
  return
}

prompt.get({
  properties: {
    password: {
      hidden: true
    }
  }
}, function (e, res){
  if (e) throw e
  var pwd = res.password
  var errs = []

  glob(match, function(e, files){
    if (e) throw e
    async.each(files, function(file, cb){
      try {
        var buf = fs.readFileSync(file)
        buf = fa[act](buf, pwd)
        fs.writeFileSync(file, buf)
      } catch(e) {
        errs.push([file, e.message])
      }
      cb()
    }, function(e){
      if (errs.length) {
        console.error(errs)
      }
      if (e) throw e
    })
  })
})
