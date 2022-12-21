import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };

const outputFormats = ['cjs', 'umd', 'es'];

const buildTsConfig = ({ format, sourceMap }) => {
  const extraConfig =
    format === 'umd'
      ? { compilerOptions: { target: 'es5', sourceMap } }
      : { compilerOptions: { sourceMap } };
  return typescript({ ...tsConfigJson, ...extraConfig });
};

const productionConfigs = outputFormats.map(format => ({
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${format}/index.js`,
      format,
      sourcemap: tsConfigJson.compilerOptions.sourceMap,
      name: 'idleTask',
      compact: true,
    },
  ],
  plugins: [
    buildTsConfig({
      format,
      sourceMap: tsConfigJson.compilerOptions.sourceMap,
    }),
    terser(),
  ],
}));

const developmentConfigs = outputFormats.map(format => ({
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${format}/index.development.js`,
      format,
      name: 'idleTask',
    },
  ],
  plugins: [buildTsConfig({ format, sourceMap: false })],
}));

export default [
  ...productionConfigs,
  ...developmentConfigs,
  // generate single file.
  // after build, delete all .d.ts files without index.d.ts
  {
    input: './dist/es/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
