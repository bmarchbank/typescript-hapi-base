# typescript-node-base

Basic TypeScript starting repository for Node.JS projects with some basic building & live reload scripts.

## Prerequisites
* Node version 14

## Usage
1. Clone this repository
1. Run `npm install`
1. Run `npm start:dev`

## Scripts

* `npm run build` - Compiles all TS files and copies all JSON files in the `src/` directory to the `.dist/` directory
* `npm run start` - Calls the entry-point file to start the application (`.dist/index.js`)
* `npm run start:dev` - Uses [nodemon](https://www.npmjs.com/package/nodemon) to automatically re-build/restart the application when there are changes in the `src/` directory