import { ServerRegisterPluginObject } from "@hapi/hapi";
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiPino from 'hapi-pino';
import hapiswagger, { RegisterOptions } from "hapi-swagger";
import config from "./config";

const pinoPlugin: ServerRegisterPluginObject<HapiPino.Options> = {
    plugin: HapiPino,
    options: config.plugins.pino,
}

console.log('config is: ', config.plugins.swagger.info);

const swaggerPlugin: ServerRegisterPluginObject<RegisterOptions> = {
    plugin: hapiswagger,
    options: {
        info: {
            title: config.plugins.swagger.info.title,
            version: config.plugins.swagger.info.version,
        },
    }
}

export default [
    {
        plugin: Inert
    },
    {
        plugin: Vision
    },
    swaggerPlugin,
    pinoPlugin
];