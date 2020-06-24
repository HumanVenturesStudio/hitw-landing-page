import cx from 'classnames';
import React from 'react';
import styles from '../../styles.module.scss';

const PaletteDot = ({ color = 'white', onClick }) => (
  <svg
    onClick={() => onClick(color)}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="19" fill={color} stroke="#000" strokeWidth="2" />
  </svg>
);

export default function DrawingControls({
  onBigger,
  onSmaller,
  onMouseEnterControls,
  onMouseLeaveControls,
  onChooseColor,
  showPalette = true,
}) {
  return (
    <>
      <svg
        onClick={onSmaller}
        onMouseEnter={onMouseEnterControls}
        onMouseLeave={onMouseLeaveControls}
        className={cx(styles.DrawingControl, styles.DrawingControlSmaller)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 112 112"
      >
        <title>🖍 Go Go Tiny Crayon!</title>
        <rect width="112" height="112" fill="#7EEEA4" rx="56" />
        <rect
          width="66"
          height="7.461"
          x="23"
          y="52.27"
          fill="#FF8A00"
          rx="3.73"
        />
      </svg>
      <svg
        onClick={onBigger}
        onMouseEnter={onMouseEnterControls}
        onMouseLeave={onMouseLeaveControls}
        className={cx(styles.DrawingControl, styles.DrawingControlBigger)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 112 112"
      >
        <title>🖍 Pow! Bigger Crayon.</title>
        <rect width="112" height="112" fill="#E7FFA1" rx="56" />
        <rect
          width="66"
          height="7.461"
          x="23"
          y="52.27"
          fill="#FFC3EE"
          rx="3.73"
        />
        <rect
          width="66"
          height="7.461"
          x="59.73"
          y="23"
          fill="#FFC3EE"
          rx="3.73"
          transform="rotate(90 59.73 23)"
        />
      </svg>
      {showPalette && (
        <div className={styles.DrawingPalette}>
          <PaletteDot color={'#DF1C1C'} onClick={onChooseColor} />
          <PaletteDot color={'#FF9223'} onClick={onChooseColor} />
          <PaletteDot color={'#E2F004'} onClick={onChooseColor} />
          <PaletteDot color={'#08EA0C'} onClick={onChooseColor} />
          <PaletteDot color={'#2205DD'} onClick={onChooseColor} />
          <PaletteDot color={'#460AA7'} onClick={onChooseColor} />
          <PaletteDot color={'#EEEEEE'} onClick={onChooseColor} />
          <PaletteDot color={'#111111'} onClick={onChooseColor} />
        </div>
      )}
    </>
  );
}
