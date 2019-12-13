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
      type: 'rawlist',
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
    let questions = [
      {
        type: 'rawlist',
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
      }
    ]

    const __askRedux =  {
      type: 'confirm',
      name: 'redux',
      message: '您需要用redux吗？',
    }

    const __askMock = {
      type: 'confirm',
      name: 'mock',
      message: '您需要mock数据或者代理功能吗？',
    }

    const __askAppName = {
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
      }
    }

    inquirer.prompt(questions, answers => {
      if(answers.framework === 'react') {
        const __questions = [__askRedux,__askMock,__askAppName]
        inquirer.prompt(__questions, answersB => {
          task['init']({...answers,...answersB})
        })
      } else {
        inquirer.prompt([__askMock,__askAppName], answersB => {
          task['init']({...answers,...answersB})
        })
      }
    })
  },

  start: () => {
    task.start()
  },
}

module.exports = {
  help: show_help,
}
