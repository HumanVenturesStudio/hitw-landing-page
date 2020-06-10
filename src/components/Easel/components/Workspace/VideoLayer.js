import { NAVIGATOR } from 'common/lib/global';
import React from 'react';
import styles from '../../styles.module.scss';
import useUserMedia from '../../useUserMedia';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: 'user', // Front Camera
  },
};

/**
 * Note: Safari doesn't support navigator.permissions
 * @param {function} callback
 */
function getCameraPermissions(callback) {
  return (
    NAVIGATOR &&
    NAVIGATOR.permissions &&
    NAVIGATOR.permissions
      .query({ name: 'camera' })
      .then(callback)
      .catch((error) => {
        console.log('[UserMedia:Error]', error);
      })
  );
}

const VideoLayer = React.forwardRef(
  (
    {
      className,
      captureOptions = CAPTURE_OPTIONS,
      handleIsEnabled,
      handleIsDisabled,
    },
    ref
  ) => {
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const [requestedMedia, setRequestedMedia] = React.useState(false);

    const mediaStream = useUserMedia(captureOptions);

    React.useEffect(() => {
      const video = ref.current;
      if (video) {
        video.srcObject = mediaStream;
      }
    }, [mediaStream, ref]);

    React.useEffect(() => {
      getCameraPermissions(({ state }) => {
        if (state === 'granted' && mediaStream) {
          // We have camera access
          handleIsEnabled();
        } else if (state === 'denied' && requestedMedia === true) {
          // We have been denied camera acess
          handleIsDisabled();
        } else {
          // We have not yet requested camera access
          setRequestedMedia(true);
        }
      });
    }, [handleIsDisabled, handleIsEnabled, mediaStream, requestedMedia]);

    if (!mediaStream) {
      return null;
    }

    return (
      <div className={styles.VideoLayer}>
        <video
          className={styles.Video}
          ref={ref}
          hidden={!isVideoPlaying}
          onCanPlay={() => {
            setIsVideoPlaying(true);
            ref.current.play();
          }}
          autoPlay
          playsInline
          muted
        />
      </div>
    );
  }
);

export default VideoLayer;
