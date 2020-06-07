import React, { useState, useRef } from 'react';
import useUserMedia from './useUserMedia';
import styles from './styles.module.scss';
import Draw from './Draw';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: 'user', // Front Camera
  },
};
const FILE_FORMAT = 'image/png';
const FILE_NAME = 'your-easel-artwork.png';

/**
 * Workaround for browsers that can't set Filenames for Globs
 * Creating an anchor tag for the image triggers a downlaod with a filename
 * @param {HTMLCanvasElement.toDataURL} fileContents
 * @param {String} fileName
 */
function handleDownload(fileContents, fileName = FILE_NAME) {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = fileContents;
  link.click();

  return true;
}

function handleCapture(video, drawing) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Video orientation
  const orientation =
    video.videoWidth < video.videoHeight ? 'portrait' : 'landscape';
  // Video short side is size of square/circle
  const size =
    video.videoWidth < video.videoHeight ? video.videoWidth : video.videoHeight;

  canvas.width = size;
  canvas.height = size;

  // Draw Video into Canvas
  ctx.drawImage(
    video,
    orientation === 'landscape' ? video.videoWidth / 2 - size / 2 : 0,
    orientation === 'portrait' ? video.videoWidth / 2 - size / 2 : 0,
    size,
    size,
    0,
    0,
    size,
    size
  );

  // Draw SVG Sketch into Canvas
  const img = new Image();
  img.width = size;
  img.height = size;
  img.style.position = 'absolute';
  img.style.zIndex = '-1';
  img.style.top = '-100vh';
  img.style.left = '-100vw';
  img.onload = function() {
    ctx.drawImage(img, 0, 0, size, size);

    // Mask Canvas into Circle
    // Change Composite behavior to only draw image where mask is
    ctx.globalCompositeOperation = 'destination-in';

    // Creat Circle Mask
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

    // Restore to default composite operation (is draw over current image)
    ctx.globalCompositeOperation = 'source-over';

    // Create Border / Stroke around circle
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
    ctx.strokeStyle = gradient;
    ctx.stroke();

    // Download Image!
    setTimeout(
      () =>
        handleDownload(
          canvas
            .toDataURL(FILE_FORMAT)
            .replace(FILE_FORMAT, 'image/octet-stream')
        ),
      0
    );
  };
  img.src = `data:image/svg+xml;utf8,${drawing.outerHTML}`;

  // Append image to DOM to trigger load event
  // Some browsers weren't loading the image without this
  document.body.appendChild(img);
  setTimeout(img.remove, 0);
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
