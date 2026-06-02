// src/runtime/reactivity/state.js

/**
 * Global tracker to register active effects.
 */
let activeEffect = null;

/**
 * Registers and executes an effect.
 * @param {Function} callback 
 */
export function effect(callback) {
  activeEffect = callback;
  callback();
  activeEffect = null;
}

/**
 * Creates a reactive signal state.
 * @param {any} initialValue 
 * @returns {[Function, Function]} [getter, setter]
 */
export function state(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  const getter = () => {
    if (activeEffect) {
      subscribers.add(activeEffect);
    }
    return value;
  };

  const setter = (newValue) => {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((sub) => sub());
    }
  };

  // MAGIC: Marking this as a signal for the DOM engine
  //getter.__isSignal = true;

  return [getter, setter];
}
