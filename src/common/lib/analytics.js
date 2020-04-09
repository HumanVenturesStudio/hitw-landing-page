import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { info, warn } from 'common/lib/log';

const FN_FALLBACK = (...args) => {
  warn('[analytics]', '[NOT LOADED!!!]', ...args);
};

const analytics = (typeof window !== `undefined` && window.analytics) || {
  page: FN_FALLBACK,
  event: FN_FALLBACK,
};

export const trackPageView = (data) => {
  info('[analytics]', '[page]', data);
  analytics.page({
    dimension1: data.gitBranch.commit,
    ...data.gitBranch,
  });
  return true;
};

export const trackEvent = ({ name, data }) => {
  info('[analytics]', '[event]', name, data);
  analytics.event(name, data);
  return true;
};

export const withPageTracking = (Layout) => {
  function PageTrackingHOC(props) {
    return (
      <StaticQuery
        query={graphql`
          query {
            gitBranch(current: { eq: true }) {
              id
              name
              commit
            }
          }
        `}
        render={(data) => trackPageView(data) && <Layout {...props} />}
      />
    );
  }

  return PageTrackingHOC;
};
