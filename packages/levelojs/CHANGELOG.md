# Changelog

## [2.0.1] - 2026-07-11

### Fixed
- **Compiler/SVG:** Fixed SVG rendering bug where `viewBox` attribute was incorrectly transformed into kebab-case (`view-box`), causing SVG assets to disappear from the layout. Added strict exception mapping for camelCase SVG core attributes.
- **Monorepo/Dependencies:** Resolved `ERR_MODULE_NOT_FOUND` on strict package managers like `pnpm` by decoupling development runtime bundles and properly declaring loose `peerDependencies` (`*`) for backward-compatibility with older projects.

---

## [2.0.0] - 2026-07-10

### Added
- **Reactive Ownership Architecture (`owner.ts`)**: Introduced a robust hierarchical tracking context to manage nested reactive scopes and side-effects smoothly.
- **Advanced Lifecycle Mechanisms (`mount` & `cleanup`)**: 
  - Added `mount()` to safely schedule tasks precisely after the browser finishes synchronous layout painting.
  - Added `cleanup()` to capture and wipe out intervals, event listeners, and pending tasks during state or route transitions.
- **Ownership-Driven Effects**: Enhanced the core `effect()` engine to integrate with the new ownership layer, auto-disposing stale tracking dependencies and ensuring absolute mitigation against memory leaks.
- **Polished 404 Error Component**: Re-designed the core single-page application fallback viewport (`Page Not Found`) with a modern, high-fidelity native CSS layout, featuring clean typography and responsive alignment.

### Changed
- **Full TypeScript Migration**: Transformed the entire runtime engine core and internal modules (`.js` to `.ts`) to enforce rigid compile-time safety and self-documenting types across the codebase.
- **High-Performance Production Bundling**: Migrated away from publishing raw uncompiled source files. Integrated **`tsup`** as the official build bundler to generate heavily optimized, tree-shakable distributed bundles (`dist/index.js`).
- **Monorepo / Package Tooling Overhaul**: Moved the development environment ecosystem from standard `npm` to **`pnpm`** to achieve ultra-fast dependency caching and workspace linking.
- **Compiler Output Modernization**: Migrated the core compiler runtime artifact from CommonJS to standard ES Modules, converting `compiler/index.cjs` into fully modern `compiler/index.js`.

---

## [1.3.0] - 2026-06-21

### Added
- Successfully implemented deep tree namespace delegation. Nested graphical vectors(like <svg>, <path>, <math> etc.) now correctly inherit their respective explicit XML namespaces.

### Fixed
- Resolved a critical layout rendering bug where CamelCase attributes like 'strokeWidth', 'strokeLinecap', 'strokeLinejoin' were rejected by browser DOM. The dom.js hyperscript element factory now dynamically normalizes them into safe, valid kebab-case properties at the runtime layout injection layer.

---

## [1.2.0] - 2026-06-09

### Added
- Functional State Updates: `state()` setter now fully supports functional callback updates (`setCount(prev => prev + 1)`), enabling safe updates based on previous state values.
- React Ecosystem Compatibility: Seamlessly normalizes `className` to native `class` attributes at the HyperScript level, preserving full dynamic property descriptor/getter reactivity.
- CamelCase Event Normalization: Automatic mapping for CamelCase listeners (e.g., `onClick`, `onChange`) into lower-case native browser event triggers.

### Fixed
- SPA Viewport Scroll Reset: Fixed a critical single-page routing bug where changing pages/views kept the previous page's scroll position. The viewport now automatically resets to the top `(0, 0)` upon every successful route transition in `Pages`.

---

## [1.1.0] - 2026-06-09

### Added
- Comprehensive reactive `head()` engine supporting arrays of custom metadata (`meta`, `link`, `script`).
- Added strict `data-levelo-head="true"` DOM tracking attributes to dynamically injected layout headers.
- Native automated head tag parsing and state-purging to instantly eliminate redundant/duplicate meta elements during dynamic routing shifts.
- Full structural shorthand support for core document layout mappings (`themeColor`, `keywords`, `description`, `base`).

### Changed
- Refactored `head()` to seamlessly execute inline within functional components to unlock 100% reactive, state-driven title and SEO context updates.

---

## [1.0.4] - 2026-06-03

### Fixed
- Reactive class switching via `class={() => ...}`
- Reactive style via `style={() => ...}`
- Conditional rendering `{condition ? <A/> : <B/>}`
- List rendering `{items().map(item => <li>{item}</li>)}`
- Compiler: arrow function children double-wrap bug fixed
- DOM: anchor-based dynamic element insertion

---

## [1.0.3] - 2026-06-02

### Fixed
- Babel dependencies moved from devDependencies to dependencies

---

## [1.0.2] - 2026-06-02

### Fixed
- Unnecessary babel packages removed

---

## [1.0.1] - 2026-06-02

### Fixed
- Minor bug fixes

---

## [1.0.0] - 2026-06-02

### Released
- `state()` — reactive state primitive
- `effect()` — reactive side effects
- `computed()` — derived reactive state
- `style()` — scoped CSS injection
- `head()` — document metadata management
- `render()` — mount component to DOM
- `Pages` / `Page` — file-based routing
- `h()` — real DOM element factory (internal)
- `leveloPlugin` — Vite plugin for JSX compilation