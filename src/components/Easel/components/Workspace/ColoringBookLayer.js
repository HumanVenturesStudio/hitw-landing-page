import cx from 'classnames';
import React from 'react';
import styles from '../../styles.module.scss';

const ColoringBookLayer = ({ className }) => {
  return (
    <div className={cx(className, styles.ColoringBookLayer)}>You Are Here</div>
  );
};

export default ColoringBookLayer;
