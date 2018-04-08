const Koa = require('koa')
const staticServe = require('koa-static')
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CWD = process.cwd()
const route = require('koa-route')
const proxy = require('koa-proxies')
const Mockjs = require('mockjs')
const bodyParser = require('koa-bodyparser')
const { getOptions, getApi } = require('./utils')
const userConfig = getOptions()
const devConfig = require('../webpack.config/development.config')
const browser = require('./browser')

const app = new Koa()
app.use(bodyParser())
module.exports.start = function(userPort) {
  userConfig.port = !!userPort ? userPort : userConfig.port
  const config = devConfig(userConfig)
  const compile = webpack(config)
  is_start = process.env.MODE == 'start'
  console.log('###################', process.env.MODE)
  const wdm = devMiddleware(compile, {
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

  if (is_start) {
    app.use(wdm)
    app.use(hotMiddleware(compile))
    // 如果业务文件夹存在mock.js则执行mock服务
    if (fs.existsSync(path.resolve(CWD, 'mock.js'))) {
      const data = require(path.resolve(CWD, 'mock.js'))
      data.map(item => {
        let method = item.method || 'get'
        if (item.proxy) {
          app.use(
            proxy(item.path, {
              target: item.proxy,
              changeOrigin: true,
              logs: true,
            }),
          )
        } else {
          app.use(
            route[method.toLowerCase()](item.path, async (ctx, next) => {
              ctx.body = await Mockjs.mock(item.data)
              next()
            }),
          )
        }
      })
    }
  }

  app.use(staticServe(path.join(CWD, userConfig.build), { extensions: ['html'] }))
  app.use(async (ctx, next) => {
    const requested = ctx.get('x-requested-with')
    //  console.log('ctx...')
      //  console.log(ctx.request)
  //  console.log(ctx.request.method)
    if ( requested === 'XMLHttpRequest') {
      console.log('parse____', ctx.request)
      const { method, URL, body } = ctx.request
      const { pathname, searchParams } = URL
      const resp = await  getApi({ method, pathname, body })
      // resp.on('body', (sbody) =>{
      //   console.log(sbody) // 200
      // //  console.log(response.headers['content-type']) // 'image/png'
      // })
      //   ctx.response.type = 'json';
      //   ctx.response.body = resp.data
//  console.log('resp.data____', resp)
      fetch(`http://smart-starcircle.wepiao.com${pathname}?celebrity_id=28062`)
      .then(
          function(response){
              if(response.status!==200){
                  console.log("存在一个问题，状态码为："+response.status);
                  return;
              }
              //检查响应文本
              response.json().then(function(data){
                  console.log(data);
              });
          }
      )
      .catch(function(err){
          console.log("Fetch错误:"+err);
      });
    }
    //  await next()

  })
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
