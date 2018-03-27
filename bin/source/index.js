const fse = require('fs-extra')
const ejs = require('ejs')
const path = require('path')
const CWD = process.cwd()

const createPkg = options => {
  const { framework, redux, mock, appName } = options
  const pkg_src = path.join(__dirname, framework, 'settings')
  const pkg_dist = path.resolve(CWD, appName, 'package.json')

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
  fse
    .readFile(`${src}.ejs`, 'utf8')
    .then(tpl => {
      return ejs.render(tpl, param)
    })
    .then(tpl => {
      fse.outputFile(`${dist}.js`, tpl).then(() => {
        fse.remove(`${dist}.ejs`)
      })
    })
    .catch(err => {
      console.error(err)
    })
}

const copyArray = async (source_base, dist_base, sourceArray) => {
  try {
    let promises = sourceArray.map(item => {
      const exists = fse.pathExists(path.resolve(source_base, item))
      if (exists)
        // fse的所有方法都是返回promise的，所以这里不需要await
        return fse.copy(path.resolve(source_base, item), path.resolve(dist_base, 'src', item))
    })
    let results = await Promise.all(promises)
    return results
  } catch (err) {
    console.error(err)
  }
}

const initReact = options => {
  const { framework, redux, mock, appName } = options
  const source_base = path.join(__dirname, 'react')
  const dist_base = path.join(CWD, appName)
  const modules = ['assets', 'pages', 'scss', 'components', 'utils']

  copyArray(source_base, dist_base, modules).then(_ => {
    fse.remove(path.resolve(dist_base, 'src', 'pages', 'home', 'index.ejs'))
    // 生成配置模块
    fse
      .copy(path.resolve(source_base, 'settings'), path.resolve(dist_base))
      .then(() => {
        !mock && fse.remove(path.resolve(dist_base, 'mock.js')) // 不需要mock功能
        fse.remove(path.resolve(dist_base, 'redux_pkg.json'))
        // 生成package.json
        createPkg(options)
      })
      .catch(err => {
        console.error(`生成package.json出错, \n ${err}`)
      })
    // 生成redux模块
    redux && fse.copySync(path.resolve(source_base, 'app'), path.resolve(dist_base, 'src', 'app'))
    // 生成主页入口
    createJs({
      src: path.resolve(source_base, 'pages', 'index'),
      dist: path.resolve(dist_base, 'src', 'pages', 'index'),
      param: { redux: redux },
    })
  })
}

module.exports = {
  initReact,
}
