// src/runtime/reactivity/batch.ts

export let isBatching: boolean = false;
export const queue = new Set<() => void>();


export function batch(f: () => void): void {
    if (isBatching) {
        f();
        return;
    }
    isBatching = true;

    try {
        f();
    } catch (e) {
        console.error("[Levelo] Error inside batch()", e);
    } finally {
        isBatching = false;
        const q = Array.from(queue);
        queue.clear();
        q.forEach((ef) => ef());
    }
}