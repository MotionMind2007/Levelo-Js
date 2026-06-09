// src/runtime/head.js

/**
 * Directly updates the document head with the provided configuration.
 * Can be called safely inside components on every render cycle.
 * @param {Object} config - The comprehensive head configuration
 */
export function head(config) {
  if (!config) return;

  // 1. Immediately wipe out any previous dynamic tags created by Levelo
  clearOldLeveloTags();

  // 2. Safely Update Document Title synchronously
  if (config.title) {
    document.title = config.title;
  }

  // 3. Handle Base Configuration
  if (config.base) {
    updateBaseTag(config.base);
  }

  // 4. Resolve Shortcut Common Metas (Maps camelCase to kebab-case attributes)
  const metaShortcuts = {
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

  // 5. Inject Dynamic Meta Array
  if (Array.isArray(config.meta)) {
    config.meta.forEach(metaObj => injectMetaTag(metaObj));
  }

  // 6. Inject Dynamic Link Array
  if (Array.isArray(config.link)) {
    config.link.forEach(linkObj => injectLinkTag(linkObj));
  }

  // 7. Inject Dynamic Script Array
  if (Array.isArray(config.script)) {
    config.script.forEach(scriptObj => injectScriptTag(scriptObj));
  }
}

/**
 * Empty placeholder function to satisfy old router.js references without breaking compiling threads.
 */
export function applyHeadUpdates() {
  // No-op: Updates now happen instantly and reactively inside head() itself!
}

/**
 * Removes all previously injected Levelo JS head nodes from the DOM layout
 */
function clearOldLeveloTags() {
  const elements = document.head.querySelectorAll('[data-levelo-head]');
  elements.forEach(el => el.remove());
}

/**
 * Creates and appends a meta tag marked with the framework identifier
 */
function injectMetaTag(metaObj) {
  const element = document.createElement('meta');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(metaObj).forEach(key => {
    element.setAttribute(key, metaObj[key]);
  });

  document.head.appendChild(element);
}

/**
 * Creates and appends a link tag marked with the framework identifier
 */
function injectLinkTag(linkObj) {
  if (!linkObj.href) return;

  const element = document.createElement('link');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(linkObj).forEach(key => {
    element.setAttribute(key, linkObj[key]);
  });

  document.head.appendChild(element);
}

/**
 * Creates and appends a script tag marked with the framework identifier
 */
function injectScriptTag(scriptObj) {
  if (!scriptObj.src) return;

  const element = document.createElement('script');
  element.setAttribute('data-levelo-head', 'true');

  Object.keys(scriptObj).forEach(key => {
    element[key] = scriptObj[key];
  });

  document.head.appendChild(element);
}

/**
 * Configures the document HTML base path tag properties
 */
function updateBaseTag(baseConfig) {
  let element = document.head.querySelector('base');
  if (!element) {
    element = document.createElement('base');
    document.head.insertBefore(element, document.head.firstChild);
  }

  if (typeof baseConfig === 'string') {
    element.setAttribute('href', baseConfig);
  } else if (typeof baseConfig === 'object') {
    Object.keys(baseConfig).forEach(key => {
      element.setAttribute(key, baseConfig[key]);
    });
  }
}
