import React from 'react';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';

import { trackEvent } from 'common/lib/analytics';
import { WIN, BODY } from 'common/lib/global';

const SCROLL_THROTTLE = 250;
const SCROLL_BOTTOM_THRESHOLD = 60;

/**
 * @param {float} offset Pixels scroll on the page
 * @param {float} max Total pixels that can be scrolled
 * @returns {integer} percentage of page scrolled
 */
const calculateScrollPercentage = (offset, max) => {
  return Math.abs(Math.round((offset * 100) / max));
};

export default function useScrollTracking({ release }) {
  const [maxScroll, setMaxScroll] = React.useState(0);
  const [prevMaxScroll, setPrevMaxScroll] = React.useState(0);
  const [tracked, setTracked] = React.useState(false);
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
      if (!tracked && maxScroll > SCROLL_BOTTOM_THRESHOLD) {
        setTracked(true);
        setPrevMaxScroll(maxScroll);
        trackEvent(trackEvent.EVENT__CONVERSION__SCROLL_BOTTOM, {
          release,
        });
      }
    }
  }, [bodyRect, endScroll, maxScroll, prevMaxScroll, release, tracked]);
}
