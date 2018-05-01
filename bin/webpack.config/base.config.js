const webpack = require('webpack')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({ size: 6 })

const path = require('path')
const CWD = process.cwd()
const modules = require('./module')
const { genAlias } = require('../tools/utils')

const webpackConfig = config => {
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
      alias: genAlias(path.resolve(CWD, config.base)),
      extensions: ['.js', '.json', '.jsx', '.scss', '.css', '.less'],
    },
    resolveLoader: {
      modules: [path.resolve(__dirname, '..', '..', 'node_modules')],
      moduleExtensions: ['-loader'],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(CWD, config.build)]),
      new HappyPack({
        id: 'jsx',
        threadPool: happyThreadPool,
        loaders: [
          {
            path: 'babel',
            query: require('./babel'),
          },
        ],
      }),
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
