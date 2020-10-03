import { FastifyRegister } from 'fastify';

declare interface FastifyLoaderOptions {
    name?: String
    inject?: [String, any]
    paths?: String[] | String
}

export const fastifyLoader: FastifyRegister<FastifyLoaderOptions>

export default fastifyLoader