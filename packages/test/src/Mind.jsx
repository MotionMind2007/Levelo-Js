// src/Mind.jsx
import { head, style } from 'levelojs';

// Inject basic scope styling to replace standard React Native Flexbox containers
style({
  '.app-container': {
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/**
 * Main Entry Point Component optimized for isolated SVG namespace testing.
 */
function Mind() {
  // Set up tab browser environment contexts natively
  head({
    title: 'Levelo JS - SVG Render Test'
  });

  return (
    <div className="app-container">
      {/* Standard JSX parsing setup. Using safe custom property names that 
        Babel syntax tokenizers can evaluate natively without parsing failures.
      */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#10b981"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    </div>
  );
}

export default Mind;