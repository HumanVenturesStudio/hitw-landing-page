import React from 'react';
import cx from 'classnames';

import { withPageTracking } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import useScrollTracking from 'common/lib/useScrollTracking';

import SEO from 'components/SEO';

import styles from './styles.module.scss';
import '../../../config/fonts-local.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/theme.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/styles.css'; // Import Config CSS to ensure build as CSS (not SCSS)

const Layout = ({ release, children }) => {
  useScrollTracking({ release });
  return (
    <>
      <SEO />
      <div className={cx('layout', styles.Layout)}>{children}</div>
    </>
  );
};

export default withPageTracking(withReleaseInfo(Layout));
