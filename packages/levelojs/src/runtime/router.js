// router.js - Optimized Enterprise Routing Engine for Levelo JS (Version 2.0.0 Specs)
import { h } from './dom.js';
import { applyHeadUpdates } from './head.js';

// Global registry to keep track of the dynamic route-to-component mappings
const routes = new Map();

// Global listener callback queue to trigger DOM view swaps when URL shifts
const routeListeners = new Set();

/**
 * Programmatically triggers all registered view listeners to force a re-render
 */
function notifyRouteListeners() {
  const currentPath = window.location.pathname;
  routeListeners.forEach(listener => listener(currentPath));
}

// Core Navigation Interceptor Layer (Global Anchor Tracking)
if (typeof window !== 'undefined') {
  // 1. Intercept browser back/forward buttons (popstate) natively
  window.addEventListener('popstate', () => {
    notifyRouteListeners();
  });

  // 2. GLOBAL ANCHOR INTERCEPTION: Listen to ALL clicks on the document
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#') && href.length > 1 || anchor.target === '_blank') {
      return; 
    }

    // Intercept internal application routes safely and eliminate raw browser refreshes
    e.preventDefault();
    
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      notifyRouteListeners(); // Push instantaneous update to the active <Pages> container
    }
  });
}

/**
 * Configuration schema defining a standalone path pattern matching node.
 * Executed via Levelo's h() Factory.
 * @param {Object} props - Expects 'path' string and 'component' function
 * @returns {Object} - Static configuration descriptor
 */
export function Page(props) {
  return {
    type: 'PAGE_CONFIG',
    path: props.path,
    component: props.component
  };
}

/**
 * High-performance Viewport Container that automatically swaps structural page nodes dynamically.
 * @param {Object} props - Holds child <Page> arrays generated via JSX
 * @returns {HTMLElement} - Dynamic viewport shell routing container
 */
export function Pages(props) {
  const container = document.createElement('div');
  container.className = 'levelo-viewport-wrapper';

  // Extract child configuration streams
  const children = Array.isArray(props.children) ? props.children : [props.children];
  
  children.forEach(child => {
    // If the child configuration is an object containing valid page descriptors, register it
    if (child && child.type === 'PAGE_CONFIG') {
      routes.set(child.path, child.component);
    }
  });

  // Track the currently rendered DOM node to allow precision swapping
  let currentRenderedNode = null;

  /**
   * Evaluates the current location and replaces the active view context cleanly
   * @param {string} currentPath - The current window location pathname
   */
  const renderActiveRoute = (currentPath) => {
    let normalizedPath = currentPath.length > 1 && currentPath.endsWith('/') ? currentPath.replace(/\/+$/, '') : currentPath;
    
    if (normalizedPath.endsWith('index.html')) {
      normalizedPath = currentPath.replace(/\/index\.html/g, '');
    }
    
    if (normalizedPath === '') normalizedPath = '/';
    // 1. Purge old view context to prevent structural leakage
    if (currentRenderedNode) {
      // TODO: Call Layer 3 state/effect cleanups for the unmounting page here
      container.removeChild(currentRenderedNode);
      currentRenderedNode = null;
    }

    // 2. Lookup matching component view or default to root / 404 handler
    const TargetComponent = routes.get(normalizedPath) || (() => {
      return h('div', { style: { padding: '20px', color: 'red' } }, '404 - Page Not Found');
    });

    // 3. CRITICAL UPGRADE: Build the target component view node via our Levelo h() factory
    // This allows children to inherit dynamic state scope safely during construction
    const instance = h(TargetComponent, null);
    
    if (instance instanceof HTMLElement) {
      currentRenderedNode = instance;
      container.appendChild(currentRenderedNode);
      
      window.scrollTo(0, 0);
    }
    //update head
    applyHeadUpdates();
  };

  // Subscribe this container instance to global location updates
  routeListeners.add(renderActiveRoute);

  // Trigger instantaneous initial render boot matching the active deep-linked URL
  renderActiveRoute(window.location.pathname);

  return container;
}
