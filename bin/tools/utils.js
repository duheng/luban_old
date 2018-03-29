const path = require('path')
const fs = require('fs')
const CWD = process.cwd()
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

module.exports = {
  getOptions,
  hasOptions,
}
