import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import html2 from 'rollup-plugin-html2';
import fs from 'fs';
import path from 'path';
// import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

/**
 * Extensions for node_modules resolution
 */
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * Name for browser JS file
 */
const name = 'ImageSketchpad';

/**
 * Rollup config
 */
const config = {
  input: './src/index.ts',

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      babelHelpers: 'runtime',
      include: ['src/**/*'],
    }),

    strip(),

    // Replace strings in files
    replace({
      '%%date%%': () => new Date().toString(),
      '%%version%%': pkg.version,
      preventAssignment: true,
    }),
  ],

  output: [
    // Output one common js package
    { file: pkg.main, format: 'cjs', exports: 'default' },
    // Output one es module package
    { file: pkg.module, format: 'es' },
    // Output one browser package
    {
      file: pkg.browser,
      format: 'umd',
      name,
      plugins: [
        html2({
          fileName: 'index.html',
          template: fs.readFileSync(path.resolve('example', 'index.html')).toString(),
        }),
      ],
    },
  ],
};

export default config;
