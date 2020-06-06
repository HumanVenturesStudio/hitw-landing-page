import React, { useState, useRef } from 'react';
import Measure from 'react-measure';
import useUserMedia from './useUserMedia';
import useRatio from './useRatio';
import useOffsets from './useOffsets';
import cx from 'classnames';
import styles from './styles.module.scss';
import Draw from './Draw';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

const FILE_FORMAT = 'image/png';
const FILE_NAME = 'your-easel-artwork.png';

const NOOP = () => {};

function handleDownload(fileContents, fileName = FILE_NAME) {
  var link = document.createElement('a');
  link.download = fileName;
  link.href = fileContents;
  link.click();
}

/**
 * @link Responsive Video: https://blog.logrocket.com/responsive-camera-component-react-hooks/
 */
export default function Video({
  onCapture = handleDownload,
  onClear = NOOP,
  captureOptions = CAPTURE_OPTIONS,
  videoRatio = 1920 / 1080,
}) {
  const [container, setContainer] = useState({
    width: 0,
    height: 0,
  });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  const canvasRef = useRef();
  const videoRef = useRef();
  const drawRef = useRef();

  const mediaStream = useUserMedia(captureOptions);
  const [aspectRatio, calculateRatio] = useRatio(videoRatio);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleResize(contentRect) {
    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio),
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  function handleCapture() {
    const context = canvasRef.current.getContext('2d');
    const drawArgs = [
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      0,
      0,
      container.width,
      container.height,
    ];

    context.drawImage(videoRef.current, ...drawArgs);

    // Convert SVG to Image
    const img = new Image();
    img.onload = function() {
      context.drawImage(img, ...drawArgs);

      // Download It
      const imageData = canvasRef.current
        .toDataURL(FILE_FORMAT)
        .replace(FILE_FORMAT, 'image/octet-stream');

      setTimeout(() => onCapture(imageData), 500);
    };
    img.src = `data:image/svg+xml;utf8,${drawRef.current.outerHTML}`;

    document.body.appendChild(img);
    img.remove();

    // canvasRef.current.toBlob((blob) => onCapture(blob), 'image/jpeg', 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  }

  function handleClear() {
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    onClear();
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div className={styles.Wrapper}>
          <div
            className={styles.Container}
            ref={measureRef}
            style={
              {
                // height: `${container.height}px`,
                // maxWidth: videoRef.current
                //   ? `${videoRef.current.videoHeight}px`
                //   : 'none',
                // maxHeight: videoRef.current
                //   ? `${videoRef.current.videoWidth}px`
                //   : 'none',
              }
            }
          >
            <video
              className={styles.Video}
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
            />
            <div className={styles.Overlay} hidden={!isVideoPlaying} />
            <Draw ref={drawRef} className={styles.DrawOverVideo} />
            <canvas
              className={styles.Canvas}
              ref={canvasRef}
              width={container.width}
              height={container.height}
            />
            <div
              className={cx(styles.Flash, {
                [styles.FlashOn]: isFlashing,
              })}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </div>

          {isVideoPlaying && (
            <button
              className={styles.Button}
              onClick={isCanvasEmpty ? handleCapture : handleClear}
            >
              {isCanvasEmpty ? 'Take a picture' : 'Take another picture'}
            </button>
          )}
        </div>
      )}
    </Measure>
  );
}
