# Changelog

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