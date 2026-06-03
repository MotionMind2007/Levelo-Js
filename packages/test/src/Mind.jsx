// src/Mind.jsx
import { state, style, computed } from 'levelojs';

const styles = style({
  '.body-light': {
    background: '#ffffff',
    color: '#111111',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'sans-serif',
    transition: 'all 0.3s ease'
  },
  '.body-dark': {
    background: '#111111',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'sans-serif',
    transition: 'all 0.3s ease'
  },
  '.highlight': {
    padding: '5px',
    borderRadius: '4px',
    transition: 'background 0.3s ease'
  }
});

export default function Mind() {
  const [theme, setTheme] = state('light');
  const [count, setCount] = state(0);

  // ✅ Computed state
  const isEven = computed(() => count() % 2 === 0);

  return (
    <div class={() => theme() === 'light' ? 'body-light' : 'body-dark'}>
      <h1>⚡ Mind.jsx Reactive Cascade</h1>

      {/* Counter with reactive style */}
      <div>
        <h3>
          Counter: 
          <span 
            class="highlight" 
            style={() => ({
              background: isEven() ? '#00ff0033' : '#ff000033'
            })}
          >
            {count()}
          </span>
        </h3>
        <button onclick={() => setCount(count() + 1)}>+</button>
        <button onclick={() => setCount(count() - 1)}>-</button>
      </div>

      {/* Theme toggle */}
      <div>
        <h3>Theme: {theme()}</h3>
        <button onclick={() => setTheme(theme() === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>

      {/* Conditional rendering via computed */}
      <div>
        {isEven() 
          ? <p>✅ Count is even</p> 
          : <p>❌ Count is odd</p>}
      </div>
    </div>
  );
}