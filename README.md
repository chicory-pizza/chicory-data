# Chicory: A Colorful Modding

<img alt="Chicory: A Colorful Tale game logo" align="right" src="./src/icon144.png" width="72" />

Modding tools for Chicory: A Colorful Tale, such as level viewer and editor.

Note that this tool directly exposes game internals and doesn't hide anything, it's recommended to complete the game (ideally to 100% completion) if you don't want to be spoiled.

## Development

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/chicory-pizza/chicory-data)

Requirements:

- [Node v16+](https://nodejs.org)

Steps:

1. git clone
2. npm install
3. npm start

This should open the web app at http://localhost:3000

### Extra notes

This project used to be bootstrapped with [Create React App](https://create-react-app.dev/docs/getting-started/) but it's now migrated to [Vite](https://vitejs.dev), because of this, there are a few quirks that is normally not seen on other Vite projects:

- [Jest](https://jestjs.io) is used instead of [Vitest](https://vitest.dev) as [canvas in jsdom](https://github.com/vitest-dev/vitest/issues/740) doesn't work on Vitest
- `babel.config.js` is only used by Jest

## License

The web app is licensed under the [MPL 2.0 License](https://www.mozilla.org/en-US/MPL/2.0/).

:chicory_is_straight: emote by [moon--and--star](https://moon--and--star.tumblr.com).

Original game assets are from the Chicory: A Colorful Tale game (duh).

Chicory: A Colorful Tale™ © 2021 Greg Lobanov. All rights reserved. Finji® and regal weasel and crown logo are trademarks of Finji, LLC.
