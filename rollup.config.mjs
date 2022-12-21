import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    }
  ],
  plugins: [
    external(),
    url(),
    babel({
      babelHelpers: 'runtime',
      babelrc: true,
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
    })
  ]
}
