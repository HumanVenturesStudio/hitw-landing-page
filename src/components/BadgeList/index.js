import cx from 'classnames';
import { parseEntities } from 'common/lib/strings';
import React from 'react';
import styles from './styles.module.scss';

export default function BadgeList({ badges, layout = 'three' }) {
  return (
    <ul className={styles.BadgeList}>
      {badges.map((badge) => (
        <li
          id={badge.id}
          key={badge.id}
          className={cx(styles.Badge, styles[layout])}
        >
          <i
            className={styles.BadgeIcon}
            style={{ backgroundImage: `url("${badge.icon}")` }}
          />
          <div className={styles.BadgeLabel}>{parseEntities(badge.label)}</div>
        </li>
      ))}
    </ul>
  );
}
