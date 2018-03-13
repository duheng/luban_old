var path = require('path');
var fs = require('fs');
var CWD = process.cwd();
var default_luban = require('./luban.config.js');

function extend(target, source) {
    var hasOwnProperty = {}.hasOwnProperty;

    for(var key in source) {
        if(hasOwnProperty.call(target, key)) {
            if(key === 'alias' || key === 'template') {
                // for alias, rewrite already defined, and add in new
                for(var al in source[key]) {
                    target[key][al] = source[key][al];
                }
            } else {
                target[key] = source[key];
            }
        }
    }

    // global template config
    if(source['template']) {
        // set template path
        target.template.path = source.template.path ? path.resolve(CWD, target.template.path) : path.resolve(__dirname, '..', 'webpack', 'template.html');

        // set template favicon
        source.template.favicon && (target.template.favicon = path.resolve(CWD, source.base, source.template.favicon));

        // set template string mocking
        source.template.mock && (target.template.mock = path.resolve(CWD, source.template.mock));
    }

    // rewrite with local absolute path
    for(var key in target.alias) {
        var value = target.alias[key];
        target.alias[key] = path.join(target.base, value);
    }

    /**
     *  mock data replacement happend only when mock value setted on template configuration, or multiple page configuration
     *
     *  the replacement process happended on START Mode only
     *
     */
    if(typeof target.pages == 'object') {
        for(var key in target.pages) {
            var entry = target.pages[key]
            if(typeof entry == 'object') {
                // entry = { entry: 'pages/index', template: 'src/template.html' }
                target.pages[key] = {
                    entry: path.resolve(CWD, target.base, entry.entry),
                    template: path.resolve(CWD, entry.template),
                    // mock data replacement for server side rendering
                    mock: entry.mock && path.resolve(CWD, entry.mock),
                    favicon: target.template.favicon
                }
            } else {
                target.pages[key] = {
                    entry: target.pages[key],
                    template: target.template.path,
                    favicon: target.template.favicon,
                    // mock data replacement for server side rendering
                    mock: target.template.mock,
                }
            }
        }
    }

    if(target.alias_modules) {
        // modules alias
        for(var key in target.alias_modules) {
            target.alias[key] = target.alias_modules[key];
        }
    }

    return target;
}

function isExists(filename) {
    return fs.existsSync(path.resolve(CWD, filename));
}

module.exports = {
    getluban: function() {
        if(isExists('package.json')) {
            var filepath = path.resolve(CWD, 'package.json')
            var appconfig = require(filepath)
            process.env.luban_TAG = appconfig.version
        }

        if(isExists('luban.config.js')) {
            var filepath = path.resolve(CWD, 'luban.config.js');
            var luban = require(filepath);
            return extend(default_luban, luban);
        }

        if(isExists('luban.json')) {
            var filepath = path.resolve(CWD, 'luban.json');
            var luban = require(filepath);
            return extend(default_luban, luban);
        }

        return default_luban;

    },
    hasluban: function() {
       return isExists('luban.config.js') || isExists('luban.json');
    }
}
