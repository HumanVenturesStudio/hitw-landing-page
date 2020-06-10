import cx from 'classnames';
import React from 'react';
import styles from '../../styles.module.scss';

export default function ClearButton({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className={cx(styles.WorkspaceClearButton)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 51 51"
    >
      <title>🗑 Start Over!</title>
      <rect
        width="50"
        height="50"
        x="50.355"
        fill="#FF8A00"
        rx="25"
        transform="rotate(90 50.355 0)"
      />
      <rect
        width="29.464"
        height="3.331"
        x="16.116"
        y="13.405"
        fill="#FFC3EE"
        rx="1.665"
        transform="rotate(45 16.116 13.405)"
      />
      <rect
        width="29.464"
        height="3.331"
        x="36.95"
        y="15.76"
        fill="#FFC3EE"
        rx="1.665"
        transform="rotate(135 36.95 15.76)"
      />
    </svg>
  );
}
