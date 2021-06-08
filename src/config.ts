import * as HapiPino from 'hapi-pino';
import { RegisterOptions } from 'hapi-swagger';
import * as pack from '../package.json';
import * as _ from 'lodash';

export default {
    server: {
        port: process.env.SERVER_PORT || 3000,
        host: process.env.SERVER_HOST || 'localhost',
    },
    plugins: {
        pino: <HapiPino.Options>{
            level: process.env.PLUGINS_PINO_LOG_LEVEL || 'warn',
            prettyPrint: !!process.env.PLUGINS_PINO_PRETTY_PRINT,
            redact: ['req.headers.authorization'],
        },
        swagger: <RegisterOptions>{
            info: {
                // default to the package.json name in Start Case
                title:
                    process.env.PLUGINS_SWAGGER_INFO_TITLE ||
                    _.startCase(pack.name),
                version: pack.version,
            },
        },
    },
};
