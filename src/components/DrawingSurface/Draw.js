import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { randomColor, sample } from '../../common/lib/random';
import throttle from 'lodash.throttle';
import Cursor from './Cursor';

const SIZES = ['10px', '20px', '30px', '40px'];

/**
 * Drawing SVG Surface
 * @link Inspired By: https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
 * @link Stamps example: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed
 */
const Draw = React.forwardRef(({ className, pathProps }, ref) => {
  const [lines, setLines] = React.useState([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [color, setColor] = React.useState('red');
  const [size, setSize] = React.useState('10px');
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });
  const drawRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

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

    // console.log(mouseEvent.nativeEvent);

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
    setSize(sample(SIZES));
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
        className={cx(className, styles.Draw)}
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
      <Cursor {...coordinates} color={color} />
    </>
  );
});

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
      strokeWidth={line.style.size}
      stroke={line.style.color}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      className={styles.DrawPath}
      d={pathData}
    />
  );
}

export default Draw;
