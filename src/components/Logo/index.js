import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

export default ({ className }) => {
  const { defaultTitle } = useStaticQuery(graphql`
    query {
      site {
        ...SiteInfo
      }
    }
  `).site.siteMetadata;

  return (
    <img
      alt={defaultTitle || 'Logo'}
      className={cx('logo', styles.Logo, className)}
      src="/images/logo.svg"
    />
  );
};
