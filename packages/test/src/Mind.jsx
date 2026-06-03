// src/Lab.jsx
import { state, style } from 'levelojs';

const styles = style({
  '.light': {
    background: '#ffffff',
    color: '#111111',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'sans-serif',
    transition: 'all 0.3s ease'
  },
  '.dark': {
    background: '#111111',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '20px',
    fontFamily: 'sans-serif',
    transition: 'all 0.3s ease'
  },
  '.card': {
    border: '1px solid #888',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '6px'
  },
  '.highlight': {
    background: '#00ffff22',
    padding: '5px',
    borderRadius: '4px'
  }
});

export default function Lab() {
  const [theme, setTheme] = state('light');
  const [count, setCount] = state(0);
  const [name, setName] = state('');
  const [items, setItems] = state(['Alpha', 'Beta']);

  return (
    <div class={() => theme() === 'light' ? 'light' : 'dark'}>
      <h1>⚡ Levelo JS Reactive Playground</h1>

      {/* Counter */}
      <div class="card">
        <h3>Counter: <span class="highlight">{count()}</span></h3>
        <button onclick={() => setCount(count() + 1)}>+</button>
        <button onclick={() => setCount(count() - 1)}>-</button>
      </div>

      {/* Theme Toggle */}
      <div class="card">
        <h3>Theme: {theme()}</h3>
        <button onclick={() => setTheme(theme() === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>

      {/* Input Binding */}
      <div class="card">
        <h3>Enter Name:</h3>
        <input
          type="text"
          value={name()}
          oninput={e => setName(e.target.value)}
        />
        <p>Hello, <strong>{name()}</strong>!</p>
      </div>

      {/* Reactive List */}
      <div class="card">
        <h3>Items:</h3>
        <ul>
          {items().map(item => (
            <li>{item}</li>
          ))}
        </ul>
        <button onclick={() => setItems([...items(), `Item ${items().length+1}`])}>
          Add Item
        </button>
      </div>

      {/* Conditional Rendering */}
      <div class="card">
        {count() % 2 === 0
          ? <p>✅ Count is even</p>
          : <p>❌ Count is odd</p>}
      </div>
    </div>
  );
}