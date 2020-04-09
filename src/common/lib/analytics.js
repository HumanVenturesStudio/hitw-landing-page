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
    const data = useStaticQuery(graphql`
      query BranchQuery {
        gitBranch(current: { eq: true }) {
          id
          name
          commit
        }
      }
    `);

    React.useEffect(() => {
      trackPageView(data);
    }, [data]);

    return <Layout {...props} />;
  }

  return PageTrackingHOC;
};
