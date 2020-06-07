import cx from 'classnames';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import React from 'react';
import styles from './styles.module.scss';
import Composite from './Composite';

const Easel = ({ release }) => {
  return (
    <div className={cx('easel', styles.Easel)}>
      <Composite />
    </div>
  );
};

export default withReleaseInfo(Easel);
