import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import cx from 'classnames';

import withReleaseInfo from 'common/lib/withReleaseInfo';

import Logo from 'components/Logo';

import styles from './styles.module.scss';

const Footer = ({ release }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Footer" } }) {
        ...FooterContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;
  const { hide } = frontmatter;

  if (hide) {
    return null;
  }

  return (
    <footer id={`${frontmatter.name}`} className={cx('footer', styles.Footer)}>
      <Logo className={cx('footer--logo', styles.Logo)} />
      <div
        className={cx('footer--content', styles.Content)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </footer>
  );
};

export default withReleaseInfo(Footer);
