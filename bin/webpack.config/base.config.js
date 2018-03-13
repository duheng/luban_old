const webpack = require("webpack")
const TransferWebpackPlugin = require("transfer-webpack-plugin")
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const path = require("path")
const CWD = process.cwd()

const webpackConfig = config => {
    // console.log('process.env.MODE__________', process.env.MODE)
    const is_production = process.env.MODE !== "start"
    console.log("is_production______", is_production)
    return {
        output: {
            path: path.resolve(CWD, config.build),
            publicPath: config.static[process.env.MODE],
            chunkFilename: "js/[name]-[chunkhash:8].js",
            filename: "js/[name].js"
        },
        externals: config.externals || {},
        module: {
            rules: [
                config.eslint
                    ? {
                          enforce: "pre",
                          test: /\.(js|jsx)$/,
                          loader: "eslint",
                          include: [path.resolve(CWD, config.base)],
                          exclude: /(node_modules|bower_components)/,
                          options: {
                              configFile: path.resolve(CWD, ".eslintrc")
                          }
                      }
                    : {},
                {
                    test: /\.js/,
                    loader: "babel",
                    query: is_production
                        ? require("./babel.production")
                        : require("./babel.development"),
                    exclude: /(node_modules|bower_components)/
                },
                {
                    test: /\.(css|less|scss)$/,
                    use: [
                        "style",
                        {
                            loader: "css",
                            options: config.css_modules
                                ? {
                                      modules: true,
                                      importLoaders: 1,
                                      localIdentName:
                                          "[name]__[local]__[hash:base64:8]"
                                  }
                                : {}
                        },
                        {
                            loader: "postcss",
                            options: is_production
                                ? {
                                      config: {
                                          path: path.resolve(
                                              __dirname,
                                              "postcss.config.js"
                                          )
                                      }
                                  }
                                : {
                                      sourceMap: "inline",
                                      config: {
                                          path: path.resolve(
                                              __dirname,
                                              "postcss.config.js"
                                          )
                                      }
                                  }
                        },
                        "resolve-url",
                        "sass",
                        "less"
                    ]
                },
                {
                    test: /\.(jpe?g|png|svg|gif|ico)$/,
                    use: [
                        {
                            loader: "url",
                            options: {
                                limit: config.base64_image_limit, // 20k以内的图片用base64，可配置
                                name:
                                    config.assets +
                                    "/images/[name]-[hash:8].[ext]"
                            }
                        },
                        {
                            loader: "image-webpack",
                            query: {
                                mozjpeg: {
                                    progressive: true
                                },
                                gifsicle: {
                                    interlaced: false
                                },
                                optipng: {
                                    optimizationLevel: 7
                                },
                                pngquant: {
                                    quality: "65-90",
                                    speed: 4
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
                    loader: "file",
                    options: {
                        name: config.assets + "/fonts/[name]-[hash:8].[ext]"
                    }
                }
            ]
        },
        resolve: {
            modules: [
                CWD,
                path.resolve(__dirname, "..", "..", "node_modules"),
                "node_modules",
                "bower_components"
            ],
            alias: config.alias,
            extensions: [".js", ".json", ".jsx", ".scss", ".css", ".less"]
        },
        resolveLoader: {
            modules: [path.resolve(__dirname, "..", "..", "node_modules")],
            moduleExtensions: ["-loader"]
        },
        plugins: [
            new CaseSensitivePathsPlugin(), //解决开发中大小写导致路径问题
            new webpack.ProvidePlugin({
                React: "react"
            }),
            new TransferWebpackPlugin(
                config.transfer_assets
                    ? [
                          {
                              from: path.join(
                                  config.base,
                                  config.assets || "assets"
                              ),
                              to: path.join(config.assets || "assets")
                          }
                      ]
                    : [],
                path.resolve(CWD)
            )
        ]
    }
}

module.exports = webpackConfig
