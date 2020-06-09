import { trackEvent } from 'common/lib/analytics';
import React from 'react';

function handleClickOutside({ event, release }) {
  const el = event.target;
  el.nodeName === 'A' &&
    trackEvent(trackEvent.EVENT__CONVERSION__LINK_CLICK, {
      release,
      url: el.href,
    });
}

export default function useLinkTracking({ release }) {
  React.useEffect(() => {
    const clickHandler = (event) =>
      handleClickOutside({
        event,
        release,
      });

    document.addEventListener('click', clickHandler, false);
    return () => document.removeEventListener('click', clickHandler, false);
  }, [release]);
}
