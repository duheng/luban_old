const path = require('path')

module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables caching results in OS temporary directory for faster rebuilds.
  cacheDirectory: false,
  presets: [
    // es2015, es2016, es2017
    [
      require.resolve('babel-preset-env'),
      {
        modules: false,
      },
    ],
    // JSX, Flow
    require.resolve('babel-preset-react'),
    // stage-0
    require.resolve('babel-preset-stage-0'),
  ],
  plugins: [
    // { ...todo, completed: true }
    require.resolve('babel-plugin-transform-object-rest-spread'),
    // function x(a, b, c,) { }
    require.resolve('babel-plugin-syntax-trailing-function-commas'),
    // await fetch()
    require.resolve('babel-plugin-syntax-async-functions'),
    // function* () { yield 42; yield 43; }
    [
      require.resolve('babel-plugin-transform-regenerator'),
      {
        // async functions are conerted to generators by babel-preset-latest
        async: false,
      },
    ],
    // Polyfills the runtime needed for async/await and generators
    [
      require.resolve('babel-plugin-transform-runtime'),
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
        // resolve the babel runtime relative to the config
        moduleName: path.dirname(require.resolve('babel-runtime/package')),
      },
    ],
    // Optimization: hoist JSX that never changes out of render()
    require.resolve('babel-plugin-transform-decorators-legacy'),
    // require.resolve('babel-plugin-add-module-exports'),
  ],
}
