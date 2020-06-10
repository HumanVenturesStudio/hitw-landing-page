import cx from 'classnames';
import withReleaseInfo from 'common/lib/withReleaseInfo';
import React from 'react';
import Composite from './Composite';
import CompositeLoader from './CompositeLoader';
import styles from './styles.module.scss';
import useUserMedia from './useUserMedia';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: 'user', // Front Camera
  },
};

function getCameraPermissions() {
  return navigator.permissions
    .query({ name: 'camera' })
    .then((permissionObj) => {
      return permissionObj.state;
    })
    .catch((error) => {
      console.log('[UserMedia:Error]', error);
    });
}

const Easel = ({ release, captureOptions }) => {
  const [showComposite, setShowComposite] = React.useState(false);
  const [requestMedia, setRequestMedia] = React.useState(false);

  const mediaStream = useUserMedia({ ...CAPTURE_OPTIONS, ...captureOptions });

  React.useEffect(() => {
    getCameraPermissions().then((state) => {
      if (state === 'granted' && mediaStream) {
        setShowComposite(true);
      } else if (state === 'denied' && requestMedia === true) {
        console.log('permission denied -- take additional steps');
        // TODO: Show instructions to grant permission
      } else {
        setRequestMedia(true);
      }
    });
  }, [mediaStream, requestMedia]);

  return (
    <div className={cx('easel', styles.Easel)}>
      {showComposite ? (
        <Composite mediaStream={mediaStream} />
      ) : (
        <CompositeLoader onClick={() => setRequestMedia(true)} />
      )}
    </div>
  );
};

export default withReleaseInfo(Easel);
