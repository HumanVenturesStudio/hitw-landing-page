// gatsby-browser.js
exports.onRouteUpdate = () => {
  window.analytics && window.analytics.page();
};
