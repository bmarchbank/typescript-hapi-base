import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiPino from 'hapi-pino';
import hapiswagger from 'hapi-swagger';

const config = {
    plugins: {
        swagger: {
            info: {
                title: 'test-title',
                version: 'test-version',
            },
        },
        pino: {
            test: 'pino',
        },
    },
};

jest.mock('../config', () => config);

import * as plugins from '../plugins';

describe('src/plugins.ts', () => {
    test(`should export HAPI plugins`, () => {
        expect(plugins.default).toEqual([
            {
                plugin: Inert,
            },
            {
                plugin: Vision,
            },
            {
                plugin: hapiswagger,
                options: config.plugins.swagger,
            },
            {
                plugin: HapiPino,
                options: config.plugins.pino,
            },
        ]);
    });
});
