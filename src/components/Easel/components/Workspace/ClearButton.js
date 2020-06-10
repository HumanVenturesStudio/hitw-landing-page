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
      >
      <rect
        width="35.95"
        height="35.95"
        x="25.42"
        fill="#FF8A00"
        rx="17.975"
        transform="rotate(45 25.42 0)"
      />
      <rect
        width="21.185"
        height="2.395"
        x="18.777"
        y="17.084"
        fill="#FFC3EE"
        rx="1.197"
        transform="rotate(45 18.777 17.084)"
      />
      <rect
        width="21.185"
        height="2.395"
        x="33.757"
        y="18.777"
        fill="#FFC3EE"
        rx="1.197"
        transform="rotate(135 33.757 18.777)"
      />
    </svg>
  );
}
