
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { createRequire } from 'module';
const pkg = createRequire(import.meta.url)(`./package.json`);

// rollup.config.mjs
export default {
	input: './index.js',
	output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: `named`,
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve({
      preferBuiltins: true, // 使用内置模块而不是同名模块
    }),
  ],
};