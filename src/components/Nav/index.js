import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';

import styles from './styles.module.scss';

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: cx('link', styles.NavLink, {
          [styles.NavLinkActive]: isCurrent,
        }),
      };
    }}
  />
);

export default ({ children }) => (
  <nav className={cx('navigation', styles.Nav)}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
  </nav>
);
