import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const name = 'Mailcheck';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    typescript(),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs({
        namedExports: {
            'email-addresses': ['parseOneAddress']
        }
    }),
    
    // Allows node_modules resolution
    resolve({ extensions }),
    
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),

    json({compact: true, preferConst: true}),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
  }, {
    file: pkg.browser,
    format: 'iife',
    name,
  }],
};