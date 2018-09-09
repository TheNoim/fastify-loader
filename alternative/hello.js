/**
 @var {fastify.FastifyInstance} othername
 **/

othername.get('/test', async () => {
    return {success: true};
});