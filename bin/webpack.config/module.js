const path = require('path')
const CWD = process.cwd()
const init = config => {
  return {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
          include: [
           path.join(path.resolve(CWD, config.base))
         ],
      },
      {
        test: /\.js/,
        use: 'happypack/loader?id=jsx',
        include: [
           path.join(path.resolve(CWD, config.base)),
         ]
      },
      {
        test: /\.css$/,
        use: [
          "style",
          {
            loader: "css",
            options:  config.css_modules
              ?  {
                modules: true,
                localIdentName: "[name]__[local]__[hash:base64:8]"
              } : {}
          },
          {
            loader:'postcss',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style",
          {
            loader: "css",
            options:  config.css_modules
              ? {
                modules: true,
                localIdentName: "[name]__[local]__[hash:base64:8]"
              } : {}
          },
          {
            loader:'postcss',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          },
          "sass"
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif|ico)$/,
        use: [
          {
            loader: 'url',
            options: {
              limit: config.image_limit, // 20k以内的图片用base64，可配置
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
        loader: 'url',
        options: {
          name:  '[name]-[hash:8].[ext]',
        },
      },
    ],
  }
}

module.exports = {
  init,
}
