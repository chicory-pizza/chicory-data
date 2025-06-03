# Getting started

## Remote development

Gitpod lets you get started coding without the need to install any extra programs on your computer:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/chicory-pizza/chicory-data)

## Local development

Requirements:

- [Node.js v22+](https://nodejs.org)

Steps:

1. git clone
2. npm install
3. npm start
4. Open the web app at <http://localhost:3000>

### Visual Studio Code extensions

If you use Visual Studio Code, it's recommended to install these extensions for the best experience.

You can find this list by opening the Command Palette and choosing "Extensions: Show Recommended Extensions"

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Libraries

This project is primarily a [React](https://react.dev) app.

It's highly recommended to install the [React Developer Tools](https://react.dev/learn/react-developer-tools) on your browser for easier debugging.

## Code style

Use [Prettier](https://prettier.io).

If you have the proper VSCode setup, then it should be auto-formatted on save, no need to worry about code style!

Otherwise, run `npm run prettier -- --write` to auto-fix.

## Type-checking

This project uses [TypeScript](https://www.typescriptlang.org) for static type-checking, previously this project used [Flow](https://flow.org).

Run `npm run tsc -- -b` to see errors.

## Linting

This project uses [ESLint](https://eslint.org) for linting.

Run `npm run lint` to see errors.

## Running tests

This project uses [Jest](https://jestjs.io) for testing.

Run `npm test` to run the tests. Some tests may fail on the first attempt due to timeout but re-running them should work.

## Code coverage

Code coverage can be obtained by running `npm test -- --coverage`

## Extra notes

This project used to be bootstrapped with [Create React App](https://create-react-app.dev/docs/getting-started/) but it's now migrated to [Vite](https://vitejs.dev), because of this, there are a few quirks that is normally not seen on other Vite projects:

- [Jest](https://jestjs.io) is used instead of [Vitest](https://vitest.dev) as [canvas in jsdom](https://github.com/vitest-dev/vitest/issues/740) doesn't work on Vitest
- `babel.config.js` is only used by Jest
