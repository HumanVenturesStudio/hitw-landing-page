const express = require(`express`);
const path = require('path');

exports.onCreateWebpackConfig = ({ stage, plugins, actions, getConfig }) => {
  let config = getConfig();
  // Add "absolute" app import path
  // Before: import Compoent from "./components/Component"
  // After:  import Compoent from "components/Component"
  config.resolve = {
    ...config.resolve,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  };
  actions.replaceWebpackConfig(config);
};

// Enable development support for serving HTML from `./static` folder
exports.onCreateDevServer = ({ app }) => {
  app.use(express.static(`public`));
};
