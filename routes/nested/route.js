/**
 @var {fastify.FastifyInstance} fastify
 **/

fastify.get('/nested/test', async () => {
    return {success: true};
});