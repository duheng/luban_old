const Koa = require('koa')
const staticServe = require('koa-static')
const koaWebpackMiddleware = require('koa-webpack-middleware')
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const CWD = process.cwd()
const userConfig = require('./config').getOptions()
const devConfig = require('../webpack.config/development.config')
const browser = require('./browser')
const mock = require('./mock')

const app = new Koa()

module.exports.start = function(userPort) {
  userConfig.port = !!userPort ? userPort : userConfig.port
  const config = devConfig(userConfig)
  const compile = webpack(config)
  is_start = process.env.MODE == 'start'
  console.log('###################', process.env.MODE)
  const wdm = webpackDevMiddleware(compile, {
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    reload: true,
    publicPath: '/',
    headers: { 'X-Custom-Header': 'yes' },
    stats: {
      colors: true,
      cached: false,
      exclude: [/node_modules[\\\/]/],
    },
  })
  is_start && app.use(wdm)
  is_start && app.use(webpackHotMiddleware(compile))
  app.use(staticServe(path.join(CWD, userConfig.build), { extensions: ['html'] }))
  // 如果业务文件夹存在mock.js则执行mock服务
  if (fs.existsSync(path.resolve(CWD, 'mock.js'))) {
    const data = require(path.resolve(CWD, 'mock.js'))
    mock.init(app, data)
  }

  const server = app.listen(userConfig.port, userConfig.host, err => {
    if (err) {
      console.error(err)
      return
    }
    browser.openBrowser(userConfig)
  })

  process.on('SIGTERM', () => {
    console.log('Stopping dev server')
    wdm.close()
    server.close(() => {
      process.exit(0)
    })
  })
}
