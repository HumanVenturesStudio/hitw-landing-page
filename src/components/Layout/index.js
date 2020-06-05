import React from 'react';
import cx from 'classnames';
import LandingPage from 'common/lib/landingPage';
import { withPageTracking } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import useScrollTracking from 'common/lib/useScrollTracking';
import Events from 'common/lib/events';

import SEO from 'components/SEO';

import styles from './styles.module.scss';
import '../../../config/fonts-local.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/theme.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/styles.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/scripts.js';

const Layout = ({ release, children }) => {
  useScrollTracking({ release });
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
