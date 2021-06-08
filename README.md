# typescript-hapi-base

Basic TypeScript starting repository for Hapi.JS projects with some basic building & live reload scripts.

## Documentation
API Documentation can be accessed at `http://<host>:<port>/documentation`

## Environment Variables
> `.env` files can be used to set environment variables.  See [dotenv](https://www.npmjs.com/package/dotenv) for details.

### Server
* `SERVER_PORT` - Sets the port number that the HAPI server listens on. Default: `3000`.
* `SERVER_HOST` - Sets the host name that the HAPI server listens on. Default: `localhost`.

### **Plugins**

#### PINO
* `PLUGINS_PINO_LOG_LEVEL` - Sets the level of logging that is output to the console.  Default: `warn`
  * Possible Valies: `"fatal" | "error" | "warn" | "info" | "debug" | "trace"`
* `PLUGINS_PINO_PRETTY_PRINT` - Set to a truthy value to turn on "pretty printing" to make the logs more readable for development & debugging.  Default: `false`

#### Swagger
* `PLUGINS_SWAGGER_INFO_TITLE` - Sets the page title to be displayed on the Swagger documentation page.  Defaults to the package name in "package.json" but converted to "Start Case".

## Requirements
* Node version 14+

## Development

* `npm run build` - Compiles all TS files and copies all JSON files in the `src/` directory to the `.dist/` directory
* `npm run start` - Calls the entry-point file to start the application (`.dist/index.js`)
* `npm run start:dev` - Uses [nodemon](https://www.npmjs.com/package/nodemon) to automatically re-build/restart the application when there are changes in the `src/` directory
* `npm run test` - Executes all unit tests
* `npm run test:watch` - Executes all unit tests each time there is a code change