# Changelog

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