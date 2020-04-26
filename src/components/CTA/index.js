import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { trackEvent } from 'common/lib/analytics';
import { isInlineUrl } from 'common/lib/expressions';

import styles from './styles.module.scss';

const CTA = ({ url = '#submit', label, onClick, children, className }) => {
  const data = useStaticQuery(graphql`
    query {
      gitBranch(current: { eq: true }) {
        ...GitInfo
      }
    }
  `);

  return (
    <a
      className={cx('call-to-action', styles.CTA)}
      href={url}
      onClick={(e) => {
        // Track CTA Click
        trackEvent(trackEvent.EVENT__CONVERSION__CTA__CLICK, data.gitBranch);
        // Handle Callback
        onClick && onClick();
        // Support for inline anchors
        if (isInlineUrl(url)) {
          e.preventDefault();
          return false;
        }
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

export default CTA;
