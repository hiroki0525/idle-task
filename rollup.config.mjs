import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
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
      file: `dist/index.${format}.js`,
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
      file: `dist/index.development.${format}.js`,
      format,
      name: 'idleTask',
    },
  ],
  plugins: [buildTsConfig({ format, sourceMap: false })],
}));

export default [
  ...productionConfigs,
  ...developmentConfigs
];
