const fg = require('fast-glob');
const path = require('path');
const {NodeVM} = require('vm2');
const fs = require('fs');
const debug = require('debug')('inject');

/**
 *
 * @param {String[]} globs
 * @param {Object<String, Object>} toInject
 */
function inject(globs, toInject, parent) {
    debug(`Parent filename: ${parent}`);

    const paths = fg.sync(globs, {
        cwd: path.dirname(parent)
    }).map(p => path.join(path.dirname(parent), p));

    debug(`Transformed Globs: ${paths}`);

    paths.map(p => {
        debug(`Create VM for ${p}`);
        const vm = new NodeVM({
            sandbox: toInject,
            nesting: true,
            require: {
                external: true,
                builtin: true
            },
            wrapper: 'commonjs'
        });
        const code = fs.readFileSync(p, { encoding: 'utf8' });
        debug(`Code for ${p}: ${code}`);
        vm.run(code, p);
        debug(`Executed ${p}`);
    });
}

module.exports = {
    requireAndInject: inject
};