import cx from 'classnames';
import { randomColor } from 'common/lib/random';
import React from 'react';
import styles from '../../styles.module.scss';
import Cursor from './Cursor';
import DrawingControls from './DrawingControls';

const SIZE_INCREMENT = 10;
const MIN_SIZE = 10;
const MAX_SIZE = 40;

/**
 * Drawing SVG Surface
 * @link Inspired By: https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
 * @link Stamps example: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed
 */
const DrawingLayer = React.forwardRef(
  ({ className, reset = false, pathProps }, ref) => {
    const [lines, setLines] = React.useState([]);
    const [isDrawing, setIsDrawing] = React.useState(false);
    const [hideCursor, setHideCursor] = React.useState(false);
    const [color, setColor] = React.useState(randomColor());
    const [size, setSize] = React.useState(MIN_SIZE);
    const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });
    const drawRef = React.useRef();

    React.useEffect(() => {
      document.addEventListener('mouseup', handleMouseUp);
      return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    React.useEffect(() => {
      reset && setLines([]);
    }, [reset]);

    const incrementSize = () =>
      size < MAX_SIZE && setSize(size + SIZE_INCREMENT);
    const decrementSize = () =>
      size > MIN_SIZE && setSize(size - SIZE_INCREMENT);

    function handleMouseDown(mouseEvent) {
      if (mouseEvent.button !== 0) {
        return;
      }

      const point = relativeCoordinatesForEvent(mouseEvent);

      setIsDrawing(true);
      setLines([
        ...lines,
        {
          style: {
            color,
            size,
          },
          points: [point],
        },
      ]);
    }

    function handleMouseMove(mouseEvent) {
      setCoordinates({
        x: mouseEvent.nativeEvent.offsetX,
        y: mouseEvent.nativeEvent.offsetY,
      });

      if (!isDrawing) {
        return;
      }

      const point = relativeCoordinatesForEvent(mouseEvent);
      const line = lines.pop();
      line.points.push(point);

      setLines([...lines, line]);
    }

    function handleMouseUp() {
      setIsDrawing(false);
      setColor(randomColor());
    }

    function relativeCoordinatesForEvent(mouseEvent) {
      const boundingRect = drawRef.current.getBoundingClientRect();
      return {
        x: mouseEvent.clientX - boundingRect.left,
        y: mouseEvent.clientY - boundingRect.top,
      };
    }

    return (
      <>
        <div
          ref={drawRef}
          className={cx(className, styles.DrawingLayer)}
          // onTouchStart={handleMouseDown}
          // onTouchMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
        >
          <svg
            ref={ref}
            className={styles.Drawing}
            xmlns="http://www.w3.org/2000/svg"
          >
            {lines.map((line, index) => (
              <DrawingLine {...pathProps} key={index} line={line} />
            ))}
          </svg>
        </div>
        <Cursor {...coordinates} color={color} size={size} hide={hideCursor} />
        <DrawingControls
          onSmaller={decrementSize}
          onBigger={incrementSize}
          onMouseEnterControls={() => setHideCursor(true)}
          onMouseLeaveControls={() => setHideCursor(false)}
        />
      </>
    );
  }
);

function DrawingLine({
  fill = 'none',
  strokeLinejoin = 'round',
  strokeLinecap = 'round',
  line = [],
}) {
  const pathData =
    'M ' +
    line.points
      .map((point) => {
        return `${point.x} ${point.y}`;
      })
      .join(' L ');

  return (
    <path
      fill={fill}
      strokeWidth={`${line.style.size}px`}
      stroke={line.style.color}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      className={styles.DrawPath}
      d={pathData}
    />
  );
}

export default DrawingLayer;
