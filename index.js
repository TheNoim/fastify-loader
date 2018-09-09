const fp = require('fastify-plugin')
const {requireAndInject} = require('./inject');
const debug = require('debug')('fastify-loader');

module.exports = fp(function (fastify, opts, next) {
    const globs = Array.isArray(opts.paths) ? opts.paths : (typeof opts.paths === 'string' ? opts.paths : []);
    const instanceName = opts.name || "fastify";
    const othersToInject = opts.inject || {};
    debug(`InstanceName: ${instanceName}`);
    debug(`othersToInject: ${othersToInject}`);
    debug(`globs: ${globs}`);
    requireAndInject(globs, {
        [instanceName]: fastify,
        ...othersToInject
    });
    next()
}, { fastify: '>=1.0.0' });