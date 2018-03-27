const inquirer = require('inquirer') // 交互式命令
const fs = require('fs')
const path = require('path')
const task = require('./task')
const CWD = process.cwd()

const isExists = name => {
  return fs.existsSync(path.resolve(CWD, name))
}

const show_help = () => {
  var options = [
    {
      type: 'list',
      name: 'task',
      message: '选择要执行的任务: ',
      choices: [
        {
          name: '开发调试',
          value: 'start',
        },
        {
          name: '新建项目',
          value: 'init',
        },
      ],
    },
  ]

  inquirer.prompt(options, answers => {
    tasks[answers.task]()
  })
}

const tasks = {
  init: () => {
    const questions = [
      {
        type: 'list',
        name: 'framework',
        message: '请选择技术栈：',
        choices: [
          {
            name: 'react',
            value: 'react',
          },
          {
            name: 'vue',
            value: 'vue',
          },
        ],
        filter: val => {
          return val.toLowerCase()
        },
      },
      {
        type: 'confirm',
        name: 'redux',
        message: '您需要用redux吗？',
      },
      {
        type: 'confirm',
        name: 'mock',
        message: '您需要mock数据或者代理功能吗？',
      },
      {
        type: 'input',
        name: 'appName',
        message: '请输入项目的名称: ',
        validate: value => {
          if (isExists(value)) {
            console.error('\n\n该文件已存在')
            return process.exit()
          }
          if (!value && !value.length) {
            console.error('\n\n您还没有输入目名称')
            return process.exit()
          }

          return true
        },
      },
    ]
    inquirer.prompt(questions, answers => {
      task['init'](answers)
    })
  },

  start: () => {
    task.start()
  },
}

module.exports = {
  help: show_help,
}
