import babel from 'rollup-plugin-babel'
import globals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import scss from 'rollup-plugin-scss'
import cjs from 'rollup-plugin-commonjs'

export default {
  input: 'src/devtools.js',
  output: {
    file: 'public/devtools.js',
    format: 'iife',
    name: 'DevTools',
    sourcemap: true,
  },
  plugins: [
    scss({
      output: 'public/devtools.css',
    }),
    babel({
      babelrc: true,
    }),
    cjs({
      exclude: [
        'node_modules/process-es6/**',
      ],
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**',
      ],
    }),
    globals(),
    resolve({
      main: true,
      browser: true,
      extensions: ['.mjs', '.js', '.jsx', '.json'],
    }),
  ],
}
