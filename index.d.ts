/// <reference path="node_modules/fastify/fastify.d.ts" />

import * as fastify from 'fastify';
import * as http from "http";
import {RegisterOptions} from "fastify";
import {Plugin} from "fastify";

declare interface HttpServer extends http.Server {}
declare interface HttpRequest extends http.IncomingMessage {}
declare interface HttpResponse extends http.ServerResponse {}

declare interface FastifyLoaderOptions {
    name?: String
    inject?: [String, any]
    paths?: [String] | String
}

declare let fastifyLoader: fastify.Plugin<HttpServer, HttpRequest, HttpResponse, FastifyLoaderOptions>;

declare module 'fastify' {
    export interface FastifyInstance<HttpServer = http.Server, HttpRequest = http.IncomingMessage, HttpResponse = http.ServerResponse> {
        register<T extends RegisterOptions<HttpServer, HttpRequest, HttpResponse>>(plugin: Plugin<HttpServer, HttpRequest, HttpResponse, T>, opts?: FastifyLoaderOptions): FastifyInstance<HttpServer, HttpRequest, HttpResponse>
    }
}

export = fastifyLoader;