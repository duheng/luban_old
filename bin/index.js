#!/usr/bin/env node

var program = require("commander"),
  path = require("path"),
  luban = require("./utils/config"),
  task = require("./task"),
  packages = require("../package.json"),
  CWD = process.cwd()
// supported modes
var modes = ["init", "start", "test"]

program
  .version(packages.version)
  .option("-p, --port", "自定义服务端口", 8000)
  .option("-r, --resume", "简历")
  .action(function(cmd, param) {
    var config = luban.getOptions()
    if (modes.indexOf(cmd) === -1) {
      console.log("\n    目前不支持该命令... \n")
      program.help()
    } else {
      rm("-rf", path.resolve(CWD, config.build))
      //  console.log("param___", param)
      task[cmd](param)
    }

    //  var nm = typeof options.name=='string'?options.name:""

    //    console.log('resume "%s" 使用 %s 模式', cmd, nm);
  })

program.on("--help", function() {
  console.log("  自定义的例子:")
  console.log("")
  console.log("    输出命令  wcj -d")
  console.log("    输出命令  wcj -l python")
  console.log("")
})

program.parse(process.argv)

if (program.resume) {
  console.log("简历" + "-" + "这个是我的简历！")
}

console.log("欢迎您使用Luban 🌹 ")
