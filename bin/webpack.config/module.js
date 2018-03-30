const path = require('path')

const init = config => {
  return {
    rules: [
      {
        test: /\.js/,
        loader: 'babel',
        query: require('./babel'),
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(css|less|scss)$/,
        use: [
          'style',
          {
            loader: 'css',
            options: config.css_modules
              ? {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]__[local]__[hash:base64:8]',
                }
              : {},
          },
          {
            loader: 'postcss',
            options: {
              sourceMap: 'inline',
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          'resolve-url',
          'sass',
          'less',
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: config.base64_image_limit, // 20k以内的图片用base64，可配置
              name: config.assets + '/images/[name]-[hash:8].[ext]',
            },
          },
          {
            loader: 'image-webpack',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        loader: 'file',
        options: {
          name: config.assets + '/fonts/[name]-[hash:8].[ext]',
        },
      },
    ],
  }
}

module.exports = {
  init,
}
