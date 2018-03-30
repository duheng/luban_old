const merge = require('webpack-merge')
const path = require('path')
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
      chunksSortMode: (a, b) => {
        var chunksOrder = ['vendor', 'shared']
        return chunksOrder.indexOf(a.names[0]) - chunksOrder.indexOf(b.names[0])
      },
      favicon: config.template.favicon,
      templateContent: function(templateParams, compilation) {
        let indexTemplate = fs.readFileSync(config.template.path, 'utf8')
        let tmpl = require('blueimp-tmpl').tmpl
        return tmpl(indexTemplate, templateParams)
      },
    }),
  ]
  //console.log(baseConfig(config).plugins[0].config.loaders[0].query)
  baseConfig(config).plugins[0].config.loaders[0].query.env = {
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
    devtool: config.devtool,
    entry: {
      shared: [
        require.resolve('webpack-hot-middleware/client'),
        path.resolve(CWD, config.base, config.pages),
      ],

      vendor: config.vendor || ['react', 'react-dom'], // common libs bundle
    },
    performance: {
      hints: false,
    },
    plugins,
  })
}
