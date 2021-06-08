/**
 * Entrypoint file for the HAPI Server
 */

// use dotenv to support ".env" files
import { config as dotenv } from 'dotenv';
dotenv();

import * as Hapi from '@hapi/hapi';
import config from './config';
import { getAllRoutes } from './routes';
import plugins from './plugins';

const init = async () => {
    // initialize the server
    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host,
    });

    // register plugins
    await server.register(plugins);
    server.logger.info(`Successfully registered ${plugins.length} plugin(s).`);

    // register all API routes
    const routes = await getAllRoutes();
    server.route(routes);
    server.logger.info(`Successfully registered ${routes.length} route(s).`);

    // start the HAPI server
    await server.start();
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
