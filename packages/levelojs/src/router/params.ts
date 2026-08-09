// src/router/params.ts

// Global storage for active route parameters
let currentParams: Record<string, string> = {};

export function setParams(newParams: Record<string, string>) {
    currentParams = newParams;
}

// Proxy or exported object so developers can use params.id directly
export const params: Record<string, string> = new Proxy({} as Record<string, string>, {
    get(_, props: string) {
        return currentParams[props];
    }
})