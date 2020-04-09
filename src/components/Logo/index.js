import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

export default ({ className }) => (
  <svg
    className={cx('logo', styles.Logo, className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 86 75"
  >
    <path d="M43 4.1L4.43 70.9h77.14L43 4.1zm4.57 53.44v-9.06h-9.15v9.06H34.9v-20.1h3.52v7.99h9.15v-7.99h3.52v20.1h-3.52z" />
  </svg>
);
