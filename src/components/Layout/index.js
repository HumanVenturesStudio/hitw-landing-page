import React from 'react';
import cx from 'classnames';

import { withPageTracking } from 'common/lib/analytics';
import Nav from 'components/Nav';
import Logo from 'components/Logo';
import styles from './styles.module.scss';

const Layout = ({ children }) => (
  <div className={cx('layout', styles.Layout)}>
    <Logo className={styles.Logo} />
    <Nav />
    {children}
  </div>
);

export default withPageTracking(Layout);
