<div align="center">
  <img src="https://raw.githubusercontent.com/MotionMind2007/Levelo-Js/main/assets/logo-colored.svg" alt="Levelo JS Logo" width="120">
  <h1>Levelo JS</h1>

  <a href="https://lab.motionmind.me"><img alt="Made by Motion Mind" src="https://img.shields.io/badge/MADE%20BY%20Motion%20Mind-000000.svg?style=for-the-badge&labelColor=000"></a>
  <a href="https://www.npmjs.com/package/levelojs"><img alt="NPM version" src="https://img.shields.io/npm/v/levelojs.svg?style=for-the-badge&labelColor=000000"></a>
  <a href="https://github.com/MotionMind2007/Levelo-Js/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-000000.svg?style=for-the-badge&labelColor=000000"></a>

</div>

## Getting Started

Levelo JS is a lightweight, ultra-fast reactive JavaScript framework built for speed and simplicity. No Virtual DOM. Direct Real DOM. Powered by [Motion Mind](https://lab.motionmind.me).

### Using CLI (Recommended)

Scaffold a complete Levelo JS project instantly:

```sh
npx create-levelo-app my-app
cd my-app
npm install
npm run dev
```

### Manual Installation

Add Levelo JS to an existing project:

```sh
npm install levelojs
```

## Quick Start

```jsx
import { render } from 'levelojs';
import Mind from './Mind.jsx';

render(Mind, document.getElementById('app'));
```

```jsx
import { state } from 'levelojs';

function Counter() {
  const [count, setCount] = state(0);

  return (
    <div>
      <h2>{count()}</h2>
      <button onclick={() => setCount(count() + 1)}>
        Level Up ➔
      </button>
    </div>
  );
}

export default Counter;
```

## Features

- **No Virtual DOM** — Direct Real DOM updates, zero reconciliation overhead
- **Ultra Lightweight** — Minimal footprint, maximum performance
- **Fine-grained Reactivity** — Only what changes, updates
- **JSX Support** — Familiar developer experience
- **Vite-powered** — Instant HMR and fast builds

## Core API

| API | Description |
|---|---|
| `state` | Reactive state primitive |
| `effect` | Reactive side effects |
| `computed` | Derived reactive values |
| `head` | Document metadata management |
| `render` | Mount component to DOM |
| `h` | Real DOM element factory (internal) |

## Packages

| Package | Description | Version |
|---|---|---|
| [`levelojs`](packages/levelojs) | Core framework library | ![npm](https://img.shields.io/npm/v/levelojs.svg?labelColor=000&color=000) |
| [`create-levelo-app`](packages/create-levelo-app) | Official project scaffolding CLI | ![npm](https://img.shields.io/npm/v/create-levelo-app.svg?labelColor=000&color=000) |

## License

This project is licensed under the [MIT License](LICENSE) © [Motion Mind](https://lab.motionmind.me).

---

<div align="center">
Built with ⚡ by <a href="https://lab.motionmind.me">Motion Mind</a>
</div>
