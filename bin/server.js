const webpack = require("webpack")
const Server = require("webpack-dev-server")
const config = require("./config/dev")
const baseloader = require("./utils/baseloader")

const port = 8080
const host = baseloader.getHost()
const address = `http://${host}:${port}`
const useHotReload = false
const entryMixins = [
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  "webpack-dev-server/client?" + address
]

module.exports.start = function(pepper) {
  if (useHotReload) {
    // bundle the client for hot reload
    // only- means to only hot reload for successful updates
    entryMixins.push("webpack/hot/only-dev-server")
    // activates HMR
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    // prints more readable module names in the browser console on HMR updates
    config.plugins.push(new webpack.NamedModulesPlugin())
  }

  // config.e
  //
  // ntry['app'] = entryMixins.concat(config.entry['app'])
  config.entry["server-client"] = entryMixins
  // console.log('config_____', config)

  const server = new Server(webpack(config), {
    hot: useHotReload,
    stats: {colors: true, chunks: false, modules: false, children: false},
    disableHostCheck: true
  })

  server.listen(port, undefined, function() {
    console.log("\n ==> " + address + " \n")
  })
}
