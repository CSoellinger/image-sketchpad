import pkg from './package.json';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import fs from 'fs';
import path from 'path';
import { terser } from 'rollup-plugin-terser';

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
    // Replace strings in files
    replace({
      __buildVersion__: pkg.version,
      preventAssignment: false,
    }),

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
  ],

  output: [
    // Output one common js package
    { file: pkg.main, format: 'cjs', exports: 'named' },
    // Output one es module package
    { file: pkg.module, format: 'es', exports: 'named' },
    // Output one normal and one minified browser bundled package
    {
      file: pkg.browser,
      format: 'iife',
      name,
      exports: 'default',
    },
    {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'iife',
      name,
      exports: 'default',
      plugins: [
        html({
          fileName: 'index.html',
          template: ({ files }) => {
            let html = fs.readFileSync(path.resolve('example', 'index.html')).toString();

            for (let jsFile of files.js) {
              if (!jsFile.isEntry) {
                continue;
              }

              html = html.replace('</body>', `<script src="${jsFile.fileName}"></script></body>`);
            }

            return html;
          },
        }),
        terser(),
      ],
    },
  ],
};

export default config;
