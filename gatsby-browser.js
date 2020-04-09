// gatsby-browser.js
exports.onRouteUpdate = ({ location, prevLocation }) => {
  window.analytics &&
    window.analytics.page(undefined, {
      branch: '{{ BRANCH }}',
    });
};
