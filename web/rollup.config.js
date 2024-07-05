import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import { spawn } from 'child_process'
import { config } from 'dotenv'

const to_replace = {}
for (let [k, v] of Object.entries(config().parsed))
  to_replace[`process.env.${k}`] = `'${v}'`

const production = !process.env.ROLLUP_WATCH

function serve() {
  let server

  return {
    writeBundle() {
      if (server) return
      server = spawn('npm', ['run', 'start', '--', '--dev', '--host', '0.0.0.0'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      })

      const to_exit = _ => { if (server) server.kill(0) }
      process.on('SIGTERM', to_exit)
      process.on('exit', to_exit)
    }
  }
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    dir: 'public/build'
  },

  plugins: [
    replace({
      include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.svelte'],
      preventAssignment: true,
      values: to_replace
    }),
    svelte({
      compilerOptions: { dev: !production },
      onwarn: (warning, handler) => { if (warning.code === 'a11y-autofocus') return	handler(warning) }
    }),
    css({ output: 'bundle.css' }),
    resolve({
      preferBuiltins: true,
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte']
    }),
    commonjs(),
    !production && serve(),
    !production && livereload('public'),
    production && terser()
  ],

  watch: { clearScreen: false	}
}
