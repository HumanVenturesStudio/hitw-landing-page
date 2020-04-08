import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';
import Nav from '../Nav';

export default ({ children }) => (
  <div className={cx('layout', styles.Layout)}>
    <h1>Website</h1>
    <Nav />
    {children}
  </div>
);
