# Setup a backend project using Express JS, Typescript, Prettier, Eslint and other useful libraries like cors, helmet, cross-env, dotenv, and zod

## Project setup

### Install Node.js

Install Node.js on your computer by heading to the official Node.js website and downloading the latest version for your operating system.

### Create a new project

Open a new terminal window and create a new directory for your project. Navigate to the newly created directory and initialize a new Node.js project using the following command:

```bash
npm init -y
```

This will create a new `package.json` file in your project directory.

### Install dependencies

Install the necessary dependencies by running the following command:

```bash
npm i -D @swc/core @types/express @types/node eslint eslint-config-prettier eslint-plugin-prettier prettier ts-node ts-node-dev tsconfig-paths typescript
```

```bash
npm i express
```

This will install Typescript, Prettier, and ESLint, along with the necessary plugins and configuration to get them all working together.

### Configure TypeScript

Create a `tsconfig.json` file in your project directory and configure TypeScript according to your preferences. You can use the following example as a starting point:

```json
{
 "extends": "ts-node/node16/tsconfig.json",
 "compilerOptions": {
  "target": "ESNext",
  "module": "commonjs",
  "moduleResolution": "node",
  "baseUrl": "./",
  "paths": {
   "~/*": ["./src/*"]
  },
  "sourceMap": true,
  "outDir": "./dist",
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "strict": true,
  "skipLibCheck": true
 },
 "exclude": ["node_modules"],
 "ts-node": {
  "require": ["tsconfig-paths/register"],
  "transpileOnly": true,
  "files": true,
  "swc": true
 }
}
```

### Configure ESLint

Create a `.eslintrc.json` file in your project directory and configure ESLint according to your preferences. You can use the following example as a starting point:

```json
{
 "extends": [
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:prettier/recommended"
 ],
 "plugins": ["@typescript-eslint", "prettier"],
 "parser": "@typescript-eslint/parser",
 "rules": {
  "@typescript-eslint/explicit-module-boundary-types": "off"
 }
}
```

This configuration extends the recommended ESLint rules, the recommended TypeScript rules, and the Prettier plugin. It also specifies the parser for TypeScript files and disables the rule that requires explicit module boundaries.

### Configure Prettier

Create a `.prettierrc.json` file in your project directory and configure Prettier according to your preferences. You can use the following example as a starting point:

```json
{
 "singleQuote": true,
 "useTabs": true,
 "tabWidth": 2
}
```

### Write some code

Create a `src` directory in the root directory of your project, and create a new `server.ts` file inside it with the following contents:

```ts
import express from 'express';

const app = express();

app.get('/', (req, res) => {
 res.send('Hello, world!');
});

app.listen(5000, () => {
 console.log('Server listening on port 5000');
});
```

This sets up a simple Express.js server that listens on port 5000 and responds with "Hello, world!" for any incoming requests.

### Configure package.json

We will configure and add additional scripts to your `package.json` file to run your server using ts-node:

```jsonc
{
 "main": "dist/server.js",
 "scripts": {
  "start": "ts-node --transpile-only src/server.ts",
  "dev": "ts-node-dev --loader=ts-node/esm --transpile-only --respawn src/server.ts"
 }
}
```

This tells npm to run the start script by executing `ts-node src/server.ts`. The main field specifies the entry point for your application when it's installed as a package.

### Run your server

Run your server by executing npm start in your terminal. You should see `"Server listening on port 5000"` in your console. You can access your server by visiting <http://localhost:5000/> in your browser.

Congratulations! You've set up a Node.js/Express.js project with TypeScript, ts-node, Prettier, and ESLint.

## Useful libraries

## Installing and using cors

Install the cors package by running the following commands in your project directory:

```bash
npm i -D @types/cors
```

```bash
npm i cors
```

In your main server file (e.g. `server.ts`), add the following lines at the top:

```ts
import express from 'express';
import cors from 'cors';

const app = express();

app.use(
 cors({
  origin: 'http://localhost:3000', // Replace with the URL of your frontend application
  credentials: true,
 }),
);

// ...your other middleware and routes...
// for example
app.get('/', (req, res) => {
 res.send('Hello, world!');
});

app.listen(5000, () => {
 console.log('Server listening on port 5000');
});
```

This enables Cross-Origin Resource Sharing (CORS) for your Express.js server and allows requests from the specified origin (in this case, <http://localhost:3000>).

In your frontend application, you can now make requests to your backend on port 5000 using fetch or any other HTTP client library. For example:
javascript

```ts
fetch('http://localhost:5000')
 .then((response) => response.text())
 .then((data) => {
  // Do something with the data
 })
 .catch((error) => {
  // Handle the error
 });
```

This sends a GET request to <http://localhost:5000/`api/data`> and retrieves the response data as text.

> Note that you may need to adjust the CORS configuration based on your specific requirements. For example, you may want to allow requests from multiple origins, or you may want to enable specific HTTP methods or headers. You can find more information about the cors configuration options in [the cors documentation](https://www.npmjs.com/package/cors#configuration-options).

## Installing and using helmet

Install the helmet package by running the following command in your project directory:

```bash
npm i helmet
```

In your main server file (e.g. server.ts), add the following lines at the top:
typescript

```ts
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());

// ...your other middleware and routes...

app.listen(5000, () => {
 console.log('Server listening on port 5000');
});
```

This adds various security headers to your HTTP responses, helping to protect your application from common web vulnerabilities.

When using helmet, the referrerPolicy middleware can be useful to set the Referrer-Policy header, which controls how much information the browser sends in the Referer header when navigating to external sites. By default, the Referrer-Policy header is not set, which can potentially leak sensitive information about your application. To set the header to a safer value, you can add the following line to your helmet configuration:

```ts
app.use(
 helmet({
  referrerPolicy: { policy: 'same-origin' },
 }),
);
```

This sets the Referrer-Policy header to same-origin, which only sends the Referer header when navigating to pages on the same origin (i.e. same domain and protocol).

## Installing and using dotenv

Install the dotenv package by running the following command in your project directory:

```bash
npm i dotenv
```

In your project directory let make a `utils` directory with a `config.ts` in it that will hold the configuration for the server

```ts
import { config } from 'dotenv';

config();

const serverConfig = {
 PORT: process.env.PORT,
 FRONTEND_URL: process.env.FRONTEND_URL,
};

export default serverConfig;
```

`config` loads `.env` file contents into `process.env` by default, so we can access them easily

## Installing and using and zod

Install the zod package by running the following command in your project directory:

```bash
npm i zod
```

We will use the previous code example about the `dotenv`

```ts
import { config } from 'dotenv';
import { z } from 'zod';

config();

const serverConfig = {
 PORT: z.string().parse(process.env.PORT),
 FRONTEND_URL: z.string().parse(process.env.FRONTEND_URL),
};

export default serverConfig;
```

## Installing and using cross-env

Install the cross-env package by running the following command in your project directory:

```bash
npm i -D cross-env
```

let's make some changes to the `start` and `dev` scripts on the `package.json`

old:

```json
{
 "start": "ts-node --transpile-only src/server.ts",
 "dev": "ts-node-dev --loader=ts-node/esm --transpile-only --respawn src/server.ts"
}
```

new:

```json
{
 "start": "cross-env NODE_ENV=production ts-node --transpile-only src/server.ts",
 "dev": "cross-env NODE_ENV=development ts-node-dev --loader=ts-node/esm --transpile-only --respawn src/server.ts"
}
```
