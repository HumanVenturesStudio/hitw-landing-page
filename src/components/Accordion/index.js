import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
import LandingPage from 'common/lib/LandingPage';
import { parseEntities } from 'common/lib/strings';
import React from 'react';
import { withParagraphs } from '../../common/lib/strings';
import styles from './styles.module.scss';

const AccordionItem = ({ id, heading, content, isActive, setActive }) => {
  const itemRef = React.useRef();

  React.useEffect(() => {
    if (document.location.hash === `#${id}`) {
      setTimeout(() => {
        itemRef.current.focus();
        setActive(id);
      }, 100);
    }
  }, [id, setActive]);

  return (
    <>
      <dt
        ref={itemRef}
        tabIndex="1"
        id={id}
        className={cx('accordion--heading', styles.ItemHeading, {
          [styles.active]: isActive,
        })}
        onClick={() => {
          document.location.hash = id;
          setActive(isActive ? null : id);
          trackEvent(trackEvent.EVENT__CONVERSION__ACCORDION_OPEN, {
            id: id,
            release: LandingPage.release,
          });
        }}
      >
        {parseEntities(heading)}
      </dt>
      <dd className={styles.ItemContent}>
        {withParagraphs(parseEntities(content))}
      </dd>
    </>
  );
};

export default function Accordion({ id, heading, items }) {
  const [activeItem, setActiveItem] = React.useState();

  return (
    <div id={id} className={cx('accordion', styles.Accordion)}>
      {heading && <h3 className={styles.AccordionHeading}>{heading}</h3>}
      <dl className={cx('accordion--items', styles.AccordionItems)}>
        {items.map((item, index) => (
          <AccordionItem
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            setActive={setActiveItem}
          />
        ))}
      </dl>
    </div>
  );
}
