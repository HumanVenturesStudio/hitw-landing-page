import cx from 'classnames';
import { withPageTracking } from 'common/lib/analytics';
import Events from 'common/lib/events';
import LandingPage from 'common/lib/landingPage';
import useScrollTracking from 'common/lib/useScrollTracking';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import SEO from 'components/SEO';
import React from 'react';
import '../../../config/fonts-local.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/scripts.js';
import '../../../config/styles.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/theme.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import useLinkTracking from '../../common/lib/useLinkTracking';
import styles from './styles.module.scss';

const Layout = ({ release, children }) => {
  useScrollTracking({ release });
  useLinkTracking({ release });
  LandingPage.release = release;
  setTimeout(() => {
    Events.emit(Events.EVENT.Ready);
  }, 0);
  return (
    <>
      <SEO />
      <div className={cx('layout', styles.Layout)}>{children}</div>
    </>
  );
};

export default withPageTracking(withReleaseInfo(Layout));
