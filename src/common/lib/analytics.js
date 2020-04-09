import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { info, warn } from 'common/lib/log';

const FN_FALLBACK = (...args) => {
  warn('[analytics]', '[NOT LOADED!!!]', ...args);
};

const analytics = (typeof window !== `undefined` && window.analytics) || {
  page: FN_FALLBACK,
  event: FN_FALLBACK,
};

/**
 * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page
 * @param {object} properties
 */
export const trackPage = (properties) => {
  info('[analytics]', '[page]', properties);
  analytics.page(properties);
  return true;
};

/**
 * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
 * @param {string} name
 * @param {object} properties
 */
export const trackEvent = (name, properties = {}) => {
  info('[analytics]', '[event]', name, properties);
  analytics.track(name, properties /*, [options], [callback] */);
  return true;
};
/**
 * Analytics Event Keys
 */
trackEvent.EVENT__CLICK_CTA = 'click:cta';

export const withPageTracking = (Layout) => {
  function PageTrackingHOC(props) {
    const data = useStaticQuery(graphql`
      query {
        gitBranch(current: { eq: true }) {
          id
          name
          commit
        }
      }
    `);

    React.useEffect(() => {
      trackPage(data.gitBranch);
    }, [data]);

    return <Layout {...props} />;
  }

  return PageTrackingHOC;
};
