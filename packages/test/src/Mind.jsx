// src/Mind.jsx
import { Pages, Page, head, style, state, effect } from 'levelojs';

// 1. Compile localized dashboard presentation styles
style({
  '.lab-container': {
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    color: '#e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif'
  },
  '.counter-card': {
    backgroundColor: '#1e293b',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  '.action-btn': {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'background-color 0.2s'
  },
  '.action-btn:hover': {
    backgroundColor: '#059669'
  }
});

/**
 * High-Fidelity Reactive State Testing Lab Component Node
 */
function StateTestingLab() {
  head({
    title: 'State Callback Test - Levelo JS',
    themeColor: '#0f172a'
  });

  // Initialize reactive counter state primitive
  const [count, setCount] = state(0);

  const incrementCounter = () => {
    // TESTING: Passing a functional callback to the state setter
    setCount(prev => prev + 1);
  };

  return (
    // TESTING: React-style className token normalization
    <div className="lab-container">
      <div className="counter-card">
        <h1>🧪 Functional State Callback Lab</h1>
        <p>Testing reactive update pipes inside Levelo core factory rules.</p>
        
        {/* The DOM factory compiler automatically wraps this getter evaluation */}
        <h3>Current Counter: {() => count()}</h3>

        {/* TESTING: CamelCase event handler mapping */}
        <button className="action-btn" onClick={incrementCounter}>
          Increment (Functional)
        </button>
      </div>
    </div>
  );
}

/**
 * Global Routing Context Shell Manager
 */
function Mind() {
  return (
    <Pages>
      <Page path="/" component={StateTestingLab} />
    </Pages>
  );
}

export default Mind;
