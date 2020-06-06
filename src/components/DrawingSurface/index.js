import cx from 'classnames';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import React from 'react';
import styles from './styles.module.scss';
import Video from './Video';

const Easel = ({ release }) => {
  return (
    <div className={cx('easel', styles.Easel)}>
      <Video />
    </div>
  );
};

export default withReleaseInfo(Easel);
