import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';

import styles from './styles.module.scss';

const NavLink = (props) => (
  <Link
    {...props}
    className={cx('link', styles.NavLink)}
    activeClassName={styles.NavLinkCurrent}
  />
);

const Nav = ({ links }) => {
  return (
    !!links.length && (
      <nav className={cx('navigation', styles.Nav)}>
        {links.map((link) => (
          <NavLink key={link.link} to={link.link}>
            {link.name}
          </NavLink>
        ))}
      </nav>
    )
  );
};

export default Nav;
