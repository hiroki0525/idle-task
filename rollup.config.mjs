import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import tsConfigJson from './tsconfig.json' assert { type: 'json' };

const outputFormats = ['cjs', 'es'];

const buildTsConfig = ({ sourceMap }) => {
  const extraConfig = { compilerOptions: { sourceMap } };
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
  plugins: [buildTsConfig({ sourceMap: false })],
}));

export default [
  ...productionConfigs,
  ...developmentConfigs
];
