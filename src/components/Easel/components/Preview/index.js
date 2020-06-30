import cx from 'classnames';
import { Desktop } from 'common/lib/responsive';
import React from 'react';
import styles from '../../styles.module.scss';
import YouAreHere from '../Workspace/YouAreHere';

export default function Preview({ onClick }) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const videoRef = React.useRef();
  return (
    <div className={styles.Preview}>
      <YouAreHere />
      <video
        ref={videoRef}
        className={cx(styles.PreviewVideo, {
          [styles.PreviewVideoPlaying]: isVideoPlaying,
        })}
        src="/videos/drawing.mov"
        onCanPlay={() => {
          setIsVideoPlaying(true);
          videoRef.current.play();
        }}
        autoPlay
        playsInline
        muted
        loop
      />
      <Desktop>
        <a
          className={styles.PreviewButton}
          href="#try-the-easel"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          Try The Easel
        </a>
      </Desktop>
    </div>
  );
}
