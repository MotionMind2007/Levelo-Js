// src/pages/document.jsx
import { head, style } from 'levelojs';

head({
  title: 'Levelo JS Documentation',
  description: 'Official documentation for Levelo JS - Ultra fast reactive framework'
});

style({
  '.doc-container': {
    backgroundColor: '#fafafa',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#1f2937'
  },
  '.doc-navbar': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid #e2e8f0',
    padding: '12px 24px',
    zIndex: '100'
  },
  '.back-btn': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: '#0284c7',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '9999px',
    transition: 'all 0.3s ease'
  },
  '.back-btn:hover': {
    background: '#e0f2fe',
    color: '#0369a1'
  },
  '.main-content': {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '100px 24px 80px'
  },
  '.doc-title': {
    fontSize: '2.8rem',
    fontWeight: '700',
    marginBottom: '12px',
    background: 'linear-gradient(90deg, #0ea5e9, #1e40af)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  '.doc-subtitle': {
    fontSize: '1.15rem',
    color: '#64748b',
    marginBottom: '40px'
  },
  '.section': {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9'
  },
  '.section-title': {
    fontSize: '1.65rem',
    fontWeight: '600',
    color: '#1e2937',
    marginBottom: '16px'
  },
  '.code-block': {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '20px',
    fontFamily: 'ui-monospace, monospace',
    fontSize: '0.95rem',
    overflowX: 'auto',
    marginTop: '16px',
    position: 'relative'
  },
  '.gradient-text': {
    background: 'linear-gradient(90deg, #0ea5e9, #1e40af)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginLeft: '6px',
    marginRight: '6px'
  }
});

function Document() {
  return (
    <div class="doc-container">
      {/* Navbar - Same style as Home */}
      <nav class="doc-navbar">
        <a href="/" class="back-btn">
          ← Back to Home
        </a>
      </nav>

      <div class="main-content">
        <h1 class="doc-title">Levelo JS Documentation</h1>
        <p class="doc-subtitle">
          Learn how to build ultra-fast reactive applications with Levelo JS
        </p>

        {/* Section 1 */}
        <div class="section">
          <h2 class="section-title">1. Installation</h2>
          <p>Start a new project with Vite:</p>
          <pre class="code-block">
{`npm create-levelo-app my-levelo-app
cd my-levelo-app
npm install`}
          </pre>
        </div>

        {/* Section 2 */}
        <div class="section">
          <h2 class="section-title">2. Basic Component</h2>
          <p>Create reactive components using <span class="gradient-text">state()</span>:</p>
          <pre class="code-block">
{`import { state } from 'levelojs';

function Counter() {
  const [count, setCount] = state(0);

  return (
    <button onclick={() => setCount(count() + 1)}>
      Count: {count()}
    </button>
  );
}

export default Counter;`}
          </pre>
        </div>

        {/* Section 3 */}
        <div class="section">
          <h2 class="section-title">3. Routing</h2>
          <p>Use <span class="gradient-text">Pages</span> and <span class="gradient-text">Page</span> for clean navigation:</p>
          <pre class="code-block">
{`import { Pages, Page } from 'levelojs';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';

function App() {
  return (
    <Pages>
      <Page path="/" component={Home} />
      <Page path="/about" component={About} />
      <Page path="/document" component={Document} />
    </Pages>
  );
}

export default App;`}
          </pre>
        </div>

        {/* Section 4 */}
        <div class="section">
          <h2 class="section-title">4. Styling</h2>
          <p>Scoped styling with <span class="gradient-text">style()</span> function:</p>
          <pre class="code-block">
{`import { style } from 'levelojs';

style({
  '.btn': {
    background: '#0284c7',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '9999px'
  }
});`}
          </pre>
        </div>

        {/* Section 5 */}
        <div class="section">
          <h2 class="section-title">5. Head Management</h2>
          <p>Dynamic SEO and meta tags:</p>
          <pre class="code-block">
{`import { head } from 'levelojs';

head({
  title: 'My Awesome App',
  description: 'Built with Levelo JS - The fastest frontend framework'
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default Document;