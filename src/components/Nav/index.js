import React from 'react';
import cx from 'classnames';
import { Link, useStaticQuery, graphql } from 'gatsby';

import styles from './styles.module.scss';

const NavLink = (props) => (
  <Link
    {...props}
    className={cx('link', styles.NavLink)}
    activeClassName={styles.NavLinkActive}
  />
);

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query NavQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `);
  const links = data.site.siteMetadata.menuLinks;
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
