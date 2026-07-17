//src/runtime/reactivity/computed.ts
import { state, effect } from './reactivity.js';
import type { Getter } from './reactivity.js';

/**
 * Creates a derived reactive state.
 * @param {Function} computeFn 
 * @returns {Function} getter
 */
export function computed<T>(computeFn: () => T): Getter<T> {
  const [getter, setter] = state<T>(computeFn());

  effect(() => {
    setter(computeFn());
  });

  return getter;
}
