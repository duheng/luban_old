var inquirer = require("inquirer"),
  fs = require("fs"),
  path = require("path"),
  task = require("./task"),
  CWD = process.cwd();

function isExists(name) {
  return fs.existsSync(path.resolve(CWD, name));
}

var tasks = {
  init: function() {
    inquirer.prompt(
      [
        {
          type: "input",
          name: "appName",
          message: "请输入项目的名称: [英文]",
          validate: function(value) {
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
      function(answers) {
        task["init"](answers.appName);
      }
    );
  },

  start: function() {
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

function show_help() {
  inquirer.prompt(options, function(answers) {
    tasks[answers.task]();
  });
}

module.exports = {
  help: show_help
};
