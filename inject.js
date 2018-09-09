const fg = require('fast-glob');
const path = require('path');
const nanoid = require('nanoid');

const Module = require('module');
const originalCompile = Module.prototype._compile;

let hooks = {};

let exportThis = {
    inject: inject
};

Module.prototype._compile = function (content, filename) {
    if (hooks.hasOwnProperty(filename) && typeof hooks[filename] === 'string') {
        return originalCompile.call(this, `${hooks[filename]}
        ${content}`, filename);
    }
    return originalCompile.call(this, content, filename);
};

/**
 *
 * @param {String[]} globs
 * @param {Object<String, Object>} toInject
 */
function inject(globs, toInject) {
    const paths = fg.sync(globs, {
        cwd: path.dirname(module.parent.filename)
    }).map(p => path.join(path.dirname(module.parent.filename), p));

    let objcIds = {};
    for (let varname in toInject) {
        if (!toInject.hasOwnProperty(varname)) continue;
        objcIds[varname] = nanoid(32);
        exportThis[objcIds[varname]] = toInject[varname];
        module.exports = exportThis;
    }

    const pathVarName = nanoid(32);

    paths.map(p => {
        hooks[p] = `
        global['${pathVarName}'] = require('path');
        `;
        for (let varname in toInject) {
            if (!toInject.hasOwnProperty(varname)) continue;
            hooks[p] += `var ${varname} = require(global['${pathVarName}'].relative(global['${pathVarName}'].join(__dirname, __filename), '${path.join(__dirname, __filename)}'))['${objcIds[varname]}'];
            `;
        }
        hooks[p] += `delete global['${pathVarName}'];`
        require(p);
    });
}

module.exports = exportThis;