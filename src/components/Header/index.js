import React from 'react';
import cx from 'classnames';

import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import styles from './styles.module.scss';
import { graphql, useStaticQuery } from 'gatsby';

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Header" } }) {
        ...HeaderContent
      }
    }
  `);

  const { frontmatter } = data.markdownRemark;
  const { hide } = frontmatter;

  if (hide) {
    return null;
  }

  return (
    <header className={cx('header', styles.Header)}>
      <h1 className={cx('header-h1', styles.HeaderH1)}>
        <a href="/">
          <Logo />
        </a>
      </h1>
      <Navigation />
    </header>
  );
};

export default Header;
