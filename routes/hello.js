/**
 @var {fastify.FastifyInstance} fastify
 **/

fastify.get('/test', async () => {
    return {success: true};
});