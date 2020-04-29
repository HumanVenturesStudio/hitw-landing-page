import { randomColor } from 'common/lib/random';

/**
 * Console Wrapper
 * - Logs are stripped out in producution builds
 * - Logs prefixed with [SomePrefix] are colorized
 */

const PREFIX_REGEX = /^\[.+\]/;
const COLORS = {};
const OUTPUT =
  __DEVELOPMENT__ ||
  (URLSearchParams &&
    new URLSearchParams(document.location.search).has('debug'));

/**
 * Randomly and consistently assign a color to a logging key
 * @param {String} key
 */
const assignColor = (key) => COLORS[key] || (COLORS[key] = randomColor());

/**
 * Determine if the log can be colorized
 * @param  {...any} args
 */
const prepareArgs = (...args) => {
  if (args[0] && typeof args[0] === 'string') {
    let prefix = args[0].match(PREFIX_REGEX);
    if (prefix && prefix[0]) {
      let prefixStr = prefix[0];
      let remainingStr = args
        .shift()
        .replace(prefix[0], '')
        .trim();

      let preparedArgs = [
        `%c ${prefixStr}`,
        `color: ${assignColor(prefixStr)}`,
      ];

      if (remainingStr) {
        preparedArgs.push(remainingStr);
      }

      args.unshift(...preparedArgs);
    }
  }

  return args;
};

/**
 * Log
 * @param  {...any} args
 */
export const log = (...args) => OUTPUT && console.log(...prepareArgs(...args));

/**
 * Info
 * @param  {...any} args
 */
export const info = (...args) =>
  OUTPUT && console.info(...prepareArgs(...args));

/**
 * Warn
 * @param  {...any} args
 */
export const warn = (...args) =>
  OUTPUT && console.warn(...prepareArgs(...args));

/**
 * Notice
 * @param  {...any} args
 */
export const notice = (...args) =>
  OUTPUT && console.notice(...prepareArgs(...args));

/**
 * Error
 * @param  {...any} args
 */
export const error = (...args) =>
  OUTPUT && console.error(...prepareArgs(...args));

/**
 * Debug
 * @param  {...any} args
 */
export const debug = (...args) =>
  OUTPUT && console.debug(...prepareArgs(...args));

/**
 * Table
 * @param  {...any} args
 */
export const table = (...args) =>
  OUTPUT && console.table(...prepareArgs(...args));
