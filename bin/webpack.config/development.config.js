const merge = require('webpack-merge')
const path = require('path')
const { tmpl } = require('blueimp-tmpl')
const fs = require('fs')
const CWD = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./base.config')

const { getOptions } = require('../tools/utils')
const userConfig = getOptions()

const PLATFORM = userConfig.platform

module.exports = config => {
  const plugins = [
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify(process.env.MODE),
        NODE_ENV: JSON.stringify('development'),
      },
      API: JSON.stringify(config.api[process.env.MODE]),
      STATIC: JSON.stringify(config.static[process.env.MODE]),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的html存放路径，相对于 path
      templateContent: data => {
        let tpl = fs.readFileSync(config.template.path, 'utf8')
        return tmpl(tpl, data)
      },
      inject: true, // 允许插件修改哪些内容，包括head与body
      hash: true // 为静态资源生成hash值
    }),

  ]

  if(PLATFORM == 'react') {
     baseConfig(config).plugins[1].config.loaders[0].query.env = {
      development: {
        plugins: [
          [
            require.resolve('babel-plugin-react-transform'),
            {
              transforms: [
                {
                  transform: require.resolve('react-transform-hmr'),
                  imports: ['react', 'react-dom'],
                  locals: ['module'],
                },
              ],
            },
          ],
        ],
      },
    }
  }


  return merge(baseConfig(config), {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      shared: [
        require.resolve('webpack-hot-middleware/client'),
        path.resolve(CWD, config.base, config.pages),
      ],
      vendor:  PLATFORM == 'react' ? ['react', 'react-dom'] : ['vue','vuex'],
    },
    performance: {
      hints: false,
    },
    plugins,
  })
}
