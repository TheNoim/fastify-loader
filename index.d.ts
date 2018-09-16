/// <reference path="node_modules/fastify/fastify.d.ts" />

import * as fastify from 'fastify';
import * as http from "http";

declare interface HttpServer extends http.Server {}
declare interface HttpRequest extends http.IncomingMessage {}
declare interface HttpResponse extends http.ServerResponse {}

declare interface FastifyLoaderOptions {
    name?: String
    inject?: [String, any]
    paths?: [String] | String
}

declare let fastifyLoader: fastify.Plugin<HttpServer, HttpRequest, HttpResponse, FastifyLoaderOptions>;

export = fastifyLoader;