#!/usr/bin/env node

const  commander = require("commander");
const  path = require("path");
const  fs = require("fs");
const  task = require("./tools/task");
const  task_options = require("./tools/task_options");
const  packages = require("../package.json");
const  luban = require("./tools/config");
const  CWD = process.cwd();

require("shelljs/global");
const config = luban.getluban()
var __mode

commander
    .version(packages.version)
    .option("-p, --port", "cmd 自定义端口号", config.port)
    .arguments("[mode] [name]")
    .action(function(mode, name) {
      console.log('^^^^^^^^^^^',process.argv)
        __mode = mode
        if (!luban.hasluban() && mode !== "init") {
            console.error("请设置luban的配置文件luban.json或者luban.config.js \n")
            process.exit(1)
        }

        let modes = ["init", "start", "test", "release"]
        if (modes.indexOf(mode) === -1) {
            console.log("luban暂不支持该命令 \n")
            task_options.help()
        } else {
            rm("-rf", path.resolve(CWD, config.build))
            task[mode](name)
        }
    })

commander.parse(process.argv)

if (!__mode) {
    task_options.help()
}
