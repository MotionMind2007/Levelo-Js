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
npm install # or pnpm install
npm run dev # or pnpm dev 
```

### Manual Installation

Add Levelo JS to an existing project:

```sh
npm install levelojs 
# or 
pnpm add levelojs
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

- **Zero Virtual DOM Overhead** - Bypasses VDOM diffing completely; updates the Real DOM nodes directly.
- **Fine-grained Reactivity** - Targeted structural updates via an independent runtime tracking graph.
- **Hierarchical Ownership** - Native tracking scopes ensure nested reactions dispose properly with zero memory leaks.
- **TypeScript Powered** - Complete internal codebase rewrite into strict, type-safe structures.
- **JSX Support** - Standard developer-friendly component structuring with seamless reactive attribute bindings.
- **Vite-integrated** - Pre-configured for instantaneous Hot Module Replacement (HMR) and optimized distribution builds.

## Core API

| API | Type | Description |
|---  |---   |---          |
| `state` | Primitive | Creates a reactive state atom with a getter/setter tuple. |
| `effect` | Side Effect | Tracks active reactive dependencies and re-executes automatically. |
| `computed` | Memoization | Derives stateful values efficiently using caching mechanics.|
| `cleanup` | Lifecycle | Registers disposal routines inside active tracking ownership contexts. |
| `mount` | Lifecycle | Schedules code execution precisely after layout nodes paint to the Real DOM. |
| `head` | SEO Management | Dynamic, component-driven configuration for document metadata layers. |
| `render` | Bootstrapper | Injects and mounts the root structural component tree to a DOM container. |
| `h` | Factory | Real DOM internal hyperscript generator (compiler-targeted). |

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
