import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

/**
 * Drawing SVG Surface
 * @link Inspired By: https://pspdfkit.com/blog/2017/how-to-build-free-hand-drawing-using-react/
 * @link Stamps example: https://codesandbox.io/s/github/konvajs/site/tree/master/react-demos/drop_image_into_stage?from-embed
 */
const Draw = React.forwardRef(({ className, pathProps }, ref) => {
  const [lines, setLines] = React.useState([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
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
    setLines([...lines, [point]]);
  }

  function handleMouseMove(mouseEvent) {
    if (!isDrawing) {
      return;
    }

    const point = relativeCoordinatesForEvent(mouseEvent);
    const line = lines.pop();
    line.push(point);

    setLines([...lines, line]);
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  function relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = drawRef.current.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top,
    };
  }

  return (
    <div
      ref={drawRef}
      className={cx(className, styles.Draw)}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <Drawing svgRef={ref} lines={lines} pathProps={pathProps} />
    </div>
  );
});

function Drawing({ svgRef, pathProps, lines = [] }) {
  return (
    <svg
      ref={svgRef}
      className={styles.Drawing}
      xmlns="http://www.w3.org/2000/svg"
    >
      {lines.map((line, index) => (
        <DrawingLine {...pathProps} key={index} line={line} />
      ))}
    </svg>
  );
}

function DrawingLine({
  fill = 'none',
  strokeWidth = '10px',
  stroke = 'red',
  strokeLinejoin = 'round',
  strokeLinecap = 'round',
  line = [],
}) {
  const pathData =
    'M ' +
    line
      .map((point) => {
        return `${point.x} ${point.y}`;
      })
      .join(' L ');

  return (
    <path
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      className={styles.DrawPath}
      d={pathData}
    />
  );
}

export default Draw;
