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

function inject(globs, name, obj) {
    const paths = fg.sync(globs, {
        cwd: path.dirname(module.parent.filename)
    }).map(p => path.join(path.dirname(module.parent.filename), p));

    const id = nanoid(32);
    const pathVarName = nanoid(32);

    exportThis[id] = obj;
    module.exports = exportThis;

    paths.map(p => {
        hooks[p] = `
        global['${pathVarName}'] = require('path');
        var ${name} = require(global['${pathVarName}'].relative(global['${pathVarName}'].join(__dirname, __filename), '${path.join(__dirname, __filename)}'))['${id}'];
        delete global['${pathVarName}'];
        `;
        require(p);
    });
}

module.exports = exportThis;