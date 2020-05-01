import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

/**
 * Higher order component wraps layout to track page
 * @param {Component} Layout
 */
const withReleaseInfo = (Component) => {
  function ReleaseInfoHOC(props) {
    const data = useStaticQuery(graphql`
      query {
        gitBranch(current: { eq: true }) {
          ...GitInfo
        }
      }
    `);
    return <Component release={data.gitBranch.commit} {...props} />;
  }
  return ReleaseInfoHOC;
};

export default withReleaseInfo;
