const webpack = require("webpack")
const Server = require("webpack-dev-server")
const config = require("./webpack/dev")
const baseloader = require("./utils/baseloader")

const port = 8080
const host = baseloader.getHost()
const address = `http://${host}:${port}`

module.exports.start = () => {
  const server = new Server(webpack(config), {
    hot: true,
    stats: {colors: true, chunks: false, modules: false, children: false},
    disableHostCheck: true
  })

  server.listen(port, undefined, function() {
    console.log("\n ==> " + address + " \n")
  })
}
