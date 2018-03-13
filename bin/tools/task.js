#!/usr/bin/env node

var program = require("commander"),
    path = require("path"),
    os = require("os"),
    fs = require("fs"),
    template = require("../templates"),
    config = require("./config"),
    server = require("./server"),
    luban = config.getluban(),
    watch = require("watch"),
    CWD = process.cwd()

require("shelljs/global")

function check_modules() {
    if (!fs.existsSync(path.resolve(CWD, "node_modules"))) {
        console.log("🤖️ install node modules ... \n")
        exec("npm install")
    }
}

// use webpack in node_modules/.bin/webpack
var webpack = path.resolve(
    __dirname,
    "..",
    "..",
    "node_modules",
    ".bin",
    "webpack"
)

module.exports = {
    start: function(port) {
        check_modules()
        process.env.MODE = "start"
        luban.port = port || luban.port
        setTimeout(() => {
            server.start(luban)
        }, 0)
    },
    test: function(start_server) {
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
        start_server && server.start(luban)
    },
    release: function(start_server) {
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
        start_server && server.start(luban)
    },
    init: function(name, esmode) {
        if (!name || !name.length) {
            console.log("App name is required")
            process.exit(1)
        }
        console.log(
            "23456789",
            path.resolve(__dirname, "..", "templates/react/app/")
        )
        cp(
            "-R",
            path.resolve(__dirname, "..", "templates/react/app/*"),
            path.resolve(CWD, name)
        )
        console.log("项目", name, "创建成功")
    }
}
