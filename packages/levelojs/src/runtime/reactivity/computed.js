import { state, effect } from './state.js';

/**
 * Creates a derived reactive state.
 * @param {Function} computeFn 
 * @returns {Function} getter
 */
export function computed(computeFn) {
  const [getter, setter] = state(computeFn());

  effect(() => {
    setter(computeFn());
  });

  return getter;
}
