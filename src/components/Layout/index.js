import React from 'react';
import cx from 'classnames';

import Nav from 'components/Nav';
import Logo from 'components/Logo';
import styles from './styles.module.scss';

export default ({ children }) => (
  <div className={cx('layout', styles.Layout)}>
    <Logo className={styles.Logo} />
    <Nav />
    {children}
  </div>
);
