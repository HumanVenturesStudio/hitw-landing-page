import React from 'react';
import LandingPage from 'common/lib/landingPage';
import { info, warn } from 'common/lib/log';
import withReleaseInfo from 'common/lib/withReleaseInfo';

/**
 * ============================================================================
 * Segment Analytics Wrapper
 * @link https://segment.com/
 * ============================================================================
 */

/**
 * @param  {...any} args Fallback Function when Segment is not loaded
 */
const FN_FALLBACK = (...args) => {
  warn('[analytics]', '[NOT LOADED!!!]', ...args);
};

/**
 * @returns {Object} Segment Analytics.js || Fallback for Dev
 */
const analytics = () =>
  (typeof window !== `undefined` && window.analytics) || {
    page: FN_FALLBACK,
    event: FN_FALLBACK,
  };

/**
 * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page
 * @param {object} properties
 */
export const trackPage = ({ release, ...properties }) => {
  info(`[analytics:${release}]`, 'page', properties);
  analytics().page({ release, ...properties });
  return true;
};

/**
 * Higher order component wraps layout to track page
 * @param {Component} Layout
 */
export const withPageTracking = (Layout) => {
  function PageTrackingHOC({ release, ...props }) {
    React.useEffect(() => {
      trackPage({ release });
    }, [release]);
    return <Layout {...props} />;
  }
  return withReleaseInfo(PageTrackingHOC);
};

/**
 * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
 * @param {string} name
 * @param {object} properties
 */
export const trackEvent = (name, { release, ...properties }) => {
  info(`[analytics:${release}]`, name, properties);
  analytics().track(name, { release, ...properties });
  return true;
};

/**
 * Analytics Event Keys
 */
trackEvent.EVENT__CONVERSION__CTA__CLICK = 'conversion:cta:click';
trackEvent.EVENT__CONVERSION__INTENT = 'conversion:intent';
trackEvent.EVENT__CONVERSION__SUCCESS = 'conversion:success';
trackEvent.EVENT__CONVERSION__SCROLL_BOTTOM = 'conversion:scroll:bottom';
trackEvent.EVENT__CONVERSION__NAV_CLICK = 'conversion:navigation:click';
trackEvent.EVENT__CONVERSION__NAV_OPEN = 'conversion:navigation:open';

/**
 * Expose Track Event to Theme Javascript
 */
LandingPage.track = (event, data) => {
  trackEvent(event, { ...data, release: LandingPage.release });
};
