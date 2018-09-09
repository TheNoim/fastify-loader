const fastify = require('fastify')();

// Just register the plugin and add glob array which files to loud
fastify.register(require('./index'), {
    paths: ['./alternative/**/*.js'],
    name: "othername"
});

fastify.listen(1337, err => {
    if (err) {
        console.trace(err);
        process.exit(1);
    }
    console.log('http://127.0.0.1:1337');
});

// For jest test
module.exports = fastify;