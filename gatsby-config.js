/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Foundation',
    titleTemplate: '%s',
    description: 'Foundation Landing Page',
    url: 'https://www.humanventures.co', // No trailing slash allowed!
    image: '/images/site.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@Human_Ventures',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        // Override the file regex for SASS
        sassRuleTest: /\.global\.s(a|c)ss$/,
        // Override the file regex for CSS modules
        sassRuleModulesTest: /\.module\.s(a|c)ss$/,
        cssLoaderOptions: {
          localIdentName: 'hvs__[local]__[hash:base64:8]',
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Foundation`,
        short_name: `Foundation`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#000000`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `static/images/site.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
