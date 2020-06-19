import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
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
        <Preview
          onClick={() => {
            trackEvent('easel:click:try-it', { release });
            setShowPreview(false);
          }}
        />
      ) : (
        <>
          {/* <Desktop> */}
          <Workspace release={release} />
          {/* </Desktop>
          <Mobile>
            <Workspace size={350} />
          </Mobile> */}
        </>
      )}
    </div>
  );
};

export default withReleaseInfo(Easel);
