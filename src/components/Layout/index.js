import React from 'react';
import cx from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { withPageTracking, trackEvent } from 'common/lib/analytics';
import { WIN, BODY } from 'common/lib/global';
import withReleaseInfo from 'common/lib/withReleaseInfo';

import SEO from 'components/SEO';

import styles from './styles.module.scss';
import '../../../config/fonts-local.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/theme.css'; // Import Config CSS to ensure build as CSS (not SCSS)
import '../../../config/styles.css'; // Import Config CSS to ensure build as CSS (not SCSS)

const SCROLL_THROTTLE = 250;

/**
 * @param {float} offset Pixels scroll on the page
 * @param {float} max Total pixels that can be scrolled
 * @returns {integer} percentage of page scrolled
 */
const calculateScrollPercentage = (offset, max) => {
  return Math.abs(Math.round((offset * 100) / max));
};

const Layout = ({ release, children }) => {
  const [maxScroll, setMaxScroll] = React.useState(0);
  const [prevMaxScroll, setPrevMaxScroll] = React.useState(0);
  const bodyRect = (BODY && BODY.getClientRects()[0]) || false;
  const endScroll = BODY && bodyRect.height - WIN.innerHeight;

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (bodyRect && endScroll) {
        const prev = prevPos.y;
        const curr = currPos.y;
        setMaxScroll(
          calculateScrollPercentage(prev < curr ? curr : prev, endScroll)
        );
      }
    },
    [bodyRect, endScroll],
    null,
    false,
    SCROLL_THROTTLE
  );

  React.useEffect(() => {
    if (bodyRect && endScroll) {
      if (maxScroll > prevMaxScroll) {
        setPrevMaxScroll(maxScroll);
        trackEvent(trackEvent.EVENT__CONVERSION__PAGE__SCROLL, {
          maxScroll,
          release,
        });
      }
    }
  }, [bodyRect, endScroll, maxScroll, prevMaxScroll, release]);

  return (
    <>
      <SEO />
      <div className={cx('layout', styles.Layout)}>{children}</div>
    </>
  );
};

export default withPageTracking(withReleaseInfo(Layout));
