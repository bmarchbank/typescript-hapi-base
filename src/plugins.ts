/**
 * HAPI Plugin configurations to be registered on start-up
 */
import { ServerRegisterPluginObject } from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiPino from 'hapi-pino';
import hapiswagger, { RegisterOptions } from 'hapi-swagger';
import config from './config';

// Pino logger configuration
const pinoPlugin: ServerRegisterPluginObject<HapiPino.Options> = {
    plugin: HapiPino,
    options: config.plugins.pino,
};

// Swagger plugin configuration
const swaggerPlugin: ServerRegisterPluginObject<RegisterOptions> = {
    plugin: hapiswagger,
    options: {
        info: {
            title: config.plugins.swagger.info.title,
            version: config.plugins.swagger.info.version,
        },
    },
};

// Export all plugin settings to be registered on server start-up
export default [
    {
        plugin: Inert,
    },
    {
        plugin: Vision,
    },
    swaggerPlugin,
    pinoPlugin,
];
