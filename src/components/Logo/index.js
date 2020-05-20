import React from 'react';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import withReleaseInfo from 'common/lib/withReleaseInfo';
import styles from './styles.module.scss';

const Logo = ({ release, className }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        ...SiteInfo
      }
      markdownRemark(frontmatter: { name: { eq: "Logo" } }) {
        ...LogoContent
      }
    }
  `);

  const { defaultTitle } = data.site.siteMetadata;
  const { frontmatter } = data.markdownRemark;
  const { hide } = frontmatter;

  if (hide) {
    return null;
  }

  const src = `/${frontmatter.asset || 'logo.svg'}`;

  return (
    <img
      alt={defaultTitle || 'Logo'}
      className={cx('logo', styles.Logo, className)}
      src={src}
    />
  );
};

export default withReleaseInfo(Logo);
