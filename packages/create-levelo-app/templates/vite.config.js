import { defineConfig } from 'vite';
import { leveloPlugin } from './.levelo/plugins/vite-plugin-levelo.js';

export default defineConfig({
  plugins: [leveloPlugin()],
  server: {
    port: 3636,
    open: false
  }
});
