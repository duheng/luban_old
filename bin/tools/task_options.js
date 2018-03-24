const inquirer = require("inquirer");
const  fs = require("fs");
const  path = require("path");
const  task = require("./task");
const  CWD = process.cwd();

const isExists = (name) => {
  return fs.existsSync(path.resolve(CWD, name));
}

const tasks = {
  init: () => {
    inquirer.prompt(
      [
        {
          type: "input",
          name: "appName",
          message: "请输入项目的名称: [英文]",
          validate: (value) => {
            if (isExists(value)) {
              return "该文件已存在, 换一个名字吧";
            }
            if (!value && !value.length) {
              return "luban 需要您提供项目名称";
            }

            return true;
          }
        }
      ],
      (answers) => {
        task["init"](answers.appName);
      }
    );
  },

  start: () => {
    task.start();
  },

};

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
];

const show_help = () => {
  inquirer.prompt(options, (answers) => {
    tasks[answers.task]();
  });
}

module.exports = {
  help: show_help
};
