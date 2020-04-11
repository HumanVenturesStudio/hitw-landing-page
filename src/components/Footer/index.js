import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import cx from 'classnames';

import Nav from 'components/Nav';
import Logo from 'components/Logo';
import styles from './styles.module.scss';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterNav {
      site {
        ...NavInfo
      }
    }
  `);

  return (
    <footer className={cx('footer', styles.Footer)}>
      <h1 className={cx('footer-h1', styles.FooterH1)}>
        <Logo />
      </h1>
      <Nav links={data.site.siteMetadata.navigation.footer} />
    </footer>
  );
};

export default Footer;
