#!/usr/bin/env node

const program = require("commander"),
  path = require("path"),
  os = require("os"),
  fs = require("fs"),
  server = require("./server"),
  CWD = process.cwd()

require("shelljs/global")

var webpack = path.resolve(
  __dirname,
  "..",
  "..",
  "node_modules",
  ".bin",
  "webpack"
);

var webpack_dev_server = path.resolve(
  __dirname,
  "..",
  "..",
  "node_modules",
  ".bin",
  "webpack-dev-server"
);

function check_modules() {
  if (!fs.existsSync(path.resolve(CWD, "node_modules"))) {
    console.log("install node modules ... \n")
    exec("npm install")
  }
}

module.exports = {
  init: function(name) {
    if (!name || !name.length) {
      console.log("项目名不能为空")
      process.exit(1)
    }
    if (!fs.existsSync(path.resolve(CWD, name))) {
      mkdir("-p", path.resolve(CWD), path.resolve(CWD, name))
    }
    cp(
      "-R",
      path.resolve(__dirname, "templates/es6/app/*"),
      path.resolve(CWD, name)
    )
    console.log("项目", name, "创建成功")
  },
  start: function(port) {
    check_modules()
    //  console.log('process.env.MODE____', process.env)
    //  process.env.MODE = "start";
    //
    process.env.MODE = "dev";
    exec(
        webpack_dev_server +
        " --env=dev " +
        " --progress " +
        " --profile " +
        " --colors " +
        " --watch " +
        " --config " +
        path.resolve(__dirname, "..", "bin", "webpack", "dev.js") +
        " --open"
    )
  }
}
