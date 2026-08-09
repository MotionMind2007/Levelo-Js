<div align="center">
  <img src="https://raw.githubusercontent.com/MotionMind2007/Levelo-Js/main/assets/logo-colored.svg" alt="Levelo JS Logo" width="120">
  <h1>Levelo JS</h1>

  <a href="https://lab.motionmind.me"><img alt="Made by Motion Mind" src="https://img.shields.io/badge/MADE%20BY%20Motion%20Mind-000000.svg?style=for-the-badge&labelColor=000"></a>
  <a href="https://www.npmjs.com/package/levelojs"><img alt="NPM version" src="https://img.shields.io/npm/v/levelojs.svg?style=for-the-badge&labelColor=000000"></a>
  <a href="https://github.com/MotionMind2007/Levelo-Js/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-000000.svg?style=for-the-badge&labelColor=000000"></a>

</div>

## 💥 What's New & Architecture Highlights

<details>
<summary><b>Click to expand what's new inside Levelo JS! 🚀</b></summary>
<br />

The performance, stability, and developer experience update is here! We've dropped major architectural enhancements to make Levelo JS fully type-safe and production-ready:

* **🧭 Advanced Dynamic Routing & `params` API**: Upgraded the routing architecture from a single file to a modular structure (`src/router/`). Added native dynamic path parameter matching (e.g., `<Page path="/user/:id"/>`) along with the new `params` API for seamless URL state tracking.
* **🎯 Direct DOM Access via `ref`**: Introduced full `ref` attribute support in the HyperScript factory (`h()`) for both object references (`{ current: null }`) and callback functions, complete with strict TypeScript DOM types (`HTMLInputElement`, etc.).
* **🔄 Smart SPA Title Fallback (`head.ts`):** Captured the default `index.html` document title at startup and integrated automatic head resetting during route transitions, ensuring components without an explicit `head()` call gracefully fall back to the root title.
</details>

---

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
| `batch` | Performance | Groups multiple state mutations together into a single microtask to optimize DOM updates. |
| `head` | SEO Management | Dynamic, component-driven configuration for document metadata layers. |
| `render` | Bootstrapper | Injects and mounts the root structural component tree to a DOM container. |
| `h` | Factory | Real DOM internal hyperscript generator (compiler-targeted). |
| `params` | Routing | Retrieves and tracks dynamic URL path parameters (e.g., `:id`) in single-page apps. |

## Packages

| Package | Description | Version |
|---|---|---|
| `levelojs` | Core framework library | ![npm](https://img.shields.io/npm/v/levelojs.svg?labelColor=000&color=000) |
| `create-levelo-app` | Official project scaffolding CLI | ![npm](https://img.shields.io/npm/v/create-levelo-app.svg?labelColor=000&color=000) |
| `vite-plugin-levelojs` | levelojs vite plugin | ![npm](https://img.shields.io/npm/v/vite-plugin-levelojs?labelColor=000&color=000) |
## License

This project is licensed under the [MIT License](LICENSE) © [Motion Mind](https://lab.motionmind.me).

---

<div align="center">
Built with ⚡ by <a href="https://lab.motionmind.me">Motion Mind</a>
</div>
