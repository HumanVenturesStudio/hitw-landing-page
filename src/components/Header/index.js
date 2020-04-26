import React from 'react';
import cx from 'classnames';

import Navigation from 'components/Navigation';
import Logo from 'components/Logo';
import styles from './styles.module.scss';

const Header = () => {
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
