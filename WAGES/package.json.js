{
  "name": "wages1-solution",
  "version": "0.0.1",
  "description": "Water, Air, Gas, Electricity and Steam  management and monitoring solution",
  "main": "index.html",
  "engines": {
    "node": "6.9.1"
  },
  "dependencies": {
    "@uirouter/angularjs": "^1.0.5",
    "angular": "^1.5.0",
    "angular-auth0": "^2.0.0-beta.2",
    "angular-chart.js": "^1.1.1",
    "angular-jwt": "^0.1.9",
    "angular-lock": "^2.0.2",
    "angular-mocks": "^1.5.0",
    "angular-moment": "^1.0.1",
    "angular-nvd3": "^1.0.9",
    "angular-paging": "^2.2.2",
    "angular-route": "^1.6.4",
    "angular-storage": "0.0.15",
    "angular-xeditable": "^0.8.0",
    "angularjs-gauge": "^2.1.0",
    "auth0-js": "^8.8.0",
    "babel-core": "^6.7.7",
    "babel-loader": "^6.2.4",
    "babel-plugin-transform-runtime": "^6.7.5",
    "babel-polyfill": "^6.7.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-stage-0": "^6.5.0",
    "babel-register": "^6.7.2",
    "babel-runtime": "^6.6.1",
    "browser-sync": "^2.11.1",
    "chai": "^3.4.0",
    "connect-history-api-fallback": "^1.1.0",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.19.0",
    "del": "^2.2.0",
    "file-loader": "^0.11.1",
    "fs-walk": "0.0.1",
    "gulp": "^3.9.1",
    "gulp-rename": "^1.2.2",
    "gulp-template": "^3.0.0",
    "gulp-util": "^3.0.7",
    "highcharts-ng": "^1.1.0",
    "html-webpack-plugin": "^1.7.0",
    "image-webpack-loader": "^3.3.0",
    "json-tree2": "^0.1.5",
    "karma": "^0.13.22",
    "karma-chai": "^0.1.0",
    "karma-chrome-launcher": "^0.2.0",
    "karma-mocha": "^0.2.0",
    "karma-mocha-reporter": "^1.0.2",
    "karma-sourcemap-loader": "^0.3.4",
    "karma-webpack": "^1.5.1",
    "lodash": "^4.11.1",
    "mocha": "^2.5.3",
    "ng-annotate-loader": "0.0.10",
    "ng-dialog": "^1.3.0",
    "ng-mock-e2e": "^0.1.2",
    "node-libs-browser": "^0.5.0",
    "node-sass": "^4.5.3",
    "normalize.css": "^3.0.3",
    "raw-loader": "^0.5.1",
    "run-sequence": "^1.1.0",
    "sass-loader": "^4.1.1",
    "style-loader": "^0.18.2",
    "supports-color": "^3.1.2",
    "webpack": "^1.15.0",
    "webpack-dev-middleware": "^1.6.1",
    "webpack-hot-middleware": "^2.6.0",
    "yargs": "^3.9.0"
  },
  "devDependencies": {
    "gulp-if": "^2.0.2",
    "gulp-prompt": "^0.2.0",
    "gulp-rsync": "0.0.8",
    "minimist": "^1.2.0"
  },
  "scripts": {
    "build": "gulp webpack",
    "component": "gulp component",
    "serve": "gulp serve",
    "test": "karma start",
    "watch": "gulp serve",
    "webpack": "gulp webpack"
  },
  "keywords": [
    "angular",
    "webpack",
    "es6"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/angularclass/NG6-starter.git"
  },
  "author": "AngularClass",
  "license": "Apache-2.0",
  "babel": {
    "plugins": [
      "transform-runtime"
    ],
    "presets": [
      "es2015",
      "stage-0"
    ]
  }
}
