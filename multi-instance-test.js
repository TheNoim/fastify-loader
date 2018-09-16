const fastify = require('fastify')();
const fastify2 = require('fastify')();

// Just register the plugin and add glob array which files to loud
fastify.register(require('./index'), {
    paths: ['./routes/**/*.js'],
    inject: {
        test: 1337
    }
});
fastify2.register(require('./index'), {
    paths: ['./routes/**/*.js'],
    inject: {
        test: 1338
    }
});

fastify.listen(1337, err => {
    if (err) {
        console.trace(err);
        process.exit(1);
    }
    console.log('http://127.0.0.1:1337');
});

fastify2.listen(1338, err => {
    if (err) {
        console.trace(err);
        process.exit(1);
    }
    console.log('http://127.0.0.1:1338');
});