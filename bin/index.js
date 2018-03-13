#!/usr/bin/env node

var commander = require("commander"),
    path = require("path"),
    fs = require("fs"),
    task = require("./tools/task"),
    cli = require("./tools/cli"),
    packages = require("../package.json"),
    luban = require("./tools/config"),
    CWD = process.cwd()

require("shelljs/global")

var __mode

commander
    .version(packages.version)
    .option("-p, --port", "custom server port", config.port)
    .option("-m, --mode", "choose esmode", config.esmode)
    .option("-s, --server", "run static server", true)
    .option("-w, --watch", "run eslint in watch mode", true)
    .arguments("[mode] [name]")
    .action(function(mode, name) {
        var config = luban.getluban()
        __mode = mode

        if (!luban.hasluban() && mode !== "init" && mode !== "upgrade") {
            console.error("luban can't run without luban.config.js \n")
            process.exit(1)
        }

        // supported modes
        var modes = ["init", "start", "test", "release"]
        if (modes.indexOf(mode) === -1) {
            console.log("luban task miss match \n")
            cli.help()
        } else {
            // clean build directory
            rm("-rf", path.resolve(CWD, config.build))
            task[mode](
                name ||
                    commander.port ||
                    commander.esmode ||
                    commander.server ||
                    commander.watch
            )
        }
    })

commander.parse(process.argv)

if (!__mode) {
    cli.help()
}
