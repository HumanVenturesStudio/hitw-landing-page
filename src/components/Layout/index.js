import React from 'react';
import cx from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { withPageTracking, trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import SEO from 'components/SEO';
import styles from './styles.module.scss';

const SCROLL_THROTTLE = 500;
const WINDOW = typeof window !== `undefined` ? window : false;
const BODY = typeof document !== `undefined` ? document.body : false;

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
  const bodyRect = (BODY && BODY.getClientRects()[0]) || false;
  const endScroll = BODY && bodyRect.height - WINDOW.innerHeight;
  const prevOffsetRef = React.useRef();

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (bodyRect && endScroll) {
        const prev = prevPos.y;
        const curr = currPos.y;
        prevOffsetRef.current = prev;
        setMaxScroll(
          calculateScrollPercentage(prev < curr ? curr : prev, endScroll)
        );
      }
    },
    [endScroll],
    null,
    false,
    SCROLL_THROTTLE
  );

  React.useEffect(() => {
    if (bodyRect && endScroll) {
      if (maxScroll >= prevOffsetRef.current) {
        trackEvent(trackEvent.EVENT__CONVERSION__PAGE__SCROLL, {
          maxScroll,
          release,
        });
      }
    }
  }, [bodyRect, endScroll, maxScroll, release]);

  return (
    <>
      <SEO />
      <div className={cx('layout', styles.Layout)}>{children}</div>
    </>
  );
};

export default withPageTracking(withReleaseInfo(Layout));
