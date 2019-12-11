const merge = require('webpack-merge')
const path = require('path')
const { tmpl } = require('blueimp-tmpl')
const fs = require('fs')
const CWD = process.cwd()
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./base.config')
const config = require('../tools/utils').getOptions()

const plugins = [
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
    minify: {
         removeComments: true,
         collapseWhitespace: true,
         removeRedundantAttributes: true,
         useShortDoctype: true,
         removeEmptyAttributes: true,
         removeStyleLinkTypeAttributes: true,
         keepClosingSlash: true,
         minifyJS: true,
         minifyCSS: true,
         minifyURLs: true,
    },
    inject: true, // 自动注入
    templateContent: data => {
      let tpl = fs.readFileSync(config.template.path, 'utf8')
      return tmpl(tpl, data)
    },
  }),
  new ExtractTextPlugin({filename : 'css/[name]-[contenthash:8].css', allChunks:true})
]

let __baseConfig = baseConfig(config)
    __baseConfig.module.rules.map(item => {
      if (/css|sass|less/.test(item.use)) {
        item.use.shift()
        item.use = ExtractTextPlugin.extract({
          fallback: 'style',
          use: item.use
        })
      }
    })

module.exports = _ => {

  return merge(__baseConfig, {
    mode: 'production',
    entry: {
      shared: path.resolve(CWD, config.base, config.pages),
      vendor: ['react', 'react-dom'],
    },
    plugins,
    optimization: {
      removeAvailableModules:true,
      removeEmptyChunks:true,
      mergeDuplicateChunks:true,
      flagIncludedChunks:true,
      occurrenceOrder:true,
      providedExports:true,
      usedExports:true,
      minimize:true,
  		splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
  			cacheGroups: {
  				commons: {
  					chunks: "initial",
  					minChunks: 2,
  					maxInitialRequests: 5, // The default limit is too small to showcase the effect
  					minSize: 0 // This is example is too small to create commons chunks
  				},
  				vendor: {
  					test: /node_modules/,
  					chunks: "initial",
  					name: "vendor",
  					priority: 10,
  					enforce: true
  				},
          styles: {
           name: 'styles',
           test: /\.css$/,
           chunks: 'all',
           enforce: true
         }
  			}
  		}
  	},
    performance: {
      hints: false,
    }
  
  })
}
