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
  ],
};
