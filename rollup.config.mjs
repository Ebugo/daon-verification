import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import polyfillNode from 'rollup-plugin-polyfill-node';
import fs from 'fs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/index.mjs',
      format: 'esm'
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'MyPackage',
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    json(),
    polyfillNode(),
    typescript(),
    {
      name: 'copy-dts',
      buildEnd() {
        fs.cpSync('src/index.ts', 'dist/index.d.ts', { force: true });
      }
    }
  ]
};
