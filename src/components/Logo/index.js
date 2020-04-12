import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import { useStaticQuery, graphql } from 'gatsby';

export default ({ className }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        ...SiteInfo
      }
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
      markdownRemark(frontmatter: { name: { eq: "Logo" } }) {
        ...LogoContent
      }
    }
  `);

  const { defaultTitle } = data.site.siteMetadata;
  const { frontmatter } = data.markdownRemark;

  const src = `/images/${frontmatter.asset || 'logo.svg'}`;

  return (
    <img
      alt={defaultTitle || 'Logo'}
      className={cx('logo', styles.Logo, className)}
      src={src}
    />
  );
};
