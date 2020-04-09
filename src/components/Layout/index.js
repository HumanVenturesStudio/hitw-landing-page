import React from 'react';
import cx from 'classnames';

import { withPageTracking } from 'common/lib/analytics';
import Nav from 'components/Nav';
import SEO from 'components/SEO';
import styles from './styles.module.scss';

const Layout = ({ children }) => (
  <>
    <SEO />
    <div className={cx('layout', styles.Layout)}>
      <Nav />
      {children}
    </div>
  </>
);

export default withPageTracking(Layout);
