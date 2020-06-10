import cx from 'classnames';
import { sample } from 'common/lib/random';
import React from 'react';
import coloringBook1 from '../../art/coloring-book-1.svg';
import coloringBook2 from '../../art/coloring-book-2.svg';
import coloringBook3 from '../../art/coloring-book-3.svg';
import coloringBook4 from '../../art/coloring-book-4.svg';
import coloringBook5 from '../../art/coloring-book-5.svg';
import coloringBook6 from '../../art/coloring-book-6.svg';
import styles from '../../styles.module.scss';
import ShuffleButton from './ShuffleButton';

const PAGES = [
  coloringBook1,
  coloringBook2,
  coloringBook3,
  coloringBook4,
  coloringBook5,
  coloringBook6,
];

const getArt = () => sample(PAGES);

const ColoringBookLayer = React.forwardRef(
  ({ className, hide = true, withBackground = false }, ref) => {
    const [updateArt, setUpdateArt] = React.useState(true);

    const art = getArt();

    React.useEffect(() => {
      updateArt && setUpdateArt(false);
    }, [updateArt]);

    if (hide) {
      return null;
    }

    return (
      <>
        <div className={cx(className, styles.ColoringBookLayer)}>
          <img
            alt="Color me in!"
            src={art}
            ref={ref}
            className={styles.ColoringBookArt}
          />
        </div>
        <ShuffleButton
          onClick={() => {
            setUpdateArt(true);
          }}
        />
      </>
    );
  }
);

export default ColoringBookLayer;
