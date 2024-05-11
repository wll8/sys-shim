import alias from '@rollup/plugin-alias'
import terser from '@rollup/plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRootDir = path.resolve(__dirname)
const {target} = process.env

const table = {
  node: {
    input: `../src/node.js`,
    output: [
      {
        file: `./npm-pkg/node/main.cjs`,
        format: `cjs`,
        name: `Sys`,
        sourcemap: true,
      },
      {
        file: `./npm-pkg/node/main.mjs`,
        format: `esm`,
        name: `Sys`,
        sourcemap: true,
      },
      {
        file: `./npm-pkg/node/main.min.cjs`,
        format: `cjs`,
        name: `Sys`,
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: `./npm-pkg/node/main.min.mjs`,
        format: `esm`,
        name: `Sys`,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    external: [],
    plugins: [
      alias({
        entries: [
          { find: `@`, replacement: path.resolve(projectRootDir, `../src`) },
        ],
      }),
      nodeResolve({
        preferBuiltins: true, // 使用内置模块而不是同名模块
      }), // 打包三方依赖
      commonjs(), // 处理依赖中的包是 cjs 规范时
    ],
  },
  browser: {
    input: `../src/browser.js`,
    output: [
      {
        file: `./npm-pkg/browser/main.umd.js`,
        format: `umd`,
        name: `Sys`,
        sourcemap: true,
      },
      {
        file: `./npm-pkg/browser/main.esm.js`,
        format: `esm`,
        name: `Sys`,
        sourcemap: true,
      },
      {
        file: `./npm-pkg/browser/main.umd.min.js`,
        format: `umd`,
        name: `Sys`,
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: `./npm-pkg/browser/main.esm.min.js`,
        format: `esm`,
        name: `Sys`,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    external: [],
    plugins: [
      alias({
        entries: [
          { find: `@`, replacement: path.resolve(projectRootDir, `../src`) },
        ],
      }),
      nodeResolve({
        preferBuiltins: true, // 使用内置模块而不是同名模块
      }), // 打包三方依赖
      commonjs(), // 处理依赖中的包是 cjs 规范时
    ],
  },
}

const config = table[target]

export default config
