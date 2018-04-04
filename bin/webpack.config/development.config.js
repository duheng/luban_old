const merge = require('webpack-merge')
const path = require('path')
const { tmpl } = require('blueimp-tmpl')
const fs = require('fs')
const CWD = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseConfig = require('./base.config')

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
      chunks: ['shared', 'vendor'],
      filename: 'index.html',
      title: config.template.title,
      keywords: config.template.keywords,
      description: config.template.description,
      viewport: config.template.viewport,
      version: config.template.version,
      favicon: config.template.favicon,
      templateContent: data => {
        let tpl = fs.readFileSync(config.template.path, 'utf8')
        return tmpl(tpl, data)
      },
    }),
  ]
  baseConfig(config).plugins[1].config.loaders[0].query.env = {
    development: {
      plugins: [
        [
          require.resolve('babel-plugin-react-transform'),
          {
            transforms: [
              {
                transform: require.resolve('react-transform-hmr'),
                imports: ['react'],
                locals: ['module'],
              },
            ],
          },
        ],
      ],
    },
  }

  return merge(baseConfig(config), {
    mode: 'development',
    devtool: 'source-map',
    entry: {
      shared: [
        require.resolve('webpack-hot-middleware/client'),
        path.resolve(CWD, config.base, config.pages),
      ],

      vendor: ['react', 'react-dom'],
    },
    performance: {
      hints: false,
    },
    plugins,
  })
}
