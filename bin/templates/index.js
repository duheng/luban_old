var memFs = require('mem-fs')
var editor = require('mem-fs-editor')

var store = memFs.create()
var fs = editor.create(store)

const createPkg = (mode) => {
  const pkg_src = path.resolve(__dirname, mode, 'package.json.ejs')
  const pkg_dist = path.resolve(__dirname, mode, 'package.json.ejs')

  fs.copyTpl(pkg_src, path.resolve(components_base, 'index.js'), context);
  fs.commit(function(){
          console.log('component ' + name + ' created @' + config.components + '/ ' + name + ' \n');

          console.log(doc[config.esmode]['component'](name));
      });
}
module.exports = {
    createPkg: createPkg,
}
