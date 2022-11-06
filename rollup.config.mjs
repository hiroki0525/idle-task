import typescript from "@rollup/plugin-typescript";
import packageJson from "./package.json" assert { type: 'json' };
import terser from '@rollup/plugin-terser';

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      name: "lib",
      compact: true,
    },
  ],
  plugins: [typescript(), terser()],
};
