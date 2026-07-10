// src/runtime/head.ts

// metadata type
export interface HeadMeta {
  name?: string;
  property?: string;
  content?: string;
  charset?: string;
  [key: string]: string | undefined;
}

//headlink type
export interface HeadLink {
  rel?: string;
  href?: string;
  sizes?: string;
  type?: string;
  crossorigin?: string;
  [key: string]: string | undefined;
}

// headscript type
export interface HeadScript {
  src?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
  textContent?: string;
  [key: string]: any;
}

// headbase type
export interface HeadBase {
  href?: string;
  target?: string;
  [key: string]: string | undefined;
}

// main headconfig type
export interface HeadConfig {
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
export function head(config: HeadConfig) {
  if (!config) return;

  // Immediately wipe out any previous dynamic tags created by Levelo
  clearOldLeveloTags();

  // Safely Update Document Title synchronously
  if (config.title) {
    document.title = config.title;
  }

  // Handle Base Configuration
  if (config.base) {
    updateBaseTag(config.base);
  }

  // Resolve Shortcut Common Metas (Maps camelCase to kebab-case attributes)
  const metaShortcuts: Record<string, string> = {
    description: 'description',
    keywords: 'keywords',
    themeColor: 'theme-color',
    viewport: 'viewport',
    author: 'author'
  };

  Object.keys(metaShortcuts).forEach(key => {
    if (config[key]) {
      injectMetaTag({ name: metaShortcuts[key], content: config[key] });
    }
  });

  // Inject Dynamic Meta Array
  if (Array.isArray(config.meta)) {
    config.meta.forEach(metaObj => injectMetaTag(metaObj));
  }

  // Inject Dynamic Link Array
  if (Array.isArray(config.link)) {
    config.link.forEach(linkObj => injectLinkTag(linkObj));
  }

  // Inject Dynamic Script Array
  if (Array.isArray(config.script)) {
    config.script.forEach(scriptObj => injectScriptTag(scriptObj));
  }
}

/**
 * Empty placeholder function to satisfy old router.js references without breaking compiling threads.
 */
export function applyHeadUpdates(): void {
  // No-op: Updates now happen instantly and reactively inside head() itself!
}

/**
 * Removes all previously injected Levelo JS head nodes from the DOM layout
 */
function clearOldLeveloTags(): void {
  const elements = document.head.querySelectorAll('[data-levelo-head]');
  elements.forEach(el => el.remove());
}

/**
 * Creates and appends a meta tag marked with the framework identifier
 */
function injectMetaTag(metaObj: HeadMeta): void {
  const element = document.createElement('meta');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(metaObj).forEach(key => {
    const value = metaObj[key];
    if (value !== undefined && value !== null) {
      element.setAttribute(key, String(value));
    }
  });

  document.head.appendChild(element);
}

/**
 * Creates and appends a link tag marked with the framework identifier
 */
function injectLinkTag(linkObj: HeadLink): void {
  if (!linkObj.href) return;

  const element = document.createElement('link');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(linkObj).forEach(key => {
    const value = linkObj[key];
    if (value !== undefined && value !== null) {
      element.setAttribute(key, String(value));
    }
  });

  document.head.appendChild(element);
}

/**
 * Creates and appends a script tag marked with the framework identifier
 */
function injectScriptTag(scriptObj: HeadScript): void {
  if (!scriptObj.src) return;

  const element = document.createElement('script');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(scriptObj).forEach(key => {
    (element as any)[key] = scriptObj[key];
  });

  document.head.appendChild(element);
}

/**
 * Configures the document HTML base path tag properties
 */
function updateBaseTag(baseConfig: string | HeadBase): void {
  let element = document.head.querySelector('base');
  if (!element) {
    element = document.createElement('base');
    document.head.insertBefore(element, document.head.firstChild);
  }

  if (typeof baseConfig === 'string') {
    element.setAttribute('href', baseConfig);
  } else if (typeof baseConfig === 'object') {
    Object.keys(baseConfig).forEach(key => {
      const value = baseConfig[key];
      if (value !== undefined && value !== null) {
        element!.setAttribute(key, String(value));
      }
    });
  }
}
