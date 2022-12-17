import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: 'json' };
import terser from '@rollup/plugin-terser';

const buildConfig = ({ format, file }) => ({
  file,
  format,
  sourcemap: true,
  name: 'idleTask',
  compact: true,
})

export default {
  input: "src/index.ts",
  output: [
      buildConfig({ file: packageJson.main, format: 'cjs' }),
      buildConfig({ file: 'dist/umd/index.js', format: 'umd' })
  ],
  plugins: [typescript(), terser()],
};
