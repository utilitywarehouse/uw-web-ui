import { defineConfig, Format } from 'tsup';

export default defineConfig([
  // actual exposed modules = 1 per component
  {
    // index files to allow named imports
    entry: ['./src/**/*.ts?(x)', '!src/**/*.stories.*'],
    tsconfig: './tsconfig.build.json',
    // treeshake: true,
    sourcemap: true,
    minify: true,
    clean: true,
    dts: true,
    splitting: false,
    outDir: 'dist',
    format: ['cjs', 'esm'] as Array<Format>,
    target: 'es2020',
    external: ['react', '*.stories.*'],
    // index files must NOT be bundled!
    // it acts as a map towards bundled components
    // but never rebundles them
    bundle: false,
  },
]);
