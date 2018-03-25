#!/usr/bin/env node

const program = require("commander");
const path = require("path");
// const os = require("os");
const fs = require("fs");
const template = require("../templates");
const config = require("./config");
const server = require("./server");
const luban = config.getluban();
const watch = require("watch");
const CWD = process.cwd();

require("shelljs/global")

const installNodeModules = () => {
    if (!fs.existsSync(path.resolve(CWD, "node_modules"))) {
        console.log("🎒  正在安装npm包，请稍后 ⌛️ ... \n")
        exec("npm install")
    }
}

const webpack = path.resolve(
    __dirname,
    "..",
    "..",
    "node_modules",
    ".bin",
    "webpack"
)

module.exports = {
    start: (port) => {
        installNodeModules()
        process.env.MODE = "start"
        luban.port = port || luban.port
        setTimeout(() => {
            server.start(luban)
        }, 1)
    },
    test: (creat_server) => {
        installNodeModules()
        process.env.MODE = "test"
        exec(
            webpack +
                " --config " +
                path.resolve(
                    __dirname,
                    "..",
                    "webpack.config",
                    "production.config.js"
                ) +
                " --progress"
        )
        creat_server && server.start(luban)
    },
    release: (creat_server) => {
        installNodeModules()
        process.env.MODE = "release"
        exec(
            webpack +
                " --config " +
                path.resolve(
                    __dirname,
                    "..",
                    "webpack.config",
                    "production.config.js"
                ) +
                " --progress"
        )
        creat_server && server.start(luban)
    },
    init: (options) => {
      const { framework, appName} = options
      console.log(framework)

        // cp(
        //     "-R",
        //     path.resolve(__dirname, "..", "templates/react/app/*"),
        //     path.resolve(CWD, appName)
        // )
        // cp(
        //     "-R",
        //     path.resolve(__dirname, "..", "templates/react/app/.*"),
        //     path.resolve(CWD, appName)
        // )
        console.log("项目", appName, "创建成功🌹")
    }
}
