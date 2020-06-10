import React from 'react';
import styles from '../../styles.module.scss';

export default function Preview({ onClick }) {
  return (
    <div className={styles.Preview} onClick={onClick}>
      <h2 className={styles.PreviewHeading}>
        <span>
          You
          <br />
          Are Here
        </span>
      </h2>
      <video
        className={styles.PreviewVideo}
        src="/videos/placeholder-vid.mov"
        autoPlay
        playsInline
        muted
      />
      <svg
        className={styles.PreviewButton}
        width="189"
        height="89"
        viewBox="0 0 189 89"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <rect width="189" height="89" fill="#BFA1FF" />
        <rect
          width="182"
          height="81"
          transform="matrix(1 0 0 -1 7 89)"
          fill="#E7FFA2"
        />
        <path
          d="M68.08 51.12C71.32 51.12 73.96 50.24 76 48.44C78.04 46.64 79.04 44.28 79.04 41.36C79.04 38.48 78.04 36.2 76.04 34.52C74.04 32.8 71.4 31.96 68.08 31.96H56.72V60H62.68V51.12H68.08ZM67.04 37.44C71.16 37.44 73.12 38.64 73.12 41.48C73.12 44.24 71.08 45.64 67.04 45.64H62.68V37.44H67.04ZM88.3719 60V31.96H82.6919V60H88.3719ZM99.035 60.44C101.035 60.44 102.675 59.88 103.995 58.72V60H109.635V47.76C109.635 45.32 108.835 43.44 107.195 42.04C105.555 40.64 103.515 39.92 101.035 39.92C97.715 39.92 94.995 41.2 92.835 43.8L96.435 47.24C97.435 45.72 98.835 44.96 100.635 44.96C102.675 44.96 103.915 46.28 103.915 48.16V48.48C102.635 48.12 101.315 47.92 99.995 47.92C97.795 47.92 95.955 48.48 94.475 49.56C92.995 50.64 92.235 52.2 92.235 54.24C92.235 57.88 94.875 60.44 99.035 60.44ZM97.955 53.88C97.955 52.64 99.155 51.84 101.275 51.84C102.035 51.84 102.915 51.96 103.915 52.2V54.44C102.835 55.24 101.675 55.64 100.395 55.64C98.955 55.64 97.955 54.88 97.955 53.88ZM132.866 40.4H126.786L122.226 52.52L117.826 40.4H111.506L119.146 60L115.946 67.76H121.946L132.866 40.4Z"
          fill="#BFA1FF"
        />
      </svg>
    </div>
  );
}
