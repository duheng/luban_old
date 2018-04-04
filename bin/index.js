#!/usr/bin/env node

require('shelljs/global')
const commander = require('commander')
const path = require('path')
const fs = require('fs')
const task = require('./tools/task')
const task_options = require('./tools/task_options')
const packages = require('../package.json')
const luban = require('./tools/utils')
const CWD = process.cwd()
const config = luban.getOptions()

var __mode

commander
  .version(packages.version)
  .option('-i, --init', '初始化项目文件夹')
  .option('-p, --port', '服务端口号')
  .arguments('[mode] [name]')
  .action((mode, name) => {
    __mode = mode
    if (!luban.hasOptions() && mode !== 'init') {
      console.error('请设置luban的配置文件luban.json \n')
      process.exit()
    }

    let modes = ['init', 'start', 'test', 'release']
    if (modes.indexOf(mode) === -1) {
      console.error('luban暂不支持该命令 \n')
      task_options.help()
    } else {
      task[mode](name)
    }
  })

commander.parse(process.argv)

if (!__mode) {
  task_options.help()
}
