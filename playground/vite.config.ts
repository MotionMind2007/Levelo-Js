// vite.config.ts - Vite Configuration for Levelo JS Test Environment
import { defineConfig } from 'vite';
import { leveloPlugin } from 'levelojs/compiler';
import leveloConfig from './levelo.config';

export default defineConfig({
  plugins: [
    leveloPlugin()
  ],
  ...leveloConfig,
  server: {
    port: 6262
  },
});
