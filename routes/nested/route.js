/**
 @var {fastify.FastifyInstance} fastify
 **/

const {pi} = require('../../testRelRequire');

fastify.get('/nested/test', async () => {
    return {success: true, pi};
});