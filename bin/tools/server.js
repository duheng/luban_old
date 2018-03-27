var path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  fs = require('fs'),
  CWD = process.cwd(),
  DEV = require('../webpack.config/development.config'),
  browser = require('./browser'),
  proxy = require('http-proxy-middleware'),
  Mock = require('mockjs')

module.exports.start = function(luban) {
  var config = DEV(luban),
    app = express(),
    is_start = process.env.MODE == 'start',
    compiler = webpack(config)
  console.log('###################', process.env.MODE)
  is_start &&
    app.use(
      require('webpack-dev-middleware')(compiler, {
        noInfo: false,
        publicPath: '/',
        stats: {
          colors: true,
          cached: false,
          exclude: [/node_modules[\\\/]/],
        },
      }),
    )

  is_start && app.use(require('webpack-hot-middleware')(compiler))

  // mock
  var mock_data = path.resolve(CWD, 'mock.js')
  if (fs.existsSync(mock_data)) {
    var data = require(path.resolve(CWD, 'mock.js'))
    if (!Array.isArray(data)) {
      console.error('模拟数据必须是数组')
    } else {
      data.map(function(item) {
        if (item.proxy) {
          app.use(
            proxy(item.path, {
              target: item.proxy,
              changeOrigin: item.changeOrigin !== false,
              ws: item.ws !== false,
              pathRewrite: item.pathRewrite,
              headers: item.headers,
            }),
          )
        } else {
          var method = item.method || 'get'
          app[method](item.path, function(req, res) {
            var data = Mock.mock(item.data)
            res.send(data)
          })
        }
      })
    }
  }

  app.use(express.static(path.resolve(CWD, luban.build)))

  app.get('*', function(req, res, next) {
    var index_name = 'index.html'

    var filename = path.join(compiler.outputPath, index_name)

    compiler.outputFileSystem.readFile(filename, function(err, result) {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })

  app.listen(luban.port, luban.host, function(err) {
    if (err) {
      console.log(err)
      return
    }
    browser.openBrowser(luban)
  })
}
