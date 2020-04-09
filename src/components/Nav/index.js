import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';

import styles from './styles.module.scss';

const NavLink = (props) => (
  <Link
    {...props}
    className={cx('link', styles.NavLink)}
    activeClassName={styles.NavLinkActive}
  />
);

export default ({ children }) => (
  <nav className={cx('navigation', styles.Nav)}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
  </nav>
);
