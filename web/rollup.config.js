import livereload from 'rollup-plugin-livereload'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import { spawn } from 'child_process'

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server

	function toExit() {	if (server) server.kill(0) }

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev', '--host', '0.0.0.0'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			})

			process.on('SIGTERM', toExit)
			process.on('exit', toExit)
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
		svelte({
			compilerOptions: { dev: !production },
			onwarn: (warning, handler) => { if (warning.code === 'a11y-autofocus') return	handler(warning) }
		}),
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte'],
			exportConditions: ['svelte']
		}),
		commonjs(),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],

	watch: { clearScreen: false	},
}
