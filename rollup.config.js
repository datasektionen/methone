import path from 'path'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import alias from 'rollup-plugin-alias'
import url from 'rollup-plugin-url'
import prepack from 'rollup-plugin-prepack-up'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    // prepack(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**'
    }),
    alias({
      resolve: ['.js', '/index.js'],
      '@material-ui/core': path.resolve(__dirname, 'node_modules', '@material-ui/core/es'),
      '@material-ui/icons': path.resolve(__dirname, 'node_modules', '@material-ui/icons/es'),
    }),
    resolve(),
    commonjs(),
  ]
}
