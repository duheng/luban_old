#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const fs = require('fs')
const source = require('../source')
const server = require('./server')
const CWD = process.cwd()

require('shelljs/global')

const installNodeModules = () => {
  if (!fs.existsSync(path.resolve(CWD, 'node_modules'))) {
    console.log('🎒  正在安装npm包，请稍后 ⌛️ ... \n')
    exec('npm install')
  }
}

const webpack = path.resolve(__dirname, '..', '..', 'node_modules', '.bin', 'webpack')

module.exports = {
  start: port => {
    installNodeModules()
    process.env.MODE = 'start'
    setTimeout(() => {
      server.start(port)
    }, 1)
  },
  test: _ => {
    installNodeModules()
    process.env.MODE = 'test'
    exec(
      webpack +
        ' --config ' +
        path.resolve(__dirname, '..', 'webpack.config', 'production.config.js') +
        ' --progress',
    )
  },
  release: _ => {
    installNodeModules()
    process.env.MODE = 'release'
    exec(
      webpack +
        ' --config ' +
        path.resolve(__dirname, '..', 'webpack.config', 'production.config.js') +
        ' --progress',
    )
  },
  init: options => {

    let __options = { 
       framework : 'react', 
       redux : true,
       mock : true, 
       appName : 'demo' 
     };

    if (typeof(options) == 'string') {
      __options.appName = options
    } else {
      __options = {...__options, ...options}
    }

    if (__options.framework === 'react') {
      source.initReact(__options)
    } else if (__options.framework === 'vue') {
      console.log('vue项目还在建设中...')
      process.exit()
    }
    console.log('项目', __options.appName, '创建成功🌹')
  },
}
