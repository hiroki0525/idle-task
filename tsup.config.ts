import { defineConfig, type Options } from 'tsup';
import { cp } from 'node:fs/promises';

export default defineConfig(options => {
  const commonOptions: Partial<Options> = {
    entry: ['src/index.ts'],
    sourcemap: true,
    dts: true,
    clean: true,
    outDir: './dist/',
    ...options,
  };

  return [
    // Development
    {
      ...commonOptions,
      format: 'esm',
      outExtension: () => ({ js: '.development.mjs' }),
      onSuccess: async () => {
        await cp('dist/index.development.mjs', 'dist/index.development.js');
      },
    },
    {
      ...commonOptions,
      format: 'cjs',
      outExtension: () => ({ js: '.development.cjs' }),
    },
    // Production
    {
      ...commonOptions,
      format: 'esm',
      outExtension: () => ({ js: '.mjs' }),
      minify: true,
      onSuccess: async () => {
        await cp('dist/index.mjs', 'dist/index.js');
      },
    },
    {
      ...commonOptions,
      format: 'cjs',
      minify: true,
      outExtension: () => ({ js: '.cjs' }),
    },
  ];
});
