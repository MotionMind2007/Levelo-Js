type TagType = string | ((props: any) => Element);
/**
 * HyperScript Factory (h) - Translates Levelo JSX into highly optimized browser nodes.
 * Supports static values, dynamic getter attributes, and functional text nodes.
 */
declare function h(tag: TagType, props: Record<string, any> | null, ...children: any[]): Element;
/**
 * Standard Application Target Mounting Entry Root Runtime.
 */
declare function render(rootComponent: () => any, container: HTMLElement | null): void;

interface PageProps {
    path: string;
    component: (props: any) => Element;
}
/**
 * Configuration schema defining a standalone path pattern matching node.
 * Executed via Levelo's h() Factory.
 */
declare function Page(props: PageProps): Record<string, any>;
interface PagesProps {
    children: any | any[];
}
/**
 * High-performance Viewport Container that automatically swaps structural page nodes dynamically.
 */
declare function Pages(props: PagesProps): HTMLElement;

interface StyleRules {
    [selector: string]: Record<string, string | number>;
}
interface ClassMap {
    [rawKey: string]: string;
}
/**
 * Dynamically injects JavaScript style objects as Scoped CSS and raw Global CSS rules simultaneously.
 * Guarantees that both dot-prefixed and raw plain keys resolve to both standard strings and scoped object mappings.
 */
declare function style(rulesObj: StyleRules): ClassMap;

/**
 * Registers and executes an effect.
 * @param {Function} callback
 */
declare function effect(callback: () => void): void;
type Getter<T> = () => T;
type Setter<T> = (newValue: T | ((prev: T) => T)) => void;
/**
 * Creates a reactive signal state.
 * @param {any} initialValue
 * @returns {[Function, Function]} [getter, setter]
 */
declare function state<T>(initialValue: T): [Getter<T>, Setter<T>];

/**
 * Creates a derived reactive state.
 * @param {Function} computeFn
 * @returns {Function} getter
 */
declare function computed<T>(computeFn: () => T): Getter<T>;

/**
 * Registers a cleanup callback that fires immediately when the active context or route changes.
 * Helps cleanly wipe out intervals, event listeners, and memory footprints.
 */
declare function cleanup(fn: () => void): void;
/**
 * Shedules a task to run right after the browser finishes the current synchronous layout paint.
 */
declare function mount(fn: () => void): void;

interface HeadMeta {
    name?: string;
    property?: string;
    content?: string;
    charset?: string;
    [key: string]: string | undefined;
}
interface HeadLink {
    rel?: string;
    href?: string;
    sizes?: string;
    type?: string;
    crossorigin?: string;
    [key: string]: string | undefined;
}
interface HeadScript {
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
    textContent?: string;
    [key: string]: any;
}
interface HeadBase {
    href?: string;
    target?: string;
    [key: string]: string | undefined;
}
interface HeadConfig {
    title?: string;
    base?: string | HeadBase;
    description?: string;
    keywords?: string;
    themeColor?: string;
    viewport?: string;
    author?: string;
    meta?: HeadMeta[];
    link?: HeadLink[];
    script?: HeadScript[];
    [key: string]: any;
}
/**
 * Directly updates the document head with the provided configuration.
 * Can be called safely inside components on every render cycle.
 * @param {Object} config - The comprehensive head configuration
 */
declare function head(config: HeadConfig): void;

export { Page, Pages, cleanup, computed, effect, h, head, mount, render, state, style };
