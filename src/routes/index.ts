/**
 * Utilities to store and retrieve HAPI Routes
 */
import _glob from 'glob';
import { ServerRoute } from '@hapi/hapi';
import { extname, resolve } from 'path';
import { promisify } from 'util';

// Store the HAPI route configurations
export const routes = new Set<ServerRoute>();

/**
 * Register a route so that it is accessible
 *
 * @param route The HAPI Route configuration
 * @param shouldDocument Whether or not the endpoint should be documented in swagger
 */
export const registerRoute = (
    route: ServerRoute,
    shouldDocument: boolean = true
): void => {
    // inject the "api" tag automatically so that it shows up in swagger
    if (shouldDocument && typeof route.options === 'object') {
        // don't overwrite existing tags
        route.options.tags
            ? route.options.tags.push('api')
            : (route.options.tags = ['api']);
    } else if (shouldDocument && route.options === undefined) {
        route.options = {
            tags: ['api'],
        };
    }

    // TODO<bmarchbank>: support cases where "route.options" is a function instead of an object

    routes.add(route);
};

/**
 * Retrieve the full list of routes that have been registered
 *
 * @returns The list of registered HAPI Routes
 */
export const getAllRoutes = async (): Promise<ServerRoute[]> => {
    // convert the "callback" version of glob to return a promise instead
    const glob = promisify(_glob);

    // retrieve the current file extension (ts when in dev mode or js when compiled)
    const ext = extname(__filename);

    // import all route files nested in the current directory
    const routePaths = await glob(resolve(__dirname, `*/index${ext}`));
    await Promise.all(routePaths.map((route) => import(route)));

    // return all routes that were registered
    return Array.from(routes.values());
};
