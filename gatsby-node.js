const path = require('path');

exports.onCreateWebpackConfig = ({ stage, plugins, actions, getConfig }) => {
  let config = getConfig();
  config.resolve = {
    ...config.resolve,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  };
  actions.replaceWebpackConfig(config);
};
