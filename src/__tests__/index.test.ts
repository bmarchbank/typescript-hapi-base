import { number } from 'joi';

const mockDotEnv = {
    config: jest.fn(),
};

jest.mock('dotenv', () => mockDotEnv);

const mockServer = {
    register: jest.fn().mockImplementation(async (plugins) => null),
    route: jest.fn().mockImplementation(async (routes) => null),
    start: jest.fn().mockImplementation(async () => null),
    logger: {
        info: jest.fn(),
    },
};

const mockHapi = {
    server: jest.fn().mockImplementation(({ port, host }) => mockServer),
};

jest.mock('@hapi/hapi', () => mockHapi);

const mockRoutes = {
    getAllRoutes: jest.fn().mockImplementation(async () => ['routes']),
};

jest.mock('../routes', () => mockRoutes);

import config from '../config';

jest.mock('../plugins', () => ['plugins']);

describe('src/index.ts', () => {
    beforeAll(() => {
        require('../index');
    });

    test(`should call dotenv`, () => {
        expect(mockDotEnv.config).toHaveBeenCalled();
    });

    test(`should initialize the HAPI server`, () => {
        expect(mockHapi.server).toHaveBeenCalledWith({
            port: config.server.port,
            host: config.server.host,
        });
    });

    test(`should register plugins`, async () => {
        expect(await mockServer.register).toHaveBeenCalledWith(['plugins']);
    });

    test(`should register all API routes`, async () => {
        // retrieve API routes
        expect(await mockRoutes.getAllRoutes).toHaveBeenCalled();

        // register API routes
        expect(mockServer.route).toHaveBeenCalledWith(['routes']);
    });

    test(`should start the server`, async () => {
        expect(await mockServer.start).toHaveBeenCalled();
    });
});
