// src/Mind.jsx
import { Pages, Page, head, style } from 'levelojs';
import logo from './assets/logo-icon.png';

// =========================================================================
// 1. HOME PAGE LAYER (Global Styles & Dynamic Component)
// =========================================================================

// Top-level global stylesheet compilation for Home route (Safe to keep global)
style({
  '.home-shell': {
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    color: '#e2e8f0',
    padding: '60px 24px',
    fontFamily: 'system-ui, sans-serif'
  },
  '.route-trigger': {
    display: 'inline-block',
    marginTop: '24px',
    color: '#38bdf8',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.25rem',
    borderBottom: '2px solid transparent'
  },
  '.route-trigger:hover': {
    borderBottomColor: '#38bdf8'
  }
});

/**
 * Embedded Home View Component Node
 * @returns {HTMLElement} - Renderable DOM template
 */
function Home() {
  // Executed dynamically every single time the Home route mounts
  head({
    title: 'Home - Levelo JS Lab',
    description: 'Welcome to the centralized Levelo JS integrated testing dashboard.',
    themeColor: '#0f172a',
    link: [
      { rel: 'icon', type: 'image/png', href: logo }
    ]
  });

  return (
    <div class="home-shell">
      <h1>🏠 Levelo Home Hub</h1>
      <p>This localized scene is executing smoothly within a single-file architecture bundle.</p>
      <a href="/document" class="route-trigger">Explore Live Documentation ➔</a>
    </div>
  );
}


// =========================================================================
// 2. DOCUMENT PAGE LAYER (Global Styles & Dynamic Component)
// =========================================================================

// Top-level global stylesheet compilation for Document route (Safe to keep global)
style({
  '.doc-shell': {
    backgroundColor: '#1e293b',
    minHeight: '100vh',
    color: '#f8fafc',
    padding: '60px 24px',
    fontFamily: 'system-ui, sans-serif'
  },
  '.return-trigger': {
    display: 'inline-block',
    marginTop: '24px',
    color: '#f43f5e',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '1.25rem',
    borderBottom: '2px solid transparent'
  },
  '.return-trigger:hover': {
    borderBottomColor: '#f43f5e'
  }
});

/**
 * Embedded Document View Component Node
 * @returns {HTMLElement} - Renderable DOM template
 */
function Document() {
  // Executed dynamically every single time the Document route mounts
  head({
    title: 'Documentation - Levelo JS Lab',
    description: 'Deep dive into the declarative routing matrix specifications.',
    themeColor: '#1e293b'
  });

  return (
    <div class="doc-shell">
      <h1>📚 Levelo Core Specs</h1>
      <p>Analyze how hyper-reactive scopes render components instantly without heavy bundles.</p>
      <a href="/" class="return-trigger">❮ Back to Dashboard Home</a>
    </div>
  );
}


// =========================================================================
// 3. MAIN ROUTING ENGINE WRAPPER (Mind Component)
// =========================================================================

/**
 * Main Standalone Routing Matrix Manager Layer
 * Orchestrates view-swapping flows cleanly using the unified declarative specs.
 * @returns {HTMLElement} - Root layout container view element
 */
function Mind() {
  return (
    <Pages>
      <Page path="/" component={Home} />
      <Page path="/document" component={Document} />
    </Pages>
  );
}

export default Mind;
