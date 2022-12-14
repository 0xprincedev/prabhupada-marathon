# prabhupada-marathon

[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

## Table of Contents
1. [Features](#features)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
1. [Application Structure](#application-structure)
1. [Development](#development)
  1. [Routing](#routing)
1. [Configuration](#configuration)
1. [Production](#production)
1. [Deployment](#deployment)

## Requirements
* node `^8`
* npm `^3.0.0`

## Getting Started

1. Install app and functions dependencies: `npm i && npm i --prefix functions`
1. Create `src/config.js` file that looks like so if it does not already exist:
    ```js
    const firebase = {
      // Config from Firebase console
    }

    // Overrides for for react-redux-firebase/redux-firestore config
    export const reduxFirebase = {}
    
    export const analyticsTrackingId = '<- Google Analytics Tracking ID ->'
    
    export const publicVapidKey = '<- publicVapidKey from Firebase console ->'

    export default {
      env,
      firebase,
      reduxFirebase,
      publicVapidKey,
      analyticsTrackingId
    }
    ```
1. Start Development server: `npm start`

While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`    |Description|
|-------------------|-----------|
|`start`            |Serves your app at `localhost:3000` and displays [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)|
|`start:simple`     |Serves your app at `localhost:3000` without [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)|
|`build`            |Builds the application to ./dist|
|`lint`             |[Lints](http://stackoverflow.com/questions/8503559/what-is-linting) the project for potential errors|
|`lint:fix`         |Lints the project and [fixes all correctable errors](http://eslint.org/docs/user-guide/command-line-interface.html#fix)|

[Husky](https://github.com/typicode/husky) is used to enable `prepush` hook capability. The `prepush` script currently runs `eslint`, which will keep you from pushing if there is any lint within your code. If you would like to disable this, remove the `prepush` script from the `package.json`.

## Config Files

There are multiple configuration files:

* Project Path Configuration - `project.config.js`
* Firebase Project Configuration (including settings for how `src/config.js` is built on CI) - `.firebaserc`
* Project Configuration used within source (can change based on environment variables on CI) - `src/config.js`
* Cloud Functions Local Configuration - `functions/.runtimeconfig.json`

More details in the [Application Structure Section](#application-structure)

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
????????? build                    # All build-related configuration
???   ????????? scripts              # Scripts used within the building process
???   ????????? karma.config.js      # Test configuration for Karma
???   ????????? webpack.config.js    # Environment-specific configuration files for webpack
????????? server                   # Express application that provides webpack middleware
???   ????????? main.js              # Server application entry point
????????? src                      # Application source code
???   ????????? config.js            # Environment specific config file with settings from Firebase (created by CI)
???   ????????? constants.js         # Project constants such as firebase paths and form names
???   ????????? index.html           # Main HTML page container for app
???   ????????? main.js              # Application bootstrap and rendering
???   ????????? normalize.js         # Browser normalization and polyfills
???   ????????? components           # Global Reusable Presentational Components
???   ????????? containers           # Global Reusable Container Components (connected to redux state)
???   ????????? layouts              # Components that dictate major page structure
???   ???   ????????? CoreLayout       # Global application layout in which to render routes
???   ????????? routes               # Main route definitions and async split points
???   ???   ????????? index.js         # Bootstrap main application routes with store
???   ???   ????????? Home             # Fractal route
???   ???       ????????? index.js     # Route definitions and async split points
???   ???       ????????? assets       # Assets required to render components
???   ???       ????????? components   # Presentational React Components (state connect and handler logic in enhancers)
???   ???       ????????? modules      # Collections of reducers/constants/actions
???   ???       ????????? routes/**    # Fractal sub-routes (** optional)
???   ????????? static               # Static assets
???   ????????? store                # Redux-specific pieces
???   ???   ????????? createStore.js   # Create and instrument redux store
???   ???   ????????? reducers.js      # Reducer registry and injection
???   ????????? styles               # Application-wide styles (generally settings)
???   ????????? utils                 # General Utilities (used throughout application)
???   ???   ????????? components.js   # Utilities for building/implementing react components (often used in enhancers)
???   ???   ????????? form.js         # For forms (often used in enhancers that use redux-form)
???   ???   ????????? router.js       # Utilities for routing such as those that redirect back to home if not logged in
????????? project.config.js        # Project configuration settings
????????? .firebaserc              # Firebase Project configuration settings (including ci settings)
????????? tests                    # Unit tests
```

### Routing
We use `react-router` [route definitions](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md#plainroute) (`<route>/index.js`) to define units of logic within our application. See the [application structure](#application-structure) section for more information.

## Production

Build code before deployment by running `npm run build`. There are multiple options below for types of deployment, if you are unsure, checkout the Firebase section.

### Deployment

1. Install Firebase Command Line Tool: `npm i -g firebase-tools`

#### CI Deploy (recommended)


#### Manual deploy

1. Run `firebase:login`
1. Initialize project with `firebase init` then answer:
  * What file should be used for Database Rules?  -> `database.rules.json`
  * What do you want to use as your public directory? -> `build`
  * Configure as a single-page app (rewrite all urls to /index.html)? -> `Yes`
  * What Firebase project do you want to associate as default?  -> **your Firebase project name**
1. Build Project: `npm run build`
1. Confirm Firebase config by running locally: `firebase serve`
1. Deploy to Firebase (everything including Hosting and Functions): `firebase deploy`
**NOTE:** You can use `firebase serve` to test how your application will work when deployed to Firebase, but make sure you run `npm run build` first.

## FAQ

1. Why node `8` instead of a newer version?

  [Cloud Functions runtime runs on `8`](https://cloud.google.com/functions/docs/writing/#the_cloud_functions_runtime), which is why that is what is used for the travis build version.

1. Why `enhancers` over `containers`? - For many reasons, here are just a few:
    * separates concerns to have action/business logic move to enhancers (easier for future modularization + optimization)
    * components remain "dumb" by only receiving props which makes them more portable
    * smaller files which are easier to parse
    * functional components can be helpful (along with other tools) when attempting to optimize things


[climate-image]: https://img.shields.io/codeclimate/github/cheenbabes/prabhupada-marathon.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/cheenbabes/prabhupada-marathon
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/cheenbabes/prabhupada-marathon.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/cheenbabes/prabhupada-marathon
[license-image]: https://img.shields.io/npm/l/prabhupada-marathon.svg?style=flat-square
[license-url]: https://github.com/cheenbabes/prabhupada-marathon/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
