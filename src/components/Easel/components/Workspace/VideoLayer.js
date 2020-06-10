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

function getCameraPermissions(callback) {
  return (
    NAVIGATOR &&
    NAVIGATOR.permissions
      .query({ name: 'camera' })
      .then(callback)
      .catch((error) => {
        console.log('[UserMedia:Error]', error);
      })
  );
}

const VideoLayer = React.forwardRef(
  ({ className, captureOptions = CAPTURE_OPTIONS }, ref) => {
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
        console.log('[UserMedia]', 'State', state);
        if (state === 'granted' && mediaStream) {
          // We have camera access
        } else if (state === 'denied' && requestedMedia === true) {
          console.log('permission denied -- take additional steps');
          // We have been denied camera acess
          // TODO: Show instructions to grant permission
        } else {
          // We have not yet requested camera access
          setRequestedMedia(true);
        }
      });
    }, [mediaStream, requestedMedia]);

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
