const router = require('koa-router')()
const proxy = require('http-proxy-middleware')
const Mockjs = require('mockjs')

const init = (app, data) => {
    if (!Array.isArray(data)) {
      console.error('模拟数据必须是数组')
    } else {
      data.map((item) => {
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
          let method = item.method || 'get'
          router[method](item.path, async (ctx, next) => {
            ctx.body = Mockjs.mock(item.data)
          })
        }
      })
    }
}

module.exports = {
  init,
}
