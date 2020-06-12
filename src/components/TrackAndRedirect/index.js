import { Redirect } from '@reach/router';
import { trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import React from 'react';

const TrackAndRedirect = ({ release, to }) => {
  const [shouldRedirect, setShouldRedirect] = React.useState(false);

  React.useEffect(() => {
    if (!shouldRedirect) {
      trackEvent(trackEvent.EVENT__CONVERSION__REDIRECT, {
        release,
        url: to,
      });
      setTimeout(() => setShouldRedirect(true), 100);
    }
  }, [release, shouldRedirect, to]);
  return shouldRedirect ? <Redirect to={to} noThrow /> : null;
};

export default withReleaseInfo(TrackAndRedirect);
