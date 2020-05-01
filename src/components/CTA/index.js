import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';

import styles from './styles.module.scss';

const CTA = ({
  release,
  url = '#submit',
  label,
  onClick,
  children,
  className,
}) => {
  return (
    <a
      className={cx('cta', styles.CTA)}
      href={url}
      onClick={(e) => {
        // Track CTA Click
        trackEvent(trackEvent.EVENT__CONVERSION__CTA__CLICK, {
          release,
        });
        // Handle Callback
        onClick && onClick();
      }}
    >
      {label}
    </a>
  );
};

CTA.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default withReleaseInfo(CTA);
