const inquirer = require("inquirer");
const  fs = require("fs");
const  path = require("path");
const  task = require("./task");
const  CWD = process.cwd();

const isExists = (name) => {
  return fs.existsSync(path.resolve(CWD, name));
}

const show_help = () => {
  var options = [
    {
      type: "list",
      name: "task",
      message: "选择要执行的任务: ",
      choices: [
        {
          name: "开发调试",
          value: "start"
        },
        {
          name: "初始化新项目",
          value: "init"
        },

      ]
    }
  ]

  inquirer.prompt(options, (answers) => {
    tasks[answers.task]();
  });
}

const tasks = {
  init: () => {
    const questions = [
      {
         type: 'list',
         name: 'framework',
         message: '请选择您需要的基础架构：',
         choices: [
           {
             name: "react",
             value: "react"
           },
           {
             name: "react+redux",
             value: "react_redux"
           }
         ],
         filter: (val) => {
           console.error(val)
           return val.toLowerCase()
         }
      },
      {
        type: "input",
        name: "appName",
        message: "请输入项目的名称: [英文]",
        validate: (value) => {
          if (isExists(value)) {
            console.error("\n\n该文件已存在")
            return process.exit()

          }
          if (!value && !value.length) {
            console.error("\n\n您还没有输入目名称")
            return process.exit()
          }

          return true;
        }
      }
    ]
    inquirer.prompt(
      questions,
      (answers) => {
        task["init"](answers);
      }
    );
  },

  start: () => {
    task.start()
  }
}

module.exports = {
  help: show_help
};
