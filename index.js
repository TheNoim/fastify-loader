const fp = require('fastify-plugin')
const {inject} = require('./inject');

module.exports = fp(function (fastify, opts, next) {
    const globs = Array.isArray(opts.paths) ? opts.paths : (typeof opts.paths === 'string' ? opts.paths : []);
    const instanceName = opts.name || "fastify";
    inject(globs, instanceName, fastify);
    next()
}, { fastify: '>=1.0.0' });