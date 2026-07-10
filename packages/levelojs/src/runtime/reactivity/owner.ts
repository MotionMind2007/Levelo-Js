// src/runtime/reactivity/owner.ts

export interface Owner {
    cleanups: (() => void)[];
}

export let activeOwner: Owner | null = null;

export function setOwner(owner: Owner | null): Owner | null {
    const prev = activeOwner;
    activeOwner = owner;
    return prev;
}

/**
 * Executes a function block within a tracking context and handles its cleanups cleanly.
 */

export function runWithOwner(owner: Owner, fn: () => void): void {
    if (owner.cleanups) {
        owner.cleanups.forEach(cb => cb());
        owner.cleanups = [];
    }

    const preOwner = setOwner(owner);

    try {
        fn();
    } finally {
        setOwner(preOwner);
    }
}