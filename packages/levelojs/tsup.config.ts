import { defineConfig } from "tsup";
export default defineConfig([
    {
        entry: {
            index: 'src/index.ts',
        },
        format: ['cjs', 'esm'],
        dts: true,
        splitting: false,
        sourcemap: true,
        clean: true,
        minify: true,
    },
    {
        entry: {
            compiler: 'src/compiler/index.js',
        },
        format: ['cjs', 'esm'],
        dts: true,
        splitting: false,
        sourcemap: true,
        clean: false,
        minify: true,
        external: ['@babel/core', '@babel/plugin-syntax-jsx', 'vite'],
    }
]);