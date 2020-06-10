import cx from 'classnames';
import React from 'react';
import styles from '../../styles.module.scss';

export default function ShuffleButton({ onClick }) {
  return (
    <svg
      onClick={onClick}
      className={cx(styles.WorkspaceShuffleButton)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 62 62"
    >
      <title>🔀 Switch It Up!</title>
      <rect width="62" height="62" fill="#FFC3EE" rx="31" />
      <path
        fill="#A77DFF"
        fillRule="evenodd"
        d="M41.791 15.334a1.138 1.138 0 011.612 0l5.692 5.692a1.138 1.138 0 010 1.612l-5.692 5.692a1.14 1.14 0 01-1.611-1.612l4.888-4.886-4.889-4.886a1.138 1.138 0 010-1.612zm0 18.214a1.138 1.138 0 011.612 0l5.692 5.692a1.138 1.138 0 010 1.612l-5.692 5.692a1.14 1.14 0 01-1.611-1.612l4.888-4.886-4.889-4.886a1.138 1.138 0 010-1.612z"
        clipRule="evenodd"
      />
      <path
        fill="#A77DFF"
        fillRule="evenodd"
        d="M13 21.832a1.138 1.138 0 011.138-1.138h4.554c6.95 0 10.39 5.14 13.332 9.621l.182.28c1.448 2.209 2.787 4.246 4.4 5.78 1.634 1.554 3.5 2.533 5.991 2.533h4.554a1.138 1.138 0 110 2.276h-4.554c-3.2 0-5.603-1.297-7.56-3.16-1.81-1.719-3.281-3.966-4.68-6.1l-.238-.361c-3.035-4.626-5.856-8.592-11.427-8.592h-4.554A1.139 1.139 0 0113 21.832z"
        clipRule="evenodd"
      />
      <path
        fill="#A77DFF"
        fillRule="evenodd"
        d="M13 40.046a1.138 1.138 0 001.138 1.138h4.554c6.95 0 10.39-5.14 13.332-9.621l.182-.28c1.448-2.209 2.787-4.246 4.4-5.78 1.634-1.553 3.5-2.532 5.991-2.532h4.554a1.138 1.138 0 000-2.277h-4.554c-3.2 0-5.603 1.298-7.56 3.16-1.81 1.719-3.281 3.966-4.68 6.1l-.238.361c-3.035 4.627-5.856 8.593-11.427 8.593h-4.554A1.138 1.138 0 0013 40.046z"
        clipRule="evenodd"
      />
    </svg>
  );
}
