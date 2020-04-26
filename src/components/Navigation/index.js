import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

import { isExternalUrl } from 'common/lib/expressions';
import { Mobile, Desktop } from 'common/lib/responsive';
import Glass from 'components/Glass';
import styles from './styles.module.scss';

const NavAnchor = ({ children, to, ...props }) => (
  <a href={to} target={`_external_${to}`} {...props}>
    {children}
  </a>
);

const NavLink = (props) => {
  // Note:  Internal links use Gatsby <Link˘
  //        External links use vanilla <a>
  const Component = isExternalUrl(props.to) ? NavAnchor : Link;
  return (
    <Component
      {...props}
      className={cx('link', styles.NavLink)}
      activeClassName={styles.NavLinkCurrent}
    />
  );
};

const NavMenuToggle = ({ onClick, title = 'Open' }) => (
  <a
    class={cx('nav-menu-toggle', styles.NavMenuToggle)}
    href="#navigate"
    title={title}
    onClick={onClick}
  >
    <svg
      class={cx('nav-menu-toggle-icon', styles.NavMenuToggleIcon)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 35 23"
      height="23"
      width="35"
    >
      <rect width="35" height="3" fill="#fff" rx="1.5" />
      <rect width="35" height="3" y="10" fill="#fff" rx="1.5" />
      <rect width="35" height="3" y="20" fill="#fff" rx="1.5" />
    </svg>
  </a>
);

const MobileNav = ({ links }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <Glass
        isActive={isOpen}
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <NavMenuToggle
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <div
        className={cx(
          {
            [styles.NavContainerActive]: isOpen,
          },
          styles.NavContainer,
          'nav-container'
        )}
      >
        <nav className={cx('navigation', styles.Nav)}>
          {links.map((link) => (
            <NavLink key={link.url} to={link.url}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

const DesktopNav = ({ links }) => {
  return (
    <div className={cx('nav-container', styles.NavContainer)}>
      <nav className={cx('navigation', styles.Nav)}>
        {links.map((link) => (
          <NavLink key={link.url} to={link.url}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const Navigation = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Navigation" } }) {
        ...NavigationContent
      }
    }
  `);

  const { frontmatter } = data.markdownRemark;
  const { hide, links } = frontmatter;
  const showNav = !hide && !!links.length;

  return (
    showNav && (
      <>
        <Mobile>
          <MobileNav links={links} />
        </Mobile>
        <Desktop>
          <DesktopNav links={links} />
        </Desktop>
      </>
    )
  );
};

export default Navigation;
