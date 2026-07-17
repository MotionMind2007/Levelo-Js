// dom.ts - Production-Ready High-Performance DOM Factory for Levelo JS

/**
 * Standard Application Target Mounting Entry Root Runtime.
 */
export function render(rootComponent: () => any, container: HTMLElement | null): void {
  if (!container) return console.error('[Levelo] Dom injection target container missing.');
  container.innerHTML = '';
  
  const rootInstance = rootComponent();
  if (rootInstance instanceof Element) {
    container.appendChild(rootInstance);
  }
}
