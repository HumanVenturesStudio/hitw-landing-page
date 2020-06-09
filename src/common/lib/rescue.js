import { warn } from './log';

/**
 * Safely Execute a function and notify Airbrake if there are issues
 * @param {Function} f Function to wrap for safe execution. Exceptions logged to Airbrake
 * @returns {Function} Wrapped function
 */
export default function rescue(f, fallbackReturnValue = null) {
  return function rescue(...args) {
    try {
      return f(...args);
    } catch (e) {
      warn('[Rescue]', {
        error: e,
        context: { severity: 'warning' },
      });
      return fallbackReturnValue;
    }
  };
}
