const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')
const CWD = process.cwd()
const { genFileName } = require('../tools/utils')

const createPkg = (pkg_src, pkg_dist, appName) => {
  fse
    .readJson(path.resolve(pkg_src, 'package.json'))
    .then(source_package => {
      return fse.readJson(path.resolve(pkg_src, 'redux_pkg.json')).then(redux_pkg => {
        source_package.dependencies = Object.assign(source_package.dependencies, redux_pkg)
        source_package.name = appName
        return source_package
      })
    })
    .then(dist_package => {
      fse.outputJson(pkg_dist, dist_package, { spaces: 4 })
    })
    .catch(err => {
      console.log('package.json生成失败!')
      console.error(err)
    })
}

const createJs = options => {
  const { src, dist, param } = options
  return fse
    .readFile(`${src}.ejs`, 'utf8')
    .then(tpl => {
      return ejs.render(tpl, param)
    })
    .then(tpl => {
      fse.outputFile(`${dist}.js`, tpl)
    })
    .catch(err => {
      console.error(err)
    })
}

const initReact = options => {
  const { framework, redux, mock, appName } = options
  const source_base = path.join(__dirname, 'react')
  const dist_base = path.join(CWD, appName)
  fse
    .copy(path.resolve(source_base, 'static'), path.resolve(dist_base))
    .then(() => {
      // 生成redux模块
      redux && fse.copy(path.resolve(source_base, 'app'), path.resolve(dist_base, 'src', 'app'))
    })
    .then(() => {
      // 生成入口
      createJs({
        src: path.resolve(source_base, 'tpl', 'entry'),
        dist: path.resolve(dist_base, 'src', 'pages', 'index'),
        param: { redux: redux },
      })
    })
    .then(() => {
      // 生成mock文件
      const source_mock = path.resolve(source_base, 'tpl', 'mock.js')
      mock &&
        fse
          .readFile(source_mock, 'utf8')
          .then(tpl => {
            fse.outputFile(path.resolve(dist_base, 'mock.js'), tpl)
          })
          .catch(err => {
            console.error(err)
          })
    })
    .then(() => {
      // 生成package.json
      createPkg(
        path.join(__dirname, framework, 'tpl'),
        path.resolve(CWD, appName, 'package.json'),
        appName,
      )
    })
    .catch(err => console.error(err))
}



const initVue = options => {
  const { framework, redux, mock, appName } = options
  const source_base = path.join(__dirname, 'vue')
  const dist_base = path.join(CWD, appName)
  fse
    .copy(path.resolve(source_base, 'static'), path.resolve(dist_base))
    .then(() => {
      // 生成redux模块
     // redux && fse.copy(path.resolve(source_base, 'app'), path.resolve(dist_base, 'src', 'app'))
    })
/*    .then(() => {
      // 生成入口
      createJs({
        src: path.resolve(source_base, 'tpl', 'entry'),
        dist: path.resolve(dist_base, 'src', 'pages', 'index'),
        param: { redux: redux },
      })
    })*/
    .then(() => {
      // 生成mock文件
      const source_mock = path.resolve(source_base, 'tpl', 'mock.js')
      mock &&
        fse
          .readFile(source_mock, 'utf8')
          .then(tpl => {
            fse.outputFile(path.resolve(dist_base, 'mock.js'), tpl)
          })
          .catch(err => {
            console.error(err)
          })
    })
    .then(() => {
      // 生成package.json
    
    })
    .catch(err => console.error(err))
}

module.exports = {
  initReact,
  initVue
}
