import nanobus from 'nanobus';
import { info } from './log';
import LandingPage from './landingPage';

/**
 * Event Bus Instance
 * @link https://github.com/choojs/nanobus#readme
 */
const bus = nanobus('Events');

const Events = {
  ...bus,
  on: (...args) => {
    info('[Event][On]', args[0]);
    bus.on(...args);
  },
  once: (...args) => {
    info('[Event][Once]', args[0]);
    bus.once(...args);
  },
  emit: (...args) => {
    info('[Event][Emit]', ...args);
    bus.emit(...args);
  },
};

/**
 * Event Bus Events
 */
Events.EVENT = {
  Ready: 'Ready',
};

/**
 * 1. Emit Events
 * Events.emit(Events.EVENT.<EventName>, {...});
 *
 * 2. Listen for Events
 * Events.once(
 *   Events.EVENT.<EventName>,
 *   ({ ... }) => {
 *     // Do Something
 *   }
 * );
 */

export default Events;

/**
 * Expose API functions to window for
 * convenient development & debugging
 */

LandingPage.Events = Events;
