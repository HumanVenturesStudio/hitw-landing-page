import { WIN } from './global';
import { info } from './log';
import rescue from './rescue';

const localStorage = WIN && WIN.localStorage;
const sessionStorage = WIN && WIN.sessionStorage;

/**
 * @param {String} key Cache Key
 * @returns {Mixed} Cached Value
 */
const read = rescue((key, fallback, strategy) => {
  info('[Persist:Read]', key);
  const state = strategy.getItem(key);
  return state && state !== null && JSON.parse(state);
});

/**
 * @param {String} key Cache Key
 * @param {Mixed} state Value to cache, Object, String, etc
 * @returns {Boolean}
 */
const write = rescue((key, state, strategy) => {
  info('[Persist:Write]', key, state);
  strategy.setItem(key, JSON.stringify(state));
  return true;
});

/**
 * @param {String} key Cache Key
 * @returns {Boolean}
 */
const clear = (key, strategy) => {
  info('[Persist:Clear]', key);
  strategy.removeItem(key);
  return true;
};

/**
 * @param {String} key Cache Key
 * @returns {Mixed} Cached Value
 */
const readOnce = (key, strategy) => {
  const value = read(key, strategy);
  clear(key, strategy);
  return value;
};

/**
 * Build Methods for Persist
 * @param {localStorage|sessionStorage} strategy
 */
const methods = (strategy) => ({
  read: (key, fallback) => read(key, fallback, strategy),
  write: (key, state) => write(key, state, strategy),
  clear: (key) => clear(key, strategy),
  readOnce: (key) => readOnce(key, strategy),
});

const persist = {
  local: methods(localStorage),
  session: methods(sessionStorage),
};

export default persist;
