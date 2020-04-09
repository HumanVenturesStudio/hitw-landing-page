// gatsby-browser.js
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // const DATA = {};
  const DATA = {
    dimension1: `{{ GATSBY_BRANCH }}`,
    branch: `${process.env.GATSBY_BRANCH}`,
  };
  window.analytics && window.analytics.page(DATA);
};
