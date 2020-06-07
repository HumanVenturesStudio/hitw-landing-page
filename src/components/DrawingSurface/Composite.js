import React, { useState, useRef } from 'react';
import Measure from 'react-measure';
import useUserMedia from './useUserMedia';
import cx from 'classnames';
import styles from './styles.module.scss';
import Draw from './Draw';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    // facingMode: 'user',
    // width: 500,
    // height: 500,
  },
};

const FILE_FORMAT = 'image/png';
const FILE_NAME = 'your-easel-artwork.png';

function handleDownload(fileContents, fileName = FILE_NAME) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = fileContents;
  link.click();
}

function handleCapture(video, drawing) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const orientation =
    video.videoWidth < video.videoHeight ? 'portrait' : 'landscape';
  const size =
    video.videoWidth < video.videoHeight ? video.videoWidth : video.videoHeight;

  canvas.width = size;
  canvas.height = size;

  const videoDrawArgs = [
    orientation === 'landscape' ? video.videoWidth / 2 - size / 2 : 0,
    orientation === 'portrait' ? video.videoWidth / 2 - size / 2 : 0,
    size,
    size,
    0,
    0,
    size,
    size,
  ];

  ctx.drawImage(video, ...videoDrawArgs);

  // Convert SVG to Image
  const img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0, size, size);

    // only draw image where mask is
    ctx.globalCompositeOperation = 'destination-in';

    // draw our circle mask
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
      size * 0.5, // x
      size * 0.5, // y
      size * 0.48, // radius
      0, // start angle
      2 * Math.PI // end angle
    );
    ctx.fill();

    // restore to default composite operation (is draw over current image)
    ctx.globalCompositeOperation = 'source-over';

    var gradient = ctx.createLinearGradient(0, 0, size, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');

    ctx.beginPath();
    ctx.arc(
      size * 0.5, // x
      size * 0.5, // y
      size * 0.49, // radius
      0, // start angle
      2 * Math.PI // end angle
    );
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // Download It
    const imageData = canvas
      .toDataURL(FILE_FORMAT)
      .replace(FILE_FORMAT, 'image/octet-stream');

    setTimeout(() => handleDownload(imageData), 500);
  };
  img.width = size;
  img.height = size;
  img.src = `data:image/svg+xml;utf8,${drawing.outerHTML}`;

  document.body.appendChild(img);
  // img.remove();
}

/**
 * @link Responsive Video: https://blog.logrocket.com/responsive-camera-component-react-hooks/
 */
export default function Composite({
  onCapture = handleDownload,
  captureOptions = CAPTURE_OPTIONS,
  videoRatio = 1920 / 1080,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef();
  const drawRef = useRef();

  const mediaStream = useUserMedia(captureOptions);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = mediaStream;
    }
  }, [mediaStream]);

  if (!mediaStream) {
    return null;
  }

  return (
    <>
      <div className={styles.VideoContainer}>
        <video
          className={styles.Video}
          ref={videoRef}
          hidden={!isVideoPlaying}
          onCanPlay={() => {
            setIsVideoPlaying(true);
            videoRef.current.play();
          }}
          autoPlay
          playsInline
          muted
        />
        <Draw ref={drawRef} className={styles.DrawContainer} />
      </div>

      {isVideoPlaying && (
        <button
          className={styles.Button}
          onClick={() => handleCapture(videoRef.current, drawRef.current)}
        >
          Take a picture
        </button>
      )}
    </>
  );
}
