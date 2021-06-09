import * as _ from 'lodash';
import pack from '../../package.json';

describe('src/config.ts', () => {
    beforeEach(() => {
        // clear all node "require" caches
        jest.resetModules();
    });

    test('config should load defaults', () => {
        const config = require('../config').default;

        // server variables
        expect(config.server.port).toEqual(3000);
        expect(config.server.host).toEqual('localhost');

        // plugin variables
        expect(config.plugins.pino.level).toEqual('warn');
        expect(config.plugins.pino.prettyPrint).toEqual(false);
        expect(config.plugins.pino.redact).toEqual([
            'req.headers.authorization',
        ]);
        expect(config.plugins.swagger.info.title).toEqual(
            _.startCase(pack.name)
        );
        expect(config.plugins.swagger.info.version).toEqual(pack.version);
    });

    test('environment variables should override defaults', () => {
        process.env.SERVER_PORT = '4000';
        process.env.SERVER_HOST = 'test-host';

        process.env.PLUGINS_PINO_LOG_LEVEL = 'trace';
        process.env.PLUGINS_PINO_PRETTY_PRINT = 'true';
        process.env.PLUGINS_SWAGGER_INFO_TITLE = 'test app title';

        const config = require('../config').default;

        // server variables
        expect(config.server.port).toEqual(4000);
        expect(config.server.host).toEqual('test-host');

        // plugin variables
        expect(config.plugins.pino.level).toEqual('trace');
        expect(config.plugins.pino.prettyPrint).toEqual(true);
        expect(config.plugins.swagger.info.title).toEqual('test app title');
    });

    test('invalid number for the server port should set to the default', () => {
        process.env.SERVER_PORT = 'fake-number';

        const config = require('../config').default;

        expect(config.server.port).toEqual(3000);
    });

    test('any truthy value should set pretty print to true', () => {
        process.env.PLUGINS_PINO_PRETTY_PRINT = 'some-truthy-value';

        const config = require('../config').default;

        expect(config.plugins.pino.prettyPrint).toEqual(true);
    });

    test("setting pretty print to the string 'false' should set pretty print to false", () => {
        process.env.PLUGINS_PINO_PRETTY_PRINT = 'false';

        let config = require('../config').default;

        expect(config.plugins.pino.prettyPrint).toEqual(false);
    });
});
