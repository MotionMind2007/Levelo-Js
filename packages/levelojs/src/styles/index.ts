// index.ts - Hybrid Scoped & Global Object-to-CSS Injection Engine for Levelo JS

export interface StyleRules {
  [selector: string]: Record<string, string | number>;
}

export interface ClassMap {
  [rawKey: string]: string;
}

/**
 * Dynamically injects JavaScript style objects as Scoped CSS and raw Global CSS rules simultaneously.
 * Guarantees that both dot-prefixed and raw plain keys resolve to both standard strings and scoped object mappings.
 */
export function style(rulesObj: StyleRules): ClassMap {
  // Return an empty fallback during non-browser environment build phases
  if (typeof document === 'undefined') return {};

  // 1. Locate or programmatically spawn the official unified Levelo style tag sheet
  let styleTag = document.getElementById('levelo-style-sheet') as HTMLStyleElement | null;
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.setAttribute('id', 'levelo-style-sheet');
    document.head.appendChild(styleTag);
  }

  const uniqueHash = Math.random().toString(36).substring(2, 7);
  const classMap: ClassMap = {};
  let cssString = '';

  // 2. Loop through the key-value mappings to compile the ultimate hybrid style sheet buffer
  for (const [selector, properties] of Object.entries(rulesObj)) {
    // Extract the clean dotless class name from the selector token
    const isDotPrefixed = selector.startsWith('.');
    const rawClassName = isDotPrefixed ? selector.substring(1) : selector;
    
    // Check if the selector represents a genuine isolated class target
    const isPureClass = !selector.startsWith('@') && !selector.includes(' ') && selector !== 'button' && selector !== 'div';

    if (isPureClass) {
      // THE HYBRID RESOLVER METRIC
      // A. Compile and inject raw Global CSS rule (Always active for pure class strings like class="container")
      cssString += `.${rawClassName} { `;
      for (const [prop, val] of Object.entries(properties)) {
        const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssString += `${cssProperty}: ${val}; `;
      }
      cssString += '} \n';

      // B. Generate Unique Scoped Hash and inject Scoped CSS rule (Active for class={styles.container})
      const scopedClassName = `${rawClassName}_${uniqueHash}`;
      classMap[rawClassName] = scopedClassName; // Register dotless key descriptor cleanly

      cssString += `.${scopedClassName} { `;
      for (const [prop, val] of Object.entries(properties)) {
        const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssString += `${cssProperty}: ${val}; `;
      }
      cssString += '} \n';
    } else {
      // Global element tag fallback adjustments (e.g., body, button structural definitions)
      cssString += `${selector} { `;
      for (const [prop, val] of Object.entries(properties)) {
        const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssString += `${cssProperty}: ${val}; `;
      }
      cssString += '} \n';
    }
  }

  // 3. Append the freshly compiled unique CSS bundle into our native style element node
  styleTag.appendChild(document.createTextNode(cssString));

  // Return the dynamic map object back to the component layer
  return classMap;
}
