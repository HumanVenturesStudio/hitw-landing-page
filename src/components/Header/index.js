import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import cx from 'classnames';

import Nav from 'components/Nav';
import Logo from 'components/Logo';
import styles from './styles.module.scss';

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderNav {
      site {
        ...NavInfo
      }
    }
  `);

  return (
    <header className={cx('header', styles.Header)}>
      <h1 className={cx('header-h1', styles.HeaderH1)}>
        <Logo />
      </h1>
      <Nav links={data.site.siteMetadata.navigation.header} />
    </header>
  );
};

export default Header;
