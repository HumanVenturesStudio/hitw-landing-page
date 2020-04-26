/**
 * Test if URL is an inline anchor
 * @param {String} url
 * @returns {Boolean}
 */
export const isInlineUrl = (url) => /^#|^\/#/.test(url);

/**
 * Test if URL is an internal (local) link
 * @link https://www.gatsbyjs.org/docs/gatsby-link/
 * @param {String} url
 * @returns {Boolean}
 */
export const isInternalUrl = (url) => /^\/(?!\/)/.test(url);

/**
 * Test if URL is linked
 * @param {String} url
 * @returns {Boolean}
 */
export const isExternalUrl = (url) =>
  !isInternalUrl(url) && /^https?:\/\//.test(url);
