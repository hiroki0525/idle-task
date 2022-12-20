import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json' assert { type: 'json' };
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };

const buildConfig = ({ format, file }) => ({
  file,
  format,
  sourcemap: true,
  name: 'idleTask',
  compact: true,
});

export default [
  {
    input: 'src/index.ts',
    output: [
      buildConfig({ file: packageJson.main, format: 'cjs' }),
    ],
    plugins: [typescript(), terser()],
  },
  {
    input: 'src/index.ts',
    output: [
      buildConfig({ file: 'dist/umd/index.js', format: 'umd' }),
    ],
    plugins: [typescript({...tsConfigJson, ...{ compilerOptions: {target: "es5"}}}), terser()],
  },
  // generate single file.
  // after build, delete all .d.ts files without index.d.ts
  {
    input: './dist/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
