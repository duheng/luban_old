const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs')
const CWD = process.cwd()
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base.config')
const config = require('../tools/config').getOptions()

const plugins = [
  // new ExtractTextPlugin({
  //   filename: "css/[name]-[hash:8].css", // 生成的文件名
  //   allChunks: true // 从所有chunk中提取
  // }),
  new UglifyJsPlugin({
    uglifyOptions: {
      output: {
        comments: true, // 删除代码中所有注释
      },
      compress: {
        warnings: false, // 删除没有用的代码时是否发出警告
        drop_console: true, // 是否删除所有的console
      },
    },
  }),
  new webpack.DefinePlugin({
    'process.env': {
      MODE: JSON.stringify(process.env.MODE),
      NODE_ENV: JSON.stringify('production'),
    },
    API: JSON.stringify(config.api[process.env.MODE]),
    STATIC: JSON.stringify(config.static[process.env.MODE]),
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    chunks: ['shared', 'vendor', 'manifest'],
    excludeChunks: ['manifest'],
    title: config.template.title,
    keywords: config.template.keywords,
    description: config.template.description,
    viewport: config.template.viewport,
    version: config.template.version,
    chunksSortMode: (a, b) => {
      var chunksOrder = ['vendor', 'shared']
      return chunksOrder.indexOf(a.names[0]) - chunksOrder.indexOf(b.names[0])
    },
    favicon: config.template.favicon,
    minify: {
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: false,
    },
    templateContent: function(templateParams, compilation) {
      var indexTemplate = fs.readFileSync(config.template.path, 'utf8')

      Object.keys(compilation.assets).forEach(function(key) {
        if (key.indexOf('manifest') !== -1) {
          var chunkManifest = compilation.assets[key]._value
          if (config.globals.crossOrigin && config.globals.crossOrigin[process.env.MODE]) {
            var param = chunkManifest.match(/(\w+)\.type/)[1]
            var replaceStr =
              param + '.crossOrigin=' + JSON.stringify(config.globals.crossOrigin[process.env.MODE])
            chunkManifest = chunkManifest.replace(/(\w+\.type)/, replaceStr + ',$1')
          }
          templateParams.chunkManifest = chunkManifest
          delete compilation.assets[key]
        }
      })
      let tmpl = require('blueimp-tmpl').tmpl
      return tmpl(indexTemplate, templateParams)
    },
  }),
]

module.exports = _ => {
  return merge(baseConfig(config), {
    mode: 'production',
    entry: {
      shared: path.resolve(CWD, config.base, config.pages),
      vendor: config.vendor || ['react', 'react-dom'],
    },
    plugins,
    //  optimization: {
    //     splitChunks: {
    //         chunks: "all",
    //     }
    // },
  })
}
