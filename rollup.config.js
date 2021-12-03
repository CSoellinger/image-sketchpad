import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';
import path from 'path';
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
    },
    // Output one browser minified package
    {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      name,
      plugins: [
        terser({
          mangle: {
            reserved: ['ImageSketchpad'],
          },
        }),
        html({
          fileName: 'demo.html',
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
      ],
    },
  ],
};

export default config;
