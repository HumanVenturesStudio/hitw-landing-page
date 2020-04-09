// gatsby-browser.js
exports.onRouteUpdate = ({ location, prevLocation }) => {
  window.analytics &&
    window.analytics.page({
      dimension1: '{{ BRANCH }}',
      branch: `${process.env.BRANCH}`,
      branch2: `${BRANCH}`,
    });
};
