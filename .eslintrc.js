module.exports = {
  parser: 'babel-eslint',
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: `react-app`,
  globals: {
    __DEVELOPMENT__: 'readonly',
    __PRODUCTION__: 'readonly',
  },
};
