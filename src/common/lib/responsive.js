import React from 'react';
import MediaQuery from 'react-responsive';

// Note: Keep this in sync with common/styles/variables
export const MOBILE_MAX = 767;
export const DESKTOP_MIN = 768;

export const Mobile = (props) => (
  <MediaQuery {...props} maxWidth={MOBILE_MAX} />
);

export const Desktop = (props) => (
  <MediaQuery {...props} minWidth={DESKTOP_MIN} />
);
