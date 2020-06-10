import cx from 'classnames';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import React from 'react';
import Preview from './components/Preview';
import Workspace from './components/Workspace';
import styles from './styles.module.scss';

const Easel = ({ release, captureOptions }) => {
  const [showPreview, setShowPreview] = React.useState(true);

  return (
    <div className={cx('easel', styles.Easel)}>
      {showPreview ? (
        <Preview onClick={() => setShowPreview(false)} />
      ) : (
        <Workspace />
      )}
    </div>
  );
};

export default withReleaseInfo(Easel);
