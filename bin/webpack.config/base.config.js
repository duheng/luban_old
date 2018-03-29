const webpack = require('webpack')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const CWD = process.cwd()
const modules = require('./module')

const webpackConfig = config => {
  // console.log('process.env.MODE__________', process.env.MODE)
  const is_production = process.env.MODE !== 'start'
  console.log('is_production______', is_production)
  return {
    output: {
      path: path.resolve(CWD, config.build),
      publicPath: config.static[process.env.MODE],
      chunkFilename: 'js/[name]-[chunkhash:8].js',
      filename: 'js/[name].js',
    },
    externals: config.externals || {},
    module: modules.init(config),
    resolve: {
      modules: [
        CWD,
        path.resolve(__dirname, '..', '..', 'node_modules'),
        'node_modules',
        'bower_components',
      ],
      alias: config.alias,
      extensions: ['.js', '.json', '.jsx', '.scss', '.css', '.less'],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '..', '..', 'node_modules')],
      moduleExtensions: ['-loader'],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(CWD, config.build)]),
      new CaseSensitivePathsPlugin(), //解决开发中大小写导致路径问题
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new TransferWebpackPlugin(
        [
          {
            from: path.join(config.base, config.assets || 'assets'),
            to: path.join(config.assets || 'assets'),
          },
        ],
        path.resolve(CWD),
      ),
    ],
  }
}

module.exports = webpackConfig
