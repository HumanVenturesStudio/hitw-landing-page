import React from 'react';
import cx from 'classnames';

import { withPageTracking } from 'common/lib/analytics';
import Logo from 'components/Logo';
import Nav from 'components/Nav';
import SEO from 'components/SEO';
import styles from './styles.module.scss';

const Layout = ({ children }) => (
  <>
    <SEO />
    <div className={cx('layout', styles.Layout)}>
      <Logo className={styles.Logo} />
      <Nav />
      {children}
    </div>
  </>
);

export default withPageTracking(Layout);
