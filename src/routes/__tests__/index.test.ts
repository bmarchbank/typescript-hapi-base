import * as routes from '../index';
import path from 'path';
import { ServerRoute } from '@hapi/hapi';

describe('src/routes/index.ts', () => {
    beforeEach(() => {
        routes.routes.clear();
    });

    test(`registerRoute should add a tag when options is undefined`, () => {
        const mockRoute: ServerRoute = {
            path: '/test/path',
            method: 'GET',
        };

        routes.registerRoute(mockRoute);

        expect(Array.from(routes.routes.values())).toEqual([
            {
                ...mockRoute,
                options: {
                    tags: ['api'],
                },
            },
        ]);
    });

    test(`registerRoute should not add a tag when options is undefined and shouldDocument is false`, () => {
        const mockRoute: ServerRoute = {
            path: '/test/path',
            method: 'GET',
        };

        routes.registerRoute(mockRoute, false);

        expect(Array.from(routes.routes.values())).toEqual([mockRoute]);
    });

    test(`registerRoute should add a tag when options.tags is undefined`, () => {
        const mockRoute: ServerRoute = {
            path: '/test/path',
            method: 'GET',
            options: {},
        };

        routes.registerRoute(mockRoute);

        expect(Array.from(routes.routes.values())).toEqual([
            {
                ...mockRoute,
                options: {
                    tags: ['api'],
                },
            },
        ]);
    });

    test(`registerRoute should append a tag when options.tags is defined`, () => {
        const mockRoute: ServerRoute = {
            path: '/test/path',
            method: 'GET',
            options: {
                tags: ['tag1'],
            },
        };

        routes.registerRoute(mockRoute);

        expect(Array.from(routes.routes.values())).toEqual([
            {
                ...mockRoute,
                options: {
                    tags: ['tag1', 'api'],
                },
            },
        ]);
    });

    test(`registerRoute should not append a tag when options.tags is defined and shouldDocument is false`, () => {
        const mockRoute: ServerRoute = {
            path: '/test/path',
            method: 'GET',
            options: {
                tags: ['tag1'],
            },
        };

        routes.registerRoute(mockRoute, false);

        expect(Array.from(routes.routes.values())).toEqual([mockRoute]);
    });

    test(`getAllRoutes should resolve paths `, async () => {
        jest.spyOn(path, 'resolve').mockReturnValueOnce('');

        await routes.getAllRoutes();

        expect(path.resolve).toHaveBeenCalledWith(
            path.resolve(__dirname, '../'),
            `*/index.ts`
        );
    });

    test(`getAllRoutes should return the list of routes`, async () => {
        jest.spyOn(path, 'resolve').mockReturnValueOnce('');

        const mockRoute = {
            path: '/test/path',
            method: 'GET',
            options: {
                tags: ['tag1'],
            },
        };

        routes.routes.add(mockRoute);

        expect(await routes.getAllRoutes()).toEqual([mockRoute]);
    });
});
