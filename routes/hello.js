/**
 @var {fastify.FastifyInstance} fastify
 @var {Number} test
 **/

fastify.get('/test', async () => {
    return {success: true, test: test};
});