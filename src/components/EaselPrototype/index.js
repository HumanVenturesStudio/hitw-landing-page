import React from 'react';
import content from './images/easel-content.gif';
import object from './images/easel-object.png';
import styles from './styles.module.scss';

export default function EaselPrototype() {
  return (
    <div
      className={styles.EaselPrototype}
      style={{ backgroundImage: `url(${object})` }}
    >
      <img alt="Easel Content" src={content} />
      <img alt="Easel Prototype" src={object} />
    </div>
  );
}
