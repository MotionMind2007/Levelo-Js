// levelo.config.js
export default {
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'fragment',
    jsxInject: `import { h } from 'levelojs'`
  }
};
