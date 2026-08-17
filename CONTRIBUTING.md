# Developing Chicory: A Colorful Modding

## Remote development

Gitpod lets you get started coding without the need to install any extra programs on your computer:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/chicory-pizza/chicory-data)

## Local development

First, install [Node.js v24+](https://nodejs.org).

Run the web app:

```sh
npm install
npm start # go to http://localhost:3000
```

## Libraries

This project is a [React](https://react.dev) app, using [TanStack Router](https://tanstack.com/router/latest) for routing (previously used [React Router](https://reactrouter.com)).

For UI styling, this project uses [Mantine](https://mantine.dev) and [Phosphor Icons](https://phosphoricons.com).

It's recommended to install the [React Developer Tools](https://react.dev/learn/react-developer-tools) on your browser for easier debugging.

## Code style

Use [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) (previously used [Prettier](https://prettier.io)). Run `npm run format` to auto-fix.

## Type-checking

Use [TypeScript](https://www.typescriptlang.org) (previously used [Flow](https://flow.org)). Run `npm run tsc -- -b` to see errors.

## Linting

Use [ESLint](https://eslint.org). Run `npm run lint` to see errors.

## Tests

Use [Vitest](https://vitest.dev) (previously used [Jest](https://jestjs.io)). Run `npm test` to run the tests.

## Code coverage

Code coverage can be obtained by running `npm test -- --coverage`

## Running all tests

The test suites are run on every push, it's best to run them on your system to avoid CI failures afterwards:

```bash
npm run tsc -- -b && npm run lint && npm test -- --run && npm run format -- --check
```
