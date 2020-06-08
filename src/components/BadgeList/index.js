import { parseEntities } from 'common/lib/strings';
import React from 'react';
import styles from './styles.module.scss';

export default function BadgeList({ badges }) {
  return (
    <ul className={styles.BadgeList}>
      {badges.map((badge) => (
        <li id={badge.id} key={badge.id} className={styles.Badge}>
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
