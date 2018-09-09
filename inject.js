const fg = require('fast-glob');
const path = require('path');
const {NodeVM} = require('vm2');
const fs = require('fs');

/**
 *
 * @param {String[]} globs
 * @param {Object<String, Object>} toInject
 */
function inject(globs, toInject) {
    const paths = fg.sync(globs, {
        cwd: path.dirname(module.parent.filename)
    }).map(p => path.join(path.dirname(module.parent.filename), p));

    paths.map(p => {
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
        vm.run(code, p);
    });
}

module.exports = {
    requireAndInject: inject
};