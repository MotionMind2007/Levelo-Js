// src/router/Page.ts - Optimized Enterprise Routing Engine for Levelo JS (Version 2.0.0 Specs)
import { h } from '../runtime/jsx/jsx-runtime';
import { applyHeadUpdates } from '../runtime/head.js';
import { getClean404Component } from '../runtime/templates/error404.js';
import { setParams } from './params';
import {resetHeadToDefault} from '../runtime/head';

interface RouteDefinition {
  path: string;
  regex: RegExp;
  keys: string[];
  component: (props: any) => Element;
}

// Global registry to keep track of the dynamic route-to-component mappings
const routes: RouteDefinition[] = [];

// Global listener callback queue to trigger DOM view swaps when URL shifts
const routeListeners = new Set<(path: string) => void>();

/**
 * Converts path pattern like /users/:id into RegExp and extracts keys
 */
function parseRoutePattern(path: string): {regex: RegExp; keys: string[]} {
  const keys: string[] = [];
  const pattern = path
    .replace(/\/+$/, '')
    .replace(/:([^\/]+)/g, (_, key) => {
      keys.push(key);
      return '([^/]+)';
    });
  
  const regex = new RegExp(`^${pattern}(\\/)?$`);
  return {regex, keys};
}

/**
 * Matches current pathname against registered route patterns and extracts parameters
 */
function matchRoute(pathname: string): {component: (props: any) => Element; params: Record<string, string>} | null {
  let normalizedPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname;
  if (normalizedPath.endsWith('index.html')) {
    normalizedPath = pathname.replace(/\/index\.html/g, '');
  }

  if (normalizedPath === '') normalizedPath = '/';

  for (const route of routes) {
    const match = normalizedPath.match(route.regex);
    if (match) {
      const params: Record<string, string> = {};
      route.keys.forEach((key, index) => {
        params[key] = match[index + 1];
      });
      return {component: route.component, params}
    }
  }
  return null;
}

/**
 * Programmatically triggers all registered view listeners to force a re-render
 */
function notifyRouteListeners() {
  const currentPath = window.location.pathname;
  routeListeners.forEach(listener => listener(currentPath));
}

// Core Navigation Interceptor Layer (Global Anchor Tracking)
if (typeof window !== 'undefined') {
  // Intercept browser back/forward buttons (popstate) natively
  window.addEventListener('popstate', () => {
    notifyRouteListeners();
  });

  // GLOBAL ANCHOR INTERCEPTION: Listen to ALL clicks on the document
  document.addEventListener('click', (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest('a');
    
    if (!anchor) return;
    
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('http://') || href.startsWith('https://') || (href.startsWith('#') && href.length > 1) || anchor.target === '_blank' || !href.startsWith('/')) {
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

interface PagesProps {
  children: any | any[];
}

/**
 * High-performance Viewport Container that automatically swaps structural page nodes dynamically.
 */
export function Pages(props: PagesProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'levelo-viewport-wrapper';

  // Extract child configuration streams
  const children = Array.isArray(props.children) ? props.children : [props.children];
  
  children.forEach(child => {
    if (child && child.type === 'PAGE_CONFIG' && child.path && child.component) {
      const exists = routes.some(r => r.path === child.path);
      if (!exists) {
        const {regex, keys} = parseRoutePattern(child.path);
        routes.push({
          path: child.path,
          regex: regex,
          keys: keys,
          component: child.component,
        })
      }
    }
  });

  // Track the currently rendered DOM node to allow precision swapping
  let currentRenderedNode: Element | null = null;

  /**
   * Evaluates the current location and replaces the active view context cleanly
   */
  const renderActiveRoute = (currentPath: string): void => {
    resetHeadToDefault(); // reset head
    // Purge old view context to prevent structural leakage
    if (currentRenderedNode) {
      container.removeChild(currentRenderedNode);
      currentRenderedNode = null;
    }

    const matched = matchRoute(currentPath);

    if (matched) {
      setParams(matched.params)
    } else {
      setParams({});
    }

    // Lookup matching component view or default to root / 404 handler
    const TargetComponent = matched ? matched.component : getClean404Component(h);

    // CRITICAL UPGRADE: Build the target component view node via our Levelo h() factory
    // This allows children to inherit dynamic state scope safely during construction
    const instance = h(TargetComponent, { params: matched ? matched.params : {} });
    
    if (instance instanceof Element) {
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