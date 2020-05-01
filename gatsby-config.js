/**
 * Configure your Gatsby site with this file.
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    ...require('./config/metadata'),
    url: `${process.env.URL}`, // No trailing slash allowed!
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-source-local-git`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: require('./config/fonts-google'),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              // usePrefix defaults to false
              // usePrefix: true is the same as ["oembed"]
              usePrefix: ['embed'],
              providers: {
                // Full list of Providers can be found here: https://oembed.com/providers.json
                include: [
                  'YouTube',
                  'Vimeo',
                  'Twitter',
                  'Instagram',
                  // 'Twitch',
                  // 'TED',
                  // 'The New York Times',
                  // 'Codepen',
                  // 'GIPHY',
                  // 'Spotify',
                ],
                // Important to exclude providers that adds js to the page.
                // If you do not need them.
                // exclude: ['Reddit'],
                settings: {
                  // Ex. Show all Twitter embeds with the dark theme
                  // Twitter: { theme: 'dark' },
                  // Ex. Hide all Instagram comments by default
                  Instagram: { hidecaption: true },
                },
              },
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve(
            `${__dirname}/src/components/Layout/index.js`
          ),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        // Use dart-sass, not node-sass
        // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sass#alternative-sass-implementations
        implementation: require('sass'),
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
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        // your segment write key for your production environment
        // when process.env.NODE_ENV === 'production'
        // required; non-empty string
        prodKey: `${process.env.SEGMENT__WRITE_KEY}`,

        // if you have a development env for your segment account, paste that key here
        // when process.env.NODE_ENV === 'development'
        // optional; non-empty string
        devKey: `${process.env.SEGMENT__WRITE_KEY}`,

        // boolean (defaults to false) on whether you want
        // to include analytics.page() automatically
        // if false, see below on how to track pageviews manually
        trackPage: false,

        // boolean (defaults to false); whether to delay load Segment
        // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
        // This feature will force Segment to load _after_ either a page routing change
        // or user scroll, whichever comes first. This delay time is controlled by
        // `delayLoadTime` setting. This feature is used to help improve your website's
        // TTI (for SEO, UX, etc).  See links below for more info.
        // NOTE: But if you are using server-side routing and enable this feature,
        // Segment will never load (because although client-side routing does not do
        // a full page refresh, server-side routing does, thereby preventing Segment
        // from ever loading).
        // See here for more context:
        // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment-js/pull/19#issuecomment-559569483
        // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
        // Problem/solution: https://marketingexamples.com/seo/performance
        delayLoad: false,

        // number (default to 1000); time to wait after scroll or route change
        // To be used when `delayLoad` is set to `true`
        delayLoadTime: 1000,
      },
    },
  ],
};
