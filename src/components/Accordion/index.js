import cx from 'classnames';
import { trackEvent } from 'common/lib/analytics';
import LandingPage from 'common/lib/landingPage';
import { parseEntities } from 'common/lib/strings';
import React from 'react';
import { withParagraphs } from '../../common/lib/strings';
import styles from './styles.module.scss';

const AccordionItem = ({
  id,
  heading,
  content,
  active,
  isActive,
  setActive,
}) => {
  const itemRef = React.useRef();

  React.useEffect(() => {
    if (document.location.hash === `#${id}`) {
      // Set AccordionItem active if ID matches URL Hash
      setTimeout(() => {
        itemRef.current.focus();
        setActive(id);
      }, 100);
    } else if (active) {
      // Set AccordionItem active if it's configured to be active
      setActive(id);
    }
  }, [active, id, setActive]);

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
        <span>{parseEntities(heading)}</span>
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
