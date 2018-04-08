const path = require('path')
const fs = require('fs')
const CWD = process.cwd()
const request = require('request')
const default_luban = require('./luban.json')

const extend = (target, source) => {
  for (let key in source) {
    if (hasOwnProperty.call(target, key)) {
      if (key === 'alias') {
        for (let al in source[key]) {
          target[key][al] = `${path.resolve(CWD, source.base)}/${source[key][al]}`
        }
      } else if (key === 'template') {
        for (let al in source[key]) {
          target[key][al] = source[key][al]
        }
      } else {
        target[key] = source[key]
      }
    }
  }

  return target
}

const isExists = filename => {
  return fs.existsSync(path.resolve(CWD, filename))
}

const getOptions = _ => {
  if (isExists('luban.json')) {
    var filepath = path.resolve(CWD, 'luban.json')
    var luban = require(filepath)
    return extend(default_luban, luban)
  }
  return default_luban
}

const hasOptions = _ => {
  return isExists('luban.json')
}

const genFileName = jsDir => {
  var names = fs.readdirSync(jsDir)
  var map = []
  names.forEach(function(name) {
    map.push(name)
  })
  return map
}

const genAlias = jsDir => {
  var names = fs.readdirSync(jsDir)
  var map = {}
  names.forEach(function(name) {
    map[name] = path.resolve(jsDir, name)
  })
  return map
}

const getApi = api => {
  const { method, pathname, body } = api
//  console.log('-----', api.body)
  return request.get(`http://smart-starcircle.wepiao.com${pathname}?celebrity_id=28062`)
}
module.exports = {
  getOptions,
  hasOptions,
  genFileName,
  genAlias,
  getApi,
}
