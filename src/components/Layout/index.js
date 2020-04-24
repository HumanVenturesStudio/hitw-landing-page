import React from 'react';
import cx from 'classnames';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { withPageTracking, trackEvent } from 'common/lib/analytics';
import SEO from 'components/SEO';
import styles from './styles.module.scss';

const SCROLL_THROTTLE = 500;

/**
 * @param {float} offset Pixels scroll on the page
 * @param {float} max Total pixels that can be scrolled
 * @returns {integer} percentage of page scrolled
 */
const calculateScrollPercentage = (offset, max) => {
  return Math.abs(Math.round((offset * 100) / max));
};

const Layout = ({ children }) => {
  const [maxScroll, setMaxScroll] = React.useState(0);
  const bodyRect = document.body.getClientRects()[0];
  const endScroll = bodyRect.height - window.innerHeight;
  const prevOffsetRef = React.useRef();

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const prev = prevPos.y;
      const curr = currPos.y;
      prevOffsetRef.current = prev;
      setMaxScroll(
        calculateScrollPercentage(prev < curr ? curr : prev, endScroll)
      );
    },
    [endScroll],
    null,
    false,
    SCROLL_THROTTLE
  );

  React.useEffect(() => {
    if (maxScroll >= prevOffsetRef.current) {
      trackEvent(trackEvent.EVENT__CONVERSION__PAGE__SCROLL, {
        maxScroll,
      });
    }
  }, [maxScroll]);

  return (
    <>
      <SEO />
      <div className={cx('layout', styles.Layout)}>{children}</div>
    </>
  );
};

export default withPageTracking(Layout);
