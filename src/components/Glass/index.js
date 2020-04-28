import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { KEYCODE_ESC } from 'common/lib/data';
import styles from './styles.module.scss';

export default function Glass({ onClick, isActive, title = 'Close' }) {
  // Open / Close Effects
  useEffect(() => {
    // ESC Event Handler
    const onEscape = (event) => {
      event.keyCode === KEYCODE_ESC && isActive && onClick();
    };
    // Open Render
    if (isActive === true) {
      // Listen for ESC
      document.addEventListener('keydown', onEscape);
    }
    // Close Render
    return function cleanUp() {
      // Stop Listen for ESC
      document.removeEventListener('keydown', onEscape);
    };
  }, [isActive, onClick]);

  return (
    <div
      className={cx('glass', styles.Glass, {
        [styles.show]: isActive,
        [styles.hide]: !isActive,
      })}
      onClick={onClick}
      title={isActive ? title : null}
    ></div>
  );
}

Glass.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
