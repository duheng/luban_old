#!/usr/bin/env node

const program = require("commander");
const path = require("path");
const os = require("os");
const fs = require("fs");
const template = require("../templates");
const config = require("./config");
const server = require("./server");
const luban = config.getluban();
const watch = require("watch");
const CWD = process.cwd();

require("shelljs/global")

const check_modules = () => {
    if (!fs.existsSync(path.resolve(CWD, "node_modules"))) {
        console.log("🤖️ install node modules ... \n")
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
        check_modules()
        process.env.MODE = "start"
        luban.port = port || luban.port
        setTimeout(() => {
            server.start(luban)
        }, 1)
    },
    test: (creat_server) => {
        check_modules()
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
        check_modules()
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
    init: (name, esmode) => {
        if (!name || !name.length) {
            console.log("App name is required")
            process.exit(1)
        }
        cp(
            "-R",
            path.resolve(__dirname, "..", "templates/react/app/*"),
            path.resolve(CWD, name)
        )
        cp(
            "-R",
            path.resolve(__dirname, "..", "templates/react/app/.*"),
            path.resolve(CWD, name)
        )
        console.log("项目", name, "创建成功🌹")
    }
}
