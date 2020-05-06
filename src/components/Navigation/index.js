import React from 'react';
import cx from 'classnames';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

import { trackEvent } from 'common/lib/analytics';
import { isExternalUrl } from 'common/lib/expressions';
import { Mobile, Desktop } from 'common/lib/responsive';
import withReleaseInfo from 'common/lib/withReleaseInfo';

import Glass from 'components/Glass';

import styles from './styles.module.scss';

const ExternalLink = ({ children, to, ...props }) => (
  <a href={to} target={`_external_${to}`} {...props}>
    {children}
  </a>
);

const NavLink = ({ release, onClick = null, ...props }) => {
  // Note:  Internal links use Gatsby <Link˘
  //        External links use vanilla <a>
  const Component = isExternalUrl(props.to) ? ExternalLink : Link;
  return (
    <Component
      {...props}
      className={cx('nav-link', styles.NavLink)}
      activeClassName={styles.NavLinkCurrent}
      onClick={() => {
        // Track Navigation Click
        trackEvent(trackEvent.EVENT__CONVERSION__NAV_CLICK, {
          release,
        });
        // Callback
        onClick && onClick();
      }}
    />
  );
};

const NavMenuToggle = ({ onClick, title = 'Open' }) => (
  <a
    className={cx('nav-menu-toggle', styles.NavMenuToggle)}
    href="#navigate"
    title={title}
    onClick={onClick}
  >
    <svg
      className={cx('nav-menu-toggle-icon', styles.NavMenuToggleIcon)}
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

const MobileNav = ({ links, release }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hasOpened, setHasOpened] = React.useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Glass isActive={isOpen} onClick={closeMenu} />
      <NavMenuToggle
        onClick={() => {
          if (!hasOpened) {
            setHasOpened(true);
            trackEvent(trackEvent.EVENT__CONVERSION__NAV_OPEN, { release });
          }
          toggleMenu();
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
            <NavLink
              key={link.url}
              to={link.url}
              onClick={() => {
                closeMenu();
              }}
              release={release}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

const DesktopNav = ({ links, release }) => {
  return (
    <div className={cx('nav-container', styles.NavContainer)}>
      <nav className={cx('navigation', styles.Nav)}>
        {links.map((link) => (
          <NavLink key={link.url} to={link.url} release={release}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const Navigation = ({ release }) => {
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
          <MobileNav links={links} release={release} />
        </Mobile>
        <Desktop>
          <DesktopNav links={links} release={release} />
        </Desktop>
      </>
    )
  );
};

export default withReleaseInfo(Navigation);
